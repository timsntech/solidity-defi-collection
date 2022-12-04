// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
// INTERFACES
import "./IFurAddressBook.sol";
import "./IFurToken.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract FurVault is Ownable {
    /**
     * Address book.
     */
    IFurAddressBook public addressBook;

    /**
     * $FUR token.
     */
    IFurToken public furToken;

    /**
     * Downline nft.
     */
    IERC721 public furNFT;

    /**
     * User struct.
     */
    struct User {
        address upline;
        uint256 referrals;
        uint256 totalStructure;
        uint256 directBonus;
        uint256 matchBonus;
        uint256 deposits;
        uint256 depositTime;
        uint256 payouts;
        uint256 rolls;
        uint256 referralClaimPosition;
    }
    mapping(address => User) public users;
    uint256 public totalUsers;
    uint256 public totalTransactions;
    uint256 public totalDeposited;
    uint256 public referralDepth = 15;

    /**
     * Airdrop struct.
     */
    struct Airdrop {
        //Airdrop tracking
        uint256 airdrops;
        uint256 airdropsReceived;
        uint256 lastAirdrop;
    }
    mapping(address => Airdrop) public airdrops;
    uint256 public totalAirdrops;

    /**
     * Custody struct.
     */
    struct Custody {
        address manager;
        address beneficiary;
        uint256 lastHeartbeat;
        uint256 lastCheckin;
        uint256 heartbeatInterval;
    }
    mapping(address => Custody) public custody;

    /**
     * Minimums.
     */
    uint256 public minimumDeposit = 1e16;
    uint256 public minimumInitialDeposit = 10e16;

    /**
     * Tax.
     */
    uint256 public transferTax = 10;
    uint256 public whaleBracketSize = 10000e16;
    uint256 public whaleBracketMax = 10;
    uint256 public compoundTax = 5;
    uint256 public exitTax = 5;

    /**
     * Claims.
     */
    uint256 public maxPayoutPercent = 360;
    uint256 public payoutCap = 100000e16;
    uint256 public payoutRate = 2;
    uint256 public referralBonus = 10;
    uint256 public totalWithdrawals;

    /**
     * Constructor.
     * @param addressBook_ Address book address.
     */
    constructor(address addressBook_) {
        addressBook = IFurAddressBook(addressBook_);
        furToken = IFurToken(addressBook.furToken());
        furNFT = IERC721(addressBook.furNFT());
    }

    /**
     * -------------------------------------------------------------------------
     * EVENTS
     * -------------------------------------------------------------------------
     */
    event Upline(address indexed addr, address indexed upline);
    event NewDeposit(address indexed addr, uint256 amount);
    event Leaderboard(address indexed addr, uint256 referrals, uint256 total_deposits, uint256 total_payouts, uint256 total_structure);
    event DirectPayout(address indexed addr, address indexed from, uint256 amount);
    event MatchPayout(address indexed addr, address indexed from, uint256 amount);
    event BalanceTransfer(address indexed _src, address indexed _dest, uint256 _deposits, uint256 _payouts);
    event Withdraw(address indexed addr, uint256 amount);
    event LimitReached(address indexed addr, uint256 amount);
    event NewAirdrop(address indexed from, address indexed to, uint256 amount, uint256 timestamp);
    event ManagerUpdate(address indexed addr, address indexed manager, uint256 timestamp);
    event BeneficiaryUpdate(address indexed addr, address indexed beneficiary);
    event HeartbeatIntervalUpdate(address indexed addr, uint256 interval);
    event Heartbeat(address indexed addr, uint256 timestamp);
    event Checkin(address indexed addr, uint256 timestamp);

    /**
     * -------------------------------------------------------------------------
     * USER FUNCTIONS
     * -------------------------------------------------------------------------
     */

    /**
     * Checkin.
     */
    function checkIn() external _checkin {
        // do nothing, just expose the _checkin modifier as an external function.
    }

    /**
     * Update manager.
     */
    function updateManager(address manager_) external _checkin {
        custody[msg.sender].manager = manager_;
        emit ManagerUpdate(msg.sender, manager_, block.timestamp);
    }

    /**
     * Update beneficiary.
     */
    function updateBeneficiary(address beneficiary_, uint256 interval_) external _checkin {
        require(interval_ >= 90 days && interval_ <= 730 days, "Time range is invalid");
        custody[msg.sender].beneficiary = beneficiary_;
        emit BeneficiaryUpdate(msg.sender, beneficiary_);
        custody[msg.sender].heartbeatInterval = interval_;
        emit HeartbeatIntervalUpdate(msg.sender, interval_);
    }

    /**
     * Set upline.
     */
    function setUpine(address upline_) external {
        _setUpline(msg.sender, upline_);
    }
    function _setUpline(address user_, address upline_) internal {
        require(users[user_].upline == address(0) && upline_ != user_ && user_ != owner() && (users[upline_].depositTime > 0 || addressBook.isDevWallet(upline_)), "Invalid upline");
        users[user_].upline = upline_;
        emit Upline(user_, upline_);
        totalUsers ++;
        for(uint256 i = 0; i < referralDepth; i ++) {
            if(upline_ == address(0)) break;
            users[upline_].totalStructure ++;
            upline_ = users[upline_].upline;
        }
    }

    /**
     * Deposit.
     */
    function deposit(uint256 amount_) public _checkin {
        require((users[msg.sender].deposits > 0 && amount_ >= minimumDeposit) || amount_ >= minimumInitialDeposit, "Minimum deposit amount not met");
        require(users[msg.sender].upline != address(0) || msg.sender == owner(), "No upline");
        uint256 _tax_ = amount_ * transferTax / 100;
        uint256 _depositAmount_ = amount_ - _tax_;
        if(_claimsAvailable(msg.sender) > amount_ / 100) {
            uint256 _claimedDividends_ = _claim(msg.sender, false);
            uint256 _taxedDividends_ = _claimedDividends_ * (100 - compoundTax) / 100;
            _depositAmount_ += _taxedDividends_;
        }
        _deposit(msg.sender, amount_);
    }

    /**
     * Internal deposit.
     */
    function _deposit(address user_, uint256 amount_) internal {
        require(furToken.transferFrom(user_, address(this), amount_), "Transfer failed");
        users[user_].deposits += amount_;
        users[user_].depositTime = block.timestamp;
        totalDeposited += amount_;
        emit NewDeposit(user_, amount_);
        address _up_ = users[user_].upline;
        if(_up_ != address(0) && _isNetPositive(_up_) && _isBalanceCovered(_up_, 1)) {
            uint256 _bonus_ = amount_ / 10;
            users[_up_].directBonus += _bonus_;
            users[_up_].deposits += _bonus_;
            emit NewDeposit(_up_, _bonus_);
            emit DirectPayout(_up_, user_, _bonus_);
        }
        emit Leaderboard(user_, users[user_].referrals, users[user_].deposits, users[user_].payouts, users[user_].totalStructure);
        totalTransactions ++;
    }

    /**
     * Claim.
     */
    function claim() external _checkin {
        _claimOut(msg.sender);
    }
    function _claimOut(address user_) internal {
        uint256 _payout_ = _claim(user_, true);
        uint256 _vaultBalance_ = furToken.balanceOf(address(this));
        if(_vaultBalance_ < _payout_) {
            uint256 _mintAmount_ = _payout_ - _vaultBalance_;
            furToken.mint(address(this), _mintAmount_);
        }
        uint256 _grossPayout_ = _payout_ * (100 - exitTax) / 100;
        require(furToken.transfer(user_, _grossPayout_), "Transfer failed");
        emit Leaderboard(user_, users[user_].referrals, users[user_].deposits, users[user_].payouts, users[user_].totalStructure);
        totalTransactions ++;
    }
    function _claim(address user_, bool isClaimedOut_) internal returns (uint256) {
        uint256 _maxPayout_ = _maxPayout(user_);
        require(users[user_].payouts < _maxPayout_, "Payouts are maxed out");
        uint256 _claimsAvailable_ = _claimsAvailable(user_);
        require(_claimsAvailable_ > 0, "No claims available");
        users[user_].payouts += _claimsAvailable_;
        if(!isClaimedOut_) {
            uint256 _whaleTax_ = _claimsAvailable_ * whaleTaxRate(user_) / 100;
            uint256 _compoundTaxedPayout_ = (_claimsAvailable_ - _whaleTax_) * (100 - compoundTax) / 100;
            _referralPayout(user_, _compoundTaxedPayout_);
        }
        totalWithdrawals += _claimsAvailable_;
        users[user_].depositTime = block.timestamp;
        emit Withdraw(user_, _claimsAvailable_);
        if(users[user_].payouts >= _maxPayout_) {
            emit LimitReached(user_, users[user_].payouts);
        }
        return _claimsAvailable_;
    }

    /**
     * Roll.
     */
    function roll() external _checkin {
        _roll(msg.sender);
    }
    function _roll(address user_) internal {
        uint256 _payout_ = _claim(user_, false);
        uint256 _payoutTaxed_ = _payout_ * (100 - compoundTax) / 100;
        _deposit(user_, _payoutTaxed_);
        users[user_].rolls += _payoutTaxed_;
        emit Leaderboard(user_, users[user_].referrals, users[user_].deposits, users[user_].payouts, users[user_].totalStructure);
        totalTransactions ++;
    }

    /**
     * Airdrop.
     */
    function airdrop(address to_, uint256 amount_) external {
        require(users[to_].upline != address(0), "Upline not found");
        _airdrop(msg.sender, to_, amount_);
    }
    function _airdrop(address user_, address to_, uint256 amount_) internal {
    }

    /**
     * Referral payout.
     */
    function _referralPayout(address user_, uint256 amount_) internal {
        address _up_ = users[user_].upline;
        uint256 _bonus_ = amount_ * referralBonus / 100;
        uint256 _share_ = _bonus_ / 4;
        uint256 _upShare_ = _bonus_ - _share_;
        bool _teamFound_ = false;
        for(uint256 i = 0; i < referralDepth; i ++) {
            if(_up_ == address(0)) {
                users[user_].referralClaimPosition = referralDepth;
                break;
            }
            if(users[user_].referralClaimPosition == i && _isBalanceCovered(_up_, i + 1) && _isNetPositive(_up_)) {
                if(users[_up_].referrals >= 5 && !_teamFound_) {
                    // TEAM WALLET!
                    _teamFound_ = true;
                    users[_up_].deposits += _upShare_;
                    users[user_].deposits += _share_;
                    users[_up_].matchBonus += _upShare_;
                    airdrops[_up_].airdrops += _share_;
                    airdrops[_up_].lastAirdrop = block.timestamp;
                    airdrops[user_].airdropsReceived += _share_;
                    totalAirdrops += _share_;
                    emit NewDeposit(user_, _share_);
                    emit NewDeposit(_up_, _upShare_);
                    emit NewAirdrop(_up_, user_, _share_, block.timestamp);
                    emit MatchPayout(_up_, user_, _upShare_);
                }
                else {
                    // NON TEAM WALLET
                    users[_up_].deposits += _bonus_;
                    users[_up_].matchBonus += _bonus_;
                    emit NewDeposit(_up_, _bonus_);
                    emit MatchPayout(_up_, user_, _bonus_);
                }
                break;
            }
            _up_ = users[_up_].upline;
        }
        users[user_].referralClaimPosition += 1;
        if (users[user_].referralClaimPosition >= referralDepth){
            users[user_].referralClaimPosition = 0;
        }
    }

    /**
     * Is balance covered?
     */
    function isBalanceCovered(uint256 level_) public view returns (bool) {
        return _isBalanceCovered(msg.sender, level_);
    }
    function _isBalanceCovered(address user_, uint256 level_) internal view returns (bool) {
        return _balanceLevel(user_) >= level_;
    }

    /**
     * Balance level
     */
    function balanceLevel() public view returns (uint256) {
        return _balanceLevel(msg.sender);
    }
    function _balanceLevel(address user_) internal view returns (uint256) {
        return furNFT.balanceOf(user_);
    }

    /**
     * Is net positive?
     */
    function isNetPositive() public view returns (bool) {
        return _isNetPositive(msg.sender);
    }
    function _isNetPositive(address user_) internal view returns (bool) {
        return _credits(user_) > _debits(user_);
    }

    /**
     * Credits.
     */
    function credits() public view returns (uint256) {
        return _credits(msg.sender);
    }
    function _credits(address user_) internal view returns (uint256) {
        return users[user_].deposits + users[user_].rolls + airdrops[user_].airdrops;
    }

    /**
     * Debits.
     */
    function debits() public view returns (uint256) {
        return _debits(msg.sender);
    }
    function _debits(address user_) internal view returns (uint256) {
        return users[user_].payouts;
    }

    /**
     * Claims available.
     */
    function claimsAvailable() external view returns (uint256) {
        return _claimsAvailable(msg.sender);
    }
    function _claimsAvailable(address user_) internal view returns (uint256) {
        uint256 _maxPayout_ = _maxPayout(user_);
        uint256 _payout_;
        if(users[user_].payouts < _maxPayout_) {
            _payout_ = users[user_].deposits * (payoutRate * 1e18) / 100e18 / 24 hours * (block.timestamp - users[user_].depositTime);
            if(users[user_].payouts + _payout_ > _maxPayout_) {
                _payout_ = _maxPayout_ - users[user_].payouts;
            }
        }
        return _payout_;
    }

    /**
     * Max payout.
     */
    function maxPayout() public view returns (uint256) {
        return _maxPayout(msg.sender);
    }
    function _maxPayout(address user_) internal view returns (uint256) {
        uint256 _maxPayout_ = users[user_].deposits * maxPayoutPercent / 100;
        if(payoutCap < _maxPayout_) {
            _maxPayout_ = payoutCap;
        }
        return _maxPayout_;
    }

    /**
     * Whale tax rate.
     */
    function whaleTaxRate(address user_) public view returns (uint256) {
        uint256 _bracket_ = users[user_].deposits / whaleBracketSize;
        if(whaleBracketMax < _bracket_) {
            _bracket_ = whaleBracketMax;
        }
        return _bracket_ * 5;
    }

    /**
     * -------------------------------------------------------------------------
     * MODIFIERS
     * -------------------------------------------------------------------------
     */

    /**
     * Checkin.
     * @dev Checkin disambiguates activity between an active manager and player;
     * this allows a beneficiary to execute a call to "transferInactiveAccount"
     * if the player is gone, but a manager is still executing on their
     * behalf! This is set up as a modifier so it can be easily
     * added to multiple public functions
     */
    modifier _checkin() {
        if(block.timestamp - custody[msg.sender].lastCheckin < 300) {
            return;
        }
        custody[msg.sender].lastCheckin = block.timestamp;
        emit Checkin(msg.sender, custody[msg.sender].lastCheckin);
        _;
    }

}

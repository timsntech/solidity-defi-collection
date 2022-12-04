// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FurioFaucet is Ownable {
    /**
     * User struct.
     */
    struct User {
        // Referral info.
        address upline;
        uint256 referrals;
        uint256 total_structure;
        //Long-term referral accounting.
        uint256 direct_bonus;
        uint256 match_bonus;
        //Deposit accounting.
        uint256 deposits;
        uint256 deposit_time;
        //Payout and roll accounting.
        uint256 payouts;
        uint256 rolls;
        //Upline round robin tracking.
        uint256 ref_claim_pos;
    }

    /**
     * Airdrop struct.
     */
    struct Airdrop {
        //Airdrop tracking
        uint256 airdrops;
        uint256 airdrops_received;
        uint256 last_airdrop;
    }

    /**
     * Custody struct.
     */
    struct Custody {
        address manager;
        address beneficiary;
        uint256 last_heartbeat;
        uint256 last_checkin;
        uint256 heartbeat_interval;
    }

    mapping(address => User) public users;
    mapping(address => Airdrop) public airdrops;
    mapping(address => Custody) public custody;

    uint256 public totalUsers = 1;
    uint256 public referralDepth  = 15;
    uint256 public maxPayout = 100000e18;
    uint256 public maxPayoutPercent = 365;
    uint256 public payoutRate = 1;
    uint256 public depositBracketSize = 10000e18;
    uint256 public depositBracketMax = 10;
    uint256 public compoundTax = 5;
    uint256 public totalWithdraw;
    uint256 public referralBonus  = 10;
    uint256[] public referralBalances;
    uint256 public totalAirdrops;
    uint256 public totalTxs;
    uint256 public totalDeposited;

    uint256[15] public levels = [
        2e8,
        3e8,
        5e8,
        8e8,
        13e8,
        21e8,
        34e8,
        55e8,
        89e8,
        144e8,
        233e8,
        377e8,
        610e8,
        987e8,
        1597e8
    ];

    // Minimum deposit amounts.
    uint256 private __minimumDeposit = 1e18; // 1 FUR
    uint256 private __minimumInitialDeposit = 10e18; // 10 FUR

    // Taxes
    uint256 private __transferTaxRate = 10;

    IERC20 private FurioToken;
    IERC20 private USDCToken;

    /**
     * Events.
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
    event HeartBeatIntervalUpdate(address indexed addr, uint256 interval);
    event HeartBeat(address indexed addr, uint256 timestamp);
    event Checkin(address indexed addr, uint256 timestamp);

    /**
     * Constructor.
     */
    constructor(address FurioTokenAddress, address USDCTokenAddress)
    {
        FurioToken = IERC20(FurioTokenAddress);
        USDCToken = IERC20(USDCTokenAddress);
    }

    /**
     * -------------------------------------------------------------------------
     * USER FUNCTIONS
     * -------------------------------------------------------------------------
     */

    function checkin() public _checkin
    {
        // do nothing, just expose the _checkin modifier as a public function.
    }

    /**
     * Get level count.
     */
    function levelCount() public view returns (uint256)
    {
        return levels.length;
    }

    function level() public view returns (uint256)
    {

    }

    /**
     * Deposit.
     * @dev deposit FUR.
     */
    function deposit(uint256 amount)
        external
        _checkin
        _validUpline(msg.sender)
        _validDepositAmount(msg.sender, amount)
    {
        _deposit(msg.sender, amount);
    }

    /**
     * Deposit with upline.
     * @dev set upline and do deposit.
     */
    function deposit(address upline, uint256 amount)
        external
        _checkin
        _validDepositAmount(msg.sender, amount)
    {
        require(_setUpline(msg.sender, upline), "Invalid upline");
        _deposit(msg.sender, amount);
    }

    /**
     * Minimum deposit.
     * @dev calculates the minimum deposit amount for a player.
     */
    function minimumDeposit() public view _checkin returns (uint256)
    {
        return _minimumDeposit(msg.sender);
    }

    /**
     * -------------------------------------------------------------------------
     * INTERNAL FUNCTIONS
     * -------------------------------------------------------------------------
     */

    /**
     * Calculate transfer tax.
     */
    function _calculateTransferTax(uint256 amount) internal view
    {
        return amount * __transferTaxRate / 100;
    }

    /**
     * Set upline.
     * @dev Add direct referral and update team structure of upline.
     */
    function _setUpline(address player, address upline) internal returns (bool)
    {
        // if player is the owner, return true.
        if(player == owner()) {
            return true;
        }
        // if user already has upline set, return true.
        if(users[player].upline != address(0)) {
            return true;
        }
        // if player and upline are the same, return false.
        if(player == upline) {
            return false;
        }
        // if upline has no deposits or upline isn't owner, return false.
        if(users[upline].deposit_time == 0 || upline != owner()) {
            return false;
        }
        users[player].upline = upline;
        users[upline].referrals ++;
        emit Upline(player, upline);
        totalUsers ++;
        for(uint8 i = 0; i < referralDepth; i++) {
            if(upline == address(0)) break;
            users[upline].total_structure ++;
            upline = users[upline].upline;
        }
        return true;
    }

    /**
     * Minimum deposit.
     * @dev Internal function to calculate minimum deposit.
     */
    function _minimumDeposit(address player) internal view returns (uint256) {
        uint256 minimum = __minimumDeposit;
        if (users[player].deposits == 0) {
            minimum = __minimumInitialDeposit;
        }
        return minimum;
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
        if(block.timestamp - custody[msg.sender].last_checkin < 300) {
            return;
        }
        custody[msg.sender].last_checkin = block.timestamp;
        emit Checkin(msg.sender, custody[msg.sender].last_checkin);
        _;
    }

    /**
     * Upline is valid.
     * @dev Check that the user has a valid upline, or is the owner().
     */
    modifier _validUpline(address player) {
        require(users[player].upline != address(0) || msg.sender == owner(), "Invalid upline");
        _;
    }

    /**
     * Valid deposit amount.
     * @dev Make sure amount meets minimum requirements.
     */
    modifier _validDepositAmount(address player, uint256 amount) {
        require(amount >= _minimumDeposit(player), "Deposit amount does not meet minimums");
        _;
    }


    function claimsAvailable(address player) public view returns (uint256) {
        (uint256 _gross_payout, uint256 _max_payout, uint256 _to_payout, uint256 _sustainability_fee) = payoutOf(player);
        return _to_payout;
    }

    //@dev Calculate the current payout and maxpayout of a given address
    function payoutOf(address player) public view returns(uint256 payout, uint256 max_payout, uint256 net_payout, uint256 sustainability_fee) {
        max_payout = _maxPayout(player);
        //This can  be 0 - 50 in increments of 5% @bb Whale tax bracket calcs here
        uint256 _fee = sustainabilityFee(player);
        uint256 share;
        // @BB: No need for negative fee
        if(users[player].payouts < max_payout) {
            //Using 1e18 we capture all significant digits when calculating available divs
            share = users[player].deposits * payoutRate * 1e18 / 100e18 / 24 hours;
            payout = share * block.timestamp - users[player].deposit_time;
            // payout remaining allowable divs if exceeds
            if(users[player].payouts + payout > max_payout) {
                payout = max_payout - users[player].payouts;
            }
            sustainability_fee = payout * _fee / 100;
            net_payout = payout - sustainability_fee;
        }
    }

    function maxPayoutOf(uint256 amount) public view returns(uint256) {
        return amount * maxPayoutPercent / 100;
    }

    function sustainabilityFee(address player) public view returns (uint256) {
        uint256 _bracket = users[player].deposits / depositBracketSize;
        if(_bracket > depositBracketMax) {
            _bracket = depositBracketMax;
        }
        return _bracket * 5;
    }

    function claim() external {
        //Checkin for custody management.  If a user rolls for themselves they are active
        checkin();
        _claim_out(msg.sender);
    }

    function roll() public {
        //Checkin for custody management.  If a user rolls for themselves they are active
        checkin();
        _roll(msg.sender);
    }

    /**
     * -------------------------------------------------------------------------
     * INTERNAL FUNCTIONS
     * -------------------------------------------------------------------------
     */
    function _maxPayout(address player) internal returns (uint256) {
        uint256 _max_payout = users[player].deposits * maxPayoutPercent / 100;
        if (_max_payout > maxPayout) {
            _max_payout = maxPayout;
        }
        return _max_payout;
    }

    function _claim(address player, bool isClaimedOut) internal returns (uint256) {
        (uint256 _gross_payout, uint256 _max_payout, uint256 _to_payout, uint256 _sustainability_fee) = payoutOf(player);
        require(users[player].payouts < _max_payout, "Full payouts");
        // Deposit payout
        if(_to_payout > 0) {
            // payout remaining allowable divs if exceeds
            if(users[player].payouts + _to_payout > _max_payout) {
                _to_payout = _max_payout - users[player].payouts;
            }
            users[player].payouts += _gross_payout;
            if (!isClaimedOut){
                //Payout referrals
                uint256 compoundTaxedPayout = _to_payout * (100 - compoundTax) / 100;
                _refPayout(owner, compoundTaxedPayout);
            }
        }
        require(_to_payout > 0, "Zero payout");
        //Update the payouts
        totalWithdraw += _to_payout;
        //Update time!
        users[player].deposit_time = block.timestamp;
        emit Withdraw(player, _to_payout);
        if(users[player].payouts >= _max_payout) {
            emit LimitReached(player, users[player].payouts);
        }
        return _to_payout;
    }

    function _refPayout(address player, uint256 amount) internal {

        address _up = users[player].upline;
        uint256 _bonus = amount * referralBonus / 100;
        uint256 _share = _bonus / 4;
        uint256 _up_share = _bonus - _share;
        bool _team_found = false;

        for(uint8 i = 0; i < referralDepth; i++) {

            // If we have reached the top of the chain, the owner
            if(_up == address(0)){
                //The equivalent of looping through all available
                users[player].ref_claim_pos = referralDepth;
                break;
            }

            //We only match if the claim position is valid
            if(users[player].ref_claim_pos == i && isBalanceCovered(_up, i + 1) && isNetPositive(_up)) {
                //Team wallets are split 75/25%
                if(users[_up].referrals >= 5 && !_team_found) {
                    //This should only be called once
                    _team_found = true;
                    //upline is paid matching and
                    users[_up].deposits += _up_share;
                    users[player].deposits += _share;
                    //match accounting
                    users[_up].match_bonus += _up_share;
                    //Synthetic Airdrop tracking; team wallets get automatic airdrop benefits
                    airdrops[_up].airdrops += _share;
                    airdrops[_up].last_airdrop = block.timestamp;
                    airdrops[player].airdrops_received += _share;
                    //Global airdrops
                    totalAirdrops += _share;
                    //Events
                    emit NewDeposit(player, _share);
                    emit NewDeposit(_up, _up_share);
                    emit NewAirdrop(_up, player, _share, block.timestamp);
                    emit MatchPayout(_up, player, _up_share);
                } else {
                    users[_up].deposits += _bonus;
                    //match accounting
                    users[_up].match_bonus += _bonus;
                    //events
                    emit NewDeposit(_up, _bonus);
                    emit MatchPayout(_up, player, _bonus);
                }
                //The work has been done for the position; just break
                break;
            }
            _up = users[_up].upline;
        }
        //Reward the next
        users[player].ref_claim_pos += 1;
        //Reset if we've hit the end of the line
        if (users[player].ref_claim_pos >= referralDepth){
            users[player].ref_claim_pos = 0;
        }
    }

    function isBalanceCovered(address player, uint8 level) public view returns (bool) {
        return balanceLevel(player) >= level;
    }

    function balanceLevel(address player) public view returns (uint8) {
        uint8 _level = 0;
        for (uint8 i = 0; i < referralDepth; i++) {
            if (USDCToken.balanceOf(player) < referralBalances[i]) break;
            _level += 1;
        }
        return _level;
    }

    function isNetPositive(address player) public view returns (bool) {
        (uint256 _credits, uint256 _debits) = creditsAndDebits(player);
        return _credits > _debits;
    }

    function creditsAndDebits(address player) public view returns (uint256 _credits, uint256 _debits) {
        User memory _user = users[player];
        Airdrop memory _airdrop = airdrops[player];
        _credits = _airdrop.airdrops + _user.rolls + _user.deposits;
        _debits = _user.payouts;
    }

    function _deposit(address player, uint256 amount) internal
    {
        uint256 _tax = amount * _calculateTransferTax(amount);
        uint256 _total_amount = amount - _tax;
        // Claim if divs are greater than 1% of the deposit
        if (claimsAvailable(player) > amount / 100){
            uint256 claimedDivs = _claim(player, false);
            uint256 taxedDivs = claimedDivs * (100 - compoundTax) / 100;
            _total_amount += taxedDivs;
        }
        require(FurioToken.transferFrom(player, address(FurioToken), amount), "Unable to transfer");
        //stats
        users[player].deposits += amount;
        users[player].deposit_time = block.timestamp;
        totalDeposited += amount;
        totalTxs ++;
        //events
        emit Leaderboard(player, users[player].referrals, users[player].deposits, users[player].payouts, users[player].total_structure);
        emit NewDeposit(player, amount);
        //10% direct commission; only if net positive
        address _up = users[player].upline;
        if(_up != address(0) && isNetPositive(_up) && isBalanceCovered(_up, 1)) {
            uint256 _bonus = amount / 10;
            //Log historical and add to deposits
            users[_up].direct_bonus += _bonus;
            users[_up].deposits += _bonus;
            emit NewDeposit(_up, _bonus);
            emit DirectPayout(_up, player, _bonus);
        }
    }
}

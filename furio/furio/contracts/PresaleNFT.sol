// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// INTERFACES
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "./interfaces/IToken.sol";

contract PresaleNft is ERC721PresetMinterPauserAutoId
{
    using Counters for Counters.Counter;
    /**
     * Token id tracker.
     */
    Counters.Counter private _tokenIdTracker;

    /**
     * Payment token.
     */
    IERC20 public paymentToken;

    /**
     * Treasury.
     */
    address public treasury;

    /**
     * Furio token.
     */
    IToken public furioToken;

    /**
     * Mode types.
     */
    enum Mode {
        notStarted,
        presaleOne,
        presaleTwo,
        presaleThree,
        claim
    }

    /**
     * Start times.
     */
    uint256 public presaleOneStart = 1650398370; // Tue Apr 19 2022 19:59:30 GMT+0000
    uint256 public presaleTwoStart = 1650743970; // Sat Apr 23 2022 19:59:30 GMT+0000
    uint256 public presaleThreeStart = 1651089570; // Wed Apr 27 2022 19:59:30 GMT+0000
    uint256 public claimStart = 1651435170; // Sun May 01 2022 19:59:30 GMT+0000

    /**
     * Max each address can hold.
     */
    uint256 public presaleOneMax = 1;
    uint256 public presaleTwoMax = 10;
    uint256 public presaleThreeMax = 10;

    /**
     * Purchase prices.
     */
    uint256 public presaleOnePrice = 250e6;
    uint256 public presaleTwoPrice = 150e6;
    uint256 public presaleThreePrice = 175e6;

    /**
     * Max supplies.
     */
    uint256 public presaleOneSupply = 300;
    uint256 public presaleTwoSupply = 1250;
    uint256 public presaleThreeSupply = 1250;

    /**
     * Values.
     */
    uint256 public presaleOneValue = 500e18;
    uint256 public presaleTwoValue = 100e18;
    uint256 public presaleThreeValue = 100e18;

    /**
     * Purchased.
     */
    mapping(address => uint256) public presaleOnePurchased;
    mapping(address => uint256) public presaleTwoPurchased;
    mapping(address => uint256) public presaleThreePurchased;

    /**
     * Sold.
     */
    uint256 presaleOneSold;
    uint256 presaleTwoSold;
    uint256 presaleThreeSold;

    /**
     * Claimed.
     */
    uint256 totalClaimed;
    mapping(uint256 => bool) public claimed;

    /**
     * Metadata.
     */
    string private _tokenUri = 'ipfs://Qme28bzD3z119fAqBPXgpDb9Z79bqEheQjkejWsefcd4Gj/1';
    address public owner;

    /**
     * Events.
     */
    event TokensPurchased(address buyer_, uint256 quantity_);
    event TokenClaimed(uint256 tokenId_);

    /**
     * Constructor.
     */
    constructor() ERC721PresetMinterPauserAutoId (
        'Furio Presale NFT',
        '$FURPRESALE',
        _tokenUri
    ) {
        owner = msg.sender;
    }

    /**
     * Token URI.
     * @param tokenId_ Id of the token.
     */
    function tokenURI(uint256 tokenId_) public view override returns (string memory)
    {
        require(_exists(tokenId_), "Token does not exist");
        return _tokenUri;
    }

    /**
     * Mode.
     * @return uint8
     * @dev Returns the mode of the contract based on time and supply.
     */
    function mode() public view returns (Mode)
    {
        uint256 _time_ = block.timestamp;
        if(_time_ >= claimStart) return Mode.claim;
        if(_time_ >= presaleThreeStart) return Mode.presaleThree;
        if(_time_ >= presaleTwoStart) return Mode.presaleTwo;
        if(_time_ >= presaleOneStart) return Mode.presaleOne;
        return Mode.notStarted;
    }

    /**
     * Max avialable.
     * @param buyer_ Address buying the NFTs.
     * @return uint256
     * @dev Figures out how many NFTs an address can purchase.
     */
    function max(address buyer_) public view returns (uint256)
    {
        Mode _mode_ = mode();
        if(_mode_ == Mode.presaleOne) return presaleOneMax - presaleOnePurchased[buyer_];
        if(_mode_ == Mode.presaleTwo) return presaleTwoMax - presaleTwoPurchased[buyer_];
        if(_mode_ == Mode.presaleThree) return presaleThreeMax - presaleThreePurchased[buyer_];
        return 0;
    }

    /**
     * Price.
     * @return uint256
     * @dev Figures out price based on presale level.
     */
    function price() public view returns (uint256)
    {
        Mode _mode_ = mode();
        if(_mode_ == Mode.presaleOne) return presaleOnePrice;
        if(_mode_ == Mode.presaleTwo) return presaleTwoPrice;
        if(_mode_ == Mode.presaleThree) return presaleThreePrice;
        return 0;
    }

    /**
     * Supply.
     * @return uint256
     * @dev Figures out supply based on presale level.
     */
    function supply() public view returns (uint256)
    {
        Mode _mode_ = mode();
        if(_mode_ == Mode.presaleOne) return presaleOneSupply - presaleOneSold;
        if(_mode_ == Mode.presaleTwo) return presaleTwoSupply - presaleTwoSold;
        if(_mode_ == Mode.presaleThree) return presaleThreeSupply - presaleThreeSold;
        return 0;
    }

    /**
     * Value.
     * @return uint256
     * @dev Figures out value based on presale level.
     */
    function value() public view returns (uint256)
    {
        Mode _mode_ = mode();
        if(_mode_ == Mode.presaleOne) return presaleOneValue;
        if(_mode_ == Mode.presaleTwo) return presaleTwoValue;
        if(_mode_ == Mode.presaleThree) return presaleThreeValue;
        return 0;
    }

    /**
     * Token value.
     * @return uint256
     * @dev Figures out value based on token id.
     */
    function tokenValue(uint256 tokenId_) public view returns (uint256)
    {
        if(claimed[tokenId_]) return 0;
        if(!_exists(tokenId_)) return 0;
        uint256 _value_ = presaleThreeValue;
        if(tokenId_ <= presaleOneSupply + presaleTwoSupply) _value_ = presaleTwoValue;
        if(tokenId_ <= presaleOneSupply) _value_ = presaleOneValue;
        return _value_;
    }

    /**
     * Owned value.
     * @param owner_ Address of token owner.
     * @return uint256
     * @dev Returns total value of all owned NFTs.
     */
    function ownedValue(address owner_) public view returns (uint256)
    {
        uint256 _value_ = 0;
        for(uint256 i = 0; i < balanceOf(owner_); i ++) {
            _value_ += tokenValue(tokenOfOwnerByIndex(owner_, i));
        }
        return _value_;
    }

    /**
     * Buy an NFT.
     * @param quantity_ The number of NFTs to purchase.
     */
    function buy(uint256 quantity_) external
    {
        Mode _mode_ = mode();
        require(_mode_ != Mode.notStarted, "Presale has not started");
        require(_mode_ != Mode.claim, "Presale has ended");
        require(address(paymentToken) != address(0), "Payment token not set");
        require(treasury != address(0), "Treasury not set");
        require(supply() >= quantity_, "Quantity is too high");
        require(max(msg.sender) >= quantity_, "Quantity is too high");
        require(paymentToken.transferFrom(msg.sender, treasury, price() * quantity_), "Payment failed");
        if(_mode_ == Mode.presaleOne) {
            presaleOnePurchased[msg.sender] += quantity_;
            presaleOneSold += quantity_;
        }
        if(_mode_ == Mode.presaleTwo) {
            while(_tokenIdTracker.current() < presaleOneSupply) {
                _tokenIdTracker.increment();
            }
            presaleTwoPurchased[msg.sender] += quantity_;
            presaleTwoSold += quantity_;
        }
        if(_mode_ == Mode.presaleThree) {
            while(_tokenIdTracker.current() < presaleOneSupply + presaleTwoSupply) {
                _tokenIdTracker.increment();
            }
            presaleThreePurchased[msg.sender] += quantity_;
            presaleThreeSold += quantity_;
        }
        for(uint256 i = 1; i <= quantity_; i ++) {
            _tokenIdTracker.increment();
            _mint(msg.sender, _tokenIdTracker.current());
        }
        emit TokensPurchased(msg.sender, quantity_);
    }

    /**
     * Claim.
     * @dev Claim all NFTs.
     */
    function claim() external
    {
        require(mode() == Mode.claim, "Claim has not started");
        furioToken.mint(msg.sender, ownedValue(msg.sender));
        for(uint256 i = 0; i < balanceOf(msg.sender); i ++) {
            uint256 _tokenId_ = tokenOfOwnerByIndex(msg.sender, i);
            _burn(_tokenId_);
            claimed[_tokenId_] = true;
            totalClaimed ++;
            emit TokenClaimed(_tokenId_);
        }
    }

    /**
     * -------------------------------------------------------------------------
     * ADMIN FUNCTIONS
     * -------------------------------------------------------------------------
     */

    /**
     * Set payment token.
     * @param address_ Address of the payment token.
     */
    function setPaymentToken(address address_) external onlyOwner
    {
        paymentToken = IERC20(address_);
    }

    /**
     * Set treasury.
     * @param address_ Address of the treasury contract.
     */
    function setTreasury(address address_) external onlyOwner
    {
        treasury = address_;
    }

    /**
     * Set Furio token.
     * @param address_ Address of the Furio token contract.
     */
    function setFurioToken(address address_) external onlyOwner
    {
        furioToken = IToken(address_);
    }

    /**
     * Set presale one start.
     * @param start_ New start timestamp.
     */
    function setPresaleOneStart(uint256 start_) external onlyOwner
    {
        presaleOneStart = start_;
    }

    /**
     * Set presale two start.
     * @param start_ New start timestamp.
     */
    function setPresaleTwoStart(uint256 start_) external onlyOwner
    {
        presaleTwoStart = start_;
    }

    /**
     * Set presale three start.
     * @param start_ New start timestamp.
     */
    function setPresaleThreeStart(uint256 start_) external onlyOwner
    {
        presaleThreeStart = start_;
    }

    /**
     * Set claim start.
     * @param start_ New start timestamp.
     */
    function setClaimStart(uint256 start_) external onlyOwner
    {
        claimStart = start_;
    }

    /**
     * Set presale one max.
     * @param max_ New max.
     */
    function setPresaleOneMax(uint256 max_) external onlyOwner
    {
        presaleOneMax = max_;
    }

    /**
     * Set presale two max.
     * @param max_ New max.
     */
    function setPresaleTwoMax(uint256 max_) external onlyOwner
    {
        presaleTwoMax = max_;
    }

    /**
     * Set presale three max.
     * @param max_ New max.
     */
    function setPresaleThreeMax(uint256 max_) external onlyOwner
    {
        presaleThreeMax = max_;
    }

    /**
     * Set presale one price.
     * @param price_ New price.
     */
    function setPresaleOnePrice(uint256 price_) external onlyOwner
    {
        presaleOnePrice = price_;
    }

    /**
     * Set presale two price.
     * @param price_ New price.
     */
    function setPresaleTwoPrice(uint256 price_) external onlyOwner
    {
        presaleTwoPrice = price_;
    }

    /**
     * Set presale three price.
     * @param price_ New price.
     */
    function setPresaleThreePrice(uint256 price_) external onlyOwner
    {
        presaleThreePrice = price_;
    }

    /**
     * Set presale one supply.
     * @param supply_ New supply.
     */
    function setPresaleOneSupply(uint256 supply_) external onlyOwner
    {
        presaleOneSupply = supply_;
    }

    /**
     * Set presale two supply.
     * @param supply_ New supply.
     */
    function setPresaleTwoSupply(uint256 supply_) external onlyOwner
    {
        presaleTwoSupply = supply_;
    }

    /**
     * Set presale three supply.
     * @param supply_ New supply.
     */
    function setPresaleThreeSupply(uint256 supply_) external onlyOwner
    {
        presaleThreeSupply = supply_;
    }

    /**
     * Set presale one value.
     * @param value_ New value.
     */
    function setPresaleOneValue(uint256 value_) external onlyOwner
    {
        presaleOneValue = value_;
    }

    /**
     * Set presale two value.
     * @param value_ New value.
     */
    function setPresaleTwoValue(uint256 value_) external onlyOwner
    {
        presaleTwoValue = value_;
    }

    /**
     * Set presale three value.
     * @param value_ New value.
     */
    function setPresaleThreeValue(uint256 value_) external onlyOwner
    {
        presaleThreeValue = value_;
    }

    /**
     * Set token URI.
     * @param uri_ New URI.
     */
    function setTokenUri(string memory uri_) external onlyOwner
    {
        _tokenUri = uri_;
    }

    /**
     * Renounce ownership.
     */
    function renounceOwnership() external onlyOwner
    {
        owner = address(0);
    }

    /**
     * Transfer ownership.
     * @param owner_ New owner address.
     */
    function transferOwnership(address owner_) external onlyOwner
    {
        owner = owner_;
    }

    /**
     * -------------------------------------------------------------------------
     * MODIFIERS
     * -------------------------------------------------------------------------
     */

    /**
     * Require msg.sender to be owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// INTERFACES
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Swap is AccessControl, ERC20 {
    /**
     * Token metadata.
     */
    string private _name = 'Furio Liquidity Token';
    string private _symbol = '$FURX';

    /**
     * Roles.
     */
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    /**
     * ERC20 contract for swap token.
     */
    IERC20 public swapToken;

    /**
     * Stats.
     */
    uint256 public totalTransactions;
    uint256 public providers;

    uint256 internal _lastBalance;
    uint256 internal _trackingInterval = 1 minutes;
    mapping (address => bool) internal _providers;
    mapping (address => uint256) internal _transactions;

    bool public isPaused = true;

    // Events
    event onTokenPurchase(address indexed buyer, uint256 indexed bnb_amount, uint256 indexed token_amount);
    event onBnbPurchase(address indexed buyer, uint256 indexed token_amount, uint256 indexed bnb_amount);
    event onAddLiquidity(address indexed provider, uint256 indexed bnb_amount, uint256 indexed token_amount);
    event onRemoveLiquidity(address indexed provider, uint256 indexed bnb_amount, uint256 indexed token_amount);
    event onLiquidity(address indexed provider, uint256 indexed amount);
    event onContractBalance(uint256 balance);
    event onPrice(uint256 price);
    event onSummary(uint256 liquidity, uint256 price);

    /**
     * Contract constructor.
     */
    constructor(address swapToken_) ERC20(_name, _symbol) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        _setupRole(PAUSER_ROLE, msg.sender);
        swapToken = IERC20(swapToken_);
        _lastBalance = block.timestamp;
    }

    /**
     * Unpause.
     */
    function unpause() public {
        require(hasRole(PAUSER_ROLE, _msgSender()), "Must have pauser role to unpause");
        isPaused = false;
    }

    /**
     * Pause.
     */
    function pause() public {
        require(hasRole(PAUSER_ROLE, _msgSender()), "Must have pauser role to pause");
        isPaused = true;
    }

    /**
     * isNotPaused modifier.
     */
    modifier isNotPaused() {
        require(!isPaused, "Swaps currently paused");
        _;
    }

    /**
     * Deposit.
     */
    function deposit(uint256 amount_) external {
        require(swapToken.transferFrom(msg.sender, address(this), amount_), "Deposit failed");
        swapInput(amount_, 1, msg.sender, msg.sender);
    }

    /**
     * Swap input.
     */
    function swapInput(uint256 sold_, uint256 minTokens_, address buyer_, address recipient_) internal {
        require(sold_ > 0, "Sold must be greater than zero");
        require(minTokens_ > 0, "Minimum tokens must be greater than zero");
        uint256 tokenReserve = swapToken.balanceOf(address(this));
    }
}

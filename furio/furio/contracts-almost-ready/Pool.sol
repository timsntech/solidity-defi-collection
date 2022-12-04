// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./utilities/Pausable.sol";
// INTERFACES
import "./interfaces/IToken.sol";

/**
 * @title Pool
 * @author Steve Harmeyer
 * @notice This is the liquidity pool contract.
 */
contract Pool is Ownable, Pausable, ERC20 {
    /**
     * Token metadata.
     */
    string private _name = 'Furio Liquidity Token';
    string private _symbol = '$FURX';

    /**
     * Target price.
     */
    uint256 public targetPrice = 125e14;
    bool public hitTarget = false;

    /**
     * Trading pair tokens
     */
    IERC20 public usdc;
    IToken public fur;

    /**
     * Last balance timestamp.
     * @dev This stores the timestamp the last time the balance was updated.
     */
    uint256 internal _lastBalance;

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
    constructor(address usdc_, address fur_) ERC20(_name, _symbol)
    {
        usdc = IERC20(usdc_);
        fur = IToken(fur_);
        _lastBalance = block.timestamp;
    }

    /**
     * Get input price.
     */
    function getInputPrice(uint256 inputAmount_, uint256 inputReserve_, uint256 outputReserve_) public view returns (uint256)
    {
        require(inputReserve_ > 0 && outputReserve_ > 0, "Invalid value");
        uint256 _inputAmountWithFee_ = inputAmount_ * 990;
        uint256 _numerator_ = _inputAmountWithFee_ * outputReserve_;
        uint256 _denominator_ = inputReserve_ * 1000 + _inputAmountWithFee_;
        return _numerator_ / _denominator_;
    }

    /**
     * Get output price.
     */
    function getOutputPrice(uint256 outputAmount_, uint256 inputReserve_, uint256 outputReserve_)  public view returns (uint256)
    {
        require(inputReserve_ > 0 && outputReserve_ > 0, "Invalid value");
        uint256 _numerator_ = inputReserve_ * outputAmount_ * 1000;
        uint256 _denominator_ = (outputReserve_ - outputAmount_) * 990;
        return (_numerator_ / _denominator_) - 1;
    }

    /**
     * USDC to FUR input.
     */
    function usdcToFurInput(uint256 usdcSold_, uint256 minFur_, address buyer_, address recipient_) internal returns (uint256)
    {
        require(usdcSold_ > 0 && minFur_ > 0, "Invalid value");
        uint256 _furReserve_ = fur.balanceOf(address(this));
        uint256 _usdcReserve_ = usdc.balanceOf(address(this));
        uint256 _furBought_ = getInputPrice(usdcSold_, _usdcReserve_ - usdcSold_, _furReserve_);
        require(_furBought_ >= minFur_, "Tokens bought less than minimum tokens");
        require(fur.transfer(recipient_, _furBought_), "Transfer error");
        emit onTokenPurchase(buyer_, usdcSold_, _furBought_);
        emit onContractBalance(usdcBalance());
        trackGlobalStats();
        return _furBought_;
    }

    /**
     * USDC to FUR Swap Input.
     */
    function usdcToFurSwapInput(uint256 usdc_, uint256 minFur_) public isNotPaused returns (uint256)
    {
        require(usdc.transferFrom(msg.sender, address(this), usdc_), "Transfer error");
        return usdcToFurInput(usdc_, minFur_, msg.sender, msg.sender);
    }

    /**
     * USDC to FUR output.
     */
    function usdcToFurOutput(uint256 furBought_, uint256 maxUsdc_, address buyer_, address recipient_) internal returns (uint256)
    {
        require(furBought_ > 0 && maxUsdc_ > 0, "Invalid value");
        uint256 _usdcSold_ = getOutputPrice(furBought_, usdcBalance() - maxUsdc_, furBalance());
        uint256 _usdcRefund_ = maxUsdc_ - _usdcSold_;
        require(fur.transfer(recipient_, furBought_), "Transfer error");
        if(_usdcRefund_ > 0) {
            require(usdc.transfer(buyer_, _usdcRefund_), "Transfer error");
        }
        emit onTokenPurchase(buyer_, _usdcSold_, furBought_);
        trackGlobalStats();
        return _usdcSold_;
    }

    /**
     * USDC to FUR Swap Output.
     */
    function usdcToFurSwapOutput(uint256 usdc_, uint256 furBought_) public isNotPaused returns (uint256)
    {
        require(usdc.transferFrom(msg.sender, address(this), usdc_), "Transfer error");
        return usdcToFurOutput(furBought_, usdc_, msg.sender, msg.sender);
    }

    /**
     * FUR to USDC input.
     */
    function furToUsdcInput(uint256 furSold_, uint256 minUsdc_, address buyer_, address recipient_) internal returns (uint256)
    {
        require(furSold_ > 0 && minUsdc_ > 0, "Invalid value");
        uint256 _taxes_ = furSold_ * fur.taxRate() / 100;
        uint256 _adjustedSold_ = furSold_ - _taxes_;
        uint256 _usdcBought_ = getInputPrice(_adjustedSold_, fur.balanceOf(address(this)), usdc.balanceOf(address(this)));
        require(_usdcBought_ >= minUsdc_, "USDC bought less than minimum");
        require(usdc.transfer(recipient_, _usdcBought_), "Transfer error");
        require(fur.transferFrom(buyer_, address(this), furSold_), "Transfer error");
        emit onBnbPurchase(buyer_, furSold_, _usdcBought_);
        trackGlobalStats();
        return _usdcBought_;
    }

    /**
     * FUR to USDC swap input.
     */
    function furToUsdcSwapInput(uint256 furSold_, uint256 minUsdc_) public isNotPaused returns (uint256)
    {
        return furToUsdcInput(furSold_, minUsdc_, msg.sender, msg.sender);
    }

    /**
     * 136,000 * .5
     * 68k lpool
     * 850,000 * 2.5
     * 1,000,000 total supply
     *
     */

    /**
     * USDC Balance.
     */
    function usdcBalance() public view returns (uint256)
    {
        return usdc.balanceOf(address(this));
    }

    /**
     * FUR Balance.
     */
    function furBalance() public view returns (uint256)
    {
        return fur.balanceOf(address(this));
    }

    /**
     * Track global stats.
     */
    function trackGlobalStats() internal
    {

        uint256 price = getBnbToTokenOutputPrice(1e18);
        uint256 balance = bnbBalance();

        if (now.safeSub(lastBalance_) > trackingInterval_) {

            emit onSummary(balance * 2, price);
            lastBalance_ = now;
        }

        emit onContractBalance(balance);
        emit onPrice(price);

        totalTxs += 1;
        _txs[msg.sender] += 1;
    }
}

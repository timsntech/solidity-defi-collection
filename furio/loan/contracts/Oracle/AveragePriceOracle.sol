//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "../abstracts/BaseContract.sol";
import "../Interfaces/IAveragePriceOracle.sol";

/// @notice This oracle calculates the average price of the FurFiToken BNB liquidity pool. The time period can be set for the average price window. The larger the price window is set, the riskier it is for an attacker to manipulate the price using e.q. a flash loan attack. However, the larger the price window, the less current the FurFiToken-BNB price
/// @dev The amount out in FurFiToken for one BNB is the Efficiency Level.
/// @dev Implementation based on (Fixed windows): https://docs.uniswap.org/protocol/V2/guides/smart-contract-integration/building-an-oracle
contract AveragePriceOracle is
    BaseContract,
    IAveragePriceOracle
{
    // 30 seconds average price window
    uint32 constant TIME_PERIOD = 30;
    uint224 constant Q112 = 2 ** 112;

    uint256 private blockTimestampLast;
    uint224 private furFiBNBPriceAverage;
    uint256 private furFiBNBCumulativeLast;
    bool private furFiIsToken0;

    IERC20Upgradeable private FurFiToken;
    IUniswapV2Pair private FurFiBnbLpToken;

    function initialize() public initializer {
        __BaseContract_init();
    }

    function setAddresses(
        address _furFiTokenAddress,
        address _furFiBnbLpToken
    ) public onlyOwner {
        require(
            IUniswapV2Pair(_furFiBnbLpToken).token0() == _furFiTokenAddress ||
            IUniswapV2Pair(_furFiBnbLpToken).token1() == _furFiTokenAddress,
            "LA"
        );
        FurFiToken = IERC20Upgradeable(_furFiTokenAddress);
        FurFiBnbLpToken = IUniswapV2Pair(_furFiBnbLpToken);
        furFiIsToken0 = FurFiBnbLpToken.token0() == _furFiTokenAddress;
    }

    /// @notice gets the average amount of FurFiToken Token out for one BNB
    /// @dev uses the average price oracle to calculate the price
    /// @return amountOut the amount out in FurFiToken Token for one BNB
    function getAverageFurFiForOneBNB()
    public
    view
    override
    returns(uint256 amountOut)
    {
        return (furFiBNBPriceAverage * 1e18) / Q112;
    }

    /// @notice Updates the average FurFiToken BNB price
    /// @dev Needs to be called periodically such that the price updates. Should always be called before the average price is used. The first time called, the values are initialized.
    function updateFurFiBNBPrice() external override whenNotPaused {
        (
            uint256 _price0Cumulative,
            uint256 _price1Cumulative,
            uint32 _blockTimestamp
        ) = currentCumulativePrices(FurFiBnbLpToken);

        // initialized the first time called
        if (blockTimestampLast == 0) {
            (
                uint112 _reserve0,
                uint112 _reserve1,
            ) = FurFiBnbLpToken.getReserves();

            if (furFiIsToken0) {
                furFiBNBPriceAverage = (Q112 * _reserve0) / _reserve1;
                furFiBNBCumulativeLast = _price1Cumulative;
            } else {
                furFiBNBPriceAverage = (Q112 * _reserve1) / _reserve0;
                furFiBNBCumulativeLast = _price0Cumulative;
            }
            blockTimestampLast = _blockTimestamp;
            return;
        }

        uint256 _timeElapsed = _blockTimestamp - blockTimestampLast;

        if (_timeElapsed >= TIME_PERIOD) {
            if (furFiIsToken0) {
                furFiBNBPriceAverage = uint224(
                    (_price1Cumulative - furFiBNBCumulativeLast) / _timeElapsed
                );
                furFiBNBCumulativeLast = _price1Cumulative;
            } else {
                furFiBNBPriceAverage = uint224(
                    (_price0Cumulative - furFiBNBCumulativeLast) / _timeElapsed
                );
                furFiBNBCumulativeLast = _price0Cumulative;
            }
            blockTimestampLast = _blockTimestamp;
        }
    }

    /// @notice Gets the current block timestamp in uint32 format
    /// @return The current timestamp
    function currentBlockTimestamp() internal view returns(uint32) {
        return uint32(block.timestamp % 2 ** 32);
    }

    /// @notice Gets the current cumulative prices
    /// @dev This function takes the cumulative prices from the pair LP token and adds the accumulated price since the last update of the average price.
    /// @param pair The LP pair to receive the cumulative prices
    /// @return _price0Cumulative The cumulative price for token 0
    /// @return _price1Cumulative The cumulative price for token 1
    /// @return _blockTimestamp The timestamp for the respective cumulative prices
    function currentCumulativePrices(IUniswapV2Pair pair)
    internal
    view
    returns(
        uint256 _price0Cumulative,
        uint256 _price1Cumulative,
        uint32 _blockTimestamp
    )
    {
        _blockTimestamp = currentBlockTimestamp();
        _price0Cumulative = pair.price0CumulativeLast();
        _price1Cumulative = pair.price1CumulativeLast();

        // if time has elapsed since the last update on the pair, mock the accumulated price values
        (
            uint112 _reserve0,
            uint112 _reserve1,
            uint32 _blockTimestampLast
        ) = pair.getReserves();
        if (_blockTimestampLast != _blockTimestamp) {
            uint32 _timeElapsed = _blockTimestamp - _blockTimestampLast;
            // addition overflow is desired
            // counterfactual
            _price0Cumulative += uint256(
                ((Q112 * _reserve1) / _reserve0) * _timeElapsed
            );
            // counterfactual
            _price1Cumulative += uint256(
                ((Q112 * _reserve0) / _reserve1) * _timeElapsed
            );
        }
    }

    uint256[50] private __gap;
}
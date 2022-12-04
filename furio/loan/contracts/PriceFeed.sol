// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./abstracts/BaseContract.sol";
import "./Interfaces/IPriceFeed.sol";
import "./Interfaces/IAveragePriceOracle.sol";
import "./Dependencies/BaseMath.sol";
import "./Dependencies/LiquityMath.sol";
import "hardhat/console.sol";

interface IAggregatorV3 {

  function decimals() external view returns (uint8);
  function description() external view returns (string memory);
  function version() external view returns (uint256);

  // getRoundData and latestRoundData should both raise "No data present"
  // if they do not have data to report, instead of returning unset values
  // which could be misinterpreted as actual reported values.
  function getRoundData(uint80 _roundId)
    external
    view
    returns (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    );

  function latestRoundData()
    external
    view
    returns (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    );
}

/*
* PriceFeed for mainnet deployment, to be connected to Chainlink's live BNB:USD aggregator reference 
* contract.
*
* The PriceFeed uses Chainlink as primary oracle. It contains logic for
* switching oracles based on oracle failures, timeouts, and conditions for returning to the primary
* Chainlink oracle.
*/
contract PriceFeed is BaseContract, BaseMath, IPriceFeed {

    using SafeMath for uint256;

    function initialize() public initializer {
        __BaseContract_init();
    }

    string constant public NAME = "PriceFeed";

    IAggregatorV3 public priceAggregator;  // Mainnet Chainlink aggregator

    IAveragePriceOracle public averagePriceOracle;

    // Use to convert a price answer to an 18-digit precision uint
    uint constant public TARGET_DIGITS = 18;  

    // Maximum time period allowed since Chainlink's latest round data timestamp, beyond which Chainlink is considered frozen.
    uint constant public TIMEOUT = 14400;  // 4 hours: 60 * 60 * 4
    
    // Maximum deviation allowed between two consecutive Chainlink oracle prices. 18-digit precision.
    uint constant public MAX_PRICE_DEVIATION_FROM_PREVIOUS_ROUND =  5e17; // 50%

    // The last bnb good price seen from an chainlink oracle - 18-digit decimal
    uint public lastBNBGoodPrice;

    //The  FurFi price - 18 digit precision
    uint public lastFURFIPrice;

    struct ChainlinkResponse {
        uint80 roundId;
        int256 answer;
        uint256 timestamp;
        bool success;
        uint8 decimals;
    }

    event LastGoodPriceUpdated(uint _lastBNBGoodPrice, uint _lastFURFIPrice);

    // --- Dependency setters ---
    
    function setAddresses(
        address _priceAggregatorAddress,
        address _averagePriceOracle
    )
        external
        onlyOwner
    {

        priceAggregator = IAggregatorV3(_priceAggregatorAddress);
        averagePriceOracle = IAveragePriceOracle(_averagePriceOracle);

        // Get an initial price from Chainlink to serve as first reference for lastBNBGoodPrice
        ChainlinkResponse memory chainlinkResponse = _getCurrentChainlinkResponse();
        ChainlinkResponse memory prevChainlinkResponse = _getPrevChainlinkResponse(chainlinkResponse.roundId, chainlinkResponse.decimals);
        
        require(!_chainlinkIsBroken(chainlinkResponse, prevChainlinkResponse) && !_chainlinkIsFrozen(chainlinkResponse), 
            "PriceFeed: Chainlink must be working and current");

        //FurFi token amount per BNB (18-digit decimal)
        averagePriceOracle.updateFurFiBNBPrice();
        uint furFiPerBNB = averagePriceOracle.getAverageFurFiForOneBNB();

        _storeBothPrice(chainlinkResponse, furFiPerBNB);

    }

    // --- Functions ---

    /*
    * fetchPrice():
    * Returns the latest price obtained from the Oracle. Called by Liquity functions that require a current price.
    *
    * Also callable by anyone externally. 
    *
    * Non-view function - it stores the last good price seen by Liquity.
    *
    * Uses a main oracle Chainlink. If fail, 
    * it uses the last good price seen by Liquity.
    *
    */
    function fetchPrice() external override whenNotPaused returns (uint price) {
        // Get current and previous price data from Chainlink
        ChainlinkResponse memory chainlinkResponse = _getCurrentChainlinkResponse();
        ChainlinkResponse memory prevChainlinkResponse = _getPrevChainlinkResponse(chainlinkResponse.roundId, chainlinkResponse.decimals);

        //FurFi token amount per BNB (18-digit decimal)
        averagePriceOracle.updateFurFiBNBPrice();
        uint furFiPerBNB = averagePriceOracle.getAverageFurFiForOneBNB();

        // If Chainlink breaks, return last Good Price
        if (_chainlinkIsBroken(chainlinkResponse, prevChainlinkResponse)) {
            uint currentFURFIPrice = lastBNBGoodPrice.mul(DECIMAL_PRECISION).div(furFiPerBNB);
            _storePrice(lastBNBGoodPrice, currentFURFIPrice);
            return currentFURFIPrice;
        }

        // If Chainlink is frozen, return last good price
        if (_chainlinkIsFrozen(chainlinkResponse)) {
            uint currentFURFIPrice = lastBNBGoodPrice.mul(DECIMAL_PRECISION).div(furFiPerBNB);
            _storePrice(lastBNBGoodPrice, currentFURFIPrice);
            return currentFURFIPrice;
        }

        // If Chainlink is live but deviated >50% from it's previous price, return last good price
        if (_chainlinkPriceChangeAboveMax(chainlinkResponse, prevChainlinkResponse)) {
            uint currentFURFIPrice = lastBNBGoodPrice.mul(DECIMAL_PRECISION).div(furFiPerBNB);
            _storePrice(lastBNBGoodPrice, currentFURFIPrice);
            return currentFURFIPrice;
        }

        return _storeBothPrice(chainlinkResponse, furFiPerBNB);
    }

    // --- Helper functions ---

    function _chainlinkIsBroken(ChainlinkResponse memory _currentResponse, ChainlinkResponse memory _prevResponse) internal view returns (bool) {
        return _badChainlinkResponse(_currentResponse) || _badChainlinkResponse(_prevResponse);
    }

    function _badChainlinkResponse(ChainlinkResponse memory _response) internal view returns (bool) {
         // Check for response call reverted
        if (!_response.success) {return true;}
        // Check for an invalid roundId that is 0
        if (_response.roundId == 0) {return true;}
        // Check for an invalid timeStamp that is 0, or in the future
        if (_response.timestamp == 0 || _response.timestamp > block.timestamp) {return true;}
        // Check for non-positive price
        if (_response.answer <= 0) {return true;}

        return false;
    }

    function _chainlinkIsFrozen(ChainlinkResponse memory _response) internal view returns (bool) {
        return block.timestamp.sub(_response.timestamp) > TIMEOUT;
    }

    function _chainlinkPriceChangeAboveMax(ChainlinkResponse memory _currentResponse, ChainlinkResponse memory _prevResponse) internal pure returns (bool) {
        uint currentScaledPrice = _scaleChainlinkPriceByDigits(uint256(_currentResponse.answer), _currentResponse.decimals);
        uint prevScaledPrice = _scaleChainlinkPriceByDigits(uint256(_prevResponse.answer), _prevResponse.decimals);

        uint minPrice = LiquityMath._min(currentScaledPrice, prevScaledPrice);
        uint maxPrice = LiquityMath._max(currentScaledPrice, prevScaledPrice);

        /*
        * Use the larger price as the denominator:
        * - If price decreased, the percentage deviation is in relation to the the previous price.
        * - If price increased, the percentage deviation is in relation to the current price.
        */
        uint percentDeviation = maxPrice.sub(minPrice).mul(DECIMAL_PRECISION).div(maxPrice);

        // Return true if price has more than doubled, or more than halved.
        return percentDeviation > MAX_PRICE_DEVIATION_FROM_PREVIOUS_ROUND;
    }

    function _scaleChainlinkPriceByDigits(uint _price, uint _answerDigits) internal pure returns (uint) {
        /*
        * Convert the price returned by the Chainlink oracle to an 18-digit decimal for use by Liquity.
        * At date of Liquity launch, Chainlink uses an 8-digit price, but we also handle the possibility of
        * future changes.
        *
        */
        uint price;
        if (_answerDigits >= TARGET_DIGITS) {
            // Scale the returned price value down to Liquity's target precision
            price = _price.div(10 ** (_answerDigits - TARGET_DIGITS));
        }
        else if (_answerDigits < TARGET_DIGITS) {
            // Scale the returned price value up to Liquity's target precision
            price = _price.mul(10 ** (TARGET_DIGITS - _answerDigits));
        }
        return price;
    }

    function _storePrice(uint _currentBNBPrice, uint _currentFURFIPrice) internal {
        lastBNBGoodPrice = _currentBNBPrice;
        lastFURFIPrice = _currentFURFIPrice;
        emit LastGoodPriceUpdated(_currentBNBPrice, _currentFURFIPrice);
    }

    function _storeBothPrice(ChainlinkResponse memory _chainlinkResponse, uint256 _furFiPerBNB) internal returns (uint) {
        uint scaledChainlinkPrice = _scaleChainlinkPriceByDigits(uint256(_chainlinkResponse.answer), _chainlinkResponse.decimals);
        uint currentFurFiPrice = scaledChainlinkPrice.mul(DECIMAL_PRECISION).div(_furFiPerBNB);

        _storePrice(scaledChainlinkPrice, currentFurFiPrice);
        return currentFurFiPrice;
    }

    // --- Oracle response wrapper functions ---

    function _getCurrentChainlinkResponse() internal view returns (ChainlinkResponse memory chainlinkResponse) {
        // First, try to get current decimal precision:
        try priceAggregator.decimals() returns (uint8 decimals) {
            // If call to Chainlink succeeds, record the current decimal precision
            chainlinkResponse.decimals = decimals;
        } catch {
            // If call to Chainlink aggregator reverts, return a zero response with success = false
            return chainlinkResponse;
        }

        // Secondly, try to get latest price data:
        try priceAggregator.latestRoundData() returns
        (
            uint80 roundId,
            int256 answer,
            uint256 /* startedAt */,
            uint256 timestamp,
            uint80 /* answeredInRound */
        )
        {
            // If call to Chainlink succeeds, return the response and success = true
            chainlinkResponse.roundId = roundId;
            chainlinkResponse.answer = answer;
            chainlinkResponse.timestamp = timestamp;
            chainlinkResponse.success = true;
            return chainlinkResponse;
        } catch {
            // If call to Chainlink aggregator reverts, return a zero response with success = false
            return chainlinkResponse;
        }
    }

    function _getPrevChainlinkResponse(uint80 _currentRoundId, uint8 _currentDecimals) internal view returns (ChainlinkResponse memory prevChainlinkResponse) {
        /*
        * NOTE: Chainlink only offers a current decimals() value - there is no way to obtain the decimal precision used in a 
        * previous round.  We assume the decimals used in the previous round are the same as the current round.
        */

        // Try to get the price data from the previous round:
        try priceAggregator.getRoundData(_currentRoundId - 1) returns 
        (
            uint80 roundId,
            int256 answer,
            uint256 /* startedAt */,
            uint256 timestamp,
            uint80 /* answeredInRound */
        )
        {
            // If call to Chainlink succeeds, return the response and success = true
            prevChainlinkResponse.roundId = roundId;
            prevChainlinkResponse.answer = answer;
            prevChainlinkResponse.timestamp = timestamp;
            prevChainlinkResponse.decimals = _currentDecimals;
            prevChainlinkResponse.success = true;
            return prevChainlinkResponse;
        } catch {
            // If call to Chainlink aggregator reverts, return a zero response with success = false
            return prevChainlinkResponse;
        }
    }
}


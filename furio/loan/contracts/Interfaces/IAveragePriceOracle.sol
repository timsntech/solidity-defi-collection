//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IAveragePriceOracle {
    function getAverageFurFiForOneBNB()
    external
    view
    returns(uint256 amountOut);

    function updateFurFiBNBPrice() external;
}
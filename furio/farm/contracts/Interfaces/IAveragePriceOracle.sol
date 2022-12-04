//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface IAveragePriceOracle {
    function getAverageFurFiForOneEth()
    external
    view
    returns(uint256 amountOut);

    function updateFurFiEthPrice() external;
}
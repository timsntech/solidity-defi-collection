// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IActivePool {

    function getFURFI() external view returns (uint);

    function getFURUSDDebt() external view returns (uint);

    function increaseFURUSDDebt(uint _amount) external;

    function decreaseFURUSDDebt(uint _amount) external;

    function sendFURFI(address _account, uint _amount) external;

}

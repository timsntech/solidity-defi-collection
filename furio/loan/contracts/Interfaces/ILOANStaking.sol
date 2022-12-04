// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface ILOANStaking {

    function stake(uint _LOANamount) external;

    function unstake(uint _LOANamount) external;

    function increaseF_FURFI(uint _FURFIFee) external; 

    function increaseF_FURUSD(uint _LOANFee) external;  

    function getPendingFURFIGain(address _user) external view returns (uint);

    function getPendingFURUSDGain(address _user) external view returns (uint);

    function getFURFI() external view returns (uint);

    function getFURUSD() external view returns (uint);

    function getTotalLOANDeposits() external view returns (uint);
}

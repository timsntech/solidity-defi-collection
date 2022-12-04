// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


interface IStabilityPool {

    function provideToSP(uint _amount) external;

    function withdrawFromSP(uint _amount) external;

    function withdrawFURFIGainToVault(address _upperHint, address _lowerHint) external;

    function offset(uint _debt, uint _coll) external;

    function getFURFI() external view returns (uint);

    function getTotalFURUSDDeposits() external view returns (uint);

    function getDepositorFURFIGain(address _depositor) external view returns (uint);

    function getDepositorLOANGain(address _depositor) external view returns (uint);

    function getCompoundedFURUSDDeposit(address _depositor) external view returns (uint);

}

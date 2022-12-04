// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface ICommunityIssuance { 
    
    function setAddresses(address _loanTokenAddress, address _stabilityPoolAddress) external;

    function issueLOAN() external returns (uint);

    function sendLOAN(address _account, uint _LOANamount) external;
}

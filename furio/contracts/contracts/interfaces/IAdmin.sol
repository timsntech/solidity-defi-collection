// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/IAccessControlEnumerable.sol";

interface IAdmin is IAccessControlEnumerable {
    function teamWallets() external view returns (address[] memory);
    function teamWalletCount() external view returns (uint256);
    function isTeamWallet(address address_) external view returns (bool);
    function paymentToken() external view returns (address);
    function downlineNFT() external view returns (address);
    function pool() external view returns (address);
    function presaleNFT() external view returns (address);
    function swap() external view returns (address);
    function token() external view returns (address);
    function vault() external view returns (address);
    function addTeamWallet(address address_) external;
    function setPaymentToken(address address_) external;
    function setDownlineNFT(address address_) external;
    function setPool(address address_) external;
    function setPresaleNFT(address address_) external;
    function setSwap(address address_) external;
    function setToken(address address_) external;
    function setVault(address address_) external;
    function presalenftUnPause() external;
}

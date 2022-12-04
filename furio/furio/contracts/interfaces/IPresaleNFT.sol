// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IPausable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IPresaleNFT is IPausable, IERC721 {
    function price() external returns (uint256);
    function maxSupply() external returns (uint256);
    function purchased(address address_) external returns (bool);
    function paymentToken() external view returns (address);
    function setPaymentToken(address address_) external;
    function buy() external;
    function mint(address to_) external;
    function totalSupply() external view returns (uint256);
    function tokenOfOwnerByIndex(address owner_, uint256 index_) external view returns(uint256);
    function tokenURI(uint256 tokenId_) external view returns (string memory);
}

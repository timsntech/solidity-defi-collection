// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./IPausable.sol";

interface IDownlineNFT is IPausable, IERC721 {
    function price() external returns (uint256);
    function taxRate() external returns (uint256);
    function maxPerUser() external returns (uint256);
    function paymentToken() external returns (address);
    function setPaymentToken(address address_) external;
    function totalSupply() external returns (uint256);
    function maxSupply() external returns (uint256);
    function buy(uint256 quantity_) external;
    function mint(address to_, uint256 quantity_) external;
    function tokenOfOwnerByIndex(address owner_, uint256 index_) external returns (uint256);
    function tokenURI(uint256 tokenId_) external returns (string memory);
    function createGeneration(uint256 maxSupply_, string memory baseUri_) external;
}

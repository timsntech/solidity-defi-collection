// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/**
 * @title Furio NFT
 * @author Steve Harmeyer
 * @notice This is the NFT needed to access downline bonuses.
 */
interface IFurNFT is IERC721 {
    /**
     * AddressBook contract.
     */
    function addressBook() external returns (address);

    /**
     * ERC20 contract for buys and sells.
     */
    function paymentToken() external returns (address);

    /**
     * Price.
     */
    function price() external returns (uint256);

    /**
     * Sales Tax.
     */
    function taxRate() external returns (uint256);

    /**
     * Buy an NFT.
     * @param quantity_ The amount of NFTs to purchase.
     * @notice Allows a user to buy NFTs.
     */
    function buy(uint256 quantity_) external;

    /**
     * Sell an NFT.
     * @param tokenId_ Id of the token.
     * @notice Allows a user to sell an NFT. They get back the original purchase
     * price minus a tax. Token is burnt.
     */
    function sell(uint256 tokenId_) external;

    /**
     * Total supply.
     * @return uint256
     * @notice returns the total amount of NFTs created.
     */
    function totalSupply() external returns (uint256);

    /**
     * Max supply.
     * @return uint256
     * @notice Returns the sum of the max supply for all generations.
     */
    function maxSupply() external returns (uint256);

    /**
     * Token URI.
     * @param tokenId_ The id of the token.
     * @notice This returns base64 encoded json for the token metadata. Allows us
     * to avoid putting metadata on IPFS.
     */
    function tokenURI(uint256 tokenId_) external returns (string memory);

    /**
     * -------------------------------------------------------------------------
     * OWNER FUNCTIONS
     * -------------------------------------------------------------------------
     */

    /**
     * Create a generation.
     * @param maxSupply_ The maximum NFT supply for this generation.
     * @param baseUri_ The metadata base URI for this generation.
     * @notice This method creates a new NFT generation.
     */
    function createGeneration(uint256 maxSupply_, string memory baseUri_) external;
}

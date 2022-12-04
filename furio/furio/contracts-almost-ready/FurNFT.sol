// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Pausable.sol";
// INTERFACES
import "./IFurAddressBook.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title Furio NFT
 * @author Steve Harmeyer
 * @notice This is the NFT needed to access downline bonuses.
 */
contract FurNFT is Ownable, Pausable, ERC721 {
    using Counters for Counters.Counter;

    /**
     * Token metadata.
     */
    string private _name = 'Furio NFT';
    string private _symbol = '$FURNFT';

    /**
     * AddressBook contract.
     */
    IFurAddressBook public addressBook;

    /**
     * ERC20 contract for buys and sells.
     */
    IERC20 public paymentToken;

    /**
     * Price.
     */
    uint256 public price = 5e16;

    /**
     * Sales Tax.
     */
    uint256 public taxRate = 10;

    /**
     * Generation struct.
     * @dev Data structure for generation info.
     * this allows us to increase the supply with new art and description.
     */
    struct Generation {
        uint256 maxSupply;
        string baseUri;
    }

    /**
     * Generation tracker.
     * @dev Keeps track of how many generations exist.
     */
    Counters.Counter private _generationTracker;

    /**
     * Mapping to store generation info.
     */
    mapping(uint256 => Generation) private _generations;

    /**
     * Mapping to store token generations.
     */
    mapping(uint256 => uint256) private _tokenGenerations;

    /**
     * Token id tracker.
     * @dev Keeps track of the current token id.
     */
    Counters.Counter private _tokenIdTracker;

    /**
     * Contract constructor.
     */
    constructor(address addressBook_) ERC721(_name, _symbol) {
        addressBook = IFurAddressBook(addressBook_);
        paymentToken = IERC20(addressBook.furToken());
    }

    /**
     * -------------------------------------------------------------------------
     * USER FUNCTIONS
     * -------------------------------------------------------------------------
     */

    /**
     * Buy an NFT.
     * @param quantity_ The amount of NFTs to purchase.
     * @notice Allows a user to buy NFTs.
     */
    function buy(uint256 quantity_) external isNotPaused {
        require(totalSupply() + quantity_ <= maxSupply(), "Not enough supply");
        require(paymentToken.transferFrom(msg.sender, address(this), quantity_ * price), "Payment failed");
        for(uint256 i = 1; i <= quantity_; i ++) {
            _tokenIdTracker.increment();
            _mint(msg.sender, _tokenIdTracker.current());
        }
    }

    /**
     * Sell an NFT.
     * @param tokenId_ Id of the token.
     * @notice Allows a user to sell an NFT. They get back the original purchase
     * price minus a tax. Token is burnt.
     */
    function sell(uint256 tokenId_) external isNotPaused {
        require(msg.sender == ERC721.ownerOf(tokenId_), "Sender does not own token");
        uint256 tax = price * taxRate / 100;
        paymentToken.approve(address(this), price - tax);
        require(paymentToken.transfer(address(msg.sender), price - tax), "Payment failed");
        // burn NFT
        _burn(tokenId_);
    }

    /**
     * Total supply.
     * @return uint256
     * @notice returns the total amount of NFTs created.
     */
    function totalSupply() public view returns (uint256)
    {
        return _tokenIdTracker.current();
    }

    /**
     * Max supply.
     * @return uint256
     * @notice Returns the sum of the max supply for all generations.
     */
    function maxSupply() public view returns (uint256)
    {
        uint256 _maxSupply;
        for(uint256 i = 1; i <= _generationTracker.current(); i++) {
            _maxSupply += _generations[i].maxSupply;
        }
        return _maxSupply;
    }

    /**
     * Token URI.
     * @param tokenId_ The id of the token.
     * @notice This returns base64 encoded json for the token metadata. Allows us
     * to avoid putting metadata on IPFS.
     */
    function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        require(_exists(tokenId_), "ERC721Metadata: URI query for nonexistent token");
        string memory baseURI = _generations[_tokenGenerations[tokenId_]].baseUri;
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId_)) : "";
    }

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
    function createGeneration(
        uint256 maxSupply_,
        string memory baseUri_
    ) public onlyOwner
    {
        _generationTracker.increment();
        _generations[_generationTracker.current()].maxSupply = maxSupply_;
        _generations[_generationTracker.current()].baseUri = baseUri_;
    }
}

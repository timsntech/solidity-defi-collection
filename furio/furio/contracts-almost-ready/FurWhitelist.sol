// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
// INTERFACES
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IFurAddressBook.sol";
import "./IFurToken.sol";
import "./IFurNFT.sol";
import "./IFurPool.sol";

/**
 * @title Furio Whitelist NFT
 * @author Steve Harmeyer
 * @notice This is the NFT needed to be on the whitelist. Purchasing this NFT
 * will get the user 500 $FUR tokens and 2 FurioNFTs for downline benefits.
 */
contract FurWhitelist is ERC721 {
    using Counters for Counters.Counter;

    /**
     * Token metadata.
     * @notice Name and symbol.
     */
    string private _name = 'Furio Whitelist NFT';
    string private _symbol = '$FURWL';

    /**
     * Address book contract.
     */
    IFurAddressBook public addressBook;

    /**
     * FurToken contract.
     */
    IFurToken public furToken;

    /**
     * FurNFT contract.
     */
    IFurNFT public furNFT;

    /**
     * FurPool contract.
     */
    IFurPool public furPool;

    /**
     * ERC20 contract for buys and sells.
     * @notice ERC20 token used to purchase this NFT.
     */
    IERC20 public paymentToken;

    /**
     * Price.
     * @notice Price is 250.
     */
    uint256 public price = 250e16;

    /**
     * Max supply.
     * @notice Max supply is 300.
     */
    uint256 public maxSupply = 300;

    /**
     * FurToken per NFT.
     * @notice How many $FUR you recieve when claiming.
     */
    uint256 public furTokenReceived = 500e16;

    /**
     * FurNFT per NFT.
     * @notice How many $FURNFT you receive when claiming.
     */
    uint256 public furNFTReceived = 2;

    /**
     * Image.
     * @notice SVG image of NFT.
     */
    string public image;

    /**
     * Purchased.
     * @notice Mapping to keep track of whether an address purchased or not.
     * @dev Do not use balanceOf for this because people can transfer the token
     * to another address and buy again. The mapping makes it so it's
     * only one per address.
     */
    mapping(address => bool) public purchased;

    /**
     * Token id tracker.
     * @dev Keeps track of the current token id.
     */
    Counters.Counter private _tokenIdTracker;

    /**
     * Contract constructor.
     * @dev Set the addresses for devWallets and paymentToken, then mint
     * ONE NFT per dev wallet.
     */
    constructor(address addressBook_) ERC721(_name, _symbol) {
        addressBook = IFurAddressBook(addressBook_);
        furToken = IFurToken(addressBook.furToken());
        furNFT = IFurNFT(addressBook.furNFT());
        furPool = IFurPool(addressBook.furPool());
        paymentToken = IERC20(addressBook.paymentToken());
        address[] memory _devWallets = addressBook.devWallets();
        for(uint i = 0; i < _devWallets.length; i ++) {
            mint(_devWallets[i]);
        }
    }

    /**
     * Buy an NFT.
     * @notice Allows a user to buy an NFT.
     */
    function buy() external {
        require(!purchased[msg.sender], "Address already purchased");
        require(totalSupply() < maxSupply, "Sold out");
        IERC20 _paymentToken_ = IERC20(addressBook.paymentToken());
        require(_paymentToken_.transferFrom(msg.sender, address(this), price), "Payment failed");
        mint(msg.sender);
    }

    /**
     * Claim.
     * Claim your NFT for your whitelist tokens.
     */
    function claim() external {
        require(balanceOf(msg.sender) > 0, "You do not have any NFTs to claim");
        IFurToken _furToken_ = IFurToken(addressBook.furToken());
        _furToken_.mint(msg.sender, furTokenReceived);
        IFurNFT _furNFT_ = IFurNFT(addressBook.furNFT());
        _furNFT_.mint(msg.sender, furNFTReceived);
        _burn(tokenOfOwnerByIndex(msg.sender, 0));
    }

    /**
     * Mint an NFT.
     * @dev Internal function to mint an NFT. This is separate from the buy()
     * method to allow the dev wallets to receive an NFT.
     */
    function mint(address to_) internal {
        _tokenIdTracker.increment();
        _mint(to_, _tokenIdTracker.current());
        purchased[to_] = true;
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
     * Find which tokens a user owns.
     */
    function tokenOfOwnerByIndex(address owner_, uint256 index_) public view returns(uint256) {
        require(index_ == 0, "Owner index out of bounds");
        for (uint256 i = 1; i <= _tokenIdTracker.current(); i ++) {
            if(ownerOf(i) == owner_) {
                return i;
            }
        }
        return 0;
    }

    /**
     * Token URI.
     * @param tokenId_ The id of the token.
     * @notice This returns base64 encoded json for the token metadata. Allows us
     * to avoid putting metadata on IPFS.
     */
    function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        return string(
            abi.encodePacked(
                'data:application/json;base64,',
                Base64.encode(
                    bytes(
                        abi.encodePacked(
                            '{"name":"',name(),' #',Strings.toString(tokenId_),
                            '","description":"This NFT is redeemable for 500 $FUR tokens and 2 $FURNFT tokens","image":"',
                            'data:image/svg+xml;base64,',
                            Base64.encode(bytes(image)),
                            '"}'
                        )
                    )
                )
            )
        );
    }
}

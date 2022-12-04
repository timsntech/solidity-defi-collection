// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Furio Address Book
 * @author Steve Harmeyer
 * @notice This contract stores the list of important addresses in
 * the Furio ecosystem.
 */
contract FurAddressBook is Ownable {
    /**
     * Dev wallets.
     * @dev Internal storage for dev wallets.
     */
    address[] internal _devWallets;

    /**
     * Payment token.
     * @notice Payment token address.
     */
    address public paymentToken;

    /**
     * FurAdmin.
     * @notice FurAdmin address.
     */
    address public furAdmin;

    /**
     * Fur NFT.
     * @notice FurNFT address.
     */
    address public furNFT;

    /**
     * FurPool.
     * @notice FurPool address.
     */
    address public furPool;

    /**
     * FurSwap.
     * @notice FurSwap address.
     */
    address public furSwap;

    /**
     * Fur token.
     * @notice $FUR token address.
     */
    address public furToken;

    /**
     * FurVault.
     * @notice FurVault address.
     */
    address public furVault;

    /**
     * FurWhitelist NFT.
     * @notice Whitelist NFT address.
     */
    address public furWhitelist;

    /**
     * Constructor.
     * @param furAdmin_ FurAdmin contract address.
     */
    constructor(address furAdmin_) {
        furAdmin = furAdmin_;
    }

    /**
     * Add dev wallet.
     * @notice Adds an address to the list of dev wallets.
     */
    function addDevWallet(address address_) external onlyOwner {
        require(!isDevWallet(address_), "Address already exists");
        _devWallets.push(address_);
    }

    /**
     * Dev wallets.
     * @notice List all dev wallets.
     */
    function devWallets() external view returns (address[] memory) {
        return _devWallets;
    }

    /**
     * Dev count.
     * @notice Returns the number of dev wallets.
     */
    function devCount() external view returns (uint256) {
        return _devWallets.length;
    }

    /**
     * Is dev wallet.
     * @notice Returns true if address is a dev wallet.
     */
    function isDevWallet(address address_) public view returns (bool) {
        bool exists = false;
        for(uint i = 0; i < _devWallets.length; i ++) {
            if(_devWallets[i] == address_) {
                exists = true;
            }
        }
        return exists;
    }

    /**
     * Set payment token.
     * @notice Sets the address for the payment token (USDC).
     */
    function setPaymentToken(address address_) external onlyOwner {
        require(paymentToken == address(0), "Payment token already set");
        paymentToken = address_;
    }

    /**
     * Set FurAdmin.
     * @notice Sets the address for FurAdmin.
     */
    function setFurAdmin(address address_) external onlyOwner {
        require(furAdmin == address(0), "FurAdmin already set");
        furAdmin = address_;
    }

    /**
     * Set Fur NFT.
     * @notice Sets the address for $FUR token.
     */
    function setFurNFT(address address_) external onlyOwner {
        require(furNFT == address(0), "FurNFT already set");
        furNFT = address_;
    }

    /**
     * Set FurPool.
     * @notice Sets the address for FurPool.
     */
    function setFurPool(address address_) external onlyOwner {
        require(furPool == address(0), "FurPool already set");
        furPool = address_;
    }

    /**
     * Set FurSwap.
     * @notice Sets the address for FurSwap.
     */
    function setFurSwap(address address_) external onlyOwner {
        require(furSwap == address(0), "FurSwap already set");
        furSwap = address_;
    }

    /**
     * Set Fur token.
     * @notice Sets the address for $FUR token.
     */
    function setFurToken(address address_) external onlyOwner {
        require(furToken == address(0), "Fur token already set");
        furToken = address_;
    }

    /**
     * Set FurVault.
     * @notice Sets the address for FurVault.
     */
    function setFurVault(address address_) external onlyOwner {
        require(furVault == address(0), "FurVault already set");
        furVault = address_;
    }

    /**
     * Set FurWhitelist.
     * @notice Sets the address for Whitelist.
     */
    function setFurWhitelist(address address_) external onlyOwner {
        require(furWhitelist == address(0), "FurWhitelist already set");
        furWhitelist = address_;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Furio Address Book Interface
 * @author Steve Harmeyer
 * @notice This contract stores the list of important addresses in
 * the Furio ecosystem.
 */
interface IFurAddressBook {

    /**
     * Payment token.
     * @notice Payment token address.
     */
    function paymentToken() external view returns (address);

    /**
     * FurAdmin.
     * @notice FurAdmin address.
     */
    function furAdmin() external view returns (address);

    /**
     * Fur NFT.
     * @notice FurNFT address.
     */
    function furNFT() external view returns (address);

    /**
     * FurPool.
     * @notice FurPool address.
     */
    function furPool() external view returns (address);

    /**
     * FurSwap.
     * @notice FurSwap address.
     */
    function furSwap() external view returns (address);

    /**
     * Fur token.
     * @notice $FUR token address.
     */
    function furToken() external view returns (address);

    /**
     * FurVault.
     * @notice FurVault address.
     */
    function furVault() external view returns (address);

    /**
     * Whitelist.
     * @notice Whitelist NFT address.
     */
    function furWhitelist() external view returns (address);

    /**
     * Add dev wallet.
     * @notice Adds an address to the list of dev wallets.
     */
    function addDevWallet(address address_) external;

    /**
     * Dev wallets.
     * @notice List all dev wallets.
     */
    function devWallets() external view returns (address[] memory);

    /**
     * Dev count.
     * @notice Returns the number of dev wallets.
     */
    function devCount() external view returns (uint256);

    /**
     * Is dev wallet.
     * @notice Returns true if address is a dev wallet.
     */
    function isDevWallet(address address_) external view returns (bool);

    /**
     * Set payment token.
     * @notice Sets the address for the payment token (USDC).
     */
    function setPaymentToken(address address_) external;

    /**
     * Set FurAdmin.
     * @notice Sets the address for FurAdmin.
     */
    function setFurAdmin(address address_) external;

    /**
     * Set Fur NFT.
     * @notice Sets the address for FurNFT.
     */
    function setFurNFT(address address_) external;

    /**
     * Set FurPool.
     * @notice Sets the address for FurPool.
     */
    function setFurPool(address address_) external;

    /**
     * Set FurSwap.
     * @notice Sets the address for FurSwap.
     */
    function setFurSwap(address address_) external;

    /**
     * Set Fur token.
     * @notice Sets the address for FurToken.
     */
    function setFurToken(address address_) external;

    /**
     * Set FurVault.
     * @notice Sets the address for FurVault.
     */
    function setFurVault(address address_) external;

    /**
     * Set Whitelist.
     * @notice Sets the address for FurWhitelist.
     */
    function setFurWhitelist(address address_) external;
}

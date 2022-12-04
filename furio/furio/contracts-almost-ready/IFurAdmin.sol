// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/IAccessControlEnumerable.sol";

interface IFurAdmin is IAccessControlEnumerable {
    /**
     * Address book.
     */
    function addressBook() external returns (address);

    /**
     * -------------------------------------------------------------------------
     * FURADDRESSBOOK METHODS
     * -------------------------------------------------------------------------
     */

    /**
     * Set address book.
     * @notice Set the address book address.
     */
    function setAddressBook(address address_) external;

    /**
     * Add dev wallet.
     * @notice Adds an address to the list of dev wallets.
     */
    function addressBookAddDevWallet(address address_) external;

    /**
     * Set payment token.
     * @notice Sets the address for the payment token (USDC).
     */
    function addressBookSetPaymentToken(address address_) external;

    /**
     * Set FurNFT.
     * @notice Sets the address for FurNFT.
     */
    function addressBookSetFurNFT(address address_) external;

    /**
     * Set FurPool.
     * @notice Sets the address for FurPool.
     */
    function addressBookSetFurPool(address address_) external;

    /**
     * Set FurSwap.
     * @notice Sets the address for FurSwap.
     */
    function addressBookSetFurSwap(address address_) external;

    /**
     * Set Fur token.
     * @notice Sets the address for FurToken.
     */
    function addressBookSetFurToken(address address_) external;

    /**
     * Set FurVault.
     * @notice Sets the address for FurVault.
     */
    function addressBookSetFurVault(address address_) external;

    /**
     * Set Whitelist.
     * @notice Sets the address for FurWhitelist.
     */
    function addressBookSetFurWhitelist(address address_) external;
}

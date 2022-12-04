// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
// INTERFACES
import "./IFurAddressBook.sol";

contract FurAdmin is AccessControlEnumerable {
    /**
     * Address book.
     */
    IFurAddressBook public addressBook;

    /**
     * Constructor.
     */
    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /**
     * Set address book.
     * @notice Set the address book address.
     */
    function setAddressBook(address address_) external admin {
        addressBook = IFurAddressBook(address_);
    }

    /**
     * -------------------------------------------------------------------------
     * FURADDRESSBOOK METHODS
     * -------------------------------------------------------------------------
     */

    /**
     * Add dev wallet.
     * @notice Adds an address to the list of dev wallets.
     */
    function addressBookAddDevWallet(address address_) external admin {
        addressBook.addDevWallet(address_);
    }

    /**
     * Set payment token.
     * @notice Sets the address for the payment token (USDC).
     */
    function addressBookSetPaymentToken(address address_) external admin {
        addressBook.setPaymentToken(address_);
    }

    /**
     * Set FurNFT.
     * @notice Sets the address for FurNFT.
     */
    function addressBookSetFurNFT(address address_) external admin {
        addressBook.setFurNFT(address_);
    }

    /**
     * Set FurPool.
     * @notice Sets the address for FurPool.
     */
    function addressBookSetFurPool(address address_) external admin {
        addressBook.setFurPool(address_);
    }

    /**
     * Set FurSwap.
     * @notice Sets the address for FurSwap.
     */
    function addressBookSetFurSwap(address address_) external admin {
        addressBook.setFurSwap(address_);
    }

    /**
     * Set Fur token.
     * @notice Sets the address for FurToken.
     */
    function addressBookSetFurToken(address address_) external admin {
        addressBook.setFurToken(address_);
    }

    /**
     * Set FurVault.
     * @notice Sets the address for FurVault.
     */
    function addressBookSetFurVault(address address_) external admin {
        addressBook.setFurVault(address_);
    }

    /**
     * Set Whitelist.
     * @notice Sets the address for FurWhitelist.
     */
    function addressBookSetFurWhitelist(address address_) external admin {
        addressBook.setFurWhitelist(address_);
    }

    /**
     * -------------------------------------------------------------------------
     * MODIFIERS
     * -------------------------------------------------------------------------
     */

    /**
     * Admin modifier.
     * @notice Requires caller to be admin.
     */
    modifier admin() {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Unauthorized");
        _;
    }
}

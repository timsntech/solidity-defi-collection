// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/**
 * @title BaseContract
 * @notice This is an abstract base contract to handle UUPS upgrades and pausing.
 */

abstract contract BaseContract is Initializable, PausableUpgradeable, OwnableUpgradeable, UUPSUpgradeable{
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() { _disableInitializers(); }

    /**
     * Contract initializer.
     * @dev This intializes all the parent contracts.
     */
    function __BaseContract_init() internal onlyInitializing {
        __Pausable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    /**
     * Pause contract.
     * @dev This stops all operations with the contract.
     */
    function pause() external onlyOwner
    {
        _pause();
    }

    /**
     * Unpause contract.
     * @dev This resumes all operations with the contract.
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev This prevents upgrades from anyone but owner.
     */
    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Pausable
 * @author Steve Harmeyer
 * @notice Utility contract to allow pausing and unpausing of contracts.
 */
contract Pausable is Ownable {
    /**
     * Paused.
     * @notice Returns true if contract is paused. All contracts by default
     * are paused until they are unpaused.
     */
    bool public paused = true;

    /**
     * Unpause.
     * @notice Unpauses a contract.
     */
    function unpause() external onlyOwner {
        paused = false;
    }

    /**
     * Pause.
     * @notice Pauses a contract.
     */
    function pause() external onlyOwner {
        paused = true;
    }

    /**
     * isNotPaused modifier.
     * @notice doesn't allow an action if the contract is paused.
     */
    modifier isNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IFurToken is IERC20 {
    /**
     * Address book contract.
     */
    function IFurAddressBook() external returns (address);

    /**
     * Players.
     */
    function players() external returns (uint256);

    /**
     * Total transactions.
     */
    function totalTransactions() external returns (uint256);

    /**
     * Minting finished.
     */
    function mintingFinished() external returns (bool);

    /**
     * Target supply.
     */
    function targetSupply() external returns (uint256);

    /**
     * Minted supply.
     */
    function mintedSupply() external returns (uint256);

    /**
     * Taxe rate.
     */
    function taxRate() external returns (uint256);

    /**
     * Return player stats.
     */
    function statsOf(address player_) external view returns (uint256, uint256, uint256);

    /**
     * -------------------------------------------------------------------------
     * PROTECTED FUNCTIONS
     * -------------------------------------------------------------------------
     */

    /**
     * Mint.
     */
    function mint(address to_, uint256 amount_) external;

    /**
     * Burn.
     */
    function burn(address from_, uint256 amount_) external;
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Pausable.sol";
// INTERFACES
import "./IFurAddressBook.sol";

contract FurToken is Ownable, Pausable, ERC20 {
    /**
     * Token metadata.
     */
    string private _name = 'Furio Token';
    string private _symbol = '$FUR';

    /**
     * Address book contract.
     */
    IFurAddressBook public addressBook;

    /**
     * Stats.
     */
    struct Stats {
        uint256 transactions;
        uint256 minted;
    }
    mapping(address => Stats) private stats;
    uint256 public players;
    uint256 public totalTransactions;

    /**
     * Minting.
     */
    bool public mintingFinished = false;
    uint256 public targetSupply = 2**256 - 1;
    uint256 public mintedSupply;
    event Mint(address indexed to, uint256 amount);
    event MintFinished();

    /**
     * Taxes.
     */
    uint256 public burnTax = 2;
    uint256 public liquidityTax = 3;
    uint256 public vaultTax = 4;
    uint256 public devTax = 1;
    event TaxPayed(address from, address vault, uint256 amount);

    /**
     * Contract constructor.
     */
    constructor(address addressBook_) ERC20(_name, _symbol) {
        addressBook = IFurAddressBook(addressBook_);
    }

    /**
     * -------------------------------------------------------------------------
     * USER FUNCTIONS
     * -------------------------------------------------------------------------
     */

    /**
     * Transfer tokens from one account to another
     */
    function transferFrom(address from_, address to_, uint256 amount_) public override isNotPaused returns (bool) {
        uint256 taxes = amount_ * taxRate() / 100;
        uint256 adjustedAmount = amount_ - taxes;
        require(super.transferFrom(from_, address(this), taxes), 'Unable to pay taxes');
        emit TaxPayed(from_, address(this), taxes);
        require(super.transferFrom(from_, to_, adjustedAmount), 'Unable to transfer');
        updateStats(from_);
        updateStats(to_);
        totalTransactions ++;
        return true;
    }

    /**
     * Transfer.
     */
    function transfer(address to_, uint256 amount_) public override isNotPaused returns (bool) {
        return transferFrom(msg.sender, to_, amount_);
    }

    /**
     * Return player stats.
     */
    function statsOf(address player_) public view returns (uint256, uint256, uint256) {
        return (balanceOf(player_), stats[player_].transactions, stats[player_].minted);
    }

    /**
     * Effective tax rate.
     */
    function taxRate() public view returns (uint256) {
        uint256 _taxRate_ = burnTax + liquidityTax + vaultTax + devTax;
        return _taxRate_;
    }

    /**
     * -------------------------------------------------------------------------
     * PROTECTED FUNCTIONS
     * -------------------------------------------------------------------------
     */
    function mint(address to_, uint256 amount_) external isNotPaused {
        require(msg.sender == owner() || msg.sender == addressBook.furVault() || msg.sender == addressBook.furWhitelist(), "Unauthorized");
        require(!mintingFinished, "Minting is finished");
        require(amount_ > 0 && mintedSupply + amount_ <= targetSupply, "Incorrect amount");
        super._mint(to_, amount_);
        emit Mint(to_, amount_);
        mintedSupply += amount_;
        if(mintedSupply == targetSupply) {
            mintingFinished = true;
            emit MintFinished();
        }
        updateStats(to_);
        stats[to_].minted += amount_;
        totalTransactions ++;
    }

    function burn(address from_, uint256 amount_) external isNotPaused {
        require(msg.sender == addressBook.furVault(), "Unauthorized");
        super._burn(from_, amount_);
    }

    /**
     * -------------------------------------------------------------------------
     * INTERNAL FUNCTIONS
     * -------------------------------------------------------------------------
     */

    /**
     * Update stats.
     */
    function updateStats(address player_) internal {
        if(stats[player_].transactions == 0) {
            players ++;
        }
        stats[player_].transactions ++;
    }
}

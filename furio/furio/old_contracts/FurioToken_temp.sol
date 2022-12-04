// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract FurioToken is ERC20PresetMinterPauser {
    /**
     * Token metadata.
     */
    string private _name = 'Furio Token';
    string private _symbol = 'FUR';

    /**
     * Stats.
     */
    struct Stats {
        uint256 txs;
        uint256 minted;
    }
    mapping(address => Stats) private stats;
    uint256 public players;
    uint256 public totalTxs;

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
    uint256 public taxRate = 10; // 10% tax on transfers
    event TaxPayed(address from, address vault, uint256 amount);

    /**
     * Buddies.
     */
    mapping(address => address) public buddies;
    event onUpdateBuddy(address indexed player, address indexed buddy);


    /**
     * Constructor.
     */
    constructor() ERC20PresetMinterPauser(_name, _symbol) {}

    /**
     * Override parent mint function to emit Mint event.
     */
    function mint(address to, uint256 amount) public override mintingActive {
        require(amount > 0 && mintedSupply + amount <= targetSupply, "Incorrect amount");
        super.mint(to, amount);
        emit Mint(to, amount);
        mintedSupply += amount;
        if(mintedSupply == targetSupply) {
            mintingFinished = true;
            emit MintFinished();
        }
        updateStats(to);
        stats[to].minted += amount;
    }

    /**
     * Transfer tokens from one account to another
     */
    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        uint256 taxes = amount * taxRate / 100;
        uint256 adjustedAmount = amount - taxes;
        require(super.transferFrom(from, address(this), taxes), 'Unable to pay taxes');
        emit TaxPayed(from, address(this), taxes);
        require(super.transferFrom(from, to, adjustedAmount), 'Unable to transfer');
        updateStats(from);
        updateStats(to);

        return true;
    }

    /**
     * Transfer.
     */
    function transfer(address to, uint256 amount) public override returns (bool) {
        return transferFrom(_msgSender(), to, amount);
    }

    /**
     * Return player stats.
     */
    function statsOf(address player) public view returns (uint256, uint256, uint256) {
        return (balanceOf(player), stats[player].txs, stats[player].minted);
    }

    /**
     * Update stats.
     */
    function updateStats(address _address) internal {
        if(stats[_address].txs == 0) {
            players ++;
        }
        stats[_address].txs ++;
        totalTxs ++;
    }

    /**
     * Update buddy.
     */
    function updateBuddy(address buddy) public {
        buddies[msg.sender] = buddy;
        emit onUpdateBuddy(msg.sender, buddy);
    }

    /**
     * Minting active modifier.
     */
    modifier mintingActive() {
        require(!mintingFinished, "Minting is finished");
        _;
    }
}

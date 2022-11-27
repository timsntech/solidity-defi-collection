// SPDX-License-Identifier: MIT

/** Official Links

Website: AgeOfEmperors.com
Telegram: t.me/ageofemperors_chat
Guide: AgeOfEmperors.com/WP.pdf

Age of Emperors is the first ever strategic P2E game on the Binance Smart Chain Inspired by the world famous PC game: Age of Empires II ©.
Players will build and upgrade the defenses of their own Empire while fighting off an endless onslaught of their empire's enemies.
With each horde of enemies defeated, they will drop loot in the form of gold.

**/

pragma solidity ^0.8.7;
pragma experimental ABIEncoderV2;
import "./IERC20.sol";

contract AgeOfEmperors {
    struct Tower {
        uint256 crystals;
        uint256 money;
        uint256 money2;
        uint256 yield;
        uint256 timestamp;
        uint256 hrs;
        address ref;
        uint256 refs;
        uint256 refDeps;
        uint8   treasury;
        uint8   market;
        uint8[5] chefs;
        bool[5] bounties;
        bool king;
    }

    struct Stable {
        uint256 stableBounty;
        uint256 stableTimestamp;
        uint256 stableHrs;
        uint8   stable;
    }

    mapping(address => Tower) public towers;
    mapping(address => Stable) public stables;

    uint256 public totalChefs;
    uint256 public totalTowers;
    uint256 public totalKings;
    uint256 public totalInvested;
    address public manager;

    IERC20 constant BUSD_TOKEN = IERC20(0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56);

    uint256 immutable public denominator = 10;
    bool public init;

    modifier initialized {
      require(init, 'Not initialized');
      _;
    }

    constructor(address manager_) {
       manager = manager_;
    }


    function initialize() external {
      require(manager == msg.sender);
      require(!init);
      init = true;
    }

    function addCrystals(address ref, uint256 value) initialized external {
        uint256 crystals = value / 2e17;
        require(crystals > 0, "Zero stone");
        address user = msg.sender;
        totalInvested += value;
        if (towers[user].timestamp == 0) {
            totalTowers++;
            ref = towers[ref].timestamp == 0 ? manager : ref;
            towers[ref].refs++;
            towers[user].ref = ref;
            towers[user].timestamp = block.timestamp;
            towers[user].treasury = 0;
            towers[user].market = 0;
        }
        ref = towers[user].ref;
        uint8 marketId = towers[ref].market;
        (,uint256 refCrystal, uint256 refGold) = getMarket(marketId);

        towers[ref].crystals += (crystals * refCrystal) / 100;
        towers[ref].money += (crystals * 100 * refGold) / 100;
        towers[ref].refDeps += crystals;
        towers[user].crystals += crystals;
        towers[manager].crystals += (crystals * 5) / 100;

        uint256 valueToManager = (value * 3) / 100;
        BUSD_TOKEN.transferFrom(msg.sender, manager, valueToManager);
        BUSD_TOKEN.transferFrom(msg.sender, address(this), value - valueToManager);
    }

    function withdrawMoney(uint256 gold) initialized external {
        address user = msg.sender;
        require(gold <= towers[user].money && gold > 0);
        towers[user].money -= gold;
        uint256 amount = gold * 2e15;
        BUSD_TOKEN.transfer(user, BUSD_TOKEN.balanceOf(address(this)) < amount ? BUSD_TOKEN.balanceOf(address(this)) : amount);
    }

    function kingBounty() initialized external {
        address user = msg.sender;
        require(towers[user].king == false, "Alread Claimed");
        require(towers[user].chefs[4] == 6 && towers[user].treasury == 4 && towers[user].market == 2 && stables[user].stable == 3, "All building must be max level");
        syncTower(user);
        towers[user].money += 1000000;
        towers[user].king = true;
        totalKings += 1;
    }

    function collectMoney() public {
        address user = msg.sender;
        syncTower(user);
        towers[user].hrs = 0;
        towers[user].money += towers[user].money2;
        towers[user].money2 = 0;
    }
    
    function collectStableBounty() public {
        address user = msg.sender;
        syncStable(user);
        stables[user].stableHrs = 0;
        towers[user].money += stables[user].stableBounty;
        stables[user].stableBounty = 0;
    }

    function claimAirdrop(uint256 towerId) initialized external {
        address user = msg.sender;
        syncTower(user);
        require(towers[user].chefs[towerId] == 6, "Not Max Level");
        require(towers[user].bounties[towerId] == false, "Already Claimed");
        uint256 bounty = getBounty(towerId);
        towers[user].money += bounty;
        towers[user].bounties[towerId] = true;
    }

    function upgradeTower(uint256 towerId) initialized external {
        require(towerId < 5, "Max 5 towers");
        address user = msg.sender;
        if (towerId > 0) {
            require(towers[user].chefs[towerId-1] == 6, "Prev Tower not upgraded");
        }

        syncTower(user);
        towers[user].chefs[towerId]++;
        totalChefs++;
        uint256 chefs = towers[user].chefs[towerId];
        towers[user].crystals -= getUpgradePrice(towerId, chefs) / denominator;
        towers[user].yield += getYield(towerId, chefs);
    }

    function upgradeTowerMax(uint256 towerId) initialized external {
        require(towerId < 5, "Max 5 towers");
        address user = msg.sender;
        if (towerId > 0) {
            require(towers[user].chefs[towerId-1] == 6, "Prev Tower not upgraded");
        }

        syncTower(user);

        for (uint8 i = towers[user].chefs[towerId]; i < 6; i++) {
            towers[user].chefs[towerId]++;
            totalChefs++;
            uint256 chefs = towers[user].chefs[towerId];
            towers[user].crystals -= getUpgradePrice(towerId, chefs) / denominator;
            towers[user].yield += getYield(towerId, chefs);
        }
    }

    function upgradeTowncenter() initialized external {
      address user = msg.sender;
      require(towers[user].chefs[0] == 6, "Tower-1 should be Max Level");
      uint8 treasuryId = towers[user].treasury + 1;
      syncTower(user);
      require(treasuryId < 5, "Max 5 treasury");
      (uint256 price,) = getTreasure(treasuryId);
      towers[user].crystals -= price / denominator; 
      towers[user].treasury = treasuryId;
    }

    function upgradeMarket() initialized external {
      address user = msg.sender;
      require(towers[user].chefs[1] == 6, "Tower-2 should be Max Level");
      uint8 marketId = towers[user].market + 1;
      require(marketId < 3, "Max 2 market");
      (uint256 price,,) = getMarket(marketId);
      towers[user].crystals -= price / denominator; 
      towers[user].market = marketId;
    }

    function upgradeStable() initialized external {
      address user = msg.sender;
      uint8 stableId = stables[user].stable + 1;
      require(stableId < 4, "Max 3 stable");
      (uint256 price,, uint256 towerId) = getStable(stableId);
      require(towers[user].chefs[towerId] == 6, "Tower should be Max Level");
      
      towers[user].crystals -= price / denominator; 
      stables[user].stable = stableId;
      stables[user].stableTimestamp = block.timestamp;
    }

    function compound() initialized external {
        address user = msg.sender;
        syncTower(user);
        towers[user].crystals += towers[user].money / 100;
        towers[user].money = 0;
    }

    function getChefs(address addr) external view returns (uint8[5] memory) {
        return towers[addr].chefs;
    }
    
    function getBounties(address addr) external view returns (bool[5] memory) {
        return towers[addr].bounties;
    }

    function syncTower(address user) internal {
        require(towers[user].timestamp > 0, "User is not registered");
        if (towers[user].yield > 0) {
            (, uint256 treasury) = getTreasure(towers[user].treasury);
            uint256 hrs = block.timestamp / 3600 - towers[user].timestamp / 3600;
            if (hrs + towers[user].hrs > treasury) {
                hrs = treasury - towers[user].hrs;
            }
            towers[user].money2 += hrs * towers[user].yield;
            towers[user].hrs += hrs;
        }
        towers[user].timestamp = block.timestamp;
    }

    function syncStable(address user) internal {
        require(stables[user].stableTimestamp > 0, "User Stable is not registered");
        uint8 stableId = stables[user].stable;
        (,uint256 bounty,) = getStable(stableId);

        if (bounty > 0) {
            uint256 hrs = block.timestamp / 3600 - stables[user].stableTimestamp / 3600;
            if (hrs + stables[user].stableHrs > 24) {
                hrs = 24 - stables[user].stableHrs;
            }
            stables[user].stableBounty = (hrs + stables[user].stableHrs) / 24 * bounty;
            stables[user].stableHrs += hrs;
        }
        stables[user].stableTimestamp = block.timestamp;
    }

    function getUpgradePrice(uint256 towerId, uint256 chefId) internal pure returns (uint256) {
        if (chefId == 1) return [600, 3190, 14950, 52500, 150000][towerId];
        if (chefId == 2) return [945, 4025, 20000, 62500, 180000][towerId];
        if (chefId == 3) return [1165, 5900, 27500, 74000, 207500][towerId];
        if (chefId == 4) return [1725, 7600, 37500, 81000, 235000][towerId];
        if (chefId == 5) return [2150, 8350, 41000, 97500, 250000][towerId];
        if (chefId == 6) return [2340, 9050, 47400, 115000, 275000][towerId];
        revert("Incorrect chefId");
    }

    function getYield(uint256 towerId, uint256 chefId) internal pure returns (uint256) {
        if (chefId == 1) return [5, 29, 147, 555, 1700][towerId];
        if (chefId == 2) return [8, 37, 199, 670, 2060][towerId];
        if (chefId == 3) return [10, 55, 277, 802, 2400][towerId];
        if (chefId == 4) return [15, 72, 383, 889, 2750][towerId];
        if (chefId == 5) return [19, 80, 424, 1080, 3070][towerId];
        if (chefId == 6) return [21, 88, 495, 1290, 3440][towerId];
        revert("Incorrect chefId");
    }

    function getTreasure(uint256 treasureId) internal pure returns (uint256, uint256) {
      if(treasureId == 0) return (0, 24); // price | hours
      if(treasureId == 1) return (2000, 36);
      if(treasureId == 2) return (2500, 48);
      if(treasureId == 3) return (3000, 60);
      if(treasureId == 4) return (4000, 72);
      revert("Incorrect treasureId");
    }

    function getMarket(uint256 marketId) internal pure returns (uint256, uint256, uint256) {
      if(marketId == 0) return (0, 4, 2); // price | crystal Ref |  gold Ref
      if(marketId == 1) return (2000, 6, 3);
      if(marketId == 2) return (4000, 8, 4);
      revert("Incorrect marketId");
    }

    function getBounty(uint256 towerId) internal pure returns (uint256) {
        return [2500, 9500, 50000, 125000, 350000][towerId];
    }

    function getStable(uint256 stableId) internal pure returns (uint256, uint256, uint256 ) {
        if(stableId == 0) return (0, 0, 0); // price | gold bounty per 24hrs | tower id to max
        if(stableId == 1) return (50000, 25000, 2);
        if(stableId == 2) return (75000, 93750, 3);
        if(stableId == 3) return (100000, 225000, 4);
        revert("Incorrect stableId");
    }
}

const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

async function main() {
    const stakingPoolAddress = "0x5727EAcF739397cC7c29D0B5BDD5a8070E0c25Df";
    const StakingPoolV1 = await ethers.getContractFactory("StakingPoolV1");
    await upgrades.upgradeProxy(stakingPoolAddress, StakingPoolV1);
    console.log("StakingPool contract upgraded", stakingPoolAddress);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

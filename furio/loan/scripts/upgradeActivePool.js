const { ethers, upgrades } = require("hardhat");

async function main() {
    const activePoolAddress = "0x000000000000activePool000000";
    const ActivePoolV1 = await ethers.getContractFactory("ActivePoolV1");
    await upgrades.upgradeProxy(activePoolAddress, ActivePoolV1);
    console.log("ActivePool contract upgraded", activePoolAddress);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

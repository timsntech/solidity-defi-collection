const { ethers, upgrades } = require("hardhat");

async function main() {
    const ActivePool = await ethers.getContractFactory("ActivePool");
    const activePool = await upgrades.deployProxy(ActivePool);
    await activePool.deployed();
    console.log("ActivePool proxy deployed to:", activePool.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

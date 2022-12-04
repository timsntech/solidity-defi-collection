const { ethers } = require("hardhat");
const hre = require("hardhat");


async function main() {
    const [deployer] = await hre.ethers.getSigners();
    // deploy USDC
    USDC = await ethers.getContractFactory("MockUSDC");
    usdc = await USDC.deploy();
    console.log("USDC deployed to", usdc.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

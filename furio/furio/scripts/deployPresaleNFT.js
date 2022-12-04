const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    // deploy Token
    PresaleNFT = await ethers.getContractFactory("PresaleNFT");
    presalenft = await PresaleNFT.deploy();
    console.log("Presale NFT deployed to", presalenft.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

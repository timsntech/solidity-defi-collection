const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

async function main() {
    const fFStrategyFurioFinanceAddress = "0x7055a58B1FF2E35D299EEB2b19568a39bde3D13d";
    const FFStrategyFurioFinanceV1 = await ethers.getContractFactory("FFStrategyFurioFinanceV1");
    await upgrades.upgradeProxy(fFStrategyFurioFinanceAddress, FFStrategyFurioFinanceV1);
    console.log("FFStrategyFurioFinance contract upgraded", fFStrategyFurioFinanceAddress);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

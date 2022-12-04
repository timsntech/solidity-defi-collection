const { ethers } = require("hardhat");
const hre = require("hardhat");


async function deployToken() {
    const [deployer] = await hre.ethers.getSigners();
    // deploy USDC
    USDC = await ethers.getContractFactory("MockUSDC");
    usdc = await USDC.deploy();
    await usdc.mint(deployer.address, "10000000000000000000");
    console.log("USDC deployed to", usdc.address);
    // deploy Token
    Token = await ethers.getContractFactory("Token");
    token = await Token.deploy();
    await token.mint(deployer.address, "10000000000000000000");
    console.log("Token deployed to", token.address);
    // add pool
    Factory = await ethers.getContractFactory("UniswapV2Factory");
    factory = await Factory.attach("0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac");
    await factory.createPair(usdc.address, token.address);
    Router = await ethers.getContractFactory("UniswapV2Router02");
    router = await Router.attach("0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F");
    await router.addLiquidity(usdc.address, token.address, "10000000000000000000", "10000000000000000000", "10000000000000000000", "10000000000000000000", deployer.address, new Date().getTime() + 600);
}

deployToken()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

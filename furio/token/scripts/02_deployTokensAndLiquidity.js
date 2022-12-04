const Contract = require("./utils/Contract");
require("dotenv").config();
const addressbook = process.env.ADDRESS_BOOK || '';

const main = async () => {
    const contract = new Contract(addressbook);
    // Deploy Token
    const token = await contract.deploy("Token", "token");
    // Upgrade Token
    await contract.upgrade("TokenV1", "token");
    console.log("Token deployed to", token.address);
    // Deploy USDC
    const usdc = await contract.deploy("FakeToken", "payment", ["USD Coin", "USDC"]);
    // Deploy Pool
    const pool = await contract.deploy("Pool", "pool");
    console.log("Pool deployed to", pool.address);
    // Mint USDC to Pool
    let tx = await usdc.mintTo(pool.address, 1000000);
    await tx.wait();
    // Deploy Liquidity
    tx = await pool.createLiquidity();
    await tx.wait();
    console.log("USDC deployed to", usdc.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

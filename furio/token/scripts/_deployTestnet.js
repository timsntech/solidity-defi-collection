const hre = require("hardhat");
const Contract = require("./utils/Contract");
require("dotenv").config();
const router = process.env.ROUTER || '';
const factory = process.env.FACTORY || '';
const safe = process.env.SAFE || '';

const main = async () => {
    console.log("ROUTER_ADDRESS=" + router);
    console.log("FACTORY_ADDRESS" + factory);
    console.log("SAFE_ADDRESS=" + safe);
    let contract = new Contract();
    // Deploy AddressBook
    const addressbook = await contract.deploy("AddressBook");
    console.log("ADDRESSBOOK_ADDRESS=" + addressbook.address);
    // Set addresses
    let tx = await addressbook.set("router", router);
    await tx.wait();
    tx = await addressbook.set("factory", factory);
    await tx.wait();
    tx = await addressbook.set("router", router);
    await tx.wait();
    tx = await addressbook.set("safe", safe);
    await tx.wait();
    tx = await addressbook.set("lpLockReceiver", safe);
    await tx.wait();
    // Re instantiate contract with new addressbook
    contract = new Contract(addressbook.address);
    // Deploy Token
    await contract.deploy("Token", "token");
    const token = await contract.upgrade("TokenV1", "token");
    console.log("TOKEN_ADDRESS=" + token.address);
    // Deploy USDC
    const usdc = await contract.deploy("FakeToken", "payment", ["USD Coin", "USDC"]);
    console.log("PAYMENT_ADDRESS=" + usdc.address);
    // Deploy Pool
    const pool = await contract.deploy("Pool", "pool");
    console.log("POOL_ADDRESS=" + pool.address);
    // Deploy Swap
    const swap = await contract.deploy("SwapV2", "swap");
    console.log("SWAP_ADDRESS=" + swap.address);
    // Deploy Vault
    const vault = await contract.deploy("Vault", "vault");
    console.log("VAULT_ADDRESS=" + vault.address);
    // Deploy Downline
    const downline = await contract.deploy("Downline", "downline");
    console.log("DOWNLINE_ADDRESS=" + downline.address);
    // Deploy AutoCompound
    const autocompound = await contract.deploy("AutoCompoundV2", "autocompound");
    console.log("AUTOCOMPOUND_ADDRESS=" + autocompound.address);
    // Deploy FurBetToken
    const furbettoken = await contract.deploy("FurBetToken", "furbettoken");
    console.log("FURBTOKEN_ADDRESS=" + furbettoken.address);
    // Deploy FurBetPresale
    const furbetpresale = await contract.deploy("FurBetPresale", "furbetpresale");
    console.log("FURBPRESALE_ADDRESS=" + furbetpresale.address);
    // Deploy FurBetStake
    const furbetstake = await contract.deploy("FurBetStake", "furbetstake");
    console.log("FURBSTAKE_ADDRESS=" + furbetstake.address);
    // Deploy AddLiquidity
    const addliquidity = await contract.deploy("AddLiquidity", "addLiquidity");
    console.log("ADDLIQUIDITY_ADDRESS=" + addliquidity.address);
    // Deploy LPStaking
    const lpstaking = await contract.deploy("LPStakingV1", "lpStaking");
    console.log("LPSTAKING_ADDRESS=" + lpstaking.address);
    // Deploy TaxHandler
    const taxhandler = await contract.deploy("TaxHandler", "taxHandler");
    console.log("TAXHANDLER_ADDRESS=" + taxhandler.address);
    // Deploy FurBot
    const furbot = await contract.deploy("FurBot", "furbot");
    console.log("FURBOT_ADDRESS=" + furbot.address);
    // Deploy LMD
    //const lmd = await contract.deploy("LMD", "liquidityManager", [router, usdc.address]);
    //console.log("LMD_ADDRESS=" + lmd.address);
    // Update token addresses
    console.log("Setting up token");
    tx = await token.setup();
    await tx.wait();
    // Update swap addresses
    console.log("Setting up swap");
    tx = await swap.setup();
    await tx.wait();
    // Setup tax handler
    console.log("Setting up tax handler");
    tx = await taxhandler.setup();
    await tx.wait();
    // Mint USDC to Pool
    console.log("minting USDC to pool");
    tx = await usdc.mintTo(pool.address, 1000000);
    await tx.wait();
    // Deploy Liquidity
    console.log("creating liquidity");
    tx = await pool.createLiquidity();
    await tx.wait();
    // DONE!
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

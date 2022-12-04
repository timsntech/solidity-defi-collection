const { ethers, upgrades } = require("hardhat");
require("dotenv").config();
const addressBook = process.env.ADDRESS_BOOK || '';
const router = process.env.ROUTER || '';

const Contract = require("./utils/Contract");
async function main() {
    let contract = new Contract(addressBook);
    const AddressBook = await ethers.getContractFactory("AddressBook");
    const addressbook = AddressBook.attach(addressBook);
    const usdc = await addressbook.get("payment");
    const lmd = await contract.deploy("LMD", "liquidityManager", [router, usdc]);
    console.log("LMD proxy deployed to:", lmd.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

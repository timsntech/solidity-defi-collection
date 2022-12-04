const { ethers, upgrades } = require("hardhat");
require("dotenv").config();
const addressBook = process.env.ADDRESS_BOOK || '';

const Contract = require("./utils/Contract");
async function main() {
    let contract = new Contract(addressBook);
    const taxhandler = await contract.deploy("TaxHandler", "taxHandler");
    console.log("TaxHandler proxy deployed to:", taxhandler.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

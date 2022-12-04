const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

const addressBook = process.env.ADDRESS_BOOK || '';

async function main() {
    const AddressBook = await ethers.getContractFactory("AddressBook");
    const addressbook = await AddressBook.attach(addressBook);
    const tokenAddress = await addressbook.get("token");
    const Token = await ethers.getContractFactory("TokenV1");
    await upgrades.forceImport(tokenAddress, Token);
    console.log("Token imported");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

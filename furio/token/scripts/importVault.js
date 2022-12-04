const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

const addressBook = process.env.ADDRESS_BOOK || '';

async function main() {
    const AddressBook = await ethers.getContractFactory("AddressBook");
    const addressbook = await AddressBook.attach(addressBook);
    const vaultAddress = await addressbook.get("vault");
    const Vault = await ethers.getContractFactory("Vault");
    await upgrades.forceImport(vaultAddress, Vault);
    console.log("Vault imported");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

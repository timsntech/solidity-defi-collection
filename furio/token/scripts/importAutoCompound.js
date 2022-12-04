const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

const addressBook = process.env.ADDRESS_BOOK || '';

async function main() {
    const AddressBook = await ethers.getContractFactory("AddressBook");
    const addressbook = await AddressBook.attach(addressBook);
    const autoCompoundAddress = await addressbook.get("autocompound");
    const AutoCompound = await ethers.getContractFactory("AutoCompoundV2");
    await upgrades.forceImport(autoCompoundAddress, AutoCompound);
    console.log("AutoCompound imported");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

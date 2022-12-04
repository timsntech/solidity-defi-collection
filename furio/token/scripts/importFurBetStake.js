const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

const addressBook = process.env.ADDRESS_BOOK || '';

async function main() {
    const AddressBook = await ethers.getContractFactory("AddressBook");
    const addressbook = await AddressBook.attach(addressBook);
    const furbetstakeaddress = await addressbook.get("furbetstake");
    const FurBetStake = await ethers.getContractFactory("FurBetStake");
    await upgrades.forceImport(furbetstakeaddress, FurBetStake);
    console.log("FurBetStake imported");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

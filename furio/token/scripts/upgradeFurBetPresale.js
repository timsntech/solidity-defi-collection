const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

const addressBook = process.env.ADDRESS_BOOK || '';

async function main() {
    const AddressBook = await ethers.getContractFactory("AddressBook");
    const addressbook = await AddressBook.attach(addressBook);
    const furBetPresaleAddress = await addressbook.get("furbetpresale");
    const FurBetPresale = await ethers.getContractFactory("FurBetPresale");
    await upgrades.upgradeProxy(furBetPresaleAddress, FurBetPresale);
    console.log("FurBetPresale contract upgraded", furBetPresaleAddress);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

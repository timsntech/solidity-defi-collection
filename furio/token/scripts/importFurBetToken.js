const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

const addressBook = process.env.ADDRESS_BOOK || '';

async function main() {
    const AddressBook = await ethers.getContractFactory("AddressBook");
    const addressbook = await AddressBook.attach(addressBook);
    const furbettokenaddress = await addressbook.get("furbettoken");
    const FurBetToken = await ethers.getContractFactory("FurBetToken");
    await upgrades.forceImport(furbettokenaddress, FurBetToken);
    console.log("FurBetToken imported");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

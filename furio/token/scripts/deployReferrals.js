const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

const addressbookAddress = process.env.ADDRESS_BOOK || ''

async function main() {
    const AddressBook = await ethers.getContractFactory("AddressBook");
    const addressbook = await AddressBook.attach(addressbookAddress);
    const Referrals = await ethers.getContractFactory("Referrals");
    const referrals = await upgrades.deployProxy(Referrals);
    await referrals.deployed();
    let tx = await referrals.setAddressBook(addressbookAddress);
    await tx.wait();
    tx = await addressbook.set("referrals", referrals.address);
    await tx.wait();
    console.log("Referrals proxy deployed to:", referrals.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

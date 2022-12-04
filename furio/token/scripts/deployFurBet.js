const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

const addressBook = process.env.ADDRESS_BOOK || '';

async function main() {
    const AddressBook = await ethers.getContractFactory("AddressBook");
    const addressbook = await AddressBook.attach(addressBook);
    // deploy token
    const FurBetToken = await ethers.getContractFactory("FurBetToken");
    const furbettoken = await upgrades.deployProxy(FurBetToken);
    await furbettoken.deployed();
    await new Promise(r => setTimeout(r, 5000));
    await furbettoken.setAddressBook(addressBook);
    await new Promise(r => setTimeout(r, 5000));
    await addressbook.set('furbettoken', furbettoken.address);
    await new Promise(r => setTimeout(r, 5000));
    console.log("FurBetToken proxy deployed to:", furbettoken.address);
    // deploy stake
    const FurBetStake = await ethers.getContractFactory("FurBetStake");
    const furbetstake = await upgrades.deployProxy(FurBetStake);
    await furbetstake.deployed();
    await new Promise(r => setTimeout(r, 5000));
    await furbetstake.setAddressBook(addressBook);
    await new Promise(r => setTimeout(r, 5000));
    await addressbook.set('furbetstake', furbetstake.address);
    await new Promise(r => setTimeout(r, 5000));
    console.log("FurBetStake proxy deployed to:", furbetstake.address);
    // deploy presale
    const FurBetPresale = await ethers.getContractFactory("FurBetPresale");
    const furbetpresale = await upgrades.deployProxy(FurBetPresale);
    await furbetpresale.deployed();
    await new Promise(r => setTimeout(r, 5000));
    await furbetpresale.setAddressBook(addressBook);
    await new Promise(r => setTimeout(r, 5000));
    await addressbook.set('furbetpresale', furbetpresale.address);
    await new Promise(r => setTimeout(r, 5000));
    console.log("FurBetPresale proxy deployed to:", furbetpresale.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

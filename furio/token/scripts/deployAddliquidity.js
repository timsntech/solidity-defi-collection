const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

const addressBook = process.env.ADDRESS_BOOK || '';

async function main() {
    const Addliquidity = await ethers.getContractFactory("AddLiquidityV2");
    const addLiquidity = await upgrades.deployProxy(Addliquidity);
    await addLiquidity.deployed();
    let tx = await addLiquidity.setAddressBook(addressBook);
    await tx.wait();
    const AddressBook = await ethers.getContractFactory("AddressBook");
    const addressbook = await AddressBook.attach(addressBook);
    await addressbook.set('addLiquidity', addLiquidity.address);
    console.log("AddLiquidity proxy deployed to:", addLiquidity.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

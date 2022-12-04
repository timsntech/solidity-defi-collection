const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

const addressBook = process.env.ADDRESS_BOOK || '';

async function main() {
    const AddressBook = await ethers.getContractFactory("AddressBook");
    const addressbook = await AddressBook.attach(addressBook);
    const addliquidityaddress = await addressbook.get("addLiquidity");
    const AddLiquidity = await ethers.getContractFactory("AddLiquidityV2");
    await upgrades.upgradeProxy(addliquidityaddress, AddLiquidity);
    console.log("AddLiquidity contract upgraded", addliquidityaddress);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

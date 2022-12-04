const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

const addressBook = process.env.ADDRESS_BOOK || '';

async function main() {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    const AddressBook = await ethers.getContractFactory("AddressBook");
    console.log("attaching to addressbook", addressBook);
    const addressbook = AddressBook.attach(addressBook);
    const usdcaddress = await addressbook.get("payment");
    const furaddress = await addressbook.get("token");
    const swapaddress = await addressbook.get("swap");
    const USDC = await ethers.getContractFactory("FakeToken");
    console.log("attaching to usdc", usdcaddress);
    const usdc = USDC.attach(usdcaddress);
    const FUR = await ethers.getContractFactory("TokenV1");
    console.log("attaching to fur", furaddress);
    const fur = FUR.attach(furaddress);
    const Swap = await ethers.getContractFactory("SwapV2");
    console.log("attaching to swap", swapaddress);
    const swap = Swap.attach(swapaddress);
    console.log("minting 1000 USDC");
    let tx = await usdc.mint("1000");
    await tx.wait();
    console.log("approving swap to spend USDC");
    tx = await usdc.approve(swapaddress, "1000000000000000000000");
    await tx.wait();
    console.log("buying FUR");
    tx = await swap.buy(usdcaddress, "1000");
    await tx.wait();
    const furBalance = await fur.balanceOf(owner.address);
    console.log("FUR balance", furBalance);
    console.log("approving swap to spend FUR");
    tx = await fur.approve(swapaddress, furBalance);
    await tx.wait();
    console.log("selling FUR");
    tx = await swap.sell(furBalance);
    await tx.wait();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

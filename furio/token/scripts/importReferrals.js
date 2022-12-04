const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

const addressbookAddress = process.env.ADDRESS_BOOK || ''
let addressbook;
let vault;
let allReferrals = [];

async function main() {
    await setAddressBook();
    await setVault();
    const referralsAddress = await addressbook.get("referrals");
    const Referrals = await ethers.getContractFactory("Referrals");
    const referrals = Referrals.attach(referralsAddress);
    console.log("Importing participants...");
    const devWallet = await addressbook.get("safe");
    console.log("Dev wallet:", devWallet);
    await getReferrals("0x6fB468c15f380D032d6b899A956410CC9917120d");
    allReferrals.forEach(async (referral) => {
        await getReferrals(referral);
    });
}

async function setAddressBook() {
    const AddressBook = await ethers.getContractFactory("AddressBook");
    addressbook = AddressBook.attach(addressbookAddress);
}

async function setVault() {
    if(typeof addressbook == "undefined") {
        await setAddressBook();
    }
    const vaultAddress = await addressbook.get("vault");
    const Vault = await ethers.getContractFactory("Vault");
    vault = Vault.attach(vaultAddress);
}

async function getReferrals(address) {
    let referrals = await vault.getReferrals(address);
    referrals.forEach((referral) => {
        if(!allReferrals.includes(referral) && referral != "0x0000000000000000000000000000000000000000") {
            console.log("adding", referral);
            allReferrals.push(referral);
        }
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

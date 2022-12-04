const hre = require("hardhat");
hre.upgrades.silenceWarnings();

class Contract {

    constructor(addressbookAddress = '') {
        this.addressbookAddress = addressbookAddress;
    }

    async deploy(name, addressBookName = '', args = []) {
        const ContractFactory = await hre.ethers.getContractFactory(name);
        const contract = await hre.upgrades.deployProxy(ContractFactory, args, { initializer: "initialize" });
        await contract.deployed();
        if(this.addressbookAddress != '') {
            if(addressBookName == '') {
                addressBookName = name;
            }
            const AddressBook = await hre.ethers.getContractFactory("AddressBook");
            const addressbook = AddressBook.attach(this.addressbookAddress);
            let tx = await addressbook.set(addressBookName, contract.address);
            await tx.wait();
            tx = await contract.setAddressBook(this.addressbookAddress);
            await tx.wait();
        }
        return contract;
    }

    async upgrade(name, addressBookName = '') {
        if(this.addressbookAddress == '') {
            throw new Error('AddressBook address is not set');
        }
        if(addressBookName == '') {
            addressBookName = name;
        }
        const AddressBook = await hre.ethers.getContractFactory("AddressBook");
        const addressbook = AddressBook.attach(this.addressbookAddress);
        const address = await addressbook.get(addressBookName);
        const ContractFactory = await hre.ethers.getContractFactory(name);
        const contract = await hre.upgrades.upgradeProxy(address, ContractFactory);
        return contract;
    }
}

module.exports = Contract;

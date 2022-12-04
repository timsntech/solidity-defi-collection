const Contract = require("./utils/Contract");
require("dotenv").config();
const factory = process.env.FACTORY || '';
const router = process.env.ROUTER || '';
const safe = process.env.SAFE || '';

const main = async () => {
    const contract = new Contract();
    // Deploy AddressBook
    const addressbook = await contract.deploy("AddressBook");
    let tx = await addressbook.set("factory", factory);
    await tx.wait();
    tx = await addressbook.set("router", router);
    await tx.wait();
    tx = await addressbook.set("safe", safe);
    await tx.wait();
    console.log("AddressBook deployed to", addressbook.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

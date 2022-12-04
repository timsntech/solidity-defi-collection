const Contract = require("./utils/Contract");
require("dotenv").config();
const addressbook = process.env.ADDRESS_BOOK || '';

const main = async () => {
    const contract = new Contract(addressbook);
    // Upgrade TaxHandler
    const taxHandler = await contract.upgrade("TaxHandler", "taxHandler");
    let tx = await taxHandler.setup();
    await tx.wait();
    console.log("TaxHandler upgraded", taxHandler.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

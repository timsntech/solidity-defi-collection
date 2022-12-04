const Contract = require("./utils/Contract");
require("dotenv").config();
const addressbook = process.env.ADDRESS_BOOK || '';

const main = async () => {
    const contract = new Contract(addressbook);
    // Deploy FurMax
    const furmax = await contract.deploy("FurMax", "furmax");
    let tx = await furmax.setup();
    await tx.wait();
    console.log("FurMax deployed to", furmax.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

const Contract = require("./utils/Contract");
require("dotenv").config();
const addressbook = process.env.ADDRESS_BOOK || '';

async function main() {
    const contract = new Contract(addressbook);
    const furbetstake = await contract.upgrade("FurBetStake", "furbetstake");
    let tx = await furbetstake.setup();
    await tx.wait();
    console.log("FurBetStake upgraded", furbetstake.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

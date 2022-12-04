const Contract = require("./utils/Contract");
require("dotenv").config();
const addressbook = process.env.ADDRESS_BOOK || '';

async function main() {
    const contract = new Contract(addressbook);
    const furbettoken = await contract.upgrade("FurBetToken", "furbettoken");
    console.log("FurBetToken upgraded", furbettoken.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

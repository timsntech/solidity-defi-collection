const Contract = require("./utils/Contract");
require("dotenv").config();
const addressbook = process.env.ADDRESS_BOOK || '';

async function main() {
    const contract = new Contract(addressbook);
    const vault = await contract.upgrade("Vault", "vault");
    console.log("Vault upgraded", vault.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

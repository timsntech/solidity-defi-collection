const Contract = require("./utils/Contract");
require("dotenv").config();
const addressbook = process.env.ADDRESS_BOOK || '';

async function main() {
    const contract = new Contract(addressbook);
    // Upgrade FurBot
    const swap = await contract.upgrade("SwapV2", "swap");
    let tx = await swap.setup();
    await tx.wait();
    console.log("Swap upgraded", swap.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

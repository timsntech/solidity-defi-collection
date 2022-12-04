const Contract = require("./utils/Contract");
require("dotenv").config();
const addressbook = process.env.ADDRESS_BOOK || '';

const main = async () => {
    const contract = new Contract(addressbook);
    // Deploy FurBot
    const furbotmax = await contract.deploy("FurBotMax", "furbotmax");
    let tx = await furbotmax.setup();
    await tx.wait();
    console.log("FurBotMax deployed to", furbotmax.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

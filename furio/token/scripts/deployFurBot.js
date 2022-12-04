const Contract = require("./utils/Contract");
require("dotenv").config();
const addressbook = process.env.ADDRESS_BOOK || '';

const main = async () => {
    const contract = new Contract(addressbook);
    // Deploy FurBot
    const furbot = await contract.deploy("FurBot", "furbot");
    console.log("FurBot deployed to", furbot.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

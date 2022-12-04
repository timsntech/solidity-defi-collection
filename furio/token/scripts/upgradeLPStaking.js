const Contract = require("./utils/Contract");
require("dotenv").config();
const addressbook = process.env.ADDRESS_BOOK || '';

const main = async () => {
    const contract = new Contract(addressbook);
    // Upgrade LPStaking
    const lpstaking = await contract.upgrade("LPStakingV1", "lpStaking");
    console.log("LPStaking upgraded", lpstaking.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

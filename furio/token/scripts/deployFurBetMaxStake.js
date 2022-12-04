const Contract = require("./utils/Contract");
require("dotenv").config();
const addressbook = process.env.ADDRESS_BOOK || '';

const main = async () => {
    const contract = new Contract(addressbook);
    // Deploy FurBetMaxStake
    const furbetmaxstake = await contract.deploy("FurBetMaxStake", "furbetmaxstake");
    let tx = await furbetmaxstake.setup();
    await tx.wait();
    console.log("FurBetMaxStake deployed to", furbetmaxstake.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

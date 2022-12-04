const fs = require("fs");

async function main() {
    for(i = 1; i <= 1; i ++) {
        const metadata = {
            name: "Furio Presale NFT",
            description: "This NFT is redeemable for $FUR tokens",
            image: "ipfs://QmVf9s2Sn5vVeXJR7YsCSr8hVYL2Rpb9uHnVZBn2Z8Qz1t/furio-presale.png",
            external_url: "https://furio.io"
        }
        const jsonString = JSON.stringify(metadata);
        fs.writeFileSync("./public/metadata/presale/" + i, jsonString);
        console.log("Write file", i);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

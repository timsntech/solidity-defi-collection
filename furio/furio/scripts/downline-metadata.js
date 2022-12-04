const fs = require("fs");

async function main() {
    for(i = 1; i <= 10000; i ++) {
        const metadata = {
            name: "FUR NFT #" + i,
            description: "This NFT is used for Furio downline rewards and future voting rights.",
            image: "ipfs://QmfYgMLHc6UvL2vGeEwyEVZdyVtz33SkP4WYwVPCs7v83t/furio-nft-g1.gif",
            external_url: "https://furio.io",
            attributes: [
                {
                    display_type: "number",
                    trait_type: "generation",
                    value: 1
                }
            ]
        }
        const jsonString = JSON.stringify(metadata);
        fs.writeFileSync("./public/metadata/downline-g1/" + i, jsonString);
        console.log("Write file", i);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

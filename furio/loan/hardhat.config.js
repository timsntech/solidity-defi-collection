require("hardhat-contract-sizer");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
// require('@openzeppelin/hardhat-defender');
require("@openzeppelin/hardhat-upgrades");
require("hardhat-interface-generator");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const accounts = process.env.PRIVATE_KEY
  ? [
      process.env.PRIVATE_KEY,
      process.env.PRIVATE_KEY1,
      process.env.PRIVATE_KEY2,
      process.env.PRIVATE_KEY3,
      process.env.PRIVATE_KEY4,
      process.env.PRIVATE_KEY5,
      process.env.PRIVATE_KEY6,
      process.env.PRIVATE_KEY7,
      process.env.PRIVATE_KEY8,
      process.env.PRIVATE_KEY9,
      process.env.PRIVATE_KEY10
    ]
  : [];

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.2",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.11",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.4.18",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      // allowUnlimitedContractSize: true
    },
    rinkeby: {
      url: process.env.RINKEBY_RPC_URL || "",
      accounts: accounts,
      gasMultiplier: 3,
      timeout: 600000,
    },
    bsctestnet: {
      url: process.env.BSC_TESTNET_RPC_URL || "",
      accounts: accounts,
    },
    bsc: {
      url: process.env.BSC_RPC_URL || "",
      accounts: accounts,
      gasMultiplier: 5,
      timeout: 60000,
    },
  },
  etherscan: {
    apiKey: {
      rinkeby: process.env.ETHERSCAN_API_KEY,
      bsc: process.env.BSCSCAN_API_KEY,
      bscTestnet: process.env.BSCSCAN_API_KEY,
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    gasPrice: 21,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY || "",
  },
  mocha: {
    timeout: 100000000,
  },
  // defender: {
  //     apiKey: process.env.DEFENDER_API_KEY || '',
  //     apiSecret: process.env.DEFENDER_API_SECRET || '',
  // },
};

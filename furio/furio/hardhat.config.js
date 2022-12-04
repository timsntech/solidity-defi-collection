const { task } = require("hardhat/config");

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-web3");
require("hardhat-gas-reporter");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("balances", "Prints the list of account balances", async () => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    balance = await hre.ethers.provider.getBalance(account.address);
    console.log(account.address, "has balance", balance.toString());
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const accounts = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [];

module.exports = {
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_RPC_URL || '',
      accounts: accounts,
    },
    ropsten: {
      url: process.env.ROPSTEN_RPC_URL || '',
      accounts: accounts,
    },
    mainnet: {
      url: process.env.MAINNET_RPC_URL || '',
      accounts: accounts,
    },
    mumbai: {
        url: process.env.MUMBAI_RPC_URL || '',
        accounts: accounts,
    },
    polygon: {
        url: process.env.POLYGON_RPC_URL || '',
        accounts: accounts,
    },
  },
  etherscan: {
    apiKey: {
        mainnet: process.env.ETHERSCAN_API_KEY,
        rinkeby: process.env.ETHERSCAN_API_KEY,
        ropsten: process.env.ETHERSCAN_API_KEY,
        polygon: process.env.POLYGONSCAN_API_KEY,
    },
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
    gasPrice: 21,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY || ''
  },
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
        version: "0.4.25",
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
    ],
  },
};

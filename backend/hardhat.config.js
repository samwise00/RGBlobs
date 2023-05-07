require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("@nomiclabs/hardhat-ethers")
require("dotenv").config()

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "https://eth-goerli"
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL || "https://eth-mainnet"
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL || "https://polygon-mumbai"
const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL || "https://polygon"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
            allowUnlimitedContractSize: true,
        },
        hardhat: {
            chainId: 31337,
            forking: {
                url: MAINNET_RPC_URL,
            },
        },
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
            blockConfirmations: 6,
            allowUnlimitedContractSize: true,
        },
        mumbai: {
            url: MUMBAI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 80001,
        },
        polygon: {
            url: POLYGON_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 137,
        },
    },
    solidity: {
        compilers: [
            { version: "0.8.8" },
            { version: "0.4.19" },
            { version: "0.6.12" },
            { version: "0.6.0" },
        ],
    },
    etherscan: {
        apiKey: POLYGONSCAN_API_KEY,
        customChains: [],
    },
    gasReporter: {
        enabled: false,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: process.env.COINMARKETCAP_API_KEY,
        // token: "MATIC",
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        player: {
            default: 1,
        },
    },
    mocha: {
        timeout: 500000,
    },
}

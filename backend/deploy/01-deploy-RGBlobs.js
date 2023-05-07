const { network, ethers } = require("hardhat")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    // const chainId = network.config.chainId

    log("-----------------------------")
    // await storeImages(imagesLocation)

    let args = []

    const RGBlobs = await deploy("RGBlobs", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: VERIFICATION_BLOCK_CONFIRMATIONS || 1,
    })

    args = [RGBlobs.address]

    const RGBlobsForger = await deploy("RGBlobsForger", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: VERIFICATION_BLOCK_CONFIRMATIONS || 1,
    })

    log("------------------")
    if (!developmentChains.includes(network.name) && process.env.POLYGONSCAN_API_KEY) {
        console.log(process.env.POLYGONSCAN_API_KEY)
        log("Verifying...")
        await verify(RGBlobs.address, args)
        await verify(RGBlobsForger.address, args)
    }
}

module.exports.tags = ["all", "rgblobs", "main"]

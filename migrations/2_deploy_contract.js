const CUP = artifacts.require("CUP");

const {deployProxy} = require("@openzeppelin/truffle-upgrades");

module.exports = async function (deployer) {
    const instance = await deployProxy(CUP)
    console.log("Deployed to address ", instance.address)
}
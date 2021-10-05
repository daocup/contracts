const CUP = artifacts.require("CUP");

const {deployProxy} = require("@openzeppelin/truffle-upgrades");

module.exports = async function (deployer) {
    const instance = await deployProxy(CUP)
    console.log("DeploYER address ", await instance.owner())
    console.log("Deployed CUP to address ", instance.address)
}
const Token = artifacts.require("CUP");
const BNBSale = artifacts.require("BNBSale");
const EthSale = artifacts.require("EthSale");
const TokenTimeLock = artifacts.require("TokenTimeLock");
const TokenTimeLockFactory = artifacts.require("TokenTimeLockProxyFactory");
const {deployProxy} = require("@openzeppelin/truffle-upgrades");
const web3 = require('web3')
module.exports = async function (deployer, network) {
    const token = await Token.deployed()

    const Sale = {
        test: BNBSale,
        development: BNBSale,
        testbsc: BNBSale,
        bsc: BNBSale,

        mainnet: EthSale,
        rinkeby: EthSale,
        ropsten: EthSale
    }
    // Deploy TimeLock
    const timeLock = await deployer.deploy(TokenTimeLock);

    const factory = await deployProxy(TokenTimeLockFactory, [timeLock.address], {kind: 'uups', deployer: deployer});
    console.log("Deployed to address ", factory.address);

    // Deploy BNB Exchange
    await deployProxy(Sale[network], [token.address, factory.address], {kind: 'uups', deployer: deployer});
    const exchange = await Sale[network].deployed();
    await token.approve(exchange.address, web3.utils.toWei('9000000000'));
    console.log("Allowance for exchange", (await token.allowance(await token.owner(), exchange.address)).toString())
};

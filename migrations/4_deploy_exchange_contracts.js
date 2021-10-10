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
        test: 'bnb',
        development: 'bnb',
        testbsc: 'bnb',
        bsc: 'bnb',

        mainnet: 'eth',
        rinkeby: 'eth',
        ropsten: 'eth'
    }
    // Deploy TimeLock
    const sale = Sale[network];
    const timeLock = await deployer.deploy(TokenTimeLock);
    const factory = await deployProxy(TokenTimeLockFactory, [timeLock.address], {kind: 'uups', deployer: deployer});
    console.log("Deployed to Lock factory address ", factory.address);

    // Deploy BNB Exchange
    if (sale === 'bnb') {
        await deployBNB(deployer, token, factory.address);
    } else {
        await deployETH(deployer, token, factory.address);
    }
};

async function deployBNB(deployer, token, factoryAddress) {
    // Deploy BNB Exchange
    await deployProxy(BNBSale, [token.address, factoryAddress], {kind: 'uups', deployer: deployer});
    const exchange = await BNBSale.deployed();
    await token.approve(exchange.address, web3.utils.toWei('9000000000'));
}

async function deployETH(deployer, token, factoryAddress) {
    // Deploy ETH Exchange
    await deployProxy(EthSale, [token.address, factoryAddress], {kind: 'uups', deployer: deployer});
    const exchange = await EthSale.deployed();
    await token.approve(exchange.address, web3.utils.toWei('9000000000'));
}

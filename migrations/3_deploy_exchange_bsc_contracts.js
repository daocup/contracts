const Token = artifacts.require("CUP");
const CUPSale = artifacts.require("CUPSale");
const TokenTimeLock = artifacts.require("TokenTimeLock");
const TokenTimeLockFactory = artifacts.require("TokenTimeLockProxyFactory");
const {deployProxy} = require("@openzeppelin/truffle-upgrades");
const web3 = require('web3')
module.exports = async function(deployer, network) {
  const token = await Token.deployed()

  const rate = {
    test: 100000,
    development: 100000,
    testbsc: 10000,
    bsc: 10000,
    mainnet: 77777,
    ropsten: 77777
  }
  // const TestRate = 100000;
  // const BNBRate = 10000;
  // const ETHRate = 77777
  // Deploy TimeLock
  const timeLock = await deployer.deploy(TokenTimeLock);

  const factory = await deployProxy(TokenTimeLockFactory, [timeLock.address], {kind: 'uups', deployer: deployer});
  console.log("Deployed to address ", factory.address);

  // Deploy BNB Exchange
  await deployProxy(CUPSale, [token.address, factory.address, rate[network]], {kind: 'uups', deployer: deployer});
  const exchange = await CUPSale.deployed()
  await token.approve(exchange.address, web3.utils.toWei('9000000000'));
  console.log("Allowance for exchange", (await token.allowance(await token.owner(), exchange.address)).toString())
};

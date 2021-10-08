const Token = artifacts.require("CUP");
const CUPSale = artifacts.require("CUPSale");
const TokenTimeLock = artifacts.require("TokenTimeLock");
const TokenTimeLockFactory = artifacts.require("TokenTimeLockProxyFactory");
const {deployProxy} = require("@openzeppelin/truffle-upgrades");
const web3 = require('web3')
module.exports = async function(deployer) {
  const token = await Token.deployed()

  // Deploy TimeLock
  const timeLock = await deployer.deploy(TokenTimeLock)

  const factory = await deployProxy(TokenTimeLockFactory, [timeLock.address], {kind: 'uups', deployer: deployer})
  console.log("Deployed to address ", factory.address)

  // Deploy Exchange
  await deployProxy(CUPSale, [token.address, factory.address], {kind: 'uups', deployer: deployer});
  const exchange = await CUPSale.deployed()
  await token.approve(exchange.address, web3.utils.toWei('9000000000'));
  console.log("Allowance for exchange", (await token.allowance(await token.owner(), exchange.address)).toString())
};

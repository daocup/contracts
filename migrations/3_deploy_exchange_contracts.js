const Token = artifacts.require("CUP");
const CUPSale = artifacts.require("CUPSale");
const TokenTimeLock = artifacts.require("TokenTimeLock");
const TokenTimeLockFactory = artifacts.require("TokenTimeLockProxyFactory");
const {deployProxy} = require("@openzeppelin/truffle-upgrades");

module.exports = async function(deployer) {
  const token = await Token.deployed()

  // Deploy Exchange
  await deployProxy(CUPSale, [token.address], {kind: 'uups', deployer: deployer});
  const exchange = await CUPSale.deployed()
  const totalSupply = await token.totalSupply();
  await token.transfer(exchange.address, totalSupply)

  // Deploy TimeLock
  const timeLock = await deployer.deploy(TokenTimeLock)

  const factory = await deployProxy(TokenTimeLockFactory, [timeLock.address], {kind: 'uups', deployer: deployer})
  console.log("Deployed to address ", factory.address)
};

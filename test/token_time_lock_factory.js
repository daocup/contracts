const TokenTimeLockFactory = artifacts.require("TokenTimeLockProxyFactory");
const Token = artifacts.require("CUP");

require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}
/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("TokenTimeLockFactory", function ([deployer, investor]) {
  let factory, cup
  before(async () => {
    factory = await TokenTimeLockFactory.deployed();
    cup = Token.deployed()
  })
  it("should assert true", async function () {
    factory.
    return assert.isTrue(true);
  });
  
  describe()
});

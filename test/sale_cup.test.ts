import chai, {expect} from 'chai';
import {solidity} from 'ethereum-waffle';
const CUP = artifacts.require("CUP");
const CUPSale = artifacts.require("CUPSale");
import {
    BN,
    time,
} from "@openzeppelin/test-helpers";
import truffleAssert from "truffle-assertions";
const TimeLock = artifacts.require("TokenTimeLock");
chai.use(solidity);
chai.use(require('chai-as-promised'))
    .should();
const chaiBN = require('chai-bn')(BN);
chai.use(chaiBN);

function tokens(n: string) {
    return web3.utils.toWei(n, 'ether');
}

contract('CUPSale', (accounts) => {
    let cupToken, exchange;
    let deployer = accounts[0];
    let investor = accounts[1];
    before(async () => {
        await CUPSale.defaults({from: investor});
        await TimeLock.defaults({from: investor});
        cupToken = await CUP.deployed();
        exchange = await CUPSale.deployed();
        // Transfer all tokens to CUPSale (1 million)
    })

    describe('CUP deployment', async () => {
        it('contract has a name', async () => {
            const name = await cupToken.name();
            assert.equal(name, 'DAOCup');
            const symbol = await cupToken.symbol();
            assert.equal(symbol, 'CUP')
        })
    })

    describe('CUPSale deployment', async () => {
        it('contract has a name', async () => {
            const name = await exchange.name()
            assert.equal(name, 'CUP Sale Contract')
        });

        it('contract has tokens total supply: 90.000.000.000(90 bil)', async () => {
            let totalSupply = await cupToken.balanceOf(exchange.address);
            assert.equal(totalSupply.toString(), tokens('90000000000'))
        })
    })

    describe('buy_tokens and release by lock wallet over 5 stages', async () => {
        let result

        before(async () => {
            // Purchase tokens before each example
            result = await exchange.buyTokens({from: investor, value: web3.utils.toWei('1', 'ether')})
        })

        it('Allows user buy and release [5th month: 40%, 7th: 70%, 9th: 90%]', async () => {
            // Check investor CUP balance after purchase
            let investorBalance = await cupToken.balanceOf(investor);
            assert.equal(investorBalance.toString(), tokens('0'));

            // Check CUPSale balance after purchase
            let CUPSaleBalance
            CUPSaleBalance = await cupToken.balanceOf(exchange.address);
            assert.equal(CUPSaleBalance.toString(), tokens('89999946000'));
            CUPSaleBalance = await web3.eth.getBalance(exchange.address);
            assert.equal(CUPSaleBalance.toString(), tokens('1'));

            let purchaseEvent
            truffleAssert.eventEmitted(result, 'TokensPurchased', async (event) => {
                purchaseEvent = event
                return event.name === "TokenPurchased";
            });
            // after purchase
            expect(purchaseEvent.wallet).to.not.equal(cupToken.address)
            let balanceWallet = await cupToken.balanceOf(purchaseEvent.wallet)
            assert.equal(balanceWallet.toString(), tokens('54000'))
            let investorBalanceAfter = await cupToken.balanceOf(investor);
            assert.equal(investorBalanceAfter, tokens('0'));
            // Check logs to ensure event was emitted with correct data
            assert.equal(purchaseEvent.account, investor)
            assert.equal(purchaseEvent.rate.toString(), '54000')
            assert.equal(purchaseEvent.amount.toString(), tokens('54000').toString())
            expect(investorBalanceAfter.toString()).to.be.eq(tokens('0').toString());

            // Try to release by increase time on blockchain
            await time.increase(time.duration.days(30 * 5));
            let myContract = await TimeLock.at(purchaseEvent.wallet);
            let walletOwner = myContract.owner();
            expect(walletOwner).to.eventually.be.eq(investor);

            await myContract.release();
            const investorBalanceRelease = await cupToken.balanceOf(investor);
            expect(investorBalanceRelease.toString()).to.be.eq(tokens('21600').toString());

            // Release after next 2months
            await time.increase(time.duration.days(30 * 2));
            await myContract.release();
            const investorBalanceReleaseNext7thMonth = await cupToken.balanceOf(investor);
            expect(investorBalanceReleaseNext7thMonth.toString()).to.be.eq(tokens('37800').toString());
            // Release after next 2months
            await time.increase(time.duration.days(30 * 2));
            await myContract.release();
            const investorBalanceReleaseNext9thMonth = await cupToken.balanceOf(investor);
            expect(investorBalanceReleaseNext9thMonth.toString()).to.be.eq(tokens('48600').toString());
        })
    })
})

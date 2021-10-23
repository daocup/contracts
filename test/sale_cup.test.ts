import truffleAssert from "truffle-assertions";
import {
    BN,
    time,
} from "@openzeppelin/test-helpers";
import chai, {expect} from 'chai';
import {solidity} from 'ethereum-waffle';
import chaiPromise from 'chai-as-promised';

const CUP = artifacts.require("CUP");
const CUPCake = artifacts.require("BNBSale");
const TimeLock = artifacts.require("TokenTimeLock");
const chaiBN = require('chai-bn')(BN);
chai.use(solidity);
chai.use(chaiBN);
chai.use(chaiPromise)
    .should();

const tokens: (t: string) => string = (n: string) => {
    return web3.utils.toWei(n, 'ether');
};

contract('CUPCake', ([deployer, investor, alice, bob, john, paul]) => {
    let cupToken, exchange;
    before(async () => {
        cupToken = await CUP.deployed();
        exchange = await CUPCake.deployed();
        // Transfer all tokens to CUPCake (1 million)
    })

    describe('CUP deployment', () => {
        it('contract has a name', async () => {
            const name = await cupToken.name();
            assert.equal(name, 'DAOCup');
            const symbol = await cupToken.symbol();
            assert.equal(symbol, 'CUP')
        })
    })

    describe('CUPCake deployment', () => {
        it('contract has a name', async () => {
            const name = await exchange.name()
            assert.equal(name, 'CUP Sale Contract')
        });

        it('Token has total supplye: 90.000.000.000(9 bil)', async () => {
            const totalSupply = await cupToken.totalSupply();
            assert.equal(totalSupply.toString(), tokens('90000000000'), "Total Supply")
        })
        it('contract has provide allowance for exchange: 9.000.000.000(9 bil)', async () => {
            const allownance = await cupToken.allowance(deployer, exchange.address);
            assert.equal(allownance.toString(), tokens('9000000000'), "Total allowance")
        })
    })

    describe('buy_tokens and release by lock wallet over 5 stages', () => {

        before(async () => {
            // Purchase tokens before each example
        })

        it('Allows alice buy and receive reward 10% and lock 3 months and release [30 days: 40%, 45days: 70%, 60 days: 90%]', async () => {
            const result = await exchange.buyTokens(3, {from: alice, value: web3.utils.toWei('2', 'ether')})
            await expectSale(deployer, exchange, result, cupToken, alice,
                '0',
                '220000', // reward 10%
                '0',
                '100000',
                '220000',
                15 * 2,
                '88000',
                15,
                '154000',
                15,
                '198000',
                '8999780000', // 9.000.000.000 - 220.000
                '2');
        })
        it('Allows bob buy and lock 6 months and release [30 days: 40%, 45days: 70%, 60 days: 90%]', async () => {
            const result = await exchange.buyTokens(6, {from: bob, value: web3.utils.toWei('3', 'ether')})
            await expectSale(deployer, exchange, result, cupToken, bob,
                '0',
                '360000',
                '0',
                '100000',
                '360000',
                30 * 2,
                '144000',
                30,
                '252000',
                30,
                '324000',
                '8999420000', // 9.000.000.000- 220.000 - 36.0000
                '5'); // alice 2 ether; bob 3 ether
        })
        it('Allows investor buy and lock 12 months and release [5th month: 40%, 7th: 70%, 9th: 90%]', async () => {
            const result = await exchange.buyTokens(12, {from: investor, value: web3.utils.toWei('1', 'ether')})
            await expectSale(deployer, exchange, result, cupToken, investor,
                '0',
                '150000',
                '0',
                '100000',
                '150000',
                30 * 5, // 5th month: move time travel to next 5 months
                '60000',
                30 * 2,// 7th month: move time travel to next 2 months
                '105000',
                30 * 2, //9th month: move time travel to next 2 months
                '135000',
                '8999270000', //9.000.000.000- 220.000 - 36.0000 - 150.000
                '6'); // ether from alice and investor
            return true;
        })

        it('Kick start deadline and move time to deadline. Paul can buy. Next day, he can not buy token any more', async () => {
            await exchange.activeDeadline(30, {from: deployer});
            await time.increase(time.duration.days(29));
            const result = await exchange.buyTokens(3, {from: paul, value: web3.utils.toWei('2', 'ether')})
            await expectSale(deployer, exchange, result, cupToken, paul,
                '0',
                '220000', // reward 10%
                '0',
                '100000',
                '220000',
                15 * 2,
                '88000',
                15,
                '154000',
                15,
                '198000',
                '8999050000', // 9.000.000.000 - 220.000
                '8');
            await time.increase(time.duration.days(1));
            await expect(exchange.buyTokens(3, {
                from: paul,
                value: web3.utils.toWei('2', 'ether')
            })).to.be.revertedWith("CUPCake: End of sale. Goodbye!");

            expect(web3.eth.getBalance(exchange.address)).to.be.eventually.equal(tokens('8'));

            const complete = await exchange.completeSale();
            let sold = {amount: 0, reward: 0};
            truffleAssert.eventEmitted(complete, 'TokensSold', async (event) => {
                sold = event;
                return event.name === "TokensSold";
            });
            assert.equal(sold.amount.toString(), tokens('8').toString(), "Total sale ETH")
            assert.equal(sold.reward.toString(), tokens('150000').toString(), "Total reward = 9000000000-800000(8 ether)-8999050000(current balance)")
            expect(web3.eth.getBalance(exchange.address), "No ether anymore").to.be.eventually.equal(tokens('0'));
        })
    })
})

const expectSale = async (deployer, exchange, result, cupToken, user,
                          balanceInvestor,
                          balanceWalletAfterSale,
                          balanceCupAfterSale,
                          purchaseEventRate,
                          purchaseEventAmount,
                          firstReleaseDays,
                          firstReleaseBalance,
                          secondReleaseDays,
                          secondReleaseBalance,
                          thirdReleaseDays,
                          thirdReleaseBalance,
                          allowanceAfterSale,
                          etherAfterSale) => {
    await TimeLock.defaults({from: user});
    await CUP.defaults({from: user});
    // Check user CUP balance after purchase
    let investorBalance = await cupToken.balanceOf(user);
    assert.equal(investorBalance.toString(), tokens(balanceInvestor), "Balance of user");

    let purchaseEvent = {wallet: "", account: "", rate: "", amount: 0};
    truffleAssert.eventEmitted(result, 'TokensPurchased', async (event) => {
        purchaseEvent = event
        return event.name === "TokenPurchased";
    });
    // after purchase
    expect(purchaseEvent.wallet).to.not.equal(cupToken.address);
    const balanceWallet = await cupToken.balanceOf(purchaseEvent.wallet);
    console.log("       Wallet balance after sale", user, balanceWallet.toString())
    assert.equal(balanceWallet.toString(), tokens(balanceWalletAfterSale), "Balance of lock wallet");
    let investorBalanceAfter = await cupToken.balanceOf(user);
    // Check logs to ensure event was emitted with correct data
    assert.equal(purchaseEvent.account, user);
    assert.equal(purchaseEvent.rate.toString(), purchaseEventRate);
    assert.equal(purchaseEvent.amount.toString(), tokens(purchaseEventAmount).toString());
    expect(investorBalanceAfter.toString()).to.be.eq(tokens(balanceCupAfterSale));

    // Try to release by increase time on blockchain
    await time.increase(time.duration.days(firstReleaseDays));
    let myContract = await TimeLock.at(purchaseEvent.wallet);
    expect(myContract.owner()).to.be.eventually.eq(user);
    let walletOwner = await myContract.owner();
    expect(walletOwner).to.be.eq(user);

    await myContract.release();
    const investorBalanceRelease = await cupToken.balanceOf(user);
    expect(investorBalanceRelease.toString(), "First release").to.be.eq(tokens(firstReleaseBalance));

    // Release after next 2months
    await time.increase(time.duration.days(secondReleaseDays));
    await myContract.release();
    const investorBalanceReleaseNext7thMonth = await cupToken.balanceOf(user);
    expect(investorBalanceReleaseNext7thMonth.toString(), "Second release").to.be.eq(tokens(secondReleaseBalance).toString());
    // Release after next 2months
    await time.increase(time.duration.days(thirdReleaseDays));
    await myContract.release();
    const investorBalanceReleaseNext9thMonth = await cupToken.balanceOf(user);
    expect(investorBalanceReleaseNext9thMonth.toString(), "Third release").to.be.eq(tokens(thirdReleaseBalance).toString());


    // Check CUPCake balance after purchase
    let CUPCakeBalance = await cupToken.allowance(deployer, exchange.address);
    assert.equal(CUPCakeBalance.toString(), tokens(allowanceAfterSale), "Allowance of Saleman Contract");
    let CUPCakeBalanceEth = await web3.eth.getBalance(exchange.address);
    assert.equal(CUPCakeBalanceEth.toString(), tokens(etherAfterSale), "Ether in SaleMan address");
}
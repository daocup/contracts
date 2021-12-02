import { Component } from 'react'
class ReleaseService extends Component {
    constructor(exchange, account, tokenLockWallet) {
        super(exchange, account, tokenLockWallet)
        this.exchange = exchange;
        this.account = account;
        this.tokenLockWallet = tokenLockWallet;
    }

    getUserWallets = async () => {
        const userWallets = await this.exchange.methods.getWallets().call();
        return userWallets;
    }
    getWallet = async () => {
        const getWallet = await this.tokenLockWallet.methods.lockData().call({
            from: this.account
        });
        return getWallet
    }
    Release = (address) => {
        //console.log(address);
        this.tokenLockWallet.methods.release().send({
            from: this.account
        });
    }

}

export default ReleaseService;

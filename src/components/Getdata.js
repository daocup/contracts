import {Component} from 'react'

class Getdata extends Component {
    constructor(exchange,account,token,loading,tokenLockWallet) {
        super(exchange,account,token,loading,tokenLockWallet)
        this.exchange = exchange;
        this.account = account;
        this.token = token;
        this.loading = loading;
        this.tokenLockWallet = tokenLockWallet;
    }
  
    getTotalSale = (total, remainSale ) => {
        return (total - remainSale)
    }
    buyTokens = (lockDuration, etherAmount) => {
        const sendBackData = () => {
            this.loading(true);
        }
        sendBackData()
        this.exchange.methods.buyTokens(lockDuration).send({
            value: etherAmount,
            from: this.account
        }).on('transactionHash', (hash) => {
            const sendBackData = () => {
                this.loading(false);
            }
            sendBackData()
        }).on('receipt', (receipt) => {
            
            const purchaseInfo = receipt.events.TokensPurchased.returnValues;
            //    event TokensPurchased(
            //         address account,
            //         address wallet,
            //         uint amount,
            //         uint rate
            //     );
            const walletAddress = purchaseInfo.wallet;
            console.log(walletAddress)
        })
    }


    getRemainSale = async() => {
       
        //console.log('token',this.token)
        const gettotal = await this.token.methods.allowance(this.account,this.exchange._address)
        const result =   gettotal.call();
        return  result       
    }
    // getTotalSale = (total, remainSale ) => {
    //     return (total - remainSale)
    // }
    getUserWallets = async() => {
      const userWallets = await this.exchange.methods.getWallets().call();
      return userWallets;
    }
    getWallet = async() => {
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

export default Getdata;

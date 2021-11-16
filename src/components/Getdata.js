import {Component} from 'react'
class Getdata extends Component {
    constructor(exchange,account) {
        super(exchange,account)
        this.exchange = exchange;
        this.account = account;
    }
    buyTokens = (lockDuration, etherAmount) => {
       // this.setState({loading: true})
        this.exchange.methods.buyTokens(lockDuration).send({
            value: etherAmount,
            from: this.account
        }).on('receipt', (receipt) => {
            //console.log(etherAmount);
            const purchaseInfo = receipt.events.TokensPurchased.returnValues;
            //    event TokensPurchased(
            //         address account,
            //         address wallet,
            //         uint amount,
            //         uint rate
            //     );
            const walletAddress = purchaseInfo.wallet;
            console.log(purchaseInfo)
        })
    }

  
}



export default Getdata;

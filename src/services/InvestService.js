import {Component} from 'react'
class InvestService extends Component {
    constructor(exchange,account,token,loading) {
        super(exchange,account,token,loading)
        this.exchange = exchange;
        this.account = account;
        this.token = token;
        this.loading = loading;
    }
  
   
    buyTokens = (lockDuration, etherAmount) => {
        const sendBackData = () => {
            this.loading(true);
        }
        sendBackData()
        this.exchange.methods.buyTokens(lockDuration).send({
            value: etherAmount,
            from: this.account
        }).on('receipt', (receipt) => {
            const sendBackData = () => {
                this.loading(false);
            }
            sendBackData()
            
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
        const getRemain = await this.token.methods.allowance(this.account,this.exchange._address).call()
        return  getRemain       
    }
    getTotalSale = (total, remainSale ) => {
        return (total - remainSale)
    }
}

export default InvestService;
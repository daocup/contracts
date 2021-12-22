import {Component} from 'react'
class InvestService extends Component {
    constructor(exchange, exchangeOwner, account,token,loading) {
        super(exchange, exchangeOwner, account,token,loading)
        this.exchange = exchange;
        this.exchangeOwner = exchangeOwner;
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
            const walletAddress = purchaseInfo.wallet;
        })
    }
    getRemainSale = async() => {
        if(Object.keys(this.token).length !== 0) {
            const getRemain = await this.token.methods.allowance(this.exchangeOwner ,this.exchange._address).call()
            return  getRemain  
        }     
    }
    getTotalSale = (total, remainSale ) => {
        return (total - remainSale)
    }
}
export default InvestService;
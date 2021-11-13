import React, {Component} from 'react'
import Web3 from 'web3'
import Token from '../abis/CUP.json'
import ETHSale from '../abis/Ethsale.json'
import BNBSale from '../abis/BNBSale.json'
async function loadExchange(networkId) {
    if (networkId === 97 || networkId === 56 || networkId === 1337) {
        return BNBSale
    }
    return ETHSale;
}
class Getdata extends Component {
    async loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        this.setState({account: accounts[0]})
      
        const ethBalance = await web3.eth.getBalance(this.state.account)
        this.setState({ethBalance})
      
        // Load Token
        const networkId = await web3.eth.net.getId()
        let Exchange = await loadExchange(networkId);
        const tokenData = Token.networks[networkId]
        if (tokenData) {
            const token = new web3.eth.Contract(Token.abi, tokenData.address)
            this.setState({token});
            let tokenBalance = await token.methods.balanceOf(this.state.account).call()
            this.setState({tokenBalance: tokenBalance.toString()})
        } else {
            window.alert('Token contract not deployed to detected network.')
        }
      
        // Load Exchnage
        const exchangeData = Exchange.networks[networkId]
        if (exchangeData) {
            const exchange = new web3.eth.Contract(Exchange.abi, exchangeData.address)
            const rate = await exchange.methods.rate().call();
            this.setState({rate});
            console.log(rate)
            this.setState({exchangeAddress: exchangeData})
            this.setState({exchange: exchange})
        } else {
            window.alert('exchange contract not deployed to detected network.')
        }
      
        this.setState({loading: false})
      }
    
   

    buyTokens = (lockDuration, etherAmount) => {
        console.log(this.state.exchange.methods);
        this.setState({loading: true})
        this.state.exchange.methods.buyTokens(lockDuration).send({
            value: etherAmount,
            from: this.state.account
        }).on('transactionHash', (hash) => {
            //console.log(etherAmount);
          this.setState({loading: false})
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

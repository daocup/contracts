import { Component } from 'react'
import TokenTimeLock from '../abis/TokenTimeLock.json'; 
class ReleaseService extends Component {
    constructor(exchange, account) {
        super(exchange, account)
        this.exchange = exchange;
        this.account = account;
    }
    getUserWallets = async () => {
       
        if( Object.keys(this.exchange).length !== 0) {
            const userWallets = await this.exchange.methods.getWallets().call();
            return userWallets;
        }
        
    }
    
    getWallet = async (address) => {
       
        const web3 = window.web3
        const lockWallet = new web3.eth.Contract(TokenTimeLock.abi,address)
        const getWallet = await lockWallet.methods.lockData().call();
        return getWallet
    }
    Release = async(address) => {
        try {
        const web3 = window.web3
        const lockWallet = new web3.eth.Contract(TokenTimeLock.abi,address)
        const release = await lockWallet.methods.release().call();
        return release
        } catch (e){
            console.log(e.message);
        }
      
    }
}
export default ReleaseService;

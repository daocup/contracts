import React, {Component} from 'react'
import Web3 from 'web3'
import Token from '../abis/CUP.json'
import ETHSale from '../abis/EthSale.json'
import BNBSale from '../abis/BNBSale.json'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'

async function loadExchange(networkId) {
    if (networkId === 97 || networkId === 56 || networkId === 5777) {
        return BNBSale
    }
    return ETHSale;
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            account: '',
            token: {},
            exchange: {},
            ethBalance: '0',
            tokenBalance: '0',
            loading: true,
            rate: 100000,
        };
        this.buyTokens = this.buyTokens.bind(this);
    }

    async UNSAFE_componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

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

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    buyTokens = (lockDuration, etherAmount) => {
        this.setState({loading: true})
        this.state.exchange.methods.buyTokens(lockDuration).send({
            value: etherAmount,
            from: this.state.account
        }).on('transactionHash', (hash) => {
            this.setState({loading: false})
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

    render() {
        let content
        if (this.state.loading) {
            content = <p id="loader" className="text-center">Loading...</p>
        } else {
            content = <Main
                ethBalance={this.state.ethBalance}
                tokenBalance={this.state.tokenBalance}
                rate={this.state.rate}
                buyTokens={this.buyTokens}
            />
        }

        return (
            <div>
                <Navbar account={this.state.account}/>
                <div className="container-fluid mt-5">
                    <div className="row">
                        <main role="main" className="col-lg-12 ml-auto mr-auto" style={{maxWidth: '600px'}}>
                            <div className="content mr-auto ml-auto">

                                {content}

                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

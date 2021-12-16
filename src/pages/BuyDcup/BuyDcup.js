import React, { Component } from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import InvestForm from './forms/InvestForm';
import ReleaseForm from './forms/ReleaseForm';
import Token from '../../abis/CUP.json'
import ETHSale from '../../abis/Ethsale.json';
import BNBSale from '../../abis/BNBSale.json';
import TokenTimeLock from '../../abis/TokenTimeLock.json'
import Web3 from 'web3';
import Web3Modal from "web3modal";
import MainLayout from "../../layouts/MainLayout"

async function loadExchange(networkId) {
  if (networkId === 97 || networkId === 56 || networkId === 1337) {
    return BNBSale
  }
  return ETHSale;
}

class BuyDcup extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      token: {},
      tokenLockWallet: {},
      exchange: {},
    
      loading: true,
      rate: 0,
    };
  }
  callbackFunction = (childData) => {
    this.setState({ loading: childData })
  }

  async UNSAFE_componentWillMount() {
   await this.loadWeb3()
   if (window.web3) {
     await this.loadBlockchainData()
   }
  }
  
  async loadBlockchainData() {
   
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    if (accounts.length !== 0) {
      this.setState({ account: accounts[0] })
    
    // Load Token
    const networkId = await web3.eth.net.getId()
    const tokenLockData = TokenTimeLock.networks[networkId]
    if (tokenLockData) {
      const tokenLockWallet = new web3.eth.Contract(TokenTimeLock.abi, tokenLockData.address)
      this.setState({ tokenLockWallet });
    } else {
      window.alert('TokenLockData contract not deployed to detected network.')
    }
    let Exchange = await loadExchange(networkId);
    const tokenData = Token.networks[networkId]
    if (tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address)

      this.setState({ token });
      let tokenBalance = await token.methods.balanceOf(this.state.account).call()
      this.setState({ tokenBalance: tokenBalance.toString() })

    } else {
      window.alert('Token contract not deployed to detected network.')
    }

    // Load Exchnage
    const exchangeData = Exchange.networks[networkId]
    if (exchangeData) {
      const exchange = new web3.eth.Contract(Exchange.abi, exchangeData.address)
      const rate = await exchange.methods.rate().call();
      this.setState({ rate });

      this.setState({ exchangeAddress: exchangeData })
      this.setState({ exchange: exchange })
    } else {
      window.alert('exchange contract not deployed to detected network.')
    }
    //console.log(this.state.loading)
     this.setState({ loading: false })
    }
  }

  async loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
       // await window.ethereum.enable()
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
    } else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask! https://metamask.io/download.html')
    }
}
  render() {
    let invest, release
   console.log(this.state.loading)
    if (this.state.loading) {
      invest = release = <p id="loader" className="text-center" > Loading...</p>
    } else {
      invest = <InvestForm

      rate={this.state.rate}
      exchange={this.state.exchange}
      account={this.state.account}
      token={this.state.token}
      loading={this.callbackFunction}
    />
      release = <ReleaseForm
                  exchange={this.state.exchange}
                  account={this.state.account}
                  token={this.state.token}
                  tokenLockWallet={this.state.tokenLockWallet}
                />
    }
    return (
      <>
        <MainLayout>
          <div className="small-container" >
            <Tabs defaultActiveKey="invest" id="uncontrolled-tab-example" className="mb-3" >
              <Tab eventKey="invest" title="Invest" >
                {invest}
                </Tab>
                < Tab eventKey="staking" title="Staking" disabled >

                </Tab>
                <Tab eventKey="release" title="Release" >
                  {release}
                </Tab>
            </Tabs>
          </div>
        </MainLayout>
      </>
    );
  }
}
export default BuyDcup;
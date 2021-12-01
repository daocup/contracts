import React, { Component } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import logorelease from "../RELEASE.svg";
import Getdata from "../components/Getdata";
import BoxProgressBar from "../components/BoxProgressBar";

class ReleaseForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            getUser: [],
            output: '0',
            lockDuration: 3,
            rate: 0,
            getRemain:'0',
            total: 9000000000,
            coin:'bnb',
            defaultTitle: 'BNB',
            defaultPhoto: './img/BNB-Icon-Logo.png',
            isOpen: false,
        }
        
    }
    componentDidMount = () => {
        let ABI_Object = new Getdata(this.props.exchange,this.props.account,this.props.token,this.props.loading,this.props.tokenLockWallet);
        ABI_Object.getUserWallets().then(data =>{
            this.setState({getUser: data})
        })
        ABI_Object.getWallet().then(dataWallet => {
            console.log(dataWallet)
        })
    }
   
    render() {
  
    // // this.props.tokenLockWallet.methods.lockData().call().then(dataLock=>{
    // //     console.log(dataLock)
    // })
    console.log('tokenLockWallet',this.props.tokenLockWallet)
    let ABI_Object = new Getdata(this.props.exchange,this.props.account,this.props.token,this.props.loading,this.props.tokenLockWallet);

    return (
        
    <>
        <div id="form_release">
            <div className="i_left">
                <img src={logorelease} />
                <p>Release your tokens</p>
            </div>
            <BoxProgressBar 
                 exchange = {this.props.exchange}
                 account ={this.props.account}
                 token = {this.props.token}
                />
                
           {
               this.state.getUser.map(item=>{
                   return (
                    <div className="p_wallet top">
                    <div className="p_wallet_top">Wallet Address: <span>{item} </span><a href="#">bit.com/ansidk</a></div>
                    <div className="p_bar_per">
                        <div className="p_40">
                            <ProgressBar completed={60} customLabel=" " height='6px' baseBgColor='#1C2D3F' bgColor='#1FF493' />
                            <span>40%</span>
                        </div>
                        <div className="p_30">
                            <ProgressBar completed={0} customLabel=" " height='6px' baseBgColor='#1C2D3F' bgColor='#1FF493' />
                            <span>30%</span>
                        </div>
                        <div className="p_20">
                            <ProgressBar completed={0} customLabel=" " height='6px' baseBgColor='#1C2D3F' bgColor='#1FF493' />
                            <span>20%</span>
                        </div>
                        <div className="p_10">
                            <ProgressBar completed={0} customLabel=" " height='6px' baseBgColor='#1C2D3F' bgColor='#1FF493' />
                            <span>10%</span>
                        </div>
                    </div>
                    <div className="info_release">
                        <div className="next_rel">
                            <span> Next Release:</span><br />
                            11 Oct, 2021 6:30PM
                        </div>
                        <div className="purchase_rel">
                            <span>Purchase Time:</span><br />
                            11 Oct, 2020 6:30PM
                        </div>
                        <div className="total_rel">
                            <span>Total Coins:</span> <br />
                            120,000,000
                        </div>
                    </div>
                    <button type="button" className="btn_rel"  onClick={() => ABI_Object.Release(item)}>Release</button>
                </div>
                   )
               })
            }
        </div>
          </>       
    );
    }
};
export default ReleaseForm;

import React, { Component } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import logorelease from "../../../assets/images/RELEASE.svg";
import ReleaseService from '../../../services/ReleaseService';
import DcupSole from '../../../components/DcupSole/DcupSole';
import {timeConverter} from '../../../helpers/timedate';
class ReleaseForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            getUser: [],
            releasePercents: {},
            amount:'0',
            listRelease:[],
        }
        this.releaseService = new ReleaseService(this.props.exchange, this.props.account);
    }
  
    componentDidMount() {
        let arrayResult = []
        this.releaseService.getUserWallets().then(data => {
            
            data.map(item=> {
                
               this.releaseService.getWallet(item).then(result=>{
                    
                    let itemTemple = {
                        key: item,
                        dataResult: result
                    }
                    arrayResult.push(itemTemple)
                    this.setState({listRelease: arrayResult})
                })
            })
        })
       
        
    }
    
    render() {  
        return (

            <>
                <div id="form_release">
                    <div className="i_left">
                        <img alt="logorelease" src={logorelease} />
                        <p>Release your tokens</p>
                    </div>
                    <DcupSole
                        exchange={this.props.exchange}
                        account={this.props.account}
                        token={this.props.token}
                    />

                    {
                        this.state.listRelease.map((item,index) => {
                            var nowdate = new Date / 1E3 | 0;
                            var nexttime = Number(item.dataResult.startDate_) + Number(item.dataResult.lockDurations_[item.dataResult.nextReleaseIdx_])
                            var nexttime40 = Number(item.dataResult.startDate_) + Number(item.dataResult.lockDurations_[0])
                            var nexttime30 = Number(item.dataResult.startDate_) + Number(item.dataResult.lockDurations_[1])
                            var nexttime20 = Number(item.dataResult.startDate_) + Number(item.dataResult.lockDurations_[2])
                            var nexttime7 = Number(item.dataResult.startDate_) + Number(item.dataResult.lockDurations_[3])
                            var nexttime3 = Number(item.dataResult.startDate_) + Number(item.dataResult.lockDurations_[4])
                            var totalcoin = window.web3.utils.fromWei(item.dataResult.amount_,'Ether')
                                return (
                                    <div className="p_wallet top" key={index}>
                                        <div className="p_wallet_top">Wallet Address: <span>{item.key} </span><a href="bit.com/ansidk">bit.com/ansidk</a></div>
                                       
                                        <div className="p_bar_per">
                                             <div className="p_40">
                                                <ProgressBar completed={nexttime40 < nowdate ? 100 : 0} customLabel=" " height='6px' baseBgColor='#1C2D3F' bgColor='#1FF493' />
                                                <span>{item.dataResult.releasePercents_[0]}%</span>
                                            </div>
                                            <div className="p_30">
                                                <ProgressBar completed={nexttime30 < nowdate ? 100 : 0} customLabel=" " height='6px' baseBgColor='#1C2D3F' bgColor='#1FF493' />
                                                <span>{item.dataResult.releasePercents_[1]}%</span>
                                            </div>
                                            <div className="p_20">
                                                <ProgressBar completed={nexttime20 < nowdate ? 100 : 0} customLabel=" " height='6px' baseBgColor='#1C2D3F' bgColor='#1FF493' />
                                                <span>{item.dataResult.releasePercents_[2]}%</span>
                                            </div>
                                            <div className="p_7">
                                                <ProgressBar completed={nexttime7 < nowdate ? 100 : 0} customLabel=" " height='6px' baseBgColor='#1C2D3F' bgColor='#1FF493' />
                                                <span>{item.dataResult.releasePercents_[3]}%</span>
                                            </div>
                                            <div className="p_3">
                                                <ProgressBar completed={nexttime3 < nowdate ? 100 : 0} customLabel=" " height='6px' baseBgColor='#1C2D3F' bgColor='#1FF493' />
                                                <span>{item.dataResult.releasePercents_[4]}%</span>
                                            </div>
                                            
                                        </div>
                                        <div className="info_release">
                                            <div className="next_rel">
                                                <span> Next Release:</span><br />
                                                {timeConverter(nexttime)}
                                            </div>
                                            <div className="purchase_rel">
                                                <span>Purchase Time:</span><br />
                                                {timeConverter(item.dataResult.startDate_)}
                                            </div>
                                            <div className="total_rel">
                                                <span>Total Coins:</span> <br />
                                               {Number(totalcoin).toLocaleString('en-US')}
                                            </div>
                                        </div>
                                        <button type="button" className="btn_rel" onClick={() => this.releaseService.Release(item.key)}>Release</button>
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

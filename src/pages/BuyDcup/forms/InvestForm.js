import React, { Component } from 'react';
import logoinvest from "../../../assets/images/INVEST.svg";
import InvestService from '../../../services/InvestService';
import DcupSole from '../../../components/DcupSole/DcupSole';
class InvestForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            output: '0',
            lockDuration: 3,
            rate: 0,
            coin: 'bnb',
            defaultTitle: 'BNB',
            defaultPhoto: './img/BNB-Icon-Logo.png',
            isOpen: false,
        }
        this.investService = new InvestService(this.props.exchange, this.props.account, this.props.token, this.props.loading);
    }
    Onsubmit = (event) => {
        event.preventDefault()
        let etherAmount
        etherAmount = this.input.value.toString()
        etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
        this.investService.buyTokens(this.state.lockDuration, etherAmount)
    }
    Onchange = (event) => {
        const etherAmount = Number(event.target.value)
        this.setState({
            output: etherAmount * this.props.rate
        })
    }
    handleSelect = (photo, coinTitle) => {
        if (!this.state.isOpen) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
            defaultPhoto: photo,
            defaultTitle: coinTitle,
        }));
    };
    handleOpen = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
        }));
    }

    handleOutsideClick = () => {
        this.handleSelect();
    };

    changeCoin(event) {
        this.setState({ coin: event.target.value });
    }

    setLockDuration(event) {
        this.setState({ lockDuration: parseInt(event.target.value) })
    }

    render() {
        const { defaultPhoto, defaultTitle } = this.state;
        const data = [
            {
                coinTitle: 'BNB',
                photo: './img/BNB-Icon-Logo.png',
            },
            {

                coinTitle: 'ETH',
                photo: './img/Ethereum.png',
            }
        ];

        return (
            <div id="form_invest">
                <div className="i_left">
                    <img alt="logoinvest" src={logoinvest} />
                    <p>Buy tokens instantly</p>
                </div>
                <DcupSole
                    exchange={this.props.exchange}
                    account={this.props.account}
                    token={this.props.token}
                />
                <form onSubmit={this.Onsubmit}>
                    <div className="amount_input">
                        <label htmlFor="amout">
                            Amount
                        </label>
                        <input
                            id="amout"
                            name="amout"
                            placeholder="0.0"
                            className="form-control"
                            onChange={this.Onchange}
                            ref={(input) => {
                                this.input = input
                            }}
                        />
                        <div className="r_icon">
                            <div className='option-custom'>
                                <div className='select-input' onClick={this.handleOpen}>
                                    <img alt="" src={defaultPhoto} />
                                    <span className="select-title">{defaultTitle}</span>
                                </div>

                                {this.state.isOpen ?
                                    <div className='select-list'>
                                        {data.map((item, index) => (
                                            <div
                                                key={index}
                                                onClick={() => this.handleSelect(data[index].photo, data[index].coinTitle)}
                                                className='select-item'
                                            >
                                                <img alt="" src={item.photo} />
                                                <span className='select-title'>{item.coinTitle}</span>
                                            </div>
                                        ))}
                                    </div>
                                    : ''
                                }
                            </div>
                        </div>
                    </div>
                    <div className="getamount_input">
                        <label htmlFor="getamount">
                            You will get
                        </label>

                        <input
                            id="getamount"
                            name="getamount"
                            disabled="disabled"
                            className="form-control"
                            value={this.state.output}
                        />
                        <span className="float-right text-muted">


                        </span>
                        <div className="r_icon">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10 0C15.5156 0 20 4.48006 20 10C20 15.5199 15.5156 20 10 20C4.48438 20 0 15.5199 0 10C0 4.48006 4.48438 0 10 0Z" fill="#1FF493" />
                                <path d="M13.3816 13.4582V11.8569L10.0001 13.234L6.61865 11.8569V13.4582L8.91037 14.3869V14.7071C8.91037 15.3156 8.41356 15.796 7.8206 15.796H7.19559V16.5966H12.8367V15.796H12.2117C11.6027 15.796 11.122 15.2996 11.122 14.7071V14.3869L13.3816 13.4582Z" fill="#02172D" />
                                <path d="M13.3816 13.4582V11.8569L10.0001 13.234L6.61865 11.8569V13.4582L8.91037 14.3869V14.7071C8.91037 15.3156 8.41356 15.796 7.8206 15.796H7.19559V16.5966H12.8367V15.796H12.2117C11.6027 15.796 11.122 15.2996 11.122 14.7071V14.3869L13.3816 13.4582Z" fill="#02172D" />
                                <path d="M13.3814 13.4581V11.8569L10 13.2339V16.6124H12.8205V15.8118H12.1955C11.5865 15.8118 11.1057 15.3155 11.1057 14.723V14.4028L13.3814 13.4581Z" fill="#02172D" />
                                <path d="M8.89432 5.72387L5.09616 4.17067C5.04808 4.15466 5 4.18668 5 4.23472V5.2435V5.90001V7.54928C5 7.58131 5.01603 7.59732 5.04808 7.61333L6.28208 8.10972C6.33016 8.12573 6.37824 8.0937 6.37824 8.04567V6.55652C6.37824 6.50848 6.42631 6.47645 6.47439 6.49247L7.7725 7.02087C7.86865 7.06891 7.94878 7.16499 7.94878 7.27707V9.63089C7.94878 9.67893 7.90071 9.71096 7.85263 9.69494L5.09616 8.57408C5.04808 8.55806 5 8.59009 5 8.63813V10.2714C5 10.3034 5.01603 10.3194 5.04808 10.3354L7.94878 11.5204L9.50331 12.1448C9.55138 12.1609 9.59946 12.1288 9.59946 12.0808V6.74866C9.58344 6.30032 9.31099 5.90001 8.89432 5.72387Z" fill="#02172D" />
                                <path d="M10.4004 6.74925V12.0814C10.4004 12.1294 10.4485 12.1614 10.4965 12.1454L12.0511 11.5209L14.9518 10.336C14.9838 10.32 14.9999 10.304 14.9999 10.272V8.63872C14.9999 8.59068 14.9518 8.55865 14.9037 8.57467L12.1472 9.69553C12.0991 9.71155 12.0511 9.67952 12.0511 9.63148V7.29367C12.0511 7.18159 12.1152 7.08551 12.2274 7.03748L13.5255 6.50907C13.5735 6.49306 13.6216 6.52508 13.6216 6.57312V8.06227C13.6216 8.11031 13.6697 8.14233 13.7178 8.12632L14.9518 7.62993C14.9838 7.61392 14.9999 7.59791 14.9999 7.56589V5.91661V5.2601V4.25132C14.9999 4.20328 14.9518 4.17126 14.9037 4.18727L11.1055 5.74047C10.6728 5.9006 10.4004 6.30091 10.4004 6.74925Z" fill="#02172D" />
                            </svg>
                            DCup
                        </div>
                    </div>
                    <div role="group" aria-labelledby="my-radio-group" className="group_bonus" onChange={this.setLockDuration.bind(this)}>
                        <div>
                            <input type="radio" name="bonus" value="3" defaultChecked />
                            <label>
                                3 months<br />
                                10% Bonus
                            </label>
                        </div>
                        <div>

                            <input type="radio" name="bonus" value="6" />
                            <label>
                                6 months<br />
                                20% Bonus
                            </label>
                        </div>
                        <div>

                            <input type="radio" name="bonus" value="12" />
                            <label>
                                12 months<br />
                                50% Bonus
                            </label>
                        </div>

                    </div>
                    <button type="submit">Swap Now</button>
                </form>
            </div>
        );
    }
}
export default InvestForm;

import React from "react";
import logo from "../../assets/images/logo.svg";
import Web3Modal from "web3modal";
import {PATH} from "../../constants/paths"
import WalletConnectProvider from "@walletconnect/web3-provider";
import {
  getChainData
} from "../../helpers/utilities";
import { BrowserRouter,NavLink } from "react-router-dom";
import Fortmatic from "fortmatic";
import Torus from "@toruslabs/torus-embed";
import Authereum from "authereum";
import { Bitski } from "bitski";
// Stateless Functional Component
interface IAppState {
  chainId: number;
}
const INITIAL_STATE: IAppState = {
  chainId: 1,
};

class SideNav extends React.Component<any, any> {
  public web3Modal: Web3Modal;
  public state: IAppState;
  constructor(props: any) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };
    this.web3Modal = new Web3Modal({
      network: this.getNetwork(),
      cacheProvider: true,
      providerOptions: this.getProviderOptions()
    });
  }
  public componentDidMount() {
    if (this.web3Modal.cachedProvider) {
      this.onConnect();
    }
  }
  public onConnect = async () => {
    const provider = await this.web3Modal.connect();
    window.onfocus = () => {
        window.location.reload();
        this.web3Modal.clearCachedProvider();
    }
  };
  
  public getNetwork = () => getChainData(this.state.chainId).network;
  public getProviderOptions = () => {
  
    const providerOptions = {
      
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "process.env.INFURA_API_KEY" // required
        }
      },
      torus: {
        package: Torus
      },
      fortmatic: {
        package: Fortmatic,
        options: {
          key: "FORTMATIC_KEY"
        }
      },
      authereum: {
        package: Authereum
      },
      bitski: {
        package: Bitski,
        options: {
          clientId: "BITSKI_CLIENT_ID", // required
          callbackUrl: "BITSKI_CALLBACK_URL" // required
        }
      }
    };
    return providerOptions;
  };
  
  render = () => {
    return (
      <nav className="navbar navbar-light">
        <div className="navbar-brand">
          <img alt="logo" src={logo}/>
        </div>
        <div className="navbar-menu">
        <BrowserRouter>
            <ul>
                <li><NavLink activeClassName='is-active' exact to={PATH.HOME}>Home</NavLink></li>
                <li><NavLink activeClassName='is-active' exact to='/Whitepaper'>Whitepaper</NavLink></li>
                <li><NavLink activeClassName='is-active' exact to={PATH.BUYDCUP}>Buy DCup</NavLink></li>
                <li><NavLink activeClassName='is-active' exact to='/contact'>Contact</NavLink></li>
                <li className="btn_wallet"><button onClick={this.onConnect}>Connect Wallet</button></li>
            </ul>
            </BrowserRouter>
        </div>
      </nav>
    );
  }
};
export default SideNav;
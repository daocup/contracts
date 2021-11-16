import React from "react";
import BuyDcup from "./buydcup";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./navbar";
import "./App.css";
import Web3Provider from 'web3-react'
import {connectors} from "./Connectors"
const App = () => {
  return (
    <>
    
    <NavBar/>
    <Router>
      <Switch>
        <Route path="/buy-dcup" exact>
        <Web3Provider
               connectors={connectors}
            libraryName={'ethers.js'}
          >
          <BuyDcup />
          </Web3Provider>
        </Route>
      </Switch>
    </Router>
    </>
  );
};

export default App;
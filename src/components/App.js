import React from "react";
import BuyDcup from "./buydcup";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./navbar";
import "./App.css";
const App = () => {
  return (
    <>
    
    <NavBar/>
    <Router>
      <Switch>
        <Route path="/buy-dcup" exact>
          <BuyDcup />
        </Route>
      </Switch>
    </Router>
    </>
  );
};

export default App;
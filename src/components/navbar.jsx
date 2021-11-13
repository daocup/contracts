import React from "react";
import logo from "../logo.svg";
import { BrowserRouter,NavLink } from "react-router-dom";
// Stateless Functional Component

const NavBar = () => {
  return (
    <nav className="navbar navbar-light">
      <div className="navbar-brand">
         <img src={logo}/>
      </div>
      <div className="navbar-menu">
      <BrowserRouter>
          <ul>
              <li><NavLink activeClassName='is-active' to='/Home'>Home</NavLink></li>
              <li><NavLink activeClassName='is-active' to='/Whitepaper'>Whitepaper</NavLink></li>
              <li><NavLink activeClassName='is-active' to='/#/buy-dcup'>Buy DCup</NavLink></li>
              <li><NavLink activeClassName='is-active' to='/contact'>Contact</NavLink></li>
              <li className="btn_wallet"><a href="#">Connect Wallet</a></li>
          </ul>
          </BrowserRouter>
      </div>
    </nav>
  );
};

export default NavBar;
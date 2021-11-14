import React from 'react';
import {ReactComponent as LogoText} from "../assets/logo-text.svg";
import { List } from 'phosphor-react';

const HeaderMenu = props => {
  return (
    <div className={"header-menu"}>
      <div className={"header-logo"}><LogoText/></div>
      <div className='main-menu'>
        <div className='menu-item'>Home</div>
        <div className='menu-item'>Whitepaper</div>
        <div className='menu-item active'>Buy DCup</div>
        <div className='menu-item'>Contact</div>
        <div className='menu-item menu-item-button'>Connect Wallet</div>
      </div>

      <div className={"menu-collapsed"}>
        <List size={32} color={"#F3F3F4"} />
      </div>
    </div>
  );
};

HeaderMenu.propTypes = {

};

export default HeaderMenu;
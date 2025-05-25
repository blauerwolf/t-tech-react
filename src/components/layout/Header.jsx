import React from "react";
import { Link } from 'react-router-dom'

import "../../styles/Header.css";
import { Nav } from "./Nav";
import logo from '../../assets/gala-shop.svg';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="site-logo">
          <Link to="/">
            <img src={ logo } alt="Logo" />          
          </Link>
        </div>
        <Nav />
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import "../styles/Header.css";

import { Nav } from "./Nav";
import logo from '../assets/gala-shop.svg';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="site-logo">
          <img src={ logo } alt="Logo" />
        </div>
        <Nav />
      </div>
    </header>
  );
};

export default Header;

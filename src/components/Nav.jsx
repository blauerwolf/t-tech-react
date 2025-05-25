import React from "react";
import { Link } from 'react-router-dom'

import "../styles/Header.css";


export const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav-list main-menu">
        <li className="nav-item">
          <Link to="/">Inicio</Link>
        </li>
        <li className="nav-item">
          <Link to="/servicios">Servicios</Link>
        </li>
        <li className="nav-item">
          <Link to="/nosotros">Nosotros</Link>
        </li>
        <li className="nav-item">
          <Link to="/contacto">Contacto</Link>
        </li>
      </ul>
      <ul className="nav-list login-menu">
        <li className="nav-item">
            <Link to="/login">Iniciar sesión</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

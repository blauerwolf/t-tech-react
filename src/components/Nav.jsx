import React from "react";
import "../styles/Header.css";

export const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <a href="/">Inicio</a>
        </li>
        <li className="nav-item">
          <a href="/servicios">Servicios</a>
        </li>
        <li className="nav-item">
          <a href="/nosotros">Nosotros</a>
        </li>
        <li className="nav-item">
          <a href="/contacto">Contacto</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

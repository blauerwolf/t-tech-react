import React from "react";
import { NavLink } from 'react-router-dom'

import "../styles/Header.css";


export const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav-list main-menu">
        <li className="nav-item">
          <NavLink to="/"  className={({ isActive }) => isActive ? "nav-link active" : "nav-link" }>Inicio</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/servicios" className={({ isActive }) => isActive ? "nav-link active" : "nav-link" }>Servicios</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/nosotros" className={({ isActive }) => isActive ? "nav-link active" : "nav-link" }>Nosotros</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/contacto" className={({ isActive }) => isActive ? "nav-link active" : "nav-link" }>Contacto</NavLink>
        </li>
      </ul>
      <ul className="nav-list login-menu">
        <li className="nav-item">
            <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link" }>Iniciar sesión</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

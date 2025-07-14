import React from "react";

import { NavLink } from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa";
import { Nav } from 'react-bootstrap';

import "../../styles/Header.css"
import { UserMenu } from './UserMenu'


export const NavEntries = () => {
  return (
    <Nav className="nav ms-auto">
      <ul className="nav-list main-menu">
        <li className="nav-item">
          <NavLink to="/"  className={({ isActive }) => isActive ? "nav-link active" : "nav-link" }>Inicio</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/productos" className={({ isActive }) => isActive ? "nav-link active" : "nav-link" }>Productos</NavLink>
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
            <NavLink to="/carrito" className={({ isActive }) => isActive ? "nav-link active cart-icon" : "nav-link cart-icon" }>
              <FaShoppingCart />
            </NavLink>
        </li>
      </ul>
      <ul className="nav-list login-menu">
        <li className="nav-item">
          <UserMenu />
        </li>
      </ul>
    </Nav>
  );
};

export default NavEntries;

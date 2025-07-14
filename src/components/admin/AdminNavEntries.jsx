import React from "react";

import { NavLink } from 'react-router-dom'
import { Nav } from 'react-bootstrap';

import "../../styles/Header.css"
import { UserMenu } from '../'


export const AdminNavEntries = () => {
  return (
    <Nav className="nav ms-auto">
      <ul className="nav-list main-menu">
        <li className="nav-item">
          <NavLink to="/admin" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link" }>Inicio</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/productos" className={({ isActive }) => isActive ? "nav-link active" : "nav-link" }>Productos</NavLink>
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

export default AdminNavEntries;

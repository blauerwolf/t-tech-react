import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { NavLink } from 'react-router-dom'
import Image from 'react-bootstrap/Image';

import { useAuth } from '../../providers/AuthContext';
import { NavEntries, AdminNavEntries } from "../";
import logo from "../../assets/gala-shop.svg";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Header.css";

export const TopBar = () => {
  const { isAdmin } = useAuth();
  return (
    <Navbar bg="light" expand="lg" className="header">
      <Container>
        <Navbar.Brand as={NavLink} to={isAdmin ? "/admin" : "/"}>
          <Image src={logo} width={100} height={100} className="site-logo" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {isAdmin ? <AdminNavEntries /> : <NavEntries />}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopBar;

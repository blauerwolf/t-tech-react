import React from "react";
import { Navbar, Container } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import NavEntries from "./NavEntries";
import logo from "../../assets/gala-shop.svg";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Header.css";

export const TopBar = () => {
  return (
    <Navbar bg="light" expand="lg" className="header">
      <Container>
        <Navbar.Brand href="/">
          <Image src={logo} width={100} height={100} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <NavEntries />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopBar;

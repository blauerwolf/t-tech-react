import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export const TopBar = () => {
  return (
    <Navbar bg="light" expand="lg" sticky="top" className="border-bottom">
      <Container>
        <Navbar.Brand href="#inicio" className="me-auto">
          {/* Aquí podrías colocar un logo si lo tienes */}
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="mx-2">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/productos" className="mx-2">Productos</Nav.Link>
            <Nav.Link as={Link} to="/nosotros" className="mx-2">Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/contacto" className="mx-2">Contacto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};


export default TopBar;
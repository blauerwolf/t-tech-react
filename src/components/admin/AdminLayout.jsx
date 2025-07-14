import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';
import '../../styles/AdminLayout.css'; 

export const AdminLayout = () => {
  return (
    <Container fluid className="admin-layout mt-5">
      <Row>
        {/* Sidebar */}
        <Col xs={12} md={3} lg={2} className="bg-dark text-white min-vh-100 p-3 admin-sidebar">
          <h4 className="mb-4">Panel Admin</h4>
          <Nav className="flex-column">
            <Nav.Link as={NavLink} to="/admin" end className="text-white">Dashboard</Nav.Link>
            <Nav.Link as={NavLink} to="/admin/productos" className="text-white">Productos</Nav.Link>
            <Nav.Link as={NavLink} to="/admin/usuarios" className="text-white">Usuarios</Nav.Link>
            <Nav.Link as={NavLink} to="/admin/ordenes" className="text-white">Órdenes</Nav.Link>
          </Nav>
        </Col>

        {/* Contenido principal */}
        <Col xs={12} md={9} lg={10} className="p-4">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLayout;

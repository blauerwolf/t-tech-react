import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

import '../../styles/AdminDashboard.css';

export const AdminDashboard = () => {
  return (
    <Container fluid>
      <h2 className="mb-4">Dashboard de Administrador</h2>

      <Row>
        <Col md={6} lg={3} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Total Productos</Card.Title>
              <Card.Text className="display-6">120</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Total Usuarios</Card.Title>
              <Card.Text className="display-6">58</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Órdenes Pendientes</Card.Title>
              <Card.Text className="display-6">8</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Ingresos Mensuales</Card.Title>
              <Card.Text className="display-6">$12.300</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;

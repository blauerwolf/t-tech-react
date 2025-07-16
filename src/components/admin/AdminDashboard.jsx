import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { obtenerCantidadProductos } from '../../auth/firebase';

import '../../styles/AdminDashboard.css';

export const AdminDashboard = () => {

  const [totalProductos, setTotalProductos] = useState(0);

  useEffect(() => {
    obtenerCantidadProductos()
    .then(count => setTotalProductos(count))
    .catch(err => console.error(err));
  }, []);

  return (
    <Container fluid className="mt-5">
      <h2 className="mb-4">Dashboard de Administrador</h2>

      <Row>
        <Col md={6} lg={3} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Total Productos</Card.Title>
              <Card.Text className="display-6">{totalProductos}</Card.Text>
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

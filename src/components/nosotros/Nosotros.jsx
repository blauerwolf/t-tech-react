import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Helmet } from 'react-helmet';

import "../../styles/Nosotros.css";

export const Nosotros = () => {

  const nombreApp = import.meta.env.VITE_NOMBRE_APP;
  return (
    <>
      <Helmet>
        <title>Sobre nosotros - {nombreApp}</title>
      </Helmet>

      <section className="shopping-info py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} className="shopping-info-content text-center">
              <h2 className="shopping-title mb-3">Gala Shopping</h2>
              <p className="shopping-description mb-4">
                Bienvenido a Gala Shop, el destino ideal para tus compras,
                gastronomía y entretenimiento.
              </p>
              <ul className="shopping-details list-unstyled">
                <li>
                  <strong>Dirección:</strong> Av. 13 N° 798 La Plata
                </li>
                <li>
                  <strong>Horario:</strong> Lunes a Domingos de 10:00 a 22:00 hs
                </li>
                <li>
                  <strong>Teléfono:</strong> (0221) 444-4444
                </li>
                <li>
                  <strong>Email:</strong> info@galashop.com
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Nosotros;

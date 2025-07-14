import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Button } from "react-bootstrap";

import "../../styles/GenericCard.css";

export const GenericCardBt = ({ titulo, bajada, textoBoton, destino }) => {
  const navigate = useNavigate();

  const hrefBoton = () => {
    navigate(destino);
  };

  return (
    <Container className="main-card-container">
      <Card className="main-card text-center">
        <Card.Body className="card-content">
          <Card.Title as="h2">{titulo}</Card.Title>
          <Card.Text>{bajada}</Card.Text>
          <Button className="card-button" onClick={hrefBoton} variant="dark">
            {textoBoton}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};


export default GenericCardBt;

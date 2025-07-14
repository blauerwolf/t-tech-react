import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

import '../../styles/ProductCard.css'

// Utilizo componentes de react-bootstrap
export const ProductCard = ({ id, image, name, price }) => {
  return (
    <Card className="product-card text-center">
      <Card.Img variant="top" src={ image } alt={ name} className="product-image"></Card.Img>
      <Card.Body className="product-info">
        <Card.Title as="h3" className="product-name">{ name }</Card.Title>
        <Card.Text className="product-price">${price}</Card.Text>
        <Button as={Link} to={`/producto/${id}`} variant="light" className="product-button">
          Ver detalle
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;

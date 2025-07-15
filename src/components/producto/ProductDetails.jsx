import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import "../../styles/ProductDetails.css";

export const ProductDetails = ({ product, onAddToCart }) => {
  const [cantidad, setCantidad] = useState(1);
  const MySwal = withReactContent(Swal);

  if (!product) return <p>Producto no encontrado</p>;

  console.log(product);

  const precioTotal = (cantidad * product.price).toFixed(2);

  const handleCantidadChange = (e) => {
    setCantidad(Number(e.target.value));
  };

  const handleAddToCart = () => {
    onAddToCart({ ...product, cantidad });
    MySwal.fire({
      title: '¡Producto agregado!',
      text: `Agregaste ${product.name}`,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#4b342c',
    });
  };

  return (
    <Container className="product-detail-container">
      <Row className="g-4">
        <Col md={4} className="d-flex justify-content-center">
          <img src={product.image} alt={product.name} className="detail-image" />
        </Col>
        <Col md={8} className="detail-info">
          <h2 className="detail-title">{product.name}</h2>
          <p className="detail-description">{product.description}</p>
          <p className="detail-price">Precio unitario: ${product.price.toFixed(2)}</p>
          
          <div className="quantity-price-row">
            <div className="quantity-selector">
              <label htmlFor="cantidad">Cantidad:</label>
              <Form.Control
                id="cantidad"
                type="number"
                min="1"
                value={cantidad}
                onChange={handleCantidadChange}
                style={{ width: "60px" }}
              />
            </div>
            <p className="total-price">Precio total: ${precioTotal}</p>
          </div>
          
          <Button
            className="add-to-cart-button"
            onClick={handleAddToCart}
          >
            <FaShoppingCart />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
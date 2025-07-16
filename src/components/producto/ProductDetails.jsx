import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { useAuth } from "../../providers/AuthContext";
import { dispararSweet } from "../../helpers";

import "../../styles/ProductDetails.css";

export const ProductDetails = ({ product, onAddToCart }) => {
  const [cantidad, setCantidad] = useState(1);

  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (!product) return <p>Producto no encontrado</p>;

  const precioTotal = (cantidad * product.price).toFixed(2);

  const handleCantidadChange = (e) => {
    setCantidad(Number(e.target.value));
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      const result = await dispararSweet(
        '¡Necesitas iniciar sesión!',
        'Para agregar productos al carrito, por favor inicia sesión.',
        'warning',
      );

      if (result.isConfirmed) {
        navigate('/login');
      }

      return;
    }

    onAddToCart({ ...product, cantidad });

    dispararSweet(
      '¡Producto agregado!',
      `Agregaste ${product.name}`,
      'success',
      false,
    )
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
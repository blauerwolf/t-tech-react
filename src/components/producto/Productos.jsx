import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { FaSpinner } from "react-icons/fa";
import ProductCard from "./ProductCard";

import "../../styles/Productos.css";

export const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Reemplaza esta URL con tu API real
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al cargar productos:", err);
        setError("Ups! Parece que no pudimos obtener los productos!");
        setCargando(false);
      });
  }, []);


  if (cargando) {
     return (
      <Container className="productos-container text-center my-5">
        <h2 className="productos-title mb-3">Cargando productos...</h2>
        <Spinner animation="border" role="status" variant="secondary" className="spinner-icon">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  } else if (error) {
    return (
      <Container className="productos-container text-center my-5">
        <p>{error}</p>
      </Container>
    );
  } else {
    return (
      <Container className="productos-container my-5">
        <h2 className="productos-title text-center mb-4">Nuestros Productos</h2>
        <Row className="productos-grid g-4">
          {productos.map((producto) => (
            <Col key={producto.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard
                id={producto.id}
                image={producto.image}
                name={producto.title}
                price={producto.price}
              />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
};

export default Productos;

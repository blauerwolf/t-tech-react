import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import ProductCard from "./ProductCard";

import { fetchProductos } from "../../auth/firebase";

import "../../styles/Productos.css";

export const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const [productosCarrito, setProductosCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  const loadProductos = async () => {
    
    try {
      setCargando(true);
      const { productos: nuevosProductos, lastDoc: nuevoLastDoc } =
        await fetchProductos({
          pageSize: 10,
          lastDoc,
        });

      setProductos((prev) => [...prev, ...nuevosProductos]);
      setLastDoc(nuevoLastDoc);

      // Si devolvió menos de 10, no quedan más
      if (!nuevoLastDoc || nuevosProductos.length < 10) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error al cargar productos: ", err);
      setError("Parece que no pudimos obtener los productos!");
    } finally {
      setCargando(false);
    }
  };

  // Cargo el primer lote al montar
  useEffect(() => {
    loadProductos();
  }, []);


  //if (cargando) {
  if (cargando && productos.length === 0) {
    return (
      <Container className="productos-container text-center my-3">
        <h2 className="productos-title mb-3">Cargando productos...</h2>
        <Spinner
          animation="border"
          role="status"
          variant="secondary"
          className="spinner-icon"
        >
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="productos-container text-center my-3">
        <p>{error}</p>
      </Container>
    );
  }

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

      {hasMore && (
        <div className="text-center mt-4">
          <button
            className="btn btn-dark"
            onClick={loadProductos}
            disabled={cargando}
          >
            {cargando ? "Cargando..." : "Cargar más"}
          </button>
        </div>
      )}
    </Container>
  );
};

export default Productos;

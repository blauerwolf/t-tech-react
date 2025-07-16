import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet";
import ProductCard from "./ProductCard";
import { fetchProductos, buscarProductosPorNombre } from "../../auth/firebase";

export const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const cargarProductos = async (lastDocParam = null) => {
    try {
      setCargando(true);

      const { productos: nuevosProductos, lastDoc: nuevoLastDoc } =
        await fetchProductos({
          pageSize: 10,
          lastDoc: lastDocParam,
        });

      if (lastDocParam) {
        // Si estamos cargando la siguiente página, concatenar los productos
        setProductos((prev) => [...prev, ...nuevosProductos]);
      } else {
        // Si es la primera carga o recarga, reemplazar el listado
        setProductos(nuevosProductos);
      }

      setLastDoc(nuevoLastDoc);
      setHasMore(!!nuevoLastDoc && nuevosProductos.length === 10);
    } catch (err) {
      setError("No pudimos obtener los productos.");
    } finally {
      setCargando(false);
    }
  };

  const handleBuscar = async (e) => {
    const valor = e.target.value;
    setSearchTerm(valor);

    if (valor.trim() === "") {
      // Si se borra el input, recargo todos los productos desde cero
      setLastDoc(null);
      setHasMore(true);
      cargarProductos(null); // llamar sin lastDoc para cargar desde el inicio
      return;
    }

    try {
      setCargando(true);
      const productosEncontrados = await buscarProductosPorNombre(
        valor.trim().toLowerCase()
      );
      setProductos(productosEncontrados);
      setHasMore(false); // no hay paginación para búsqueda
      setLastDoc(null); // resetear lastDoc porque estamos en búsqueda
    } catch (err) {
      console.error("Error buscando productos:", err);
      setError("Error buscando productos.");
    } finally {
      setCargando(false);
    }
  };

  // Cargo el primer lote de productos
  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <>
      <Helmet>
        <title>Productos</title>
      </Helmet>

      <Container className="productos-container my-5">
        <h2 className="productos-title text-center mb-4">Nuestros Productos</h2>

        <Form className="mb-4">
          <Form.Control
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={handleBuscar}
          />
        </Form>

        {cargando && productos.length === 0 ? (
          <div className="text-center">
            <Spinner animation="border" variant="secondary" />
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Row className="productos-grid g-4">
            {productos.map((producto) => (
              <Col key={producto.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard
                  id={producto.id}
                  image={producto.image}
                  name={producto.name}
                  price={producto.price}
                />
              </Col>
            ))}
          </Row>
        )}

        {hasMore && !cargando && (
          <div className="text-center mt-4">
            <button
              className="card-button"
              onClick={() => cargarProductos(lastDoc)}
            >
              Cargar más
            </button>
          </div>
        )}
      </Container>
    </>
  );
};

export default Productos;

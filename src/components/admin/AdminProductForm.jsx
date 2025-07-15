import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

import { collection, addDoc } from 'firebase/firestore';

export const AdminProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
    rating: {
      rate: '',
      count: ''
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'rate' || name === 'count') {
      setProduct(prevProduct => ({
        ...prevProduct,
        rating: {
          ...prevProduct.rating,
          [name]: value
        }
      }));
    } else {
      setProduct(prevProduct => ({
        ...prevProduct,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Convertir price, rate y count a números
      const newProduct = {
        ...product,
        price: parseFloat(product.price),
        rating: {
          rate: parseFloat(product.rating.rate),
          count: parseInt(product.rating.count, 10)
        }
      };

      // Validar que los campos numéricos son números válidos
      if (isNaN(newProduct.price) || isNaN(newProduct.rating.rate) || isNaN(newProduct.rating.count)) {
        throw new Error('El precio, la calificación (rate) y el conteo (count) deben ser números válidos.');
      }

      // Añadir el documento a la colección 'products' en Firestore
      const docRef = await addDoc(collection(db, 'products'), newProduct);
      console.log('Documento escrito con ID: ', docRef.id);
      setSuccess(true);
      // Limpiar el formulario después de la carga exitosa
      setProduct({
        name: '',
        price: '',
        description: '',
        category: '',
        image: '',
        rating: {
          rate: '',
          count: ''
        }
      });
    } catch (err) {
      console.error('Error al añadir el documento: ', err);
      setError(err.message || 'Error al guardar el producto. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">Cargar Nuevo Producto</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Producto cargado exitosamente. ID: {success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formProductName">
            <Form.Label className="product-name">Nombre del Producto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Teclado Mecánico"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formProductPrice">
            <Form.Label className="product-name">Precio</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              placeholder="Ej: 49.99"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formProductDescription">
          <Form.Label className="product-name">Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Descripción detallada del producto..."
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formProductCategory">
            <Form.Label className="product-name">Categoría</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: electronics, jewelry, men's clothing"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formProductImage">
            <Form.Label className="product-name">URL de Imagen</Form.Label>
            <Form.Control
              type="url"
              placeholder="Ej: https://ejemplo.com/imagen.jpg"
              name="image"
              value={product.image}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label className="product-name">Calificación (Rating)</Form.Label>
            <Form.Group controlId="formProductRate">
              <Form.Label className="small-label">Rate (1.0 - 5.0)</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                min="0"
                max="5"
                placeholder="Ej: 4.5"
                name="rate"
                value={product.rating.rate}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Label>&nbsp;</Form.Label> {/* Espacio para alinear labels */}
            <Form.Group controlId="formProductCount">
              <Form.Label className="product-name">Cantidad (Número de reviews)</Form.Label>
              <Form.Control
                type="number"
                min="0"
                placeholder="Ej: 120"
                name="count"
                value={product.rating.count}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" disabled={loading} className="product-button">
          {loading ? 'Cargando...' : 'Añadir Producto'}
        </Button>
      </Form>
    </Container>
  );
};

export default AdminProductForm;
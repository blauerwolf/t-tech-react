import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet";

import { obtenerProductoPorId, actualizarProducto } from "../../auth/firebase";

export const AdminEditProductForm = () => {
  const { id } = useParams(); // asumimos que la ruta es /admin/productos/:id
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: {
      rate: "",
      count: "",
    },
  });
  const [loading, setLoading] = useState(true); // empieza true porque cargamos datos
  const [saving, setSaving] = useState(false);

  // Cargar datos del producto
  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await obtenerProductoPorId(id);
        setProduct({
          ...data,
          price: data.price ?? "",
          rating: {
            rate: data.rating?.rate ?? "",
            count: data.rating?.count ?? "",
          },
        });
      } catch (err) {
        console.error("Error al obtener el producto:", err);
        toast.error("No se puedo actualizar el producto");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "rate" || name === "count") {
      setProduct((prev) => ({
        ...prev,
        rating: {
          ...prev.rating,
          [name]: value,
        },
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validaciones antes de enviar
    if (!product.name.trim()) {
      toast.error("El nombre del producto es obligatorio");
      return;
    }

    const price = parseFloat(product.price);
    if (isNaN(price) || price <= 0) {
      toast.error("El precio debe ser un número mayor a 0");
      return;
    }

    if (product.description.trim().length < 10) {
      toast.error("La descripción debe tener al menos 10 caracteres");
      return;
    }

    setSaving(true);

    try {
      const updatedProduct = {
        ...product,
        price: parseFloat(product.price),
        rating: {
          rate: parseFloat(product.rating.rate),
          count: parseInt(product.rating.count, 10),
        },
      };

      if (
        isNaN(updatedProduct.price) ||
        isNaN(updatedProduct.rating.rate) ||
        isNaN(updatedProduct.rating.count)
      ) {
        throw new Error("El precio, rate y count deben ser números válidos.");
      }

      await actualizarProducto(id, updatedProduct);
      toast.success(`Producto #${id} actualizado exitosamente.`);
    } catch (err) {
      console.error("Error al actualizar el producto:", err);
      toast.error(
        err.message || "Error al guardar el producto. Inténtalo de nuevo."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" variant="secondary" />
        <p className="mt-3">Cargando producto...</p>
      </Container>
    );
  }

  const nombreApp = import.meta.env.VITE_NOMBRE_APP;

  return (
    <>
      <Helmet>
        <title>
          Editar {product.name} - {nombreApp}
        </title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
      </Helmet>

      <Container className="my-5">
        <h2 className="mb-4 text-center">Editar Producto</h2>

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formProductName">
              <Form.Label className="product-name">
                Nombre del Producto
              </Form.Label>
              <Form.Control
                type="text"
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
                name="image"
                value={product.image}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label className="product-name">
                Calificación (Rate)
              </Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                min="0"
                max="5"
                name="rate"
                value={product.rating.rate}
                onChange={handleChange}
                required
              />
            </Col>
            <Col>
              <Form.Label className="product-name">Stock</Form.Label>
              <Form.Control
                type="number"
                min="0"
                name="count"
                value={product.rating.count}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>
          <div className="d-flex">
            <Button
              variant="secondary"
              className="mx-2"
              onClick={() => navigate(-1)}
            >
              Volver
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={saving}
              className="product-button"
            >
              {saving ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AdminEditProductForm;

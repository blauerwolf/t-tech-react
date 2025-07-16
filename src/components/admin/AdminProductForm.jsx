import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../auth/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

export const AdminProductForm = () => {
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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "rate" || name === "count") {
      setProduct((prev) => ({
        ...prev,
        rating: { ...prev.rating, [name]: value },
      }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
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

    setLoading(true);
    try {
      const newProduct = {
        ...product,
        price,
        rating: {
          rate: parseFloat(product.rating.rate),
          count: parseInt(product.rating.count, 10),
        },
      };

      // Verificar que los campos de rating también sean válidos
      if (isNaN(newProduct.rating.rate) || isNaN(newProduct.rating.count)) {
        throw new Error(
          "La calificación (rate) y el conteo (count) deben ser números válidos."
        );
      }

      const docRef = await addDoc(collection(db, "productos"), newProduct);
      toast.success(
        <span>
          Producto <b>#{docRef.id}</b> cargado exitosamente.
        </span>
      );

      // Limpiar el formulario
      setProduct({
        name: "",
        price: "",
        description: "",
        category: "",
        image: "",
        rating: { rate: "", count: "" },
      });
    } catch (err) {
      console.error("Error al añadir el documento: ", err);
      toast.error(
        err.message || "Error al guardar el producto. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  const nombreApp = import.meta.env.VITE_NOMBRE_APP;

  return (
    <>
      <Helmet>
        <title>Alta producto - {nombreApp}</title>
      </Helmet>

      <Container className="my-5">
        <h2 className="mb-4 text-center">Cargar Nuevo Producto</h2>

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formProductName">
              <Form.Label className="product-name">
                Nombre del Producto
              </Form.Label>
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
                minLength={10}
                value={product.image}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label className="product-name">
                Calificación (Rating)
              </Form.Label>
              <Form.Group controlId="formProductRate">
                <Form.Label className="small-label">
                  Rate (1.0 - 5.0)
                </Form.Label>
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
              <Form.Label>&nbsp;</Form.Label>
              <Form.Group controlId="formProductCount">
                <Form.Label className="product-name">Stock</Form.Label>
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
              disabled={loading}
              className="product-button"
            >
              {loading ? "Cargando..." : "Añadir Producto"}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AdminProductForm;

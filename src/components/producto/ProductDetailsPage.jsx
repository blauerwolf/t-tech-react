import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import ProductDetails from "./ProductDetails";
import { useAuth } from "../../providers/AuthContext";
import { obtenerProductoPorId } from "../../auth/firebase";
import { useCart } from "../../contexts/CartContext";

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, login, userName } = useAuth();
  const { carrito, setCarrito } = useCart();

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const producto = await obtenerProductoPorId(id);
        setProduct(producto);
      } catch (err) {
        console.error("Error al obtener el producto: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  const handleAddToCart = (productoConCantidad) => {
    if (!userName && !isAuthenticated) {
      console.error("Debe iniciar sesión para agregar productos al carrito.");
      return;
    }

    const existing = carrito.find((item) => item.id === productoConCantidad.id);
    let nuevoCarrito;

    if (existing) {
      nuevoCarrito = carrito.map((item) =>
        item.id === productoConCantidad.id
          ? { ...item, cantidad: item.cantidad + productoConCantidad.cantidad }
          : item
      );
    } else {
      nuevoCarrito = [...carrito, productoConCantidad];
    }

    setCarrito(nuevoCarrito); // el context se encarga de guardar en localStorage
  };

  if (loading) return <p>Cargando producto...</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  const nombreApp = import.meta.env.VITE_NOMBRE_APP;

  return (
    <>
      <Helmet>
        <title>{product.name} - {nombreApp}</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
      </Helmet>

      <div>
        <ProductDetails product={product} onAddToCart={handleAddToCart} />
      </div>
    </>
  );
};

export default ProductDetailsPage;

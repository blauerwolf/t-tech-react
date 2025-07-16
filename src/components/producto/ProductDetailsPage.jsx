import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

    /*
    const key = `cart_${userName}`;
    const carrito = JSON.parse(localStorage.getItem(key)) || [];

    const index = carrito.findIndex(
      (item) => item.id === productoConCantidad.id
    );
    if (index !== -1) {
      carrito[index].cantidad += productoConCantidad.cantidad;
    } else {
      carrito.push(productoConCantidad);
    }

    localStorage.setItem(key, JSON.stringify(carrito));
    */
    console.log("Producto agregado al carrito:", productoConCantidad);
  };

  if (loading) return <p>Cargando producto...</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <div>
      <ProductDetails product={product} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default ProductDetailsPage;

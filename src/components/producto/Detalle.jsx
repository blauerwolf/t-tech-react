import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "../../providers/AuthContext";
import { getCartByUser, saveCartByUser } from "../../providers/CarritoStorage";

import ProductDetails from "./ProductDetails";

export const Detalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, login, userName } = useAuth();
  

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setProducto(data);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = (productoConCantidad) => {
    if (!userName) {
      console.log("Debes iniciar sesión para agregar productos");
      return;
    }

    const carrito = getCartByUser(userName);
    const { cantidad, ...producto } = productoConCantidad;

    const existingItemIndex = carrito.findIndex(
      (item) => item.id === producto.id
    );

    if (existingItemIndex >= 0) {
      carrito[existingItemIndex].cantidad += cantidad;
    } else {
      carrito.push({
        ...producto,
        cantidad: cantidad,
      });
    }

    saveCartByUser(userName, carrito);
    console.log("Producto agregado:", producto);
  };

  if (loading)
    return <p style={{ textAlign: "center" }}>Cargando producto...</p>;

  return <ProductDetails product={producto} onAddToCart={handleAddToCart} />;
};

export default Detalle;

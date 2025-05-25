import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductDetails from "./ProductDetails";

export const Detalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProducto(data);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = (producto) => {
    // Lógica para agregar al carrito
    console.log("Producto agregado:", producto);
  };

  if (loading) return <p style={{ textAlign: "center" }}>Cargando producto...</p>;

  return (
    <ProductDetails product={producto} onAddToCart={handleAddToCart} />
  );
};

export default Detalle;

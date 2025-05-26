import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import { useAuth } from "../../providers/AuthContext";

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, login, userName } = useAuth();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener el producto:", err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = (productoConCantidad) => {
    if (!userName && !isAuthenticated) {
      console.error("Debe iniciar sesión para agregar productos al carrito.");
      return;
    }

    const key = `cart_${userName}`;
    const carrito = JSON.parse(localStorage.getItem(key)) || [];

    const index = carrito.findIndex(item => item.id === productoConCantidad.id);
    if (index !== -1) {
      carrito[index].cantidad += productoConCantidad.cantidad;
    } else {
      carrito.push(productoConCantidad);
    }

    localStorage.setItem(key, JSON.stringify(carrito));
    console.log("Producto agregado al carrito:", productoConCantidad);
  };

  if (loading) return <p>Cargando producto...</p>;

  return (
    <div>
      <ProductDetails product={product} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default ProductDetailsPage;

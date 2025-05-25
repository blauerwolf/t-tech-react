import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

import ProductCard from "./ProductCard";
import "../../styles/Productos.css";

export const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Reemplaza esta URL con tu API real
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al cargar productos:", err);
        setError("Ups! Parece que no pudimos obtener los productos!");
        setCargando(false);
      });
  }, []);

  function funcionCarrito(producto) {
    const existe = productosCarrito.find((p) => p.id === producto.id);
    console.log(existe);

    if (existe) {
      const carritoActualizado = productosCarrito.map((p) => {
        if (p.id === productos.id) {
          const productoActualizado = {
            ...p,
            cantidad: p.cantidad + producto.cantidad,
          };
          return productoActualizado;
        } else {
          return p;
        }
      });

      setProductosCarrito(carritoActualizado);
    } else {
      // No existe el producto, se agrega con su cantidad
      const nuevoCarrito = [...productosCarrito, producto];
      setProductosCarrito[nuevoCarrito];
    }

    setTotal(0);
    productosCarrito.map((p) => {
      setTotal(total + p.price * p.cantidad);
    });
  }

  if (cargando) {
    return (
      <div className="productos-container">
        <h2 className="productos-title">Cargando productos...</h2>
        <FaSpinner className="spinner-icon" />
      </div>
    )
  } else if (error) {
    return <p>{error}</p>;
  } else {
    return (
      <div className="productos-container">
        <h2 className="productos-title">Nuestros Productos</h2>
        <div className="productos-grid">
          {productos.map((producto) => (
            <ProductCard
              key={producto.id}
              id={producto.id}
              image={producto.image}
              name={producto.title}
              price={producto.price}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default Productos;

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

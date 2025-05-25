import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import '../../styles/Producto.css'

export const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Reemplaza esta URL con tu API real
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  return (
    <div className="productos-container">
      <h2 className="productos-title">Nuestros Productos</h2>
      <div className="productos-grid">
        {productos.map(producto => (
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

export default Productos;

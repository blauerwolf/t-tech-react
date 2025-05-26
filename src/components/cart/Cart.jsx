import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

import "../../styles/Cart.css";

export const Cart = ({ userName }) => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    if (!userName) return;

    const data = localStorage.getItem(`cart_${userName}`);
    if (data) {
      try {
        setCarrito(JSON.parse(data));
      } catch (e) {
        console.error("Error al leer el carrito:", e);
      }
    }
  }, [userName]);

  const guardarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem(`cart_${userName}`, JSON.stringify(nuevoCarrito));
  };

  const aumentarCantidad = (id) => {
    const nuevoCarrito = carrito.map((item) =>
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    );
    guardarCarrito(nuevoCarrito);
  };

  const disminuirCantidad = (id) => {
    const nuevoCarrito = carrito.map((item) =>
      item.id === id
        ? { ...item, cantidad: item.cantidad > 1 ? item.cantidad - 1 : 1 }
        : item
    );
    guardarCarrito(nuevoCarrito);
  };

  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id);
    guardarCarrito(nuevoCarrito);
  };

  const vaciarCarrito = () => {
    const confirmar = window.confirm(
      "¿Estás seguro de que quieres vaciar el carrito?"
    );
    if (confirmar) {
      setCarrito([]);
      localStorage.removeItem(`cart_${userName}`);
    }
  };

  const calcularTotal = () => {
    return carrito.reduce(
      (total, item) => total + item.price * item.cantidad,
      0
    );
  };

  if (!userName) return <p>Debe iniciar sesión para ver el carrito.</p>;
  if (carrito.length === 0) return <p>El carrito está vacío.</p>;

  return (
    <div className="cart-items">
      {carrito.map((item, index) => (
        <div className="cart-item" key={index}>
          <img src={item.image} alt={item.title} className="cart-item-image" />
          <div className="cart-item-details">
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <p>Precio unitario: ${item.price.toFixed(2)}</p>
            <p>Cantidad: {item.cantidad}</p>
            <p>Subtotal: ${(item.price * item.cantidad).toFixed(2)}</p>
          </div>
          <div className="cart-item-actions">
            <button
              className="remove-button"
              onClick={() => eliminarProducto(item.id)}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;

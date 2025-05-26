import React, { useEffect, useState } from 'react';

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
    const nuevoCarrito = carrito.map(item =>
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    );
    guardarCarrito(nuevoCarrito);
  };

  const disminuirCantidad = (id) => {
    const nuevoCarrito = carrito.map(item =>
      item.id === id
        ? { ...item, cantidad: item.cantidad > 1 ? item.cantidad - 1 : 1 }
        : item
    );
    guardarCarrito(nuevoCarrito);
  };

  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter(item => item.id !== id);
    guardarCarrito(nuevoCarrito);
  };

  const vaciarCarrito = () => {
    const confirmar = window.confirm("¿Estás seguro de que quieres vaciar el carrito?");
    if (confirmar) {
      setCarrito([]);
      localStorage.removeItem(`cart_${userName}`);
    }
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.price * item.cantidad, 0);
  };

  if (!userName) return <p>Debe iniciar sesión para ver el carrito.</p>;
  if (carrito.length === 0) return <p>El carrito está vacío.</p>;

  return (
    <div>
      <h2>Carrito de compras</h2>
      <button onClick={vaciarCarrito} style={{ marginBottom: '1em', backgroundColor: 'red', color: 'white', padding: '0.5em 1em', border: 'none', cursor: 'pointer' }}>
        Vaciar carrito
      </button>
      <ul>
        {carrito.map(item => (
          <li key={item.id} style={{ marginBottom: "1.5em", borderBottom: "1px solid #ccc", paddingBottom: "1em" }}>
            <strong>{item.title}</strong><br />
            Precio unitario: ${item.price.toFixed(2)}<br />
            Cantidad:
            <button onClick={() => disminuirCantidad(item.id)} style={{ marginLeft: "5px" }}>-</button>
            <span style={{ margin: "0 10px" }}>{item.cantidad}</span>
            <button onClick={() => aumentarCantidad(item.id)}>+</button><br />
            Subtotal: ${(item.price * item.cantidad).toFixed(2)}<br />
            <button onClick={() => eliminarProducto(item.id)} style={{ marginTop: "5px", color: "red" }}>
              Eliminar producto
            </button>
          </li>
        ))}
      </ul>
      <h3>Total: ${calcularTotal().toFixed(2)}</h3>
    </div>
  );
};

export default Cart;

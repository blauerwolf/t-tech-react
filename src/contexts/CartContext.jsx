import React, { createContext, useState, useEffect, useContext } from "react";

// Creamos el contexto
const CartContext = createContext();

// Hook para usar el contexto
export const useCart = () => useContext(CartContext);

// Provider del carrito
export const CartProvider = ({ userName, children }) => {
  const [carrito, setCarrito] = useState([]);

  // Cargar carrito del localStorage al iniciar
  useEffect(() => {
    if (userName) {
      const data = localStorage.getItem(`cart_${userName}`);
      if (data) {
        try {
          setCarrito(JSON.parse(data));
        } catch (e) {
          console.error("Error al parsear carrito:", e);
        }
      }
    } else {
      setCarrito([]);
    }
  }, [userName]);

  // Guardar carrito en localStorage cada vez que cambie
  const guardarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    if (userName) {
      localStorage.setItem(`cart_${userName}`, JSON.stringify(nuevoCarrito));
    }
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    const userName = localStorage.getItem("userName");
    if (userName) {
      localStorage.removeItem(`cart_${userName}`);
    }
  };

  return (
    <CartContext.Provider value={{ carrito, setCarrito: guardarCarrito, vaciarCarrito }}>
      {children}
    </CartContext.Provider>
  );
};

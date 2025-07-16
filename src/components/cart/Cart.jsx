import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FaTrashAlt } from "react-icons/fa";
import { toast } from 'react-toastify';

import { GenericCard } from '../layout'
import { useCart } from '../../contexts/CartContext';

import "../../styles/Cart.css";

export const Cart = ({ userName }) => {
  //const [carrito, setCarrito] = useState([]);
  const { carrito, setCarrito } = useCart();
  const MySwal = withReactContent(Swal);

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

    MySwal.fire({
      title: '¡Atención!',
      text: `¿Querés eliminar el producto del carrito?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#4b342c',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
    }).then(result => {
      if (result.isConfirmed) {
        const nuevoCarrito = carrito.filter((item) => item.id !== id);
        guardarCarrito(nuevoCarrito);
        toast.success('El producto ha sido eliminado del carrito.');
      }
    })
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

  if (!userName) {
    return (<GenericCard 
        titulo={"Error"}    
        bajada={"¡Debes estar logueado para acceder a tu carrito!"}
        textoBoton={"Iniciar Sesión"}
        destino={'/login'}
    />);
  }

  if (carrito.length === 0) {
    return (<GenericCard 
        titulo={"¡No hay productos en tu carrito!"}
        bajada={"¡Lo que estás buscando se encuentra en nuestro catálogo"}
        textoBoton={"Ver productos"}
        destino={'/productos'}
    />);
  }

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
      <div className="cart-total">
        <h3>Total: ${calcularTotal()}</h3>
      </div>
    </div>
  );
};

export default Cart;

import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

import { useCart } from "../../contexts/CartContext";
import { GenericCard } from "../layout";

import "../../styles/Cart.css";

export const Cart = ({ userName }) => {
  const MySwal = withReactContent(Swal);
  const { carrito, setCarrito, vaciarCarrito } = useCart();

  const eliminarProducto = (id) => {
    MySwal.fire({
      title: "¡Atención!",
      text: `¿Querés eliminar el producto del carrito?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#4b342c",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevoCarrito = carrito.filter((item) => item.id !== id);
        setCarrito(nuevoCarrito);
        if (userName) {
          localStorage.setItem(
            `cart_${userName}`,
            JSON.stringify(nuevoCarrito)
          );
        }
        toast.success("El producto ha sido eliminado del carrito.");
      }
    });
  };

  const handleVaciarCarrito = () => {
    MySwal.fire({
      title: "¿Vaciar carrito?",
      text: "Esta acción eliminará todos los productos de tu carrito.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, vaciar",
      confirmButtonColor: "#4b342c",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        vaciarCarrito();
        toast.success("Carrito vaciado correctamente.");
      }
    });
  };

  const handlePagar = () => {
    MySwal.fire({
      title: "¡Gracias por tu compra!",
      text: "Pronto recibirás un correo de confirmación.",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#4b342c",
    });
  };

  const calcularTotal = () => {
    return carrito
      .reduce((total, item) => total + item.price * item.cantidad, 0)
      .toFixed(2);
  };

  if (!userName) {
    return (
      <GenericCard
        titulo={"Error"}
        bajada={"¡Debes estar logueado para acceder a tu carrito!"}
        textoBoton={"Iniciar Sesión"}
        destino={"/login"}
      />
    );
  }

  if (carrito.length === 0) {
    return (
      <GenericCard
        titulo={"¡No hay productos en tu carrito!"}
        bajada={"¡Lo que estás buscando se encuentra en nuestro catálogo"}
        textoBoton={"Ver productos"}
        destino={"/productos"}
      />
    );
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
        <div className="d-flex mt-3">
          <Button variant="secondary" onClick={handleVaciarCarrito}>
            Vaciar carrito
          </Button>

          <Button variant="primary" className="ms-3" onClick={handlePagar}>
            Pagar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

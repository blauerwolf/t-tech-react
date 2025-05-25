import React from "react";
import "../../styles/Carrito.css";

export const Carrito = ({ cartItems, onRemoveFromCart }) => {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <section className="cart-container">
      <h2>Carrito de compras</h2>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.title}</h4>
                  <p className="description">{item.description}</p>
                  <p><strong>Cantidad:</strong> {item.quantity}</p>
                  <p><strong>Precio unitario:</strong> ${item.price.toFixed(2)}</p>
                  <p><strong>Subtotal:</strong> ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button className="remove-button" onClick={() => onRemoveFromCart(item)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3>Total a pagar: ${totalPrice.toFixed(2)}</h3>
          </div>
        </>
      )}
    </section>
  );
};

export default Carrito;

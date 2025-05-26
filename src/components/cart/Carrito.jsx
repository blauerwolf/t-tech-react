import React from 'react';
import '../../styles/Carrito.css';

export const Carrito = ({ items, onRemoveItem, onQuantityChange }) => {
  // Debug detallado
  console.log('Renderizando Carrito con:', {
    itemCount: items.length,
    sampleItem: items[0],
    hasRemoveFn: typeof onRemoveItem === 'function',
    hasQuantityFn: typeof onQuantityChange === 'function'
  });

  if (!Array.isArray(items)) {
    return <div className="cart-error">Error: Formato de carrito inválido</div>;
  }

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = Number(item.price) || 0;
      const quantity = Math.max(1, Number(item.cantidad)) || 1;
      return total + (price * quantity);
    }, 0);
  };

  return (
    <div className="cart-container">
      {items.length === 0 ? (
        <div className="empty-cart">
          <p>Tu carrito está vacío</p>
          <p>¡Agrega algunos productos!</p>
        </div>
      ) : (
        <>
          <div className="cart-items-list">
            {items.map(item => (
              <div key={`${item.id}-${Date.now()}`} className="cart-item">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="cart-item-image"
                  onError={(e) => {
                    e.target.src = '/placeholder-product.png';
                  }}
                />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>Precio unitario: ${item.price.toFixed(2)}</p>
                  <div className="quantity-control">
                    <label>Cantidad:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.cantidad}
                      onChange={(e) => onQuantityChange(item.id, e.target.value)}
                    />
                  </div>
                  <p className="item-subtotal">
                    Subtotal: ${(item.price * item.cantidad).toFixed(2)}
                  </p>
                </div>
                <button
                  className="remove-item-btn"
                  onClick={() => onRemoveItem(item.id)}
                  aria-label={`Eliminar ${item.title}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total del Carrito</h3>
            <p className="cart-total">${calculateTotal().toFixed(2)}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
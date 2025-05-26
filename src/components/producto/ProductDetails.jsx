import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

import "../../styles/ProductDetails.css";

export const ProductDetails = ({ product, onAddToCart }) => {
  const [cantidad, setCantidad] = useState(1);

  if (!product) return <p>Producto no encontrado</p>;

  const precioTotal = (cantidad * product.price).toFixed(2);

  const handleCantidadChange = (e) => {
    setCantidad(Number(e.target.value));
  };

  const handleAddToCart = () => {
    onAddToCart({...product, cantidad})
  }

  return (
    <div className="product-detail-container">
      <img src={product.image} alt={product.title} className="detail-image" />
      <div className="detail-info">
        <h2 className="detail-title">{product.title}</h2>
        <p className="detail-description">{product.description}</p>
        <p className="detail-price">
          Precio unitario: ${product.price.toFixed(2)}
        </p>

        <div className="quantity-price-row">
          <div className="quantity-selector">
            <label htmlFor="cantidad">Cantidad:</label>
            <input
              id="cantidad"
              type="number"
              min="1"
              value={cantidad}
              onChange={handleCantidadChange}
              style={{ width: "60px" }}
            />
          </div>
          <p className="total-price">Precio total: ${precioTotal}</p>
        </div>

        <button
          className="add-to-cart-button"
          onClick={handleAddToCart}
        >
          <FaShoppingCart />
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;

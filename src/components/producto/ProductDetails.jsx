import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

import "../../styles/ProductDetails.css";

export const ProductDetails = ({ product, onAddToCart }) => {
  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div className="product-detail-container">
      <img src={product.image} alt={product.title} className="detail-image" />
      <div className="detail-info">
        <h2 className="detail-title">{product.title}</h2>
        <p className="detail-description">{product.description}</p>
        <p className="detail-price">${product.price}</p>
        <button
          className="add-to-cart-button"
          onClick={() => onAddToCart(product)}
        >
          <FaShoppingCart />
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;

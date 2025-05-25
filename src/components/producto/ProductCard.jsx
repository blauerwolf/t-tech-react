import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/ProductCard.css'

export const ProductCard = ({ id, image, name, price }) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-price">${price}</p>
        <Link to={`/producto/${id}`} className="product-button">
          Ver detalle
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;

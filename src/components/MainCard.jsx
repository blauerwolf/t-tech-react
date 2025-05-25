import React from 'react';
import { useNavigate } from "react-router-dom";

import '../styles/MainCard.css';

export const MainCard = () => {
  const navigate = useNavigate()

  const gotoProductos = () => {
    navigate('/productos')
  }
  return (
    <div className="main-card-container">
      <div className="main-card">
        <div className="card-content">
          <h2>Bienvenido a Gala Shop</h2>
          <p>Descubre nuestros servicios y soluciones innovadoras para tus necesidades.</p>
          <button className="card-button" onClick={gotoProductos}>Ver productos</button>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
import React from 'react';
import '../styles/MainCard.css';

export const MainCard = () => {
  return (
    <div className="main-card-container">
      <div className="main-card">
        <div className="card-content">
          <h2>Bienvenido a nuestro sitio</h2>
          <p>Descubre nuestros servicios y soluciones innovadoras para tus necesidades.</p>
          <button className="card-button">Saber más</button>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
import React from "react";
import "../../styles/Nosotros.css";

export const Nosotros = () => {
  return (
    <section className="shopping-info">
      <div className="shopping-info-content">
        <h2 className="shopping-title">Gala Shopping</h2>
        <p className="shopping-description">
          Bienvenido a Gala Shop, el destino ideal para tus compras, gastronomía y entretenimiento.
        </p>
        <ul className="shopping-details">
          <li><strong>Dirección:</strong> Av. 13 N° 798 La Plata</li>
          <li><strong>Horario:</strong> Lunes a Domingos de 10:00 a 22:00 hs</li>
          <li><strong>Teléfono:</strong> (0221) 444-4444</li>
          <li><strong>Email:</strong> info@galashopping.com</li>
        </ul>
      </div>
    </section>
  );
};

export default Nosotros;

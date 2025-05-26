import React from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/GenericCard.css";

export const GenericCard = ({ titulo, bajada, textoBoton, destino }) => {
  const navigate = useNavigate();

  const hrefBoton = () => {
    navigate(destino);
  };
  return (
    <div className="main-card-container">
      <div className="main-card">
        <div className="card-content">
          <h2>{titulo}</h2>
          <p>{bajada}</p>
          <button className="card-button" onClick={hrefBoton}>
            {textoBoton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericCard;

import React from "react";
import { GenericCard } from "./layout";

export const Main = () => {
  return (
    <main style={{ padding: "20px" }}>
      <GenericCard 
        titulo={"Bienvenido a Gala Shop"}
        bajada={"Descubre nuestros servicios y soluciones innovadoras para tus necesidades."}
        textoBoton={"Ver productos"}
        destino={'/productos'}
      />
    </main>
  );
};

export default Main;

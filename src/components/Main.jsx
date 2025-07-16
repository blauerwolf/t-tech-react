import React from "react";
import { Helmet } from 'react-helmet';

import { GenericCard } from "./layout";

export const Main = () => {
  const nombreApp = import.meta.env.VITE_NOMBRE_APP
  return (
    <>
      <Helmet>
        <title>Inicio - {nombreApp}</title>
      </Helmet>
      <main style={{ padding: "20px" }}>
      <GenericCard 
        titulo={"Bienvenido a Gala Shop"}
        bajada={"Descubre nuestros servicios y soluciones innovadoras para tus necesidades."}
        textoBoton={"Ver productos"}
        destino={'/productos'}
      />
    </main>
    </>
    
  );
};

export default Main;

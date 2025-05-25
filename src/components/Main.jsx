import React from "react";
import MainCard from "./MainCard";


export const Main = () => {
  return (
    <main style={{ padding: "20px" }}>
      <h2>Contenido Principal</h2>
      <p>Este es un ejemplo de contenido dentro del área principal.</p>
      <MainCard />
    </main>
  );
};

export default Main;

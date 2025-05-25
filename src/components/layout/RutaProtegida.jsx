import React from "react";
import { Navigate } from "react-router-dom";

export const RutaProtegida = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default RutaProtegida;

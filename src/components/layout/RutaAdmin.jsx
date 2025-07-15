import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthContext';

export const RutaAdmin = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }
  
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RutaAdmin;

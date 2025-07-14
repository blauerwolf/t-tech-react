import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthContext';

export const RutaAdmin = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  console.log('RutaAdmin:', isAuthenticated, isAdmin);

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RutaAdmin;

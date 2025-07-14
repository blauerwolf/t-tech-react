import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isAdmin: false,
    userName: null
  });

  const login = async (userName, password) => {
    // TODO: Implementar lógica de autenticación real

    setAuthState({
      isAuthenticated: true,
      isAdmin: userName === 'admin',
      userName: userName
    });

    return true;
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      isAdmin: false,
      userName: null
    });
  };

  useEffect(() => {
    console.log('Auth changed:', authState);
  }, [authState]);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

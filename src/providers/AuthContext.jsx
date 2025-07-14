import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isAdmin: false,
    userName: null
  });

  const login = (name) => {
    setAuthState({
      isAuthenticated: true,
      isAdmin: name === 'admin',
      userName: name
    });
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

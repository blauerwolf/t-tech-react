import React, { createContext, useState, useEffect, useContext } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../auth/firebase'; // ajusta la ruta según tu proyecto

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isAdmin: false,
    userName: null
  });

  // login: email y password -> consulta Firebase y obtiene custom claims
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // obtener custom claims del token
      const idTokenResult = await user.getIdTokenResult(true);

      setAuthState({
        isAuthenticated: true,
        isAdmin: idTokenResult.claims.admin === true,
        userName: user.displayName || user.email
      });

      return true;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  // logout real
  const logout = async () => {
    await signOut(auth);
    setAuthState({
      isAuthenticated: false,
      isAdmin: false,
      userName: null
    });
  };

  // escucha cambios de sesión
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        setAuthState({
          isAuthenticated: true,
          isAdmin: idTokenResult.claims.admin === true,
          userName: user.displayName || user.email
        });
      } else {
        setAuthState({
          isAuthenticated: false,
          isAdmin: false,
          userName: null
        });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

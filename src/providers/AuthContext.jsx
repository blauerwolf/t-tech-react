import React, { createContext, useState, useEffect, useContext } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../auth/firebase'; // ajusta la ruta según tu proyecto

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
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

      await user.getIdToken(true); // fuerza la actualización del token

      // obtener custom claims del token
      const idTokenResult = await user.getIdTokenResult();

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
  const logout = async (navigateFunction) => {
    try {
      await signOut(auth);

      setAuthState({
        isAuthenticated: false,
        isAdmin: false,
        userName: null
      });

      // Redirige a la raíz después de cerrar sesión
      if (navigateFunction) { // Asegúrate de que navigateFunction existe
        navigateFunction('/'); // <--- Aquí se realiza la redirección
      }

    } catch (err) {
      console.error('Error en logout: ', err);
      throw err;
    }
    
    
  };

  // escucha cambios de sesión
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Forzar actualización del token para obtener custom claims
        await user.getIdToken(true);
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

      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import React, { useState } from 'react';

import { useAuth } from '../../providers/AuthContext';
import '../../styles/Login.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, login, userName } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username && username != '' && password && password != '') {
      // Simulo un login con cualquier usuario y password
      login(username)
    }

    setUsername('')
    setPassword('')
  };

  console.log(userName, isAuthenticated)

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        {isAuthenticated ? (
          <p>¡Sesión iniciada como <strong>{userName}</strong>!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Usuario:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Contraseña:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit">Ingresar</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginForm;

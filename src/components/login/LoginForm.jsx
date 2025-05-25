import React, { useState } from 'react';
import '../../styles/Login.css'; // Asegurate de importar los estilos

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username && password) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', username);
      setLoggedIn(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        {loggedIn ? (
          <p>¡Sesión iniciada como <strong>{username}</strong>!</p>
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

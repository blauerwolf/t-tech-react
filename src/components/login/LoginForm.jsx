import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

import { useAuth } from '../../providers/AuthContext';
import '../../styles/Login.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, isAdmin, login, userName } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username && username != '' && password && password != '') {
      // Simulo un login con cualquier usuario y password
      login(username)
    }

    setUsername('')
    setPassword('')
  };


  return (
    <Container className="d-flex justify-content-center align-items-center my-5">
      <Card style={{ maxWidth: '400px', width: '100%' }} className="p-4 shadow-sm">
        <Card.Body>
          <Card.Title className="text-center mb-4">Iniciar Sesión</Card.Title>
          {isAuthenticated ? (
            <Alert variant="success" className="text-center">
              ¡Sesión iniciada como <strong>{userName}</strong>!
            </Alert>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Usuario:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Ingrese su usuario"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Ingrese su contraseña"
                />
              </Form.Group>

              <div className="d-grid">
                <Button variant="dark" type="submit">
                  Ingresar
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginForm;

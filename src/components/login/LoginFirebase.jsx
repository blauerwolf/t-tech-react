import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthContext";
import { crearUsuario, loginEmailPass } from "../../auth/firebase";
import { dispararSweetBasico } from "../../helpers/SweetAlert";

export const LoginFirebase = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const { isAuthenticated, userName, login, logout } = useAuth();
  const navigate = useNavigate();

  // Cierra sesión
  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
  };

  // Inicia sesión con Firebase
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      //await loginEmailPass(usuario, password);
      //login(usuario);
      await login(usuario, password);
      dispararSweetBasico("Acceso exitoso", "", "success", "Confirmar");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        dispararSweetBasico("Credenciales incorrectas", "", "error", "Cerrar");
      }
    }
  };

  // Registra nuevo usuario
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await crearUsuario(usuario, password);
      login(usuario);
      dispararSweetBasico("Registro exitoso", "", "success", "Confirmar");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/weak-password") {
        dispararSweetBasico(
          "Contraseña débil",
          "Password should be at least 6 characters",
          "error",
          "Cerrar"
        );
      } else if (error.code === "auth/email-already-in-use") {
        dispararSweetBasico("El correo ya está en uso", "", "error", "Cerrar");
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center my-5">
      <Card style={{ maxWidth: '400px', width: '100%' }} className="p-4 shadow-sm">
        <Card.Body>
          <Card.Title className="text-center mb-4">
            {isAuthenticated 
              ? "Sesión iniciada"
              : showRegister ? "Registrarse" : "Iniciar Sesión"}
          </Card.Title>

          {isAuthenticated ? (
            <>
              <Alert variant="success" className="text-center">
                ¡Sesión iniciada como <strong>{userName}</strong>!
              </Alert>
              <div className="d-grid">
                <Button variant="danger" onClick={handleLogout}>Cerrar sesión</Button>
              </div>
            </>
          ) : (
            <Form onSubmit={showRegister ? handleRegister : handleLogin}>
              <Form.Group className="mb-3" controlId="formUsuario">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  required
                  placeholder="Ingrese su email"
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

              <div className="d-grid mb-2">
                <Button variant="dark" type="submit">
                  {showRegister ? "Registrarse" : "Iniciar Sesión"}
                </Button>
              </div>

              <div className="text-center">
                <Button variant="link" onClick={() => setShowRegister(!showRegister)}>
                  {showRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginFirebase;

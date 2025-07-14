import React from 'react'
import { Container } from 'react-bootstrap';

import LoginForm from './LoginForm';

export const Login = () => {
  return (
    <Container className="my-5 py-5">
      <h1 className="text-center mb-4">Iniciar Sesión</h1>
      <LoginForm />
    </Container>
  );
}

export default Login;

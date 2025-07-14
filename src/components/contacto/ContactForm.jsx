import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import '../../styles/ContactForm.css';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Enviar el form a una API
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Container className="my-5">
      <Card className="p-4 shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Contacto</Card.Title>
          {submitted ? (
            <Alert variant="success" className="text-center">
              Gracias por tu mensaje. ¡Te responderemos pronto!
            </Alert>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="tu@correo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="message"
                  placeholder="Escribí tu mensaje..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <div className="d-grid">
                <Button variant="dark" type="submit">
                  Enviar
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ContactForm;

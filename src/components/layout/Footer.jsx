import React from "react"
import { Container } from "react-bootstrap";

import '../../styles/Footer.css'

export const Footer = () => {
  return (
    <footer>
      <Container className="text-center py-3">
        <p className="mb-0">
          <strong>&copy; 2025 - Gala Shop</strong>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;

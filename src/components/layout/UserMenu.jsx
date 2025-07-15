import React from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

import { useAuth } from '../../providers/AuthContext';
import "../../styles/UserMenu.css";

export const UserMenu = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout(navigate); // Pasa la función navigate al método logout del contexto
  }

  return (
    <Dropdown align="end" className="user-menu-dropdown">
      <Dropdown.Toggle variant="link" bsPrefix="user-icon-button">
        <FaUserCircle size={24} className="user-icon-button" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {isAuthenticated ? (
          <Dropdown.Item onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
        ) : (
          <Dropdown.Item onClick={handleLogin}>Iniciar Sesión</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserMenu;

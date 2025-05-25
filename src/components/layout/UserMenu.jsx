import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

import { useAuth } from '../../providers/AuthContext';
import "../../styles/UserMenu.css";

export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <div className="user-menu-container" ref={menuRef}>
      <button className="user-icon-button" onClick={() => setOpen(!open)}>
        <FaUserCircle />
      </button>
      {open && (
        <div className="user-dropdown">
            {
                isAuthenticated
                ? (
                    <button onClick={logout} className="user-dropdown-item">
                        Cerrar sesión
                    </button>
                )
                : (
                    <button onClick={handleLogin} className="user-dropdown-item">
                        Iniciar Sesión
                    </button>
                )
            }
          
        </div>
      )}
    </div>
  );
};

export default UserMenu;

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  AdminDashboard,
  AdminLayout,
  AdminProducts,
  ContactForm,
  Footer,
  Header,
  Login,
  Main,
  Nosotros,
  ProductDetailsPage,
  Productos,
  RutaAdmin,
  RutaProtegida,
  TopBar,
  UserCart,
} from "./components";

import { useAuth } from "./providers/AuthContext";

// TODO: Importar el Admin Dashboard y Admin Products

import "./styles/App.css";

function App() {
  const [count, setCount] = useState(0);
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <Router>
      <div className="app-container">
        <TopBar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/producto/:id" element={<ProductDetailsPage />} />
            <Route
              path="/carrito"
              element={
                <RutaProtegida isAuthenticated={isAuthenticated}>
                  <UserCart />
                </RutaProtegida>
              }
            />
            <Route path="/contacto" element={<ContactForm />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <RutaAdmin>
                  <AdminDashboard />
                </RutaAdmin>
              }
            />
            <Route
              path="/admin/productos"
              element={
                <RutaAdmin>
                  <AdminProducts />
                </RutaAdmin>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

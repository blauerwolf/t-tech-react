import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { 
  ContactForm,
  Footer, 
  Header, 
  Login, 
  Main, 
  Nosotros,
  ProductDetailsPage,
  Productos, 
  RutaProtegida,
  TopBar,
  UserCart
} from './components'

import { useAuth } from './providers/AuthContext'

import './styles/App.css'

function App() {
  const [count, setCount] = useState(0)
  //const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { isAuthenticated } = useAuth()

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
            <Route path="/carrito" element={
                <RutaProtegida isAuthenticated={isAuthenticated}>
                  <UserCart />
                </RutaProtegida>
              }
            />
            <Route path="/contacto" element={<ContactForm />} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { 
  Footer, 
  Header, 
  Login, 
  Main, 
  Nosotros,
  ProductDetailsPage,
  Productos, 
  RutaProtegida,
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
        <Header />
        
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
            <Route path="/login" element={<Login/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

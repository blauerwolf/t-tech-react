import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Header, Footer, Main, Login, Productos, Detalle } from './components'
import './styles/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="app-container">
        <Header />
        
        <main className="main-content">

          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/producto/:id" element={<Detalle />} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

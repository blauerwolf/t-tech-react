import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Header, Footer, Main, Login, MainCard } from './components'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div>
        <Header />
        <Main />
        <MainCard />
        <Footer />
        <Routes>

          { /*
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos/>} />
          
          */
          }
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

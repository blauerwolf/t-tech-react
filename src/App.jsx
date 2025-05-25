import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Header, Footer, Main, Login, MainCard } from './components'
import './styles/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div>
        <Header />
        <Main />
        <MainCard />
        
        <Routes>
          <Route path="/login" element={<Login/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App

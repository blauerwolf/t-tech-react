import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { Header, Footer, Main, Nav, MainCard } from './components'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Header />
        <Main />
        <MainCard />
        <Footer />
      </div>
    </>
  )
}

export default App

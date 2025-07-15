import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { AuthProvider } from './providers/AuthContext'
import './index.css'
import App from './App.jsx'

// el StrictMode me hace renderizar 2 veces el componente
createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  //</StrictMode>,
)

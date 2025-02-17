import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import ContextAPI from './contexts/ContextAPI.jsx'
import AuthContentAPI from './contexts/AuthContentAPI.JSX'

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <AuthContentAPI>
      <ContextAPI>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContextAPI>
    </AuthContentAPI>
  </StrictMode>,
)

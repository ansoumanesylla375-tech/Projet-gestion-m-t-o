import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Auth from './Auth'
import Dashboard from './Dashboard'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Route 1 : La Landing Page (Page d'accueil) */}
        <Route path="/" element={<App />} />
        
        {/* Route 2 : La page d'authentification (Login / Inscription) */}
        <Route path="/login" element={<Auth />} />
        
        {/* Route 3 : Le Tableau de bord de gestion (Dashboard) */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
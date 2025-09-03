import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/CreateFlightPlan'
import Airports from './pages/Airports'
import Aircraft from './pages/Aircraft'
import Controllers from './pages/Controllers'
import './index.css'
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/create' element={<Create/>} />
        <Route path='/airports' element={<Airports/>} />
        <Route path='/aircraft' element={<Aircraft/>} />
        <Route path='/controllers' element={<Controllers/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
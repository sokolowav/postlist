import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './styles/App.css'
import Navbar from './Components/UI/Navbar/Navbar'
import AppRouter from './Components/UI/AppRouter'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  )
}

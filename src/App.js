import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './styles/App.css'
import Navbar from './Components/UI/Navbar/Navbar'
import AppRouter from './Components/AppRouter'
import { AuthContext } from './context'

export default function App() {
  const [isAuth, setIsAuth] = useState(false)
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

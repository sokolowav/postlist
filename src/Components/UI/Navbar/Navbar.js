import React from 'react'
import { Link } from 'react-router-dom'
import cl from './Navbar.module.css'

export default function Navbar() {
  return (
    <div className={cl.navbar}>
      <div className={cl.navbar__linksBlock}>
        <Link className={cl.navbar__link} to='/about'>
          Another page
        </Link>
        <Link className={cl.navbar__link} to='/posts'>
          Posts
        </Link>
      </div>
    </div>
  )
}

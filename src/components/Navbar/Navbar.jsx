import React from 'react'
import "./Navbar.css"
import { IoSearch } from "react-icons/io5";


import logo from '../Assets/logo.png'
import Button from '../Button/Button'
const Navbar = () => {
  return (
    <div className='navbar'>

        <div className='nav-logo'>
            <img src={logo} alt=''/>
        </div>

        <div className="search-bar">
            <div className="search-box">
                <IoSearch className="search-icon" />
                <input type="search" placeholder="Search" aria-label="Search" />
            </div>
        </div>

        <div className='buttons'>
            <Button className="logIn" value="Log In"/>
            <Button className="signUp" value= "Sign Up"/>
        </div>

    </div>
  )
}

export default Navbar
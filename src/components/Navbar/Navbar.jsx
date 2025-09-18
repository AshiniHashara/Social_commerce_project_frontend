import React, { useState, useEffect } from 'react';
import "./Navbar.css";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

import logo from '../Assets/logo.png';
import Button from '../Button/Button';

const Navbar = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState(null);

    useEffect(() => {
        // Check if user info is in localStorage
        const storedUser = localStorage.getItem("username");
        if (storedUser) {
            setUsername(storedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("username"); 
        localStorage.removeItem("token");    
        setUsername(null);
        navigate("/login");
    };

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
                {username ? (
                    <>
                        <span className='username'>Hello, {username}</span>
                        <Button className="logout" value="Logout" onClick={handleLogout}/>
                    </>
                ) : (
                    <>
                        <Button className="logIn" value="Log In" onClick={() => navigate("/login")}/>
                        <Button className="signUp" value="Sign Up" onClick={() => navigate("/signup")}/>
                    </>
                )}
            </div>
        </div>
    )
}

export default Navbar;

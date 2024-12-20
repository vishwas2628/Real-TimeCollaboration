import React from 'react';
import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

const NavbarHome = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const userString = localStorage.getItem('user');
    const user = userString?JSON.parse(userString):null;
    console.log(user)

    const handleLogout = () => {
        // Remove user data from local storage
        localStorage.removeItem('user');
        // Redirect to landing page
        navigate('/');
    };

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg p-3 navbar-dark bg-dark bg-opacity-25">
            <div className="container-fluid ">
                <Link className="navbar-brand text-black" to="/">CollabTool</Link>
                <button id="nav-toggle-button" className="navbar-toggler" type="button" onClick={toggleMenu} data-bs-toggle="collapse" aria-controls="navbarNav" aria-expanded={isOpen} aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> 
                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-black" to="/dashboard">Dashboard</Link>
                        </li>
                    </ul>
                    {user ? (
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <button className="btn btn-link nav-link" onClick={handleLogout}>{user.username}Logout</button>
                            </li>
                        </ul>
                    ) : (
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link text-black" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-black" to="/register">Register</Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavbarHome;
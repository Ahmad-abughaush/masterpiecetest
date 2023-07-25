import React, { useState, useEffect } from 'react';
import { Link, NavLink , useNavigate } from 'react-router-dom';
import './Nav.css';
import { BsPersonCircle } from 'react-icons/bs';
import { FaShoppingCart } from 'react-icons/fa';


export default function Nav() {

    const [cartItems, setCartItems] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate=useNavigate()

    // Function to remove an item from the cart
    const removeFromCart = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
    };

    // Check if a token exists in local storage
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        // Remove the token from local storage
        
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('Login')
    };

    return (
        <>
            <header>
                <nav
                    id="navbarhome"
                    className="navbar navbar-expand-lg navbar-light fixed-top"
                    style={{ backgroundColor: '#fefefe' }}
                >
                    <div className="container">
                        <img
                            src="https://i.pinimg.com/564x/3b/9a/ab/3b9aab3626d35e29addc7d1924993814.jpg"
                            style={{ width: 70, height: 50 }}
                            alt="Logo"
                        />
                        <button
                            className="navbar-toggler"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarTogglerDemo02"
                        >
                            <span className="navbar-toggler-icon">b</span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul
                                className="navbar-nav me-auto mb-2 mb-lg-0"
                                style={{ paddingLeft: 30 }}
                            >
                                <li className="nav-item">
                                    <Link
                                        to="/"
                                        className="nav-link"
                                        style={{ fontSize: 'larger', color: 'black' }}
                                        href="#homebg"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="#services"
                                        className="nav-link"
                                        style={{ fontSize: 'larger', color: 'black' }}
                                    >
                                        Services
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to="/About"
                                        className="nav-link"
                                        style={{ fontSize: 'larger', color: 'black' }}
                                    >
                                        About us
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to="/Contactus"
                                        className="nav-link"
                                        style={{ fontSize: 'larger', color: 'black' }}
                                    >
                                        Contactus
                                    </Link>
                                </li>
                            </ul>

                            <div style={{ marginRight: '30px' }}>
                                <Link
                                    to="ShoppingCart"
                                    style={{ textDecoration: 'none', listStyle: 'none' }}
                                >
                                    <FaShoppingCart
                                        style={{
                                            width: '25px',
                                            height: '30px',
                                            color: cartItems.length > 0 ? 'brightblue' : 'black',
                                        }}
                                    />
                                    {cartItems.length > 0 && (
                                        <span className="cart-items">{cartItems.length}</span>
                                    )}
                                </Link>
                            </div>

                            {isLoggedIn ? (

                                <>
                                    <Link
                                        to="Profile"
                                        style={{ textDecoration: 'none', listStyle: 'none' }}
                                    >
                                        < BsPersonCircle
                                            style={{
                                                width: '25px',
                                                height: '30px',
                                                color: cartItems.length > 0 ? 'brightblue' : 'black',
                                                marginRight: '30px'
                                            }}
                                        />
                                    </Link>
                                    <button
                                        id="signinbut"
                                        className="btn btn-secondary bs-btn-hover-color:rgb(9, 88, 178);"
                                        target="_blank"
                                        type="button"
                                        style={{
                                            backgroundColor: 'black',
                                            borderColor: 'black',
                                            textDecoration: 'none',
                                        }}
                                        onClick={handleLogout}
                                    >
                                        Logout

                                    </button>
                                </>

                            ) : (
                                <Link
                                    to="./Signup"
                                    id="signinbut"
                                    className="btn btn-secondary bs-btn-hover-color:rgb(9, 88, 178);"
                                    target="_blank"
                                    type="button"
                                    style={{
                                        backgroundColor: 'black',
                                        borderColor: 'black',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Sign-In
                                </Link>
                            )}
                        </div>
                    </div>
                </nav>
            </header >
        </>
    );
}
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Nav.css';
import { BsPersonCircle } from 'react-icons/bs';
import { FaShoppingCart } from 'react-icons/fa';
import jwtDecode from 'jwt-decode';

export default function Nav() {
    const [cartItems, setCartItems] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const storedProducts = localStorage.getItem('cartProducts');
        if (storedProducts) {
            const cartProductList = JSON.parse(storedProducts);
            setCartCount(cartProductList.length);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserRole(decodedToken.role);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/Login');
    };

    useEffect(() => {
        const handleNavigation = () => {
            window.scrollTo(0, 0);
        };
        navigate(handleNavigation);
    }, [navigate]);

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
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02">
                            <span className="navbar-toggler-icon">A.S</span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul
                                className="navbar-nav me-auto mb-2 mb-lg-0"
                                style={{ paddingLeft: 30 }}
                            >

                                <li className="nav-item">
                                    {userRole === "user" ? (
                                        <Link
                                            to="/"
                                            className="nav-link"
                                            style={{ fontSize: 'larger', color: 'black' }}
                                        >
                                            Home
                                        </Link>
                                    ) : (
                                        <Link
                                            to="/Providerhome"
                                            className="nav-link"
                                            style={{ fontSize: 'larger', color: 'black' }}
                                        >
                                            Home
                                        </Link>
                                    )}
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
                                <Link to="/ShoppingCart" style={{ textDecoration: 'none', listStyle: 'none' }}>
                                    <FaShoppingCart
                                        style={{
                                            width: '25px',
                                            height: '30px',
                                            color: cartCount > 0 ? 'blue' : 'black',
                                        }}
                                    />
                                    {cartCount > 0 && (
                                        <span className="cart-items" style={{ fontSize: '1.3rem', marginLeft: '5px' }}>
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                            </div>

                            {isLoggedIn ? (
                                <>
                                    <Link
                                        to="/Profile"
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
                                    to="/Signup"
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
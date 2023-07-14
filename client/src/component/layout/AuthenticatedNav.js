import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import "./Nav.css";

export default function AuthenticatedNav() {
    return (
        <header>
            <nav
                id="navbarhome"
                className="navbar navbar-expand-lg navbar-light fixed-top"
                style={{ backgroundColor: "#fefefe" }}
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
                                <NavLink
                                    to="/profile"
                                    className="nav-link"
                                    style={{ fontSize: "larger", color: "black" }}
                                >
                                    home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="#services"
                                    className="nav-link"
                                    style={{ fontSize: "larger", color: "black" }}
                                >
                                    Services
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/About"
                                    className="nav-link"
                                    style={{ fontSize: "larger", color: "black" }}
                                >
                                    About us
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/Contactus"
                                    className="nav-link"
                                    style={{ fontSize: "larger", color: "black" }}
                                >
                                    Contact us
                                </NavLink>
                            </li>
                        </ul>

                        <div style={{ marginRight: '30px' }}>
                            <NavLink to="/profile/ShoppingCart" style={{ textDecoration: 'none', listStyle: 'none' }}>
                                <FaShoppingCart style={{ width: '25px', height: '30px', color: 'black' }} />
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

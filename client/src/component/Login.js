import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from './layout/Nav';
import '../css/Login.css';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BsFillEnvelopeFill } from 'react-icons/bs';
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignInSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password,
            });

            // Assuming the server returns a token upon successful login
            const token = response.data.token;
            localStorage.setItem('token', token);

            // Perform any necessary actions with the token (e.g., store it in local storage, set it in the global state, etc.)

            // Redirect the user to the desired route (e.g., home page)
            navigate('/');
        } catch (error) {
            // Handle error response from the server (e.g., display error message to the user)
            console.error(error);
        }
    };

    return (
        <div>

            <>
                <meta charSet="utf-8" />
                <title>Transparent Login Form UI</title>
                <div className="bg-img">
                    <div className="content">
                        <header>Login</header>
                        <form onSubmit={handleSignInSubmit}>
                            <div className="field">
                                <BsFillEnvelopeFill
                                    style={{ width: '25px', height: '20px', marginTop: '13px' }}
                                />
                                <input
                                    type="text"
                                    required
                                    placeholder="Email"
                                    name="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>

                            <div className="field space">
                                <RiLockPasswordFill
                                    style={{ width: '25px', height: '20px', marginTop: '13px' }}
                                />
                                <input
                                    type="password"
                                    className="pass-key"
                                    required
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                            <div className="pass">
                                <a href="#">Forgot Password?</a>
                            </div>
                            <div className="field">
                                <input type="submit" defaultValue="LOGIN" />
                            </div>
                        </form>
                        <br />
                        <div className="signup">
                            Don't have an account?
                            <Link to="/Signup">Signup Here</Link>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
}
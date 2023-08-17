import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsFillPersonFill } from 'react-icons/bs';
import { BsFillEnvelopeFill } from 'react-icons/bs';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BsTelephoneFill } from 'react-icons/bs';
import jwtDecode from 'jwt-decode';

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('user');

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    if (!username) {
      setUsernameError('Username is required');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setEmailError('Invalid email should have @ ');
      return;
    }

    const phonePattern = /^07\d{8}$/;
    if (!phonePattern.test(phone)) {
      setPhoneError('phone number should start with 07 and at least 10 numbers ');
      return;
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*[@!$%^&*])[A-Za-z\d@!$%^&*]{8,}$/;
    if (!passwordPattern.test(password)) {
      setPasswordError('Password must have at least 8 characters C.l and a S.C');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/signup', {
        username,
        email,
        password,
        phone,
        role,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);

      if (role === 'user') {
        navigate('/');
      } else if (role === 'provider') {
        navigate('/Providerhome');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <meta charSet="utf-8" />
      <title>Transparent Login Form UI</title>

      <div className="bg-img">
        <div className="content">
          <header>Sign up</header>

          <form onSubmit={handleSignUpSubmit}>
            <div className="radiobox">
              <div className="form-check">
                <input
                  type="radio"
                  id="user-role"
                  name="role"
                  value="user"
                  checked={role === 'user'}
                  onChange={() => setRole('user')}
                  className="form-check-input"
                />
                <label className="form-check-label" htmlFor="user-role" style={{ color: 'white' }}>
                  User
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="provider-role"
                  name="role"
                  value="provider"
                  checked={role === 'provider'}
                  onChange={() => setRole('provider')}
                  className="form-check-input"
                />
                <label className="form-check-label" htmlFor="provider-role" style={{ color: 'white' }}>
                  Provider
                </label>
              </div>
            </div>

            <div className="field">
              <BsFillPersonFill style={{ width: '30px', height: '25px', marginTop: '9px' }} />
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                  setUsernameError('');
                }}
              />
              <div className="error">{usernameError}</div>
            </div>

            <div className="field" style={{ marginBottom: '20px' }}>
              <BsFillEnvelopeFill style={{ width: '25px', height: '20px', marginTop: '13px' }} />
              <input
                type="email"
                required
                placeholder="Email"
                name="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setEmailError('');
                }}
              />
              <div className="error">{emailError}</div>
            </div>

            <div className="field" style={{ marginBottom: '20px' }}>
              <BsTelephoneFill style={{ width: '25px', height: '20px', marginTop: '13px' }} />
              <input
                type="tel"
                placeholder="Phone Number"
                name="phone"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                  setPhoneError('');
                }}
              />
              <div className="error">{phoneError}</div>
            </div>

            <div className="field space">
              <RiLockPasswordFill style={{ width: '25px', height: '20px', marginTop: '13px' }} />
              <input
                type="password"
                className="pass-key"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setPasswordError('');
                }}
              />
              <div className="error">{passwordError}</div>
            </div>

            <div className="field">
              <input type="submit" value="SIGN UP" />
            </div>
          </form>

          <br />
          <div className="signup">
            Do you have an account? &nbsp;
            <div>
              <Link to="/login">Log in here</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

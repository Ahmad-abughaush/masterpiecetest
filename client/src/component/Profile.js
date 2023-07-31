import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Nav from './layout/Nav';
import "../css/Profile.css";
import Ordertable from './Ordertable';
import Providertable from './Providertable';

export default function Profile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const user_id = decodedToken.user_id;
    console.log(user_id);
    setUserId(user_id);
    const userRole = decodedToken.role;
    setRole(userRole);

    axios.get(`http://localhost:5000/users/${user_id}`)
      .then((response) => {
        const user = response.data;
        setUsername(user.username);
        setEmail(user.email);
        setPhone(user.phone);
        setIsLoading(false);
      })
      .catch((error) => {
        setError('Error fetching user data');
        setIsLoading(false);
      });
  }, [userId]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const updatedUserData = {
      username,
      email,
      phone,
    };

    if (newPassword) {
      updatedUserData.password = newPassword;
    }

    try {
      await axios.put(`http://localhost:5000/users/${userId}`, updatedUserData);
      console.log("Data updated successfully");
      // Optionally, show a success message to the user or redirect to another page
    } catch (error) {
      console.error('Error updating user data:', error);
      setError('Error updating user data');
    }
  };

  return (
    <>
      <Nav />
      <div>
        <div className="container">
          <div className="main-body">
            {isLoading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              <div className="row gutters-sm" style={{ marginTop: "100px" }}>
                <div className="col-md-4 mb-3">
                  <div className="topside">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="Admin"
                        className="rounded-circle"
                        width={150}
                      />
                      <div className="mt-5">
                        <h4>{username}</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card mb-3">
                    <div className="card-body">
                      <form onSubmit={handleUpdate}>
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Full Name</h6>
                          </div>
                          <div className="col-sm-9">
                            <input
                              type="text"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              style={{ width: '300px' }}
                            />
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Email</h6>
                          </div>
                          <div className="col-sm-9">
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              style={{ width: '300px' }}
                            />
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Phone</h6>
                          </div>
                          <div className="col-sm-9">
                            <input
                              type="text"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              style={{ width: '300px' }}
                            />
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">New Password</h6>
                          </div>
                          <div className="col-sm-9">
                            <input
                              type="password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              style={{ width: '300px' }}
                            />
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Confirm New Password</h6>
                          </div>
                          <div className="col-sm-9">
                            <input
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              style={{ width: '300px' }}
                            />
                          </div>
                        </div>
                        <hr />
                        <div className='btn-con' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <button type="submit" className="btn btn-info">
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {role === "user" ? (
        userId && <Ordertable userId={userId} />
      ) : (
        userId && <Providertable userId={userId} />
      )}
    </>
  );
}

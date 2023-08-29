import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Nav from './layout/Nav';
import "../css/Profile.css";
import Ordertable from './Ordertable';
import Providertable from './Providertable';
import Servicetable from './Servicetable';

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
      <div className="container">
      <div className="main-body">
        <div className="row gutters-sm " style={{marginTop:'70px'}}>
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
                  <div className="form-group">
                    <label className="mb-1">Full Name</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="mb-1">Phone</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="mb-1">New Password</label>
                    <input
                      placeholder='**********'
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="mb-1">Confirm New Password</label>
                    <input
                      placeholder='**********'
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className='btn-con' style={{display:'flex' ,justifyContent:'center'}}>
                    <button type="submit" className="btn btn-info btn-block mt-3">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


      {role === "user" ? (
        userId && <Ordertable userId={userId} />
      ) : (
        <>
          {userId && <Providertable userId={userId} />}
          {userId && <Servicetable userId={userId} />}
        </>
      )}

    </>
  );
}

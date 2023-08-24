import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import '../css/Signup.css';

const WaitingHome = () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const navigate = useNavigate();
    const [providerApproved, setProviderApproved] = useState(false);
    const email = decodedToken.email;

    const checkProviderApproval = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/users/email/${email}`);
            const userData = response.data;

            const isApproved = userData && userData.approved;
            setProviderApproved(isApproved);

            if (isApproved) {
                navigate('/Providerhome');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            checkProviderApproval();
        }, 5000);

        // Call checkProviderApproval immediately to ensure the latest status is displayed on mount
        checkProviderApproval();

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            <meta charSet="utf-8" />
            <title>Transparent Login Form UI</title>
            <div className="bg-img">
                <div className="content">
                    <header>
                        {providerApproved ? (
                            <p>Provider is approved! You can proceed.</p>
                        ) : (
                            <p>Waiting for provider to be approved...</p>
                        )}
                    </header>
                </div>
            </div>
        </div>
    );
};

export default WaitingHome;

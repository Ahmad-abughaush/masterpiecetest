import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Servicetable({ userId }) {
    const [services, setServices] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/services/${userId}`);
                setServices(response.data);
                setError('');
            } catch (error) {
                setError('Error fetching services. Please try again later.');
            }
        };

        fetchServices();
    }, [userId]);

    return (
        <div>
            <table className="table align-middle mb-0 mt-5 bg-white ">
                <thead className="bg-light">
                    <tr>
                        <th>Service ID</th>
                        <th>Company NAME</th>
                        <th>Description</th>
                        <th>Phone Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                        <tr key={service._id}>
                            <td>{service._id}</td>
                            <td>{service.companyname}</td>
                            <td>{service.description}</td>
                            <td>{service.phone}</td>
                            <td>
                                <button type="button" className="btn btn-link btn-sm btn-rounded">
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

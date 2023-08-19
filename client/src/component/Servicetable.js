import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Servicetable({ userId }) {
    const [services, setServices] = useState([]);
    const [error, setError] = useState('');
    const [editingServiceId, setEditingServiceId] = useState(null);
    const [editedFields, setEditedFields] = useState({
        companyname: '',
        description: '',
        phone: '',
    });

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

    const handleEditClick = (service) => {
        setEditingServiceId(service._id);
        setEditedFields({
            companyname: service.companyname,
            description: service.description,
            phone: service.phone.toString(),
        });
    };

    const handleEditChange = (field, value) => {
        setEditedFields({ ...editedFields, [field]: value });
    };

    const handleEditConfirm = async () => {
        if (editingServiceId) {
            try {
                const response = await axios.put(
                    `http://localhost:5000/services/${editingServiceId}`,
                    editedFields
                );

                // Update services state with the updated service
                setServices((prevServices) =>
                    prevServices.map((service) =>
                        service._id === editingServiceId ? { ...service, ...editedFields } : service
                    )
                );

                setEditingServiceId(null);
                setEditedFields({
                    companyname: '',
                    description: '',
                    phone: '',
                });
            } catch (error) {
                // Handle error
            }
        }
    };

    const handleDelete = async (serviceId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/services/${serviceId}`);
            setServices((prevServices) => prevServices.filter((service) => service._id !== serviceId));
        } catch (error) {
            // Handle error
        }
    };

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
                            <td>
                                {editingServiceId === service._id ? (
                                    <input
                                        type="text"
                                        value={editedFields.companyname}
                                        onChange={(e) => handleEditChange('companyname', e.target.value)}
                                    />
                                ) : (
                                    service.companyname
                                )}
                            </td>
                            <td>
                                {editingServiceId === service._id ? (
                                    <input
                                        type="text"
                                        value={editedFields.description}
                                        onChange={(e) => handleEditChange('description', e.target.value)}
                                    />
                                ) : (
                                    service.description
                                )}
                            </td>
                            <td>
                                {editingServiceId === service._id ? (
                                    <input
                                        type="text"
                                        value={editedFields.phone}
                                        onChange={(e) => handleEditChange('phone', e.target.value)}
                                    />
                                ) : (
                                    service.phone
                                )}
                            </td>
                            <td>
                                {editingServiceId === service._id ? (
                                    <button
                                        type="button"
                                        className="btn btn-link btn-sm btn-rounded"
                                        onClick={handleEditConfirm}
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-link btn-sm btn-rounded"
                                        onClick={() => handleEditClick(service)}
                                    >
                                        Edit
                                    </button>
                                )}
                                <button
                                    type="button"
                                    className="btn btn-link btn-sm btn-rounded"
                                    onClick={() => handleDelete(service._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

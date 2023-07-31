import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Providertable({ userId }) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch data from the backend API
        const fetchItems = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/items/${userId}`);
                setItems(response.data);
                setError('');
            } catch (error) {
                setError('Error fetching items. Please try again later.');
            }
        };

        fetchItems();
    }, [userId]);

    return (
        <div>
            <table className="table align-middle mb-0 bg-white">
                <thead className="bg-light">
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Company NAME</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item._id}>
                            <td>
                                <div className="d-flex align-items-center">
                                    <div className="ms-1">
                                        <p>{item._id}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="d-flex align-items-center">
                                    <div className="ms-1">
                                        <p>{item.itemName}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="d-flex align-items-center">
                                    <div className="ms-3">
                                        <p>{item.companyname}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="d-flex align-items-center">
                                    <div className="ms-1">
                                        <p>{item.price}</p>
                                    </div>
                                </div>
                            </td>

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

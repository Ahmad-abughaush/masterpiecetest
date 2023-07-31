import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Ordertable({ userId }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/orders/${userId}`);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setOrders([]);
        }
    };

    if (!orders || orders.length === 0) {
        return <div>No orders to display.</div>;
    }

    return (
        <div>
            <table className="table align-middle mb-0 bg-white">
                <thead className="bg-light">
                    <tr>
                        <th>Order ID</th>
                        <th>Products</th>
                        <th>Subtotal</th>
                        <th>Total</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>
                                <div className="d-flex align-items-center">
                                    <div className="ms-1">
                                        <p>{order._id}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="d-flex align-items-center">
                                    <div className="ms-1">
                                        {order.products.map((product, index) => (
                                            <div key={index}>
                                                <p>
                                                    Name: {product.productName}, Price: {product.price}, Quantity: {product.quantity}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="d-flex align-items-center">
                                    <div className="ms-3">
                                        <p>{order.subtotal}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="d-flex align-items-center">
                                    <div className="ms-1">
                                        <p>{order.total}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="d-flex align-items-center">
                                    <div className="ms-1">
                                        <p>{order.address}</p>
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

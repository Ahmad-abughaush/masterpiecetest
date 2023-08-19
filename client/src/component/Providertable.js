import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Providertable({ userId }) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
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

    const handleEdit = async (itemId, updatedData) => {
        const updatedItems = items.map(item => {
            if (item._id === itemId) {
                return { ...item, ...updatedData };
            }
            return item;
        });

        setItems(updatedItems);

        try {
            const response = await axios.put(`http://localhost:5000/items/${itemId}`, updatedData);
        } catch (error) {
            // Handle error
        }
    };

    const handleEditClick = (item) => {
        setEditingItem(item);
        setShowEditModal(true);
    };

    const handleEditConfirm = () => {
        if (editingItem) {
            handleEdit(editingItem._id, editingItem);
            setShowEditModal(false);
        }
    };

    const handleDelete = async (itemId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/items/${itemId}`);
            setItems(prevItems => prevItems.filter(item => item._id !== itemId));
        } catch (error) {
            // Handle error
        }
    };

    return (
        <div>
            <table className="table align-middle mb-0 bg-white">
                <thead className="bg-light">
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Company Name</th>
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
                                        {editingItem && editingItem._id === item._id ? (
                                            <input
                                                type="text"
                                                value={editingItem.itemName}
                                                onChange={(e) => setEditingItem({ ...editingItem, itemName: e.target.value })}
                                            />
                                        ) : (
                                            <p>{item.itemName}</p>
                                        )}
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="d-flex align-items-center">
                                    <div className="ms-3">
                                        {editingItem && editingItem._id === item._id ? (
                                            <input
                                                type="text"
                                                value={editingItem.companyname}
                                                onChange={(e) => setEditingItem({ ...editingItem, companyname: e.target.value })}
                                            />
                                        ) : (
                                            <p>{item.companyname}</p>
                                        )}
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="d-flex align-items-center">
                                    <div className="ms-1">
                                        {editingItem && editingItem._id === item._id ? (
                                            <input
                                                type="text"
                                                value={editingItem.price}
                                                onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                                            />
                                        ) : (
                                            <p>{item.price}</p>
                                        )}
                                    </div>
                                </div>
                            </td>
                            <td>
                                {editingItem && editingItem._id === item._id ? (
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
                                        onClick={() => handleEditClick(item)}
                                    >
                                        Edit
                                    </button>
                                )}
                                <button
                                    type="button"
                                    className="btn btn-link btn-sm btn-rounded"
                                    onClick={() => handleDelete(item._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Modal */}
            {showEditModal && (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Item</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setShowEditModal(false)}
                                >
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    value={editingItem ? editingItem.itemName : ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, itemName: e.target.value })}
                                />
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleEditConfirm}
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowEditModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

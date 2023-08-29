import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import Swal from sweetalert2


export default function Providertable({ userId }) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingItemId, setEditingItemId] = useState(null);

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

    const handleEditClick = (item) => {
        setEditingItem(item); // Set the editingItem state for the clicked item
        setShowEditModal(true);
    };

    const handleEditConfirm = async () => {
        try {
            if (editingItem) {
                const response = await axios.put(`http://localhost:5000/items/${editingItem._id}`, editingItem);
                // Update items with the edited item
                setItems(prevItems =>
                    prevItems.map(item =>
                        item._id === editingItem._id ? editingItem : item
                    )
                );
                setShowEditModal(false);
                setEditingItem(null); // Clear editingItem state
            }
        } catch (error) {
            // Handle error
        }
    };

    const handleDelete = async (itemId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this item!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                const response = await axios.delete(`http://localhost:5000/items/${itemId}`);
                if (response.status === 200) {
                    setItems(prevItems => prevItems.filter(item => item._id !== itemId));
                    Swal.fire('Deleted!', 'The item has been deleted.', 'success');
                } else {
                    Swal.fire('Error', 'An error occurred while deleting the item.', 'error');
                }
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            Swal.fire('Error', 'An error occurred while deleting the item.', 'error');
        }
    };

    return (

        <div >
            <br />
            <br />
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
                                    <>
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm btn-rounded"
                                            onClick={handleEditConfirm}
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm btn-rounded"
                                            onClick={() => {
                                                setShowEditModal(false);
                                                setEditingItem(null); // Clear editingItem state
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-sm btn-rounded"
                                            onClick={() => handleEditClick(item)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm btn-rounded"
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
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

import React from 'react'

export default function Providertable() {
        return (
            <div>
                <table className="table align-middle mb-0 bg-white">
                    <thead className="bg-light">
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Company NAME</th>
                            <th>Price</th>
                            <th>Address</th>
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
                                            {order.products.map((product, index) => (
                                                <div key={index}>
                                                    <p>
                                                        Name: {item.itemName}, Price: {item.price}, Quantity: {product.quantity}
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
    

import React, { useState } from 'react';
import '../css/Providerproductpage.css';
import backgroundimg from './img/بكبس-transformed.jpeg';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Nav from './layout/Nav';

export const Providerproduct = () => {
    const [productNAME, setProductname] = useState('');
    const [companyName, setCompanyname] = useState('');
    const [Price, setPrice] = useState('');
    const [Quantity, setQuantity] = useState('');
    const [file, setFile] = useState(null);
    const [Description, setDescription] = useState('');
    const [userId, setUserId] = useState('');
    const [approved, setApproved] = useState(false);



    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
    };
    const onSubmitForm = async (e) => {
        e.preventDefault();

        // Check if file is provided
        if (!file) {
            console.error('Please select a file to upload.');
            return;
        }

        try {
            // Retrieve the token from localStorage
            const token = localStorage.getItem('token');
            // Decode the token to get the payload
            const decodedToken = jwtDecode(token);
            // Access the user_id from the decoded token
            const userid = decodedToken.user_id;
            setUserId(userid);

            if (userid) {
                const formData = new FormData();
                formData.append('images', file);
                formData.append('productNAME', productNAME);
                formData.append('companyName', companyName);
                formData.append('Price', Price);
                formData.append('Quantity', Quantity);
                formData.append('Description', Description);
                formData.append('userId', userId);
                formData.append('approved', false); // Set approved to false


                const response = await axios.post('http://localhost:5000/newitems', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log(response.data);

                // Clear input fields after successful submission
                setProductname('');
                setCompanyname('');
                setPrice('');
                setQuantity('');
                setFile(null);
                setDescription('');

                // Redirect to a specific page after successful submission
                // You should use React Router for navigation if applicable
                // Example with react-router-dom:

                window.location = '/Providerhome';

            } else {
                console.error('User ID is not available.');
            }
        } catch (err) {
            console.error(err.message);
        }
    };



    return (
        <div>
            <Nav />
            <section>
                <div
                    id="product-provider-page"
                    className="d-flex min-vh-100"
                    lc-helper="background"
                    style={{
                        backgroundBlendMode: 'overlay',
                        backgroundColor: '#201f1fc6',
                        backgroundImage: `url(${backgroundimg})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        width: '100%',
                    }}
                >
                    <div className="align-self-center text-center text-light col-md-8 offset-md-2">
                        <div className="lc-block mb-">
                            <div editable="rich">

                                <form style={{ marginTop: '15%' }} onSubmit={onSubmitForm}>
                                    <h1 style={{ color: 'white', marginBottom: '10%' }}> provide us with your product details </h1>
                                    {/* 2 column grid layout with text inputs for the first and last names */}
                                    <label className="productname" htmlFor="productname">
                                        product name
                                    </label>
                                    <div className="row mb-4">
                                        <div className="form-outline mb-4">
                                            <input
                                                type="text"
                                                id="productname"
                                                className="form-control"
                                                value={productNAME}
                                                onChange={(e) => setProductname(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {/* Text input */}
                                    <label className="companyname" htmlFor="companyname">
                                        Company name
                                    </label>
                                    <div className="form-outline mb-4">
                                        <input
                                            type="text"
                                            id="companyname"
                                            className="form-control"
                                            value={companyName}
                                            onChange={(e) => setCompanyname(e.target.value)}
                                        />
                                    </div>
                                    {/* Text input */}
                                    <label className="price" htmlFor="price">
                                        price
                                    </label>
                                    <div className="form-outline mb-4">
                                        <input
                                            type="text"
                                            id="price"
                                            className="form-control"
                                            value={Price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>
                                    {/* Text input */}
                                    <label className="quantity" htmlFor="quantity">
                                        Quantity
                                    </label>
                                    <div className="form-outline mb-4">
                                        <input
                                            type="text"
                                            id="quantity"
                                            className="form-control"
                                            value={Quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                        />
                                    </div>
                                    {/* File input */}
                                    <label className="attachment" htmlFor="attachment">
                                        attachment
                                    </label>
                                    <div className="form-outline mb-4">
                                        <input
                                            type="file"
                                            id="attachment"
                                            className="form-control"
                                            onChange={handleFileUpload}
                                        />
                                    </div>
                                    {/* Message input */}
                                    <label className="description" htmlFor="description">
                                        description
                                    </label>
                                    <div className="form-outline mb-4">
                                        <textarea
                                            className="form-control"
                                            id="description"
                                            rows={4}
                                            value={Description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                    {/* Submit button */}
                                    <button type="submit" className="btn btn-primary btn-block mb-4">
                                        Place order
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <br />
            </section>
        </div>
    );
};

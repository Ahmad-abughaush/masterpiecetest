import React, { useState } from 'react';
import "../css/Providerproductpage.css";
import backgroundimg from "./img/بكبس-transformed.jpeg";
import axios from 'axios';

export const Providerproduct = () => {
    const [productNAME, setProductname] = useState('');
    const [companyName, setCompanyname] = useState('');
    const [Price, setPrice] = useState('');
    const [Quantity, setQuantity] = useState('');
    const [file, setFile] = useState('');
    const [Description, setDescription] = useState('');

    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
    };
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('images', file);
            formData.append('productNAME', productNAME);
            formData.append('companyName', companyName);
            formData.append('Price', Price);
            formData.append('Quantity', Quantity);
            formData.append('Description', Description);

            const response = await axios.post('http://localhost:5000/newitems', formData, 
            ).then(res=>{
                // console.log(res)
            }).catch(err=>console.log(err))
            console.log(formData)


            // Clear input fields after submitting
            setProductname('');
            setCompanyname('');
            setPrice('');
            setQuantity('');
            setFile('');
            setDescription('');
            
            window.location = '/';
        } 
        catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div>
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
                                <div id="intro" className="display-6 fw-bolder" style={{ marginBottom: 40 }}>
                                    <div id="intro1">
                                        <h1 style={{ color: 'white' }}> provide us with your product details </h1>
                                    </div>
                                </div>
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

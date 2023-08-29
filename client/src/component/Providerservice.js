import React, { useState } from 'react';
import axios from 'axios';
import backgroundimg from "./img/بكبس-transformed.jpeg";
import jwtDecode from 'jwt-decode';
import Nav from './layout/Nav';
const FormInput = ({ label, type, placeholder, value, onChange, required }) => (
    <div className="form-group">
        <label htmlFor={label}>{label}</label>
        <input
            type={type}
            id={label}
            className="form-control"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
        />
    </div>
);

export const Providerservice = () => {
    const [companyName, setCompanyname] = useState('');
    const [file, setFile] = useState(null);
    const [Description, setDescription] = useState('');
    const [Phonenumber, setPhonenumber] = useState('');
    const [userId, setUserId] = useState('');
    const [approved, setApproved] = useState(false);


    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
        console.log(uploadedFile);
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            const user_id = decodedToken.user_id;
            setUserId(user_id);
            console.log(user_id);

            const formData = new FormData();
            formData.append('images', file);
            formData.append('companyName', companyName);
            formData.append('Description', Description);
            formData.append('Phonenumber', Phonenumber);
            formData.append('userId', userId);
            formData.append('approved', false); // Set approved to false


            const response = await axios.post('http://localhost:5000/newservices', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });


            setCompanyname('');
            setFile(null);
            setDescription('');
            setPhonenumber('');
            console.log(response.data);
            window.location = '/Providerhome';


        } catch (err) {
            console.error(err.message);
            // Handle error and display a message to the user
        }
    };


    return (
        <div>
            <Nav/>
            <section>
                <div
                    id="product-service-page"
                    className="d-flex min-vh-100"
                    style={{
                        backgroundColor: '#201f1fc6',
                        backgroundImage: `url(${backgroundimg})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        width: '100%',
                    }}
                >
                    <div className="align-self-center text-center text-light col-md-9 offset-md-2">
                        <div className="lc-block mb-">
                            <div editable="rich">
                                <form style={{ marginTop: '15%' }} onSubmit={onSubmitForm}>
                                    <h1 style={{ color: 'white', marginBottom: '10%' }}>Provide Us With Your Service Details</h1>

                                    <FormInput
                                        label="Company Name"
                                        type="text"
                                        placeholder="Enter company name"
                                        value={companyName}
                                        onChange={(e) => setCompanyname(e.target.value)}
                                        required
                                    />

                                    <FormInput
                                        label="Image"
                                        type="file"
                                        onChange={handleFileUpload}
                                        required
                                    />

                                    <FormInput
                                        label="Description"
                                        type="text"
                                        placeholder="Enter description"
                                        value={Description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />

                                    <FormInput
                                        label="Phone Number"
                                        type="tel"
                                        placeholder="Enter phone number"
                                        value={Phonenumber}
                                        onChange={(e) => setPhonenumber(e.target.value)}
                                        required
                                    />

                                    <button type="submit" className="btn btn-primary btn-block mt-4">
                                        Place Order
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <br />
            <br />
        </div>
    );
};

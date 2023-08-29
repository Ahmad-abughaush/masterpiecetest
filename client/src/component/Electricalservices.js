import React, { useEffect, useState } from 'react';
import Nav from './layout/Nav';
import axios from 'axios';
import '../css/Eelectricalproducts.css';

export default function Electricalservices() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/servicestrue');
                setData(response.data);
            } catch (error) {
                console.log('Error in fetching data', error);
            }
        };

        fetchData();
    }, []);

    const handleFilter = (event) => {
        const filterValue = event.target.value;
        setSearchTerm(filterValue);
    };

    const showPhoneNumber = (phoneNumber) => {
        alert(`Call ${phoneNumber}`);
    };

    const filteredData = data.filter((service) =>
        service && service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Nav />

            <section className="h-100 h-custom bg-white">
                <h1 className="prohead">
                    <b>Electrical Services</b>
                </h1>
                <hr />
                <div className="container py-5">
                    <div className="row d-flex justify-content-center align-services-center h-100">
                        <div className="col">
                            <div className="row mb-4">
                                <div className="col-md-6 offset-md-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by Service Description"
                                        value={searchTerm}
                                        onChange={handleFilter}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                {filteredData.map((service, index) => (
                                    <div key={index} className="col-md-4 mb-4">
                                        <div
                                            className="card"
                                            style={{
                                                height: '450px',
                                                border: '1px solid #ddd',
                                                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                                                transition: 'transform 0.3s, box-shadow 0.3s',
                                                transformOrigin: 'center bottom',
                                            }}
                                            >
                                            <div className="card_image">
                                                <img
                                                    src={service.attachments}
                                                    alt={service.itemName}
                                                    style={{ height: '250px', objectFit: 'cover' }}
                                                />

                                            </div>
                                            <div className="card_content">
                                                <h2 className="card_title">{service.itemName}</h2>
                                                <div className="card_text">
                                                    <h6 style={{ textAlign: 'center' }}>
                                                        Company Name: {service.companyname}
                                                    </h6>
                                                    <p> {service.description}</p>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>

                                                        <button
                                                            className="btn btn-dark"
                                                            onClick={() => showPhoneNumber(service.phone)}
                                                        >
                                                            <i className="fas fa-phone" style={{ color: 'white' }}></i> Call
                                                        </button>
                                                        <p id="phoneNumber" style={{ display: 'none' }}>
                                                            Phone: <span id="phoneValue">{service.phone}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

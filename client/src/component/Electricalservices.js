import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Electricalservices() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [Services, setServices] = useState([]);
    const [storedServices, setStoredServices] = useState([]);

    const data1 = storedServices.map(({ service }) => {
        return service;
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/services");
                setData(response.data);
                console.log(response.data)
                setStoredServices(response.data);
            } catch (error) {
                console.log("Error in fetching data", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        localStorage.setItem('services', JSON.stringify(Services));
    }, [Services]);

    useEffect(() => {
        const storedServices = localStorage.getItem('services');
        if (storedServices) {
            setServices(JSON.parse(storedServices));
        }
    }, []);

    const handleFilter = (event) => {
        const filterValue = event.target.value;
        setSearchTerm(filterValue);
    };

    const filteredData = data1.filter((service) =>
        service && service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="h-100 h-custom bg-white mt-5">
            <div className="container py-5">
                <div className="row d-flex justify-content-center align-services-center h-100">
                    <div className="col">
                        <div className="row mb-4">
                            <div className="col-md-6 offset-md-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by product name"
                                    value={searchTerm}
                                    onChange={handleFilter}
                                />
                            </div>
                        </div>

                        <div className="row">
                            {filteredData.map((service, index) => {
                                if (service && service.companyname) {




                                    return (
                                        <div className="col-md-6 col-lg-4 mb-5" key={service._id}>
                                            <div className="card">
                                                <img
                                                    src={service.attachments}
                                                    className="card-img-top"
                                                    alt={service.companyname}
                                                    style={{ height: '250px', objectFit: 'cover' }}
                                                />

                                                <div className="card-body">
                                                    <h5 className="card-title">{service.companyname}</h5>
                                                    <p className="card-text">{service.description}</p>
                                                    <button className="btn btn-primary">Call Us</button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

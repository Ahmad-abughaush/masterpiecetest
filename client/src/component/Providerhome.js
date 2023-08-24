import React from 'react';
import '../css/Home.css';
import { Link } from 'react-router-dom';
import Nav from './layout/Nav';

export default function Providerhome() {


    
    return (
        <>
            <Nav />
            <div>
                <section>
                    <div
                        id="homebg"
                        className="d-flex min-vh-100"
                        lc-helper="background"
                        style={{
                            backgroundBlendMode: 'overlay',
                            backgroundColor: '#201f1fc6',
                        }}
                    >
                        <div className="align-self-center text-center text-light col-md-8 offset-md-2">
                            <div className="lc-block mb-">
                                <div editable="rich">
                                    <div
                                        id="intro"
                                        className="display-6 fw-bolder"
                                        style={{ marginBottom: 40 }}
                                    >
                                        <div id="intro1">
                                            <span>Welcome</span> <span>To</span> <span> A.E.S </span>
                                        </div>
                                    </div>
                                    <p style={{ fontSize: '26px' }}>
                                        Abughaush for electrical solutions is a platform designed to help
                                        factories and industrial stores get the products and services of
                                        electrical industries that are required related to industrial fields
                                    </p>
                                </div>
                            </div>
                            <div className="lc-block">
                                <div editable="rich">
                                    <br />
                                    <a
                                        className="btn btn-outline-light btn-lg"
                                        href="/Electricalproducts"
                                        role="button"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        {' '}
                                        explore more{' '}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                </section>

                <section>
                    <div id="services">
                        <h1 className="prohead" style={{ marginTop: '5rem' }}>
                            <b>Services We Offer In Electrical System Solution</b>
                        </h1>
                        <hr />
                        <br />
                        <br />
                    </div>




                    <div className="card-deck" id='card-deck-hp'>

                        <Link to="./Providerproduct">
                            <div className="card" id='card-hp'>
                                <img
                                    className="card-img-top" id='card-img-top-hp'
                                    src="https://media.istockphoto.com/id/186856799/photo/electrician-at-work.jpg?s=612x612&w=0&k=20&c=WK0fJL_mFC_56GfsnYNsomuUJ2NlQD9Fvrw5JPafXPg="
                                    alt="Card cap"
                                />
                                <div className="card-body">
                                    <h4 className="card-title">Electrical Products</h4>
                                    <p className="card-text">
                                        A.E.S can help you handle nearly aspect of your electric motor needs to
                                        get your business the capabilities it requires
                                    </p>
                                </div>
                            </div>
                        </Link>

                        <Link to="./Providerservice">
                            <div className="card" id='card-hp'>
                                <img
                                    className="card-img-top" id='card-img-top-hp'
                                    src="https://img.freepik.com/free-photo/different-electrical-tools-wooden-background-flat-lay_169016-24825.jpg?w=996&t=st=1684613435~exp=1684614035~hmac=f1e76294600a00adcc767f97dc175f6caad9036f740d68ae310d27f273d30d99"
                                    alt="Card cap"
                                />
                                <div className="card-body">
                                    <h4 className="card-title">Electrical Industrial Services</h4>
                                    <p className="card-text">
                                        Our Industrial Field Services division consists of experienced field service technicians who design and service most any electrical application.
                                    </p>
                                </div>
                            </div>
                        </Link>

                        <Link to="./Industrialtraining">
                            <div className="card" id='card-hp'>
                                <img
                                    className="card-img-top" id='card-img-top-hp'
                                    src="https://img.freepik.com/free-photo/three-people-discussing-plan-factory_1303-30622.jpg?w=996&t=st=1684613336~exp=1684613936~hmac=55b98e71f1abb54fda95c76267c741f077a035b21f8ea1365085f80386ab0db8"
                                    alt="Card cap"
                                />
                                <div className="card-body">
                                    <h4 className="card-title">Industrial Training</h4>
                                    <p className="card-text">
                                        A.E.S offers a broad suite of training options to electrical workers. We are your one-stop solution provider for hands-on electrical training, virtual training, and other programs covering electrical safety, electrical compliance, and electrical maintenance.
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>

                <div
                    id="carouselExampleCaptions"
                    className="carousel slide"
                    data-bs-ride="carousel"
                    style={{ marginTop: '200px' }}>
                    <div className="carousel-indicators">
                        <button
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to={0}
                            className="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        />
                        <button
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to={1}
                            aria-label="Slide 2"
                        />
                        <button
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to={2}
                            aria-label="Slide 3"
                        />
                    </div>
                    <div className="carousel-inner" >
                        <div className="carousel-item active">
                            <img src="https://www.rendertechindia.com/images/banner/ac.jpg" className="d-block w-100" alt="..." style={{ height: '300px' }} />
                            <div className="carousel-caption d-none d-md-block" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                <h5>electrical morors </h5>
                                <p >  A.E.S can help you handle nearly aspect of your electric motor needs to
                                    get your business the capabilities it requires</p>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <img src="https://www.frecon-inverter.com/static/upload/image/20230614/1686721645682546.jpg" className="d-block w-100" alt="..." style={{ height: '300px' }} />
                            <div className="carousel-caption d-none d-md-block" id='sliderhomepage'>
                                <h5>electrical products</h5>
                                <p id='phomepage'>The high-performance electrical products seamlessly manages power distribution, ensuring reliable and efficient operation in industrial automation systems."</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="https://thegiantsgroup.co.za/wp-content/uploads/2018/08/close-up-hand-electrical-engineering-using-measuring-equipment-tool-to-checking-electricity-circuit-breaker-cable-wiring-214523687.jpg" className="d-block w-100" alt="..." style={{ height: '300px' }} />
                            <div className="carousel-caption d-none d-md-block">
                                <h5> electrical services</h5>
                                <p>Our company specializes in providing comprehensive electrical services, ranging from installation and maintenance to troubleshooting, to meet the diverse needs of residential and commercial clients."</p>
                            </div>
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>


            </div>
        </>
    );
}

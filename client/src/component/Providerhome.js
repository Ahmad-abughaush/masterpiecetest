import React from 'react';
import {useEffect} from 'react';
import '../css/Home.css';
import { Link } from 'react-router-dom';
import Nav from './layout/Nav';
import siemens from '../component/img/siemens.jpg'
import sharp from "../component/img/sharp.png"
export default function Home() {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top when the component mounts
    }, []);
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
                                    <p style={{ fontSize: '22px' }}>
                                        Within this page, you have the opportunity to illuminate your offerings,
                                        sharing the products and services you provide, enriching the Abughaush for Electrical Solutions
                                    </p>
                                </div>
                            </div>
                            <div className="lc-block">
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                </section>

                <section>
                    <div className="container marketing mt-5" >
                        <div >
                            <h1 className="prohead" >
                                <b>What makes us special </b>
                            </h1>
                            <hr />
                            <div className="row" style={{ paddingLeft: '120px' }}>
                                <div className="col-lg-4 mt-5">
                                    <img className="rounded-circle" src="https://m.media-amazon.com/images/I/51Sb81boW2L.jpg" alt="Generic placeholder image" width="100" height="100" />
                                    <h2>Great Offers</h2>
                                    <p>Discover amazing deals that cater to your preferences and needs. </p>
                                </div>
                                <div className="col-lg-4">
                                    <img className="rounded-circle" src="https://img.freepik.com/premium-vector/service-logo-template-design-vector_20029-567.jpg" alt="Generic placeholder image" width="100" height="100" />
                                    <h2>Premium Services</h2>
                                    <p>Experience top-tier services designed to provide you with the utmost convenience and satisfaction.</p>
                                </div>
                                <div className="col-lg-4 mt-5">
                                    <img className="rounded-circle " src="https://cdn.thenewstack.io/media/2022/10/7ac193a1-shutterstock_1967519338.jpg" alt="Generic placeholder image" width="100" height="100" />
                                    <h2>multiple opportunities</h2>
                                    <p>Unlock a world of opportunities that propel you towards success and growth.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>




                <section >

                    <h1 className="prohead" >
                        <b>Discover Our Electrifying Range of Electrical Brands" </b>
                    </h1>
                    <hr />
                    <div className="container col-xxl-12 px-4 py-5 custom-vertical-spacing  ">
                        <div className="row flex-lg-row-reverse align-items-center g-5  ">
                            <div className="col-10 col-sm-8 col-lg-6">
                                <img
                                    src={siemens}
                                    className="d-block mx-lg-auto img-fluid"
                                    alt="Bootstrap Themes"
                                    width={300}
                                    height={100}
                                    loading="lazy"
                                />
                            </div>
                            <div className="col-lg-6">
                                <h2>
                                    Services for energy automation and smart grids</h2>
                                <p >
                                    Siemens offers a diverse range of high-quality electrical products, including automation systems, energy distribution solutions, and intelligent building technologies. Renowned for their reliability and innovation, Siemens products contribute to improved efficiency and sustainable practices in various industries. From advanced motor control centers to smart energy management systems,
                                    Siemens remains a leading provider of cutting-edge electrical solutions.
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className="container col-xxl-12 px-4 py-0 mb-4 custom-vertical-spacing">
                        <div className="row flex-lg-row-reverse align-items-center g-5 ">
                            <div className="col-lg-6">
                                <h2>

                                    Sharp Corporation is a Japanese multinational corporation </h2>
                                <p >
                                    Renowned for its cutting-edge LCD technology, Sharp continues to deliver innovative products that cater to consumer and business needs worldwide. With a commitment to
                                    quality and innovation, Sharp remains a significant player in the global technology market.
                                </p>
                            </div>
                            <div className="col-2 col-sm-8 col-lg-6">
                                <img
                                    src={sharp}
                                    className="d-block mx-lg-auto img-fluid"
                                    alt="Bootstrap Themes"
                                    width={300}
                                    height={50}
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>



                    <div className="container col-xxl-8 px-4 py-5 custom-vertical-spacing mb-5">
                        <div className="row flex-lg-row-reverse align-items-center ">
                            <div className="col-10 col-sm-8 col-lg-6">
                                <img
                                    src="https://img.electricalmarketing.com/files/base/ebm/electricalmarketing/image/2019/04/electricalmarketing_1982_1000px_abb_logo_1024.png?auto=format,compress&fit=crop&h=278&w=500&q=45"
                                    className="d-block mx-lg-auto img-fluid"
                                    alt="Bootstrap Themes"
                                    width={300}
                                    height={100}
                                    loading="lazy"
                                />
                            </div>
                            <div className="col-lg-6 ">
                                <h2 >
                                    ABB is a global leader in industrial technology and automation</h2>
                                <p >
                                    ABB is a prominent provider of electrical products that span various sectors. Their offerings include advanced automation solutions, power distribution products, and innovative robotics and motion systems. ABB's electrical products are widely recognized for their technological excellence, contributing to enhanced efficiency and sustainable practices across industries. Whether it's intelligent motor control, smart grids, or industrial robots, ABB continues to shape the
                                    landscape of electrical engineering with their forward-looking products and solutions.
                                </p>
                            </div>
                        </div>
                    </div>


                </section>



                <section style={{ marginBottom: '10%' }}   >
                    <div id="services">
                        <h1 className="prohead"  >
                            <b>Services We Offer In Abughaush for Electrical Solutions</b>
                        </h1>
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

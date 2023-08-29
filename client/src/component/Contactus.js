import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import '../css/Contactus.css'
import Nav from "./layout/Nav";
import Swal from "sweetalert2";


export default function Contactus() {
    const form = useRef();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const sendEmail = (e) => {
        e.preventDefault();
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
        };

        emailjs.send("service_k8bzo8p", "template_dcfg0g9", templateParams, "dwSj0TzbTpDFQdTUe")
            .then(
                (result) => {
                    // Show SweetAlert success message
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Your message has been successfully sent',
                    });

                    // Reset form values
                    setName("");
                    setEmail("");
                    setSubject("");
                    setMessage("");
                },
                (error) => {
                    console.log(error.text);
                }
            );
    };


    return (

        <>
            <Nav />
            <section style={{ marginTop: '100px' }}>
                <h2 className="h1-responsive font-weight-bold text-center my-4">
                    Contact us
                </h2>
                <p className="text-center w-responsive mx-auto mb-5">
                    Do you have any questions? Please do not hesitate to contact us directly.
                    Our team will come back to you within a matter of hours to help you.
                </p>
                <div className="row">
                    <div className="center-container" style={{ marginTop: "-10rem" }}>

                        <form
                            id="contact-form"
                            name="contact-form"
                            action="mail.php"
                            method="POST"
                        >
                            {/*Grid row*/}
                            <div className="row">
                                {/*Grid column*/}
                                <div className="col-md-6">
                                    <div className="md-form mb-0">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-control"
                                        />
                                        <label htmlFor="name" className="">
                                            Your name
                                        </label>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="md-form mb-0">
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            className="form-control"
                                        />
                                        <label htmlFor="email" className="">
                                            Your email
                                        </label>
                                    </div>
                                </div>
                                {/*Grid column*/}
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="md-form mb-0">
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            className="form-control"
                                        />
                                        <label htmlFor="subject" className="">
                                            Subject
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {/*Grid row*/}
                            {/*Grid row*/}
                            <div className="row">
                                {/*Grid column*/}
                                <div className="col-md-12">
                                    <div className="md-form">
                                        <textarea
                                            type="text"
                                            id="message"
                                            name="message"
                                            rows={2}
                                            className="form-control md-textarea"
                                            defaultValue={""}
                                        />
                                        <label htmlFor="message">Your message</label>
                                    </div>
                                </div>
                            </div>
                            <div  style={{display:'flex' ,justifyContent:'center'}}>
                                <button className="btn btn-dark" type="submit" onClick={sendEmail}>
                                    Send
                                </button>
                            </div>
                            {/*Grid row*/}
                        </form>


                        <div className="status" />
                        <div className="col-md-3 text-center">
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <i className="fas fa-map-marker-alt fa-2x" />
                                    <p>ZARQA,JORDAN</p>
                                </li>
                                <li>
                                    <i className="fas fa-phone mt-4 fa-2x" />
                                    <p>+ 962 799634896</p>
                                </li>
                                <li>
                                    <i className="fas fa-envelope mt-4 fa-2x" />
                                    <p>ahmedabughoshh@gmail.com</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-3 text-center">
                        {/* Contact information */}
                    </div>

                </div>
            </section>
        </>
    );
}

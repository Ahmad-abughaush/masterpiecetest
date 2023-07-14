import { Themecontext } from "../App";
import "../css/Contactus.css"
import React, { useState, useEffect } from "react";
import Nav from "./layout/Nav";

export default function Contactus() {
    const [firstName, setFirstname] = useState("")
    const [lastNAME, setLastname] = useState("");
    const [Email, setEmail] = useState("")
    const [PhoneNumber, setPhonenumber] = useState("")
    const [Message, setMessage] = useState("")
    const [Data, setData] = useState([])

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("contactData"))
        if (storedData) {
            setData(storedData);
        }
    }
        , []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newData = {
            firstName, lastNAME, Email, PhoneNumber, Message
        }
        const updatedData = [...Data, newData]
        setData(updatedData)
        localStorage.setItem("contactData", JSON.stringify(updatedData))

    };
    

    return (
        <>
        <div className="contact_us_2">
            <div className="responsive-container-block big-container">
                <div className="blueBG"></div>
                <div className="responsive-container-block container">

                    <form className="form-box" onClick={handleSubmit}>
                        <div className="container-block form-wrapper">
                            <p className="text-blk contactus-head">Get in Touch</p>
                            <p className="text-blk contactus-subhead">
                            </p>
                            <div className="responsive-container-block">
                                <div
                                    className="responsive-cell-block wk-ipadp-6 wk-tab-12 wk-mobile-12 wk-desk-6" id="i10mt" >
                                    <p className="text-blk input-title">FIRST NAME</p>
                                    <input
                                        className="input"
                                        placeholder="Please enter first name..."
                                        onChange={(e) => setFirstname(e.target.value)}
                                        name="firstname"
                                        type="text"
                                    />
                                </div>

                                <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                                    <p className="text-blk input-title">LAST NAME</p>
                                    <input
                                        className="input"
                                        placeholder="Please enter last name..."
                                        onChange={(e) => setLastname(e.target.value)}
                                        name="lastname"
                                        type="text"

                                    />
                                </div>

                                <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                                    <p className="text-blk input-title">EMAIL</p>
                                    <input
                                        className="input"
                                        placeholder="Please enter email..."
                                        onChange={(e) => setEmail(e.target.value)}
                                        name="email"
                                        type="email"

                                    />
                                </div>

                                <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                                    <p className="text-blk input-title">PHONE NUMBER</p>
                                    <input
                                        className="input"
                                        placeholder="Please enter phone number..."
                                        onChange={(e) => setPhonenumber(e.target.value)}
                                        name="phonenumber"
                                        type="number"

                                    />
                                </div>
                                <div
                                    className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                                    id="i634i"
                                >
                                    <p className="text-blk input-title">WHAT DO YOU HAVE IN MIND</p>
                                    <textarea
                                        className="textinput"
                                        id="i5vyy"
                                        placeholder="Please enter query..."
                                        defaultValue={""}
                                        onChange={(e) => setMessage(e.target.value)}
                                        name="message"
                                        type="textarea"
                                    />
                                </div>
                            </div>
                            <button className="submit-btn" >Submit</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
</>
    )
}

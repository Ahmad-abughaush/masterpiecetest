import React, { useState, useEffect } from 'react';
import { FaTruck } from 'react-icons/fa';
import SweetAlert from 'react-bootstrap-sweetalert';
import ShoppingCart from './ShoppingCart';

const Timer = ({ onFinish }) => {
    const [countdown, setCountdown] = useState(25 * 60); // 25 minutes in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        if (countdown === 0) {
            onFinish();
        }
    }, [countdown, onFinish]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    return (
        <div>
            <FaTruck />
            <p> within {formatTime(countdown)} </p>
        </div>
    );
}



const Checkout = (props) => {
    const { total, subtotal } = props
    const [showAlert, setShowAlert] = useState(false);
    const [showTimer, setShowTimer] = useState(false);
    const [products, setProducts] = useState([]);


    useEffect(() => {
        const cartData = localStorage.getItem('cartProducts');
        if (cartData) {
            setProducts(JSON.parse(cartData));
        }
    
    }, []);
    const handlePlaceOrder = () => {
        setShowAlert(true);
        setShowTimer(true);
    }

    const handleTimerFinish = () => {
        setShowAlert(true);
        setShowTimer(false);
    }

    

    return (
        <div>
            <main>
                <section className="vh-120" style={{ backgroundColor: "white", marginTop: '60px' }}>
                    <div className="container py-6 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <hr className="mt-0 mb-4" />
                            <div className="col col-lg-10 mb-4 mb-lg-0">
                                <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                                    <div className="row g-0">
                                        <div className="col-md-13 gradient-custom text-center text-dark bg-white" style={{ borderTopLeftRadius: ".5rem" }}>
                                            <h3>
                                                <b>Check Out</b>
                                            </h3>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-0">
                                                <div className="col-md-12 gradient-custom text-center text-dark" style={{ borderTopLeftRadius: ".5rem", borderBottomLeftRadius: "15px" }}>
                                                    <img src="https://estatic.universityguru.com/images/gmaps/a4d487914173305edf74e87d124a6fa4.png" alt="Avatar" className="img-fluid my-5" style={{ width: 1000, height: 400 }} />
                                                    <h5>Abu Ghaush (Al Hadiqa)</h5>
                                                    <p className="text-muted">Alhag Murad Street 139, FST</p>
                                                    {showTimer && <Timer onFinish={handleTimerFinish} />}
                                                </div>
                                            </div>

                                            <div className="col-md-10">
                                                <div className="card-body p-4">
                                                    <h4 style={{ textAlign: "start" }}>
                                                        <b>Payment Summary</b>
                                                    </h4>
                                                    <hr className="mt-0 mb-4" />
                                                    <div className="row pt-1">
                                                        <div className="col-6 mb-3">
                                                            <div id="paymentSummary" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                                <h6>Subtotal</h6>
                                                                <p className="text-muted">{subtotal}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row pt-1">
                                                        <div className="col-6 mb-3">
                                                            <div id="information" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                                <h6>Service Fee</h6>
                                                                <p className="text-muted">4.99 JD</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row pt-1">
                                                        <div className="col-6 mb-3">
                                                            <div id="information" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                                <h6>
                                                                    <b>Total (tax included)</b>
                                                                </h6>
                                                                <p>
                                                                    <b>{total}</b>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="basketbtn" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "nowrap" }}>
                                                        <input
                                                            type="button"
                                                            name="additem"
                                                            className="add"
                                                            value="Place Order"
                                                            id="checkout"
                                                            style={{
                                                                border: '0px',
                                                                padding: 15,
                                                                borderRadius: 20,
                                                                backgroundColor: "BLUE",
                                                                color: "white",
                                                                width: 200,
                                                                marginLeft: "20%",
                                                            }}
                                                            onClick={handlePlaceOrder}
                                                        />
                                                        {showAlert && (
                                                            <SweetAlert
                                                                success
                                                                title="Order placed successfully!"
                                                                onConfirm={() => setShowAlert(false)}
                                                            >
                                                                Thank you for using our service!
                                                            </SweetAlert>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Checkout;

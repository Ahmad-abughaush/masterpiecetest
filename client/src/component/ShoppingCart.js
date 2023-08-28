import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/ShoppingCart.css"
import Nav from './layout/Nav';
import jwtDecode from 'jwt-decode';
import Swal from'sweetalert2'
const ShoppingCart = () => {
    const [products, setProducts] = useState([]);
    const [shippingAddress, setShippingAddress] = useState('');
    const [calculatedSubtotal, setCalculatedSubtotal] = useState('');
    const [calculatedTotal, setCalculatedTotal] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'));
    const [userId, setUserId] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');
    const [cardExpiration, setCardExpiration] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const cartData = localStorage.getItem('cartProducts');
        if (cartData) {
            setProducts(JSON.parse(cartData));
        }
    }, []);

    useEffect(() => {
        const totalPrice = products.reduce(
            (total, product) => total + product.price * product.quantity,
            0
        );
        const subtotal = totalPrice.toFixed(2);
        const total = (parseFloat(subtotal) + 4.99).toFixed(2);
        setCalculatedSubtotal(subtotal);
        setCalculatedTotal(total);
    }, [products]);

    const handleQuantityChange = (index, quantity) => {
        const updatedProducts = [...products];
        updatedProducts[index].quantity = quantity;
        setProducts(updatedProducts);
        localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
    };

    const handleRemoveProduct = (index) => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
        localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
    };

    const handleAddressChange = (e) => {
        setShippingAddress(e.target.value);
    };

    const handlePurchase = async (e) => {
        if (isLoggedIn) {
            const token = localStorage.getItem('token');
            setIsLoggedIn(token);
            const decodedToken = jwtDecode(token);
            const user_id = decodedToken.user_id;
            setUserId(user_id);
    
            // Validation using regex patterns
            const nameRegex = /^[a-zA-Z\s]+$/;
            const expRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
            const cardRegex = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
            const cvvRegex = /^\d{3}$/;
    
            if (
                !nameRegex.test(nameOnCard) ||
                !expRegex.test(cardExpiration) ||
                !cardRegex.test(cardNumber) ||
                !cvvRegex.test(cvv) ||
                shippingAddress === ''
            ) {
                alert('Please fill in all required fields correctly.');
                return;
            }
    
            try {
                const order = {
                    user: { _id: userId },
                    products: products,
                    calculatedTotal: calculatedTotal,
                    calculatedSubtotal: calculatedSubtotal,
                    shippingAddress: shippingAddress,
                };
                const result = await Swal.fire({
                    title: 'Are you sure you want to place the order?',
                    text: 'Are you sure you want to place the order?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, place the order!',
                });
    
                if (result.isConfirmed) {
                    // Post the order data if the user confirms
                    const response = await axios.post('http://localhost:5000/neworder', order);
                    console.log(response);
                    localStorage.removeItem('cartProducts');
                    navigate('/');
    
                    Swal.fire('Success', 'Your order has been placed!', 'success'); // Display success message
                }
            } catch (err) {
                console.error(err.message);
            }
        } else {
            alert("You have to log in first");
            navigate('/Login');
        }
    };

    const isFormValid = () => {
        const nameRegex = /^[a-zA-Z\s]+$/;
        const expRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        const cardRegex = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
        const cvvRegex = /^\d{3}$/;

        return (
            nameRegex.test(nameOnCard) &&
            expRegex.test(cardExpiration) &&
            cardRegex.test(cardNumber) &&
            cvvRegex.test(cvv) &&
            shippingAddress !== ''
        );
    };

    return (
        <>
            <Nav />
            <section className="h-110 h-custom">
                <div className="container h-100 py-5" style={{ marginTop: '30px' }}>
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="h5">
                                                Shopping Bag
                                            </th>
                                            <th scope="col" style={{ marginLeft: '20px' }}>
                                                Product
                                            </th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product, index) => (
                                            <tr key={index}>
                                                <td className="align-middle">
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src={product.attachments}
                                                            className="img-fluid rounded-3"
                                                            width={150}
                                                            alt="Product"
                                                        />
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    <div className="flex-column ms-1">
                                                        <p className="mb-2">{product.itemName}</p>
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    <div className="d-flex flex-row">
                                                        <button
                                                            className="btn btn-link px-2"
                                                            onClick={() => {
                                                                if (product.quantity > 1) {
                                                                    handleQuantityChange(index, product.quantity - 1);
                                                                }
                                                            }}
                                                        >
                                                            <i className="fas fa-minus" />
                                                        </button>
                                                        <input
                                                            min={1}
                                                            name="quantity"
                                                            value={product.quantity}
                                                            type="number"
                                                            className="form-control form-control-sm"
                                                            style={{ width: 50 }}
                                                            onChange={(e) =>
                                                                handleQuantityChange(index, parseInt(e.target.value, 10))
                                                            }
                                                        />
                                                        <button
                                                            className="btn btn-link px-2"
                                                            onClick={() => handleQuantityChange(index, product.quantity + 1)}
                                                        >
                                                            <i className="fas fa-plus" />
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    JD{(product.price * product.quantity).toFixed(2)}
                                                </td>
                                                <td className="align-middle">
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleRemoveProduct(index)}
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                         
                         
                         
                            <div className="card shadow-2-strong mb-5 mb-lg-0" style={{ borderRadius: 16 }}>
                                <div className="card-body p-4">
                                    <div className="row">
                                        <div className="col-md-6 col-lg-4 col-xl-3 mb-4 mb-md-0">
                                            <form>
                                                <div className="d-flex flex-row pb-3">
                                                    <div className="d-flex align-items-center pe-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="radioNoLabel"
                                                            id="radioNoLabel1v"
                                                            defaultValue=""
                                                            aria-label="..."
                                                            defaultChecked=""
                                                        />
                                                    </div>
                                                    <div className="rounded border w-100 p-3">
                                                        <p className="d-flex align-items-center mb-0">
                                                            <i className="fab fa-cc-mastercard fa-2x text-dark pe-2" />
                                                            Credit Card
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row pb-3">
                                                    <div className="d-flex align-items-center pe-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="radioNoLabel"
                                                            id="radioNoLabel2v"
                                                            defaultValue=""
                                                            aria-label="..."
                                                        />
                                                    </div>
                                                    <div className="rounded border w-100 p-3">
                                                        <p className="d-flex align-items-center mb-0">
                                                            <i className="fab fa-cc-visa fa-2x fa-lg text-dark pe-2" />
                                                            Debit Card
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row">
                                                    <div className="d-flex align-items-center pe-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="radioNoLabel"
                                                            id="radioNoLabel3v"
                                                            defaultValue=""
                                                            aria-label="..."
                                                        />
                                                    </div>
                                                    <div className="rounded border w-100 p-3">
                                                        <p className="d-flex align-items-center mb-0">
                                                            PayPal
                                                        </p>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-md-6 col-lg-4 col-xl-6">
                                            <div className="row">
                                                <div className="col-12 col-xl-6">
                                                    <div className="form-outline mb-4 mb-xl-5">
                                                        <input
                                                            type="text"
                                                            id="typeName"
                                                            className={`form-control form-control-lg ${nameOnCard !== '' && !/^[a-zA-Z\s]+$/.test(nameOnCard) ? 'is-invalid' : ''
                                                                }`}
                                                            size={17}
                                                            placeholder="John Smith"
                                                            value={nameOnCard}
                                                            onChange={(e) => setNameOnCard(e.target.value)}
                                                        />
                                                        <label className="form-label" htmlFor="typeName">
                                                            Name on card
                                                        </label>
                                                        {nameOnCard !== '' && !/^[a-zA-Z\s]+$/.test(nameOnCard) && (
                                                            <div className="invalid-feedback">Invalid name format</div>
                                                        )}
                                                    </div>
                                                    <div className="form-outline mb-4 mb-xl-5">
                                                        <input
                                                            type="text"
                                                            id="typeExp"
                                                            className={`form-control form-control-lg ${cardExpiration !== '' && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiration) ? 'is-invalid' : ''
                                                                }`}
                                                            placeholder="MM/YY"
                                                            size={7}
                                                            minLength={7}
                                                            maxLength={7}
                                                            value={cardExpiration}
                                                            onChange={(e) => setCardExpiration(e.target.value)}
                                                        />
                                                        <label className="form-label" htmlFor="typeExp">
                                                            Expiration
                                                        </label>
                                                        {cardExpiration !== '' && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiration) && (
                                                            <div className="invalid-feedback">Invalid expiration format</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-12 col-xl-6">
                                                    <div className="form-outline mb-4 mb-xl-5">
                                                        <input
                                                            type="text"
                                                            id="typeText"
                                                            className={`form-control form-control-lg ${cardNumber !== '' && !/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(cardNumber) ? 'is-invalid' : ''
                                                                }`}
                                                            size={17}
                                                            placeholder="1111 2222 3333 4444"
                                                            minLength={19}
                                                            maxLength={19}
                                                            value={cardNumber}
                                                            onChange={(e) => setCardNumber(e.target.value)}
                                                        />
                                                        <label className="form-label" htmlFor="typeText">
                                                            Card Number
                                                        </label>
                                                        {cardNumber !== '' && !/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(cardNumber) && (
                                                            <div className="invalid-feedback">Invalid card number format</div>
                                                        )}
                                                    </div>
                                                    <div className="form-outline mb-4 mb-xl-5">
                                                        <input
                                                            type="password"
                                                            id="typeText"
                                                            className={`form-control form-control-lg ${cvv !== '' && !/^\d{3}$/.test(cvv) ? 'is-invalid' : ''
                                                                }`}
                                                            placeholder="●●●"
                                                            size={1}
                                                            minLength={3}
                                                            maxLength={3}
                                                            value={cvv}
                                                            onChange={(e) => setCvv(e.target.value)}
                                                        />
                                                        <label className="form-label" htmlFor="typeText">
                                                            Cvv
                                                        </label>
                                                        {cvv !== '' && !/^\d{3}$/.test(cvv) && (
                                                            <div className="invalid-feedback">Invalid CVV format</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-xl-3">
                                            <div className="mb-4">
                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="text"
                                                        id="address"
                                                        className={`form-control form-control-lg ${shippingAddress === '' ? 'is-invalid' : ''
                                                            }`}
                                                        value={shippingAddress}
                                                        onChange={handleAddressChange}
                                                        placeholder="Enter your address"
                                                    />
                                                    <label className="form-label" htmlFor="address">
                                                        Address
                                                    </label>
                                                    {shippingAddress === '' && <div className="invalid-feedback">Address is required</div>}
                                                </div>
                                                {/* You can add additional address fields like city, postal code, etc. here */}
                                            </div>
                                            <div className="d-flex justify-content-between" style={{ fontWeight: 500 }}>
                                                <p className="mb-2">Subtotal</p>
                                                <p className="mb-2">{calculatedSubtotal}</p>
                                            </div>
                                            <div className="d-flex justify-content-between" style={{ fontWeight: 500 }}>
                                                <p className="mb-2">Free service</p>
                                                <p className="mb-2">4.99</p>
                                            </div>
                                            <div className="d-flex justify-content-between" style={{ fontWeight: 500 }}>
                                                <p className="mb-2">Total</p>
                                                <p className="mb-2">{calculatedTotal}</p>
                                            </div>
                                            <button
                                                className="btn btn-primary btn-lg"
                                                onClick={handlePurchase}
                                                disabled={!isFormValid()}
                                            >
                                                Purchase
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ShoppingCart;

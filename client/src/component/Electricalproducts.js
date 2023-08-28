import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './layout/Nav';
import Footer from './layout/Footer';
import '../css/Eelectricalproducts.css';

const ElectricalProducts = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartProduct, setCartProduct] = useState([]);
  const [storedData, setStoredData] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/itemsapproved', {
          params: {
            approved: true,
          },
        });
        setData(response.data);
        setStoredData(response.data);

        const storedProducts = localStorage.getItem('cartProducts');
        if (storedProducts) {
          setCartProduct(JSON.parse(storedProducts));

          // Mark products as added to cart
          const productsInCart = JSON.parse(storedProducts).map(product => product.itemName);
          const addedToCartMap = {};
          response.data.forEach((item, index) => {
            addedToCartMap[index] = productsInCart.includes(item.itemName);
          });
          setAddedToCart(addedToCartMap);
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (item, index) => {
    const { attachments, itemName, price, companyname } = item;
    const cardDetails = { attachments, itemName, price, quantity: 1, companyname };
    setCartProduct([...cartProduct, cardDetails]);
    localStorage.setItem('cartProducts', JSON.stringify([...cartProduct, cardDetails]));
    setAddedToCart(prevState => ({ ...prevState, [index]: true }));
  };

  const handleFilter = (event) => {
    const filterValue = event.target.value;
    setSearchTerm(filterValue);
  };

  const filteredData = storedData.filter((item) =>
    item.itemName && item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Nav />

      <section className="h-100 h-custom bg-white">
        <h1 className="prohead">
          <b>Electrical Products</b>
        </h1>
        <hr />
        <div className="container py-5">
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
            {filteredData.map((item, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div
                  className="card"
                  style={{
                    height: '480px',
                    border: '1px solid #ddd',
                    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    transformOrigin: 'center bottom',
                  }}
                >
                  <div className="card_image">
                    <img
                      src={item.attachments}
                      alt={item.itemName}
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                    <span className="card_price">
                      <span>JD</span>
                      {item.price}
                    </span>
                  </div>
                  <div className="card_content">
                    <h2 className="card_title">{item.itemName}</h2>
                    <div className="card_text">
                      <h6
                        style={{ textAlign: 'center', fontWeight: '800' }}
                      >
                        Company Name: {item.companyname}
                      </h6>
                      <p>{item.description}</p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '10px',
                      }}
                    >
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAddToCart(item, index)}
                        style={{
                          backgroundColor: addedToCart[index] ? 'gray' : 'black',
                        }}
                        disabled={addedToCart[index]}
                      >
                        {addedToCart[index] ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ElectricalProducts;

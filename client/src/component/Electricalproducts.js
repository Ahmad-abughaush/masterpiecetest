import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './layout/Nav';

const ElectricalProducts = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartProduct, setCartProduct] = useState([]);
  const [storedData, setStoredData] = useState([]);
  const data1 = storedData.map(({ item }) => {
    return item
  })




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/items');
        setData(response.data);
        setStoredData(response.data); // Save the fetched data to storedData state variable
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (item) => {
    const { attachments, itemName, price, companyname } = item;
    const cardDetails = { attachments, itemName, price, quantity: 1, companyname };
    setCartProduct([...cartProduct, cardDetails]);
  };

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProduct));
  }, [cartProduct]);


const items= localStorage.getItem('cartProducts')

  useEffect(() => {
    const storedProducts = localStorage.getItem('cartProducts');
    if (storedProducts) {
      setCartProduct(JSON.parse(storedProducts));
    }
  }, []);

  const handleFilter = (event) => {
    const filterValue = event.target.value;
    setSearchTerm(filterValue);
  };

  const filteredData = data1.filter((item) =>
    item.itemName && item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Nav/>
      <section className="h-100 h-custom bg-white mt-5">
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
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
                {filteredData.map((item, index) => (
                  
                  
                  
                  <div className="col-md-6 col-lg-4 mb-5" key={item._id}>
                    <div className="card">
                      <img
                        src={item.attachments}
                        className="card-img-top"
                        alt={item.itemName}
                        style={{ height: '250px', objectFit: 'cover' }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item.itemName}</h5>
                        <p className="card-text">{item.description}</p>
                        <h6 className="card-subtitle mb-2 text-muted">Price: JD {item.price}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Company: {item.companyname}</h6>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleAddToCart(item)}
                        >
                          Add to Cart
                        </button>
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
};

export default ElectricalProducts;

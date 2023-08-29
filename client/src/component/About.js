import React from 'react'
import Nav from "../component/layout/Nav"
import "../css/About.css"
import Footer from './layout/Footer'

export default function About() {
  return (
    <>
      <Nav />
      <div>
        <section id>
          <div id="about-section1" className="container">
            <div className="row">
              <div className="col-lg-5 col-sm-10" style={{ paddingTop: "14  rem" }}>
                <img
                  className="img-responsive"
                  src="https://media.istockphoto.com/id/1354891373/photo/a-male-electrician-works-in-a-switchboard-with-an-electrical-connecting-cable.jpg?s=612x612&w=0&k=20&c=Kf3dKdLua7qjo_ekhqGOKeL-f9rxxjNsvAkNgKZJ6BI="
                  style={{
                    width: "-webkit-fill-available",
                    borderRadius: 30,
                    marginTop: "px",
                  }}
                />
              </div>
              <div className=" about-section col-lg-7 col-sm-12 mt-5" >
                <h1 style={{textAlign:'center'}}>About Us</h1>
                <hr/>
                <br />
                <p id="fs-3" className="fs-3">
                  The main objective of A.E.S is help factories and industrial stores
                  get the products and services of electrical industries that are
                  required related to industrial field
                </p>
                <p id="fs-3" className="fs-3">
                  by making a connection between companies, factories and industries
                  around the city that's by providing them with a roadmap
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

import React, { useEffect, useState } from "react";
import Helmet from "../components/helmet/Helmet";
import { Col, Container, Row } from "reactstrap";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Servicess from "../services/Servicess";
import Productlist from "../components/UI/Productlist";
import counterImg from "../assets/images/counter-timer-img.png"
import Clock from "../components/UI/Clock";
import Usegetdata from "../customhooks/Usegetdata";
const Home = () => {
  const year = new Date().getFullYear();
  const [productData, setProductData] = useState([]);
  const {data:products}=Usegetdata("products")
  const fetchmore=async()=>{
    const res = await fetch("https://fakestoreapi.com/products")
    const json = await res.json()
    setProductData(json)
   }
   useEffect(()=>{
    fetchmore()
   },[])
  return (
    <Helmet title={" Home"}>
      <div className="section-hero">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero-content">
                <p className="hero-subtitle">Trending Product in {year}</p>
                <h2>Make your Interior More Minimalist 6 Modern</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quidem minima eos sequi sint corporis debitis porro iste
                  ipsum, quam reprehenderit voluptatibus quasi dolore nulla
                  atque incidunt in quod earum ipsam praesentium quo, aperiam
                  explicabo rem vel. Quisquam amet nihil, libero voluptatibus
                  culpa cupiditate quia? Vel eum nemo omnis harum pariatur.
                </p>
                <Link to={"/shop"}>
                  <motion.button
                    whileTap={{ scale: 1.1 }}
                    className="btn btn-primary"
                  >
                    Shop Now
                  </motion.button>
                </Link>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__image">
                <img
                  src="https://images.unsplash.com/photo-1602979677071-1781b7f40023?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0JTIwYW5kJTIwZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                  alt=""
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Servicess />
      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Trending Products</h2>
            </Col>
            <Productlist data={productData}/>
          </Row>
        </Container>
      </section>

      <section className="best__sales">
        <Container>
          <Row>
           <Col lg="6" md="12">
            <div className="clock__top-content">
              <h4 className="text-white fs-6">Limited Offers</h4>
              <h3 className="text-white fs-6 mb-3">Qualitiy Armchair</h3>
            </div>
            <Clock/>
           <div className="visit__store">
           <motion.button whileTap={{scale:1.2}} className="btn btn-warning "><Link to={"/shop"}>Visit Store</Link></motion.button>
           </div>
           </Col>
           <Col lg="6" md="12" className="text-end counter__img">
            <img src={counterImg} alt="" />
           </Col>
          </Row>
        </Container>
      </section>

      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">New Arrivals</h2>
            </Col>
            <Productlist data={productData}/>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;

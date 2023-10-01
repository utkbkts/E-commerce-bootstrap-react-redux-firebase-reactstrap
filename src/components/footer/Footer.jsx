import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";

const Footer = () => {
  return (
    <div className="footer">
      <div className="white">
        <Row >
          <Col lg="4" >
            <div className="logo">
              <img
                src="https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9nb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60"
                alt="logo"
              />
              <div className="shopping">
                <span>
                  <h1 className="title">Utku-Shopping</h1>
                </span>
              </div>
            </div>
            <p className="footer__text mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed eos
              veniam nam tempore? Deserunt debitis enim cumque laudantium id.
              Molestiae!
            </p>
          </Col>
          <Col lg="3">
            <div className="footer__quick-links">
              <h4 className="title">Top Categories</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"}>technology gadgets</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"}>Clothes</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"}>T-shirts</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"}>Shoes</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="2"> <div className="footer__quick-links">
              <h4 className="title">Useful Links</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"/shop"}>Shops</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"/cart"}>Cart</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"/login"}>Login</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"}>Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div></Col>
          <Col lg="3">
            <div className="footer__quick-links">
              <h4 className="title">Contact Us</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"}>Address</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"}>Phone</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"}>Email</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <p className="text-center mt-5 border-top">&copy; 2023 Utku BEKTASOGLU</p>
        </Row>
      </div>
    </div>
  );
};

export default Footer;

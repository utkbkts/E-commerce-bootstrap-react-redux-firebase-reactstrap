import React from "react";
import { Col, Container, Row } from "reactstrap";
import "../styles/dashboard.css"
import Usegetdata from "../customhooks/Usegetdata";
const Dashboard = () => {

  const {data:products}=Usegetdata("products")
  const {data:users}=Usegetdata("users")

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col className="lg-3">
              <div className="revenue__box">
                <h5>Total Sales</h5>
                <span>$789</span>
              </div>
            </Col>
            <Col className="lg-3">
              <div className="order__box">
                <h5>Order</h5>
                <span>$789</span>
              </div>
            </Col>
            <Col className="lg-3">
              <div className="products__box">
                <h5>Total Products</h5>
                <span>{products.length}</span>
              </div>
            </Col>
            <Col className="lg-3">
              <div className="users__box">
                <h5>Total users</h5>
                <span>{users.length}</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Dashboard;

import React from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/helmet/Helmet";
import Commonsection from "../components/UI/Commonsection";
import "../styles/Checkout.css"
import { useSelector } from "react-redux";
const Checkout = () => {
  const totalQty = useSelector((state)=>state.cart.totalQuantity)
  const totalamount = useSelector((state)=>state.cart.totalAmount)
  return (
    <Helmet title="Checkout">
      <Commonsection title={"checkout"} />
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <h6 className="mb-4 fw-bold">Billing Information</h6>
              <Form className="billing-form">
                <FormGroup className="form-group">
                  <input type="text" placeholder="Enter your name" />
                </FormGroup>

                <FormGroup className="form-group">
                  <input type="email" placeholder="Enter your email" />
                </FormGroup>

                <FormGroup className="form-group">
                  <input type="number" placeholder="Phone your number" />
                </FormGroup>

                <FormGroup className="form-group">
                  <input type="text" placeholder="Street address" />
                </FormGroup>

                
                <FormGroup className="form-group">
                  <input type="text" placeholder="City" />
                </FormGroup>

                
                <FormGroup className="form-group">
                  <input type="text" placeholder="Postal Code" />
                </FormGroup>

                
                <FormGroup className="form-group">
                  <input type="text" placeholder="Country" />
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4" className="d-flex justify-content-center align-items-center flex-column">
              <div className="checkout__cart">
                <h6>Total Qty: <span>${totalQty}</span></h6>
                <h6>Subtotal: <span>${(totalamount)}</span></h6>
                <h6>Shipping: <span>${}</span></h6>
                <h6>Free Shipping</h6>
                <h4>Total Cost : <span>${totalamount}</span></h4>
              </div>
              <button className="btn btn-primary mt-4">Place an order</button>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;

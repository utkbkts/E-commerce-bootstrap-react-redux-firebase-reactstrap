import React from "react";
import "../styles/Cart.css";
import Helmet from "../components/helmet/Helmet";
import Commonsection from "../components/UI/Commonsection";
import { Col, Container, Row } from "reactstrap";
import { CartActions } from "../redux/slice/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const Cart = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const totalamount = useSelector((state) => state.cart.totalAmount);
  console.log(typeof totalamount);
  return (
    <Helmet title="cart">
      <Commonsection title={"Shopping Cart"} />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cart.length === 0 ? (
                <>
                  <h2>No Items Cart</h2>
                </>
              ) : (
                <>
                  {" "}
                  <table className="table bordered">
                    <thead>
                      <tr>
                        <th>İmage</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item, index) => (
                        <Delete item={item} key={index} />
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6>SubTotal</h6>
                <span>${totalamount.toFixed(2)}</span>
              </div>
              <p>Checkout</p>
              <div>
                <Link to={"/checkout"}>
                  <button className="btn btn-primary text-white">
                    Checkout
                  </button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Delete = ({ item }) => {
  const dispatch = useDispatch();
  const deleteProduct = () => {
    dispatch(CartActions.deleteItem(item.id));
  };
  const incrementQuantity = () => {
    dispatch(CartActions.increase({ id: item.id }));
  };
  const decrementQuantity = () => {
    dispatch(CartActions.decrementquantity({ id: item.id }));
  };
  return (
    <tr>
      <td>
        <img src={item.image} alt="" />
      </td>
      <td>{item.title}</td>
      <td>${item.price}</td>
      <div className="d-flex align-items-center gap-2">
        <button onClick={decrementQuantity} className="btn btn-dark">-</button>
        <td>{item.quantity}</td>
        <button onClick={incrementQuantity} className="btn btn-dark">+</button>
      </div>
      <td>
        <i onClick={deleteProduct} className="ri-delete-bin-line"></i>
      </td>
    </tr>
  );
};

export default Cart;

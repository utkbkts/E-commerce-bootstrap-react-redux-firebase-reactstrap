import React from "react";
import { motion } from "framer-motion";
import "../../styles/productcard.css";
import { Col, Container, Row } from "reactstrap";
import { Link, json } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartActions } from "../../redux/slice/cartSlice";
import { toast } from "react-toastify";
const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};
const Productcart = ({ data }) => {
  const maxTitleLength = 10;
  const maxDescriptionLength = 25;
  const dispatch = useDispatch();
  const addToCart = (item) => {
    dispatch(
      CartActions.addItem({
        id: item.id,
        productName: item.title,
        price: item.price,
        image: item.image,
        description: item.description,
      })
    );
    toast.success("Product successfully added to the cart");
  };
  return (
    <Container>
      <Row>
        {data.map((item, index) => (
          <Col lg="3" md="4" className="" key={index}>
            <div className="product__item col-11">
              <div className="product__img">
                <motion.img
                  whileHover={{ scale: 0.9 }}
                  src={item.image}
                  alt=""
                />
              </div>
              <div className="p-2 product__info">
                <h3 className="product__name">
                  <Link to={`/shop/${item.id}`}>
                    {truncateText(item.title, maxTitleLength)}
                  </Link>
                </h3>
                <span className="">
                  {truncateText(item.description, maxDescriptionLength)}
                </span>
              </div>
              <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
                <span className="price">${item.price}</span>
                <motion.span whileTap={{ scale: 1.2 }}>
                  <i className="ri-add-line" onClick={()=>addToCart(item)}></i>
                </motion.span>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Productcart;

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Helmet from "../components/helmet/Helmet";
import Commonsection from "../components/UI/Commonsection";
import { Container, Row, Col } from "reactstrap";
import products from "../assets/data/products";
import Productlist from "../components/UI/Productlist";
import Productcart from "../components/UI/Productcart";
import { useDispatch } from "react-redux";
import { CartActions } from "../redux/slice/cartSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
const Productdetail = () => {
  const [productData, setProductData] = useState([]);
  const [rating, setrating] = useState(null);

  const [tab, settab] = useState("desc");
  const { id } = useParams();
  const product1 = products.find((item) => item.id === id);
  const reviewuser = useRef("");
  const reviewsMsg = useRef("");
  const reviews = product1?.reviews || [];

  const reviewObj={
    author:reviewuser,
    text:reviewsMsg,
    rating:rating
  }

  const dispatch = useDispatch();
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const json = await res.json();
      setProductData(json);
      console.log(json);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const product = productData.find((item) => item.id == id);

  const relatedProducts = productData.slice(0, 4);

  if (!product) {
    return <div>No product found for the given ID.</div>;
  }

  const { image, price, description, title } = product;

  const submithandler = (e) => {
    e.preventDefault();
    const reviewusername = reviewuser.current.value;
    const reviewUserMsg = reviewsMsg.current.value;
  };
  const addtocart = () => {
    dispatch(
      CartActions.addItem({
        id,
        image: image,
        title,
        price,
      })
    );
    toast.success("Product added successfuly");
  };
 
  return (
    <Helmet title={"Detail"}>
      <Commonsection title={"Detail Page"} />
      <section className="pt-0 mt-4">
        <Container>
          <Row>
            <Col lg={6}>
              <img width={200} height={300} src={image} alt="" />
            </Col>
            <Col lg={6}>
              <div className="product__details">
                <h2>ProductName</h2>
                <div className="product__rating d-flex align-items-center gap-3 mb-3 just">
                  <div>
                    <motion.span whileTap={{scale:1.2}} onClick={() => setrating(1)}>
                      <i className="ri-start-sfill"></i>
                    </motion.span>
                    <motion.span whileTap={{scale:1.2}} onClick={() => setrating(2)}>
                      <i className="ri-star-s-fill"></i>
                    </motion.span>
                    <motion.span whileTap={{scale:1.2}} onClick={() => setrating(3)}>
                      <i className="ri-star-s-fill"></i>
                    </motion.span>
                    <motion.span whileTap={{scale:1.2}} onClick={() => setrating(4)}>
                      <i className="ri-star-s-fill"></i>
                    </motion.span>
                    <motion.span whileTap={{scale:1.2}} onClick={() => setrating(5)}>
                      <i className="ri-star-half-s-line"></i>
                    </motion.span>
                  </div>
                  <p className="rating">({productData[0].rating.rate})</p>
                </div>
                <div className="d-flex flex-column">
                  <span className="product-price">${price}</span>
                  <span>{description}</span>
                </div>
                <div>
                  <button
                    onClick={addtocart}
                    type="submit"
                    className="btn btn-primary mt-3"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === "desc" ? "active__tab" : ""}`}
                  onClick={() => settab("desc")}
                  style={{ cursor: "pointer" }}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "active__tab" : ""}`}
                  onClick={() => settab("rev")}
                  style={{ cursor: "pointer" }}
                >
                  Reviews ({product1?.rating.count})
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab__content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div>
                  <div>
                    <ul>
                      {reviews?.map((item, index) => (
                        <li>
                          <span>{item.rating}</span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="reviews__form">
                      <h4>Leave Your Experience</h4>
                      <form action="">
                        <div className="form__group" onSubmit={submithandler}>
                          <input
                            type="text"
                            placeholder="Enter name"
                            ref={reviewuser}
                          />
                        </div>
                        <div className="form__group d-flex align-items-center gap-5">
                          <span onClick={()=>setrating(1)}>
                            1<i className="ri-star-s-fill"></i>
                          </span>
                          <span  onClick={()=>setrating(2)}>
                            2<i className="ri-star-s-fill"></i>
                          </span>
                          <span  onClick={()=>setrating(3)}>
                            3<i className="ri-star-s-fill"></i>
                          </span>
                          <span  onClick={()=>setrating(4)}>
                            4<i className="ri-star-s-fill"></i>
                          </span>
                          <span  onClick={()=>setrating(5)}>
                            5<i className="ri-star-s-fill"></i>
                          </span>
                        </div>
                        <div className="form__group">
                          <textarea
                            ref={reviewsMsg}
                            rows={4}
                            type="text"
                            placeholder="Review Message..."
                          />
                        </div>

                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>
            <Col lg="12">
              <h2>You might also like</h2>
            </Col>
            <Productlist data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Productdetail;

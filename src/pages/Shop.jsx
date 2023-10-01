import React, { useEffect, useState } from "react";
import Helmet from "../components/helmet/Helmet";
import Commonsection from "../components/UI/Commonsection";
import { Col, Container, Row } from "reactstrap";
import "../styles/Shop.css";
import Productlist from "../components/UI/Productlist";
import Productcart from "../components/UI/Productcart";
const Shop = () => {
  const [productsData, setProductsData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const json = await res.json();
      setProductsData(json);
      setFilteredProducts(json);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const handleFilter = (e) => {
    const filterValue = e.target.value;
    setFilterValue(filterValue);

    if (
      filterValue === "men's clothing" ||
      filterValue === "electronics" ||
      filterValue === "women's clothing" ||
      filterValue === "jewelery"
    ) {
      const filteredProducts = productsData.filter(
        (item) => item.category === filterValue
      );
      setFilteredProducts(filteredProducts);
    } else {
      setFilteredProducts(productsData);
    }
  };

  const handlesearch = (e) => {
    const searchT = e.target.value.toLowerCase();

    if (!searchT) {
      setFilteredProducts(productsData);  // Reset to original products if search is empty
      return;
    }

    const searchedProducts = filteredProducts.filter(
      (item) =>
        item.title.toLowerCase().includes(searchT.toLowerCase()) ||
        item.description.toLowerCase().includes(searchT.toLowerCase())
    );

    setFilteredProducts(searchedProducts);
  };

  return (
    <Helmet title="Shop">
      <Commonsection title={"Products"} />
      <section>
        <Container>
          <Row>
            <Col lg="3" md="3">
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option>Filter by Category</option>
                  <option value="men's clothing">men's clothing</option>
                  <option value="electronics">electronics</option>
                  <option value="women's clothing">women's clothing</option>
                  <option value="jewelery">jewelery</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="6">
              <div className="filter__widget">
                <select>
                  <option>Sort by</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="search__box">
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={handlesearch}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            {productsData && productsData.length === 0 ? (
              <h1>No Products Are Found!!</h1>
            ) : (
              <Productlist data={filteredProducts} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;

import React from "react";
import { Col, Container, Row } from "reactstrap";
import Usegetdata from "../customhooks/Usegetdata";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import { toast } from "react-toastify";
const Allproducts = () => {

  const {data:productsdata}=Usegetdata("products");

  const deleteproduct=async(id)=>{
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if(confirmDelete){
      try {
        await deleteDoc(doc(db, "products", id));
        toast.success("Product deleted successfully")
      } catch (error) {
        toast.error("Error deleting product:",error)
      }
    }
  }
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {
                productsdata.map((item,index)=>(
                  <tr>
                  <td>
                    <img
                      src={item.imgUrl}
                      alt=""
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>${item.price}</td>
                  <td>
                    <button onClick={()=>deleteproduct(item.id)} className="btn btn-danger">Delete</button>
                  </td>
                </tr>
                ))
              }
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Allproducts;

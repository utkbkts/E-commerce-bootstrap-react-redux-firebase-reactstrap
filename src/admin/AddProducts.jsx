import React, { useState } from "react";
import { toast } from "react-toastify";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import { addDoc, collection, doc } from "firebase/firestore";
import { db, storage } from "../firebase/Firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const Addproducts = () => {
  const [Entertitle, setEnterTitle] = useState("");
  const [enterShortdesc, setEnterShortdesc] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [EnterCategory, setEnterCategory] = useState("");
  const [imgURL, setImgURL] = useState(null);
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();
  const addProductToFirestore = async (e) => {
    e.preventDefault();
    setloading(true)
    try {
      const collectionRef = collection(db, "products");
      const storageRef = ref(
        storage,
        `productImages/${Date.now() + imgURL.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, imgURL);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error("Error uploading image:", error);
          toast.error("Image upload failed!");
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            await addDoc(collectionRef, {
              title: Entertitle,
              Shortdesc: enterShortdesc,
              desc: enterDescription,
              price: enterPrice,
              category: EnterCategory,
              imgUrl: downloadURL,
            });

            // Reset form fields after successful upload and save
            setEnterTitle("");
            setEnterShortdesc("");
            setEnterDescription("");
            setEnterPrice("");
            setEnterCategory("");
            setImgURL(null);

            // Show success message
            setloading(false)
            toast.success("Product added successfully!");
            navigate("/dashboard/all-products")
          } catch (error) {
            console.error("Error adding product to Firestore:", error);
            toast.error("Error adding product to Firestore!");
          }
        }
      );
    } catch (error) {
      setloading(false)
      console.error("Error uploading image:", error);
      toast.error("Image upload failed!");
    }
  };

  return (
    <section>
      <Container>
       {loading ? (<><h4>Loading...</h4></>):( <Row>
          <Col lg="12">
            <h4>Add Product</h4>
            <Form className="form-add" onSubmit={addProductToFirestore}>
              <FormGroup>
                <span>Product title</span>
                <input
                  type="text"
                  placeholder="Double Sofa"
                  value={Entertitle}
                  onChange={(e) => setEnterTitle(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <span>Short Description</span>
                <input
                  type="text"
                  placeholder="Loerm.."
                  value={enterShortdesc}
                  onChange={(e) => setEnterShortdesc(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <span>Description</span>
                <input
                  type="text"
                  placeholder="Desccription"
                  value={enterDescription}
                  onChange={(e) => setEnterDescription(e.target.value)}
                  required
                />
              </FormGroup>

              <Row>
                <Col lg="6">
                  <FormGroup>
                    <span>Price</span>
                    <input
                      type="number"
                      placeholder="Price"
                      value={enterPrice}
                      onChange={(e) => setEnterPrice(e.target.value)}
                      required
                    />
                  </FormGroup>
                </Col>

                <Col lg="6">
                  <FormGroup className="category-add">
                    <span>Category</span>
                    <select
                      required
                      value={EnterCategory}
                      onChange={(e) => setEnterCategory(e.target.value)}
                    >
                      <option value="men's clothing">men's clothing</option>
                      <option value="electronics">electronics</option>
                      <option value="women's clothing">women's clothing</option>
                      <option value="jewelery">jewelery</option>
                    </select>
                  </FormGroup>
                </Col>
              </Row>
              <div>
                <FormGroup className="form__group">
                  <span>Product image</span>
                  <input
                    onChange={(e) => setImgURL(e.target.files[0])}
                    type="file"
                    accept="image/*"
                  />
                </FormGroup>
              </div>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </Form>
          </Col>
        </Row>)}
      </Container>
    </section>
  );
};

export default Addproducts;

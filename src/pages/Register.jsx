import React, { useState } from "react";
import Helmet from "../components/helmet/Helmet";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/Firebase";
import { toast } from "react-toastify";
import { auth, db } from "../firebase/Firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [files, setfiles] = useState(null);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const signup = async (e) => {
    e.preventDefault();
    setloading(true);
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      const storageRef = ref(storage, `images/${Date.now() + username}`);
      const uploadTask = uploadBytesResumable(storageRef, files);
  
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          toast.error(error.message);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  
          // Update user profile and add user data to "users" collection
          await updateProfile(user, {
            displayName: username,
            photoURL: downloadURL,
          });
  
          const userData = {
            uid: user.uid,
            displayName: username,
            email,
            photoURL: downloadURL,
          };
  
          await setDoc(doc(db, "users", user.uid), userData);
  
          setloading(false);
          toast.success("Account created");
          navigate("/login");
        }
      );
    } catch (error) {
      console.error("Error creating user:", error);
      setloading(false);
      toast.error("Something went wrong");
    }
  };
  const handleFileChange = (e) => {
    setfiles(e.target.files[0]);
  };
  return (
    <Helmet title="Register">
      <Container className="mb-4">
        <Row>
          {loading ? (
            <Col className="text-center">
              <h4 className="fw-bold">Loading...</h4>
            </Col>
          ) : (
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold fs-4">Register</h3>

              <Form className="auth__form" onSubmit={signup}>
                <FormGroup className="form__group">
                  <input
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    type="text"
                    placeholder="Enter your username"
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    type="email"
                    placeholder="Enter your email"
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    type="password"
                    placeholder="Enter your password"
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    onChange={handleFileChange}
                    type="file"
                    placeholder="Enter your password"
                  />
                </FormGroup>
                <button className="btn btn-primary">Create an account</button>
                <p>
                  Already have an account ? <Link to={"/login"}>Login</Link>
                </p>
              </Form>
            </Col>
          )}
        </Row>
      </Container>
    </Helmet>
  );
};

export default Register;

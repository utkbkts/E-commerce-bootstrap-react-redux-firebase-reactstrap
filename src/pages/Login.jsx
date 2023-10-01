import React, { useState } from "react";
import Helmet from "../components/helmet/Helmet";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/Firebase";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const usercredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = usercredential.user;

      setloading(false);
      toast.success("Successsfully logged in");
      navigate("/");
    } catch (error) {
      setloading(false);
      toast.error(error.message);
    }
  };

  return (
    <Helmet title="Login">
      <Container className="mb-4">
        <Row>
          {loading ? (
            <>
              <Col lg="12" className="text-center">
                Loading...
              </Col>
            </>
          ) : (
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold fs-4">Login</h3>
              <Form className="auth__form" onSubmit={login}>
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
                <button className="btn btn-primary">Login</button>
                <p>
                  Don't have an account ?{" "}
                  <Link to={"/signup"}>Create an account</Link>
                </p>
              </Form>
            </Col>
          )}
        </Row>
      </Container>
    </Helmet>
  );
};

export default Login;

import React from "react";
import { Col, Container, Row } from "reactstrap";
import Usegetdata from "../customhooks/Usegetdata";
import { db } from "../firebase/Firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import useAuth from "../customhooks/useAuth";
const Users = () => {
  const { data: usersdata, loading } = Usegetdata("users");
  const { currentuser } = useAuth();
  const currentUserUid = currentuser ? currentuser.uid : null;
  const deletedoc = async (id) => {
    if (id === currentUserUid) {
      toast.error("Kendinizi silemezsiniz.");
      return;
    }

    try {
      await deleteDoc(doc(db, "users", id));
      toast.success("User deleted");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("An error occurred while deleting the user");
    }
   
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="fw-bold">users</h4>
          </Col>
          <Col lg="12">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Users</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <h5 className="fw-bold pt-5">Loading...</h5>
                ) : (
                  usersdata.map((item) => (
                    <tr key={item.uid}>
                      <td>
                        <img src={item.photoURL} alt="" />
                      </td>
                      <td>{item.displayName}</td>
                      <td>{item.email}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deletedoc(item.uid)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Users;

import React from "react";
import { Col, Container, Row } from "reactstrap";
import useAuth from "../customhooks/useAuth";
import "../styles/Admin.css";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/Firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
const AdminNav = () => {
  const { currentuser } = useAuth();
  const admin_nav = [
    {
      display: "Dashboard",
      path: "/dashboard",
    },
    {
      display: "All-Products",
      path: "/dashboard/all-products",
    },
    {
      display: "Orders",
      path: "/dashboard/add-products",
    },
    {
      display: "Users",
      path: "/dashboard/users",
    },
  ];
  const navigate=useNavigate()
  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out");
      navigate("/");
      window.location.reload()
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("An error occurred during logout");
    }
  };
  return (
    <>
      <header className="admin__header">
        <div className="admin__nav-top">
          <Container>
            <div className="admin__nav-wrapper-top">
              <div>
                <h2>Shopping-</h2>
              </div>
              <div className="search-box">
                <input type="text" name="" id="" placeholder="search..." />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
              <div className="admin__nav-top-right">
                <span>
                  <i className="ri-ri-notification-3-line"></i>
                </span>
                <span>
                  <i className="ri-ri-settings-2-line"></i>
                </span>
              <div className="d-flex align-items-center gap-2">
              <img src={currentuser?.photoURL} alt="" />
              <span className="fw-bold text-white" style={{textDecoration:"underline"}}>{currentuser?.displayName}</span>
              <span className="btn btn-danger" onClick={logout}>Logout</span>
              </div>
              </div>
            </div>
          </Container>
        </div>
      </header>

      <section className="admin__menu p-0">
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu-list">
                {admin_nav.map((item,index) => (
                  <li key={index} className="admin__menu-item">
                    <NavLink className={navclass=>navclass.isActive ? "active__admin-menu":""} to={item.path}>{item.display}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;

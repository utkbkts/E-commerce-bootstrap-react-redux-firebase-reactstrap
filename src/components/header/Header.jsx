import React, { useEffect, useRef, useState } from "react";
import "./Header.css";
import { Container, Row } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import useAuth from "../../customhooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import { toast } from "react-toastify";
const navLink = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/shop",
    display: "Shop",
  },
  {
    path: "/cart",
    display: "Cart",
  },
];

const Header = () => {
  const headerref = useRef(null);
  const navigate = useNavigate();
  const [active, setactive] = useState(false);
  const menuref = useRef(null);
  const { currentuser } = useAuth();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const favoriteamount = useSelector((state) => state.cart.favoriteamount);

  const stickyHeaderfunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerref.current.classList.add("sticky");
      } else {
        headerref.current.classList.remove("sticky");
      }
    });
  };
  useEffect(() => {
    stickyHeaderfunc();

    return () => {
      window.removeEventListener("scroll", stickyHeaderfunc);
    };
  }, []);

  const menutoggle = () => {
    if (menuref.current) {
      menuref.current.classList.toggle("active__menu");
    }
  };
  const navigatecart = () => {
    navigate("/cart");
  };

  const activetoggle = () => {
    setactive(!active);
  };
  console.log(currentuser);
  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out");
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("An error occurred during logout");
    }
  };
  return (
    <header className="header" ref={headerref}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img
                src="https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9nb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60"
                alt="logo"
              />
              <div className="shopping">
                <span>
                  <h1>Utku-Shopping</h1>
                </span>
              </div>
            </div>
            <div className="navigation" ref={menuref} onClick={menutoggle}>
              <ul className="menu">
                {navLink.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink activeclassname="nav__active" to={item.path} exact>
                      {item.display}
                    </NavLink>
                  </li>
                ))}
                <div className="profile d-flex align-items-center flex-column justify-content-center gap-3 res-ham">
                  <div className=" d-flex flex-column align-items-center ">
                    <motion.img
                      onClick={activetoggle}
                      className={`image`}
                      whileTap={{ scale: 1.2 }}
                      src={
                        currentuser
                          ? currentuser.photoURL
                          : "https://plus.unsplash.com/premium_photo-1682216872195-0bfacc36b02c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bG9nb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60"
                      }
                      alt=""
                    />
                    <span>{currentuser?.displayName}</span>
                  </div>
                  <div className="profile__actions">
                    {currentuser ? (
                      <div className="Logout-kapsam">
                        <button
                        onClick={logout}
                          className={`btn btn-danger px-1 py-1 `}
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Link to={"/signup"}>Signup</Link>
                        <Link to={"/login"}>Login</Link>
                      </div>
                    )}
                  </div>
                </div>
              </ul>
            </div>
            <div className="nav__icons">
              <span className="fav__icon">
                <i className="ri-heart-line"></i>
                <span className="badge">{favoriteamount}</span>
              </span>
              <span
                className="cart__icon"
                style={{ cursor: "pointer" }}
                onClick={navigatecart}
              >
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>
              <div className="profile d-flex align-items-center justify-content-center gap-3">
                <div className="mobile d-flex gap-2 align-items-center">
                  <motion.img
                    onClick={activetoggle}
                    className={`image`}
                    whileTap={{ scale: 1.2 }}
                    src={
                      currentuser
                        ? currentuser.photoURL
                        : "https://plus.unsplash.com/premium_photo-1682216872195-0bfacc36b02c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bG9nb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60"
                    }
                    alt=""
                  />
                  <span>Welcome,{currentuser?.displayName}</span>
                </div>
                <div className="profile__actions">
                  {currentuser ? (
                    <div className="Logout-kapsam">
                      <button
                      onClick={logout}
                        className={`btn btn-danger px-1 py-1 logout ${
                          active ? "show__profile" : ""
                        }`}
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex gap-2">
                      <Link to={"/signup"}>Signup</Link>
                      <Link to={"/login"}>Login</Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="mobile_menu">
                <span onClick={menutoggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;

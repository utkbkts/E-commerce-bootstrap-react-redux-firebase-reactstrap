import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Productdetail from "./pages/Productdetail";
import Protectedroute from "./routers/Protectedroute";
//!admin
import AdminProduct from "./admin/AdminProduct";
import Addproducts from "./admin/AddProducts";
import Allproducts from "./admin/Allproducts";
import Dashboard from "./admin/Dashboard";
import AdminNav from "./admin/AdminNav";
import Users from "./admin/Users";
const App = () => {
  return (
    <div>
      {
        location.pathname.startsWith("/dashboard") ? <AdminNav/>:<Header/>
      }
   
      <Routes>
        <Route path="/" element={<Navigate to={"home"} />} />
        <Route path="home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<Productdetail />} />
        <Route path="/cart" element={<Cart />} />
       
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        //!admin
        <Route path="/*" element={<Protectedroute />}>
          <Route path="checkout" element={<Checkout />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/all-products" element={<Allproducts />} />
          <Route path="dashboard/add-products" element={<Addproducts />} />
          <Route path="dashboard/users" element={<Users />} />

        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

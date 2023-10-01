import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import store from "./store/Store.jsx";
import { Provider } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ToastContainer position="top-right" autoClose={3000} pauseOnHover={false} closeOnClick theme="dark"/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../redux/slice/cartSlice";

const store = configureStore({
    reducer:{
        cart:CartReducer,
    }
});

export default store
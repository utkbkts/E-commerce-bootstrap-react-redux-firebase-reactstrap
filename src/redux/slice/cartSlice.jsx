import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
  favoriteamount: 0,
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (!action.payload) {
        console.error("addItem action: action.payload is undefined.");
        return;
      }
      state.totalQuantity += 1;

      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;

      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          productname: newItem.productname,
          image: newItem.image,
          price: newItem.price,
          quantity: 1,
          totalprice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalprice =
          Number(existingItem.totalprice) + Number(newItem.price);
      }

      state.totalQuantity = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
     
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + Number(item.price) * Number(item.quantity),
          0
        );
        // Eğer quantity eksiye düşerse 0 yap
        state.totalQuantity = Math.max(
          state.totalQuantity - existingItem.quantity,
          0
        );
      }
     
    },
    increase: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity++;
        item.totalprice += Number(item.price); 
        state.totalAmount += Number(item.price);  
      }
     
    },
    
    decrementquantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
        item.totalprice -= Number(item.price); 
        state.totalAmount -= Number(item.price);  
      }
     
    },
  },
});

export const CartActions = cartSlice.actions;
export default cartSlice.reducer;

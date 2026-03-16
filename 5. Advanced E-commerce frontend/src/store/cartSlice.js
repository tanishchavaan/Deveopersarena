import { createSlice } from "@reduxjs/toolkit";

const savedCart = localStorage.getItem("cart");

const initialState = {
  items: savedCart ? JSON.parse(savedCart) : []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart: (state, action) => {

      const existingItem = state.items.find(
        item => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {

      const item = state.items.find(i => i.id === action.payload);

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(i => i.id !== action.payload);
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    }

  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99,
      image: "https://via.placeholder.com/200"
    },
    {
      id: 2,
      name: "Smartphone Case",
      price: 25,
      image: "https://via.placeholder.com/200"
    },
    {
      id: 3,
      name: "USB-C Cable",
      price: 20,
      image: "https://via.placeholder.com/200"
    }
  ]
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {}
});

export default productSlice.reducer;

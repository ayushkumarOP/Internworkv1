import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    increaseQuantity: (state, action) => {
      const product = state.products.find(product => product._id === action.payload._id);
      if (product) {
        product.quantity += 1;
        state.total += product.price;
      }
    },
    decreaseQuantity: (state, action) => {
      const product = state.products.find(product => product._id === action.payload._id);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        state.total -= product.price;
      }
    },
    removeFromCart: (state, action) => {
      const product = state.products.find(product => product._id === action.payload._id);
      if (product) {
        state.total -= product.price * product.quantity;
        state.products = state.products.filter(p => p._id !== action.payload._id);
        state.quantity -= 1;
      }
    },
  },
});

export const { addProduct, increaseQuantity, decreaseQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;


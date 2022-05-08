import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [
    // {
    //   name: String,
    //   category: String,
    //   image: String,
    //   price: Number,quanity
    //   desc: String,
    // }
  ],
  totalQuanity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let index = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      index > -1
        ? (state.cart[index].quanity += action.payload.quanity)
        : state.cart.push(action.payload);
      state.totalQuanity += action.payload.quanity;
    },
    removeFromCart: (state, action) => {
      let index = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index > -1) {
        state.totalQuanity -= state.cart[index].quanity;
        state.cart.splice(index, 1);
      }
    },
    changeProductQuantity: (state, action) => {
      let index = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index > -1) {
        state.totalQuanity +=
          action.payload.newQuanity - state.cart[index].quanity;
        state.cart[index].quanity = action.payload.newQuanity;
      }
    },
  },
});
export const { addToCart, removeFromCart, changeProductQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;

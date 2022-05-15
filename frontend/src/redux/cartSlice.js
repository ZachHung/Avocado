import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalQuanity: 0,
  formData: null,
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
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    resetCart: (state) => {
      state.cart = initialState.cart;
      state.totalQuanity = initialState.totalQuanity;
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  changeProductQuantity,
  resetCart,
  setFormData,
  resetForm,
} = cartSlice.actions;

export default cartSlice.reducer;

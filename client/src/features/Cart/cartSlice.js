import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "../Authenticate/authSlice";
import { verifyPayment } from "../Orders/ordersSlice";

const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) return JSON.parse(localStorage.getItem("cart"));
  else return [];
};
const initialState = {
  cart: getLocalStorage(),
  totalItems: 0,
  totalAmount: 0,
  shippingFee: 12,
  tax: 2,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, color, amount, name, images, price, inventory, product } =
        action.payload;
      const tempItem = state.cart.find((i) => i.id === id + color);
      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id + color) {
            let newAmount = cartItem.amount + amount;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }
            return { ...cartItem, amount: newAmount };
          } else {
            return cartItem;
          }
        });
        state.cart = tempCart;
      } else {
        const newItem = {
          id: id + color,
          name: name,
          color,
          amount,
          image: images[0],
          price: price,
          max: inventory,
          product,
        };
        state.cart = [...state.cart, newItem];
      }
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    toggleAmount: (state, action) => {
      const { id, value } = action.payload;
      const tempCart = state.cart.map((item) => {
        if (item.id === id) {
          if (value === "inc") {
            let newAmount = item.amount + 1;
            if (newAmount > item.max) {
              newAmount = item.max;
            }
            return { ...item, amount: newAmount };
          }
          if (value === "dec") {
            let newAmount = item.amount - 1;
            if (newAmount < 1) newAmount = 1;
            return { ...item, amount: newAmount };
          }
        } else {
          return item;
        }
      });
      state.cart = tempCart;
    },
    clearCart: (state) => {
      state.cart = [];
    },
    countCartTotal: (state) => {
      const { totalAmount, totalItems } = state.cart.reduce(
        (total, cartItem) => {
          const { amount, price } = cartItem;
          total.totalItems += amount;
          total.totalAmount += price * amount;
          return total;
        },
        { totalItems: 0, totalAmount: 0 }
      );
      return { ...state, totalItems, totalAmount };
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(logoutUser.fulfilled, (state) => {
      state.cart = [];
    })
    .addCase(verifyPayment.fulfilled,(state)=>{
      state.cart = [];
    })
  },
});

export const {
  addToCart,
  removeItem,
  toggleAmount,
  clearCart,
  countCartTotal,
} = cartSlice.actions;

export default cartSlice.reducer;

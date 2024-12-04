import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSingleProductThunk,
} from "./productThunk.js";
import { toast } from "react-toastify";

import { getSingleProductReviewsThunk } from "../Review/reviewThunk.js";

export const getSingleProductReviews = createAsyncThunk("product/getSingleProductReviews",getSingleProductReviewsThunk);

export const getSingleProduct = createAsyncThunk(
  "product/getSingleProduct",
  getSingleProductThunk
);

const initialState = {
  isLoading: false,
  isError: false,
  product: {},
  reviews: [],
  totalReviews: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSingleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.product = { ...action.payload };
        state.isLoading = false;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
      });
    builder
      .addCase(getSingleProductReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleProductReviews.fulfilled, (state, action) => {
        const { count: totalReviews, reviews } = action.payload;
        state.reviews = reviews;
        state.totalReviews = totalReviews;
        state.isLoading = false;
      })
      .addCase(getSingleProductReviews.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});
export const {} = productSlice.actions;
export default productSlice.reducer;

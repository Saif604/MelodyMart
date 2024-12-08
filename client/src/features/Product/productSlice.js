import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { createReviewThunk,getSingleProductThunk,getSingleProductReviewsThunk } from "./productThunk.js";

export const getSingleProductReviews = createAsyncThunk("product/getSingleProductReviews",getSingleProductReviewsThunk);
export const createReview = createAsyncThunk("product/createReview",createReviewThunk);

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
      })
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
      })
      .addCase(createReview.fulfilled,(_,action)=>{
        toast.success("Review added successfully...");
      })
      .addCase(createReview.rejected,(_,action)=>{
        toast.error(action.payload);
      })
  },
});
export const {} = productSlice.actions;
export default productSlice.reducer;

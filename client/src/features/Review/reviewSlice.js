import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  updateReviewThunk,
  deleteReviewThunk,
  getCurrentUserReviewsThunk,
} from "./reviewThunk";

export const getCurrentUserReviews = createAsyncThunk(
  "reviews/getCurrentUserReviews",
  getCurrentUserReviewsThunk
);
export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  deleteReviewThunk
);
export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  updateReviewThunk
);

const initialState = {
  isLoading: false,
  reviews: [],
  totalReviews: 0,
  isError: false,
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearAllReviews:(state)=>initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUserReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUserReviews.fulfilled, (state, action) => {
        const { reviews, count } = action.payload;
        state.isLoading = false;
        state.reviews = reviews;
        state.totalReviews = count;
      })
      .addCase(getCurrentUserReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        toast.success("Review updated successfully...")
      })
      .addCase(updateReview.rejected, (state, action) => {
        toast.error(action.payload);
      })
      .addCase(deleteReview.fulfilled,()=>{
        toast.success("Review deleted successfully...");
      })
      .addCase(deleteReview.rejected,(state,action)=>{
        toast.error(action.payload);
      })
      
  },
});

export const {clearAllReviews} = reviewSlice.actions;
export default reviewSlice.reducer;

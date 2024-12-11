import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  updateReviewThunk,
  deleteReviewThunk,
  getCurrentUserReviewsThunk,
  createReviewThunk,
  getSingleProductReviewsThunk,
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
export const createReview = createAsyncThunk(
  "reviews/createReview",
  createReviewThunk
);
export const getSingleProductReviews = createAsyncThunk(
  "review/getSingleProductReviewsThunk",
  getSingleProductReviewsThunk
);

const initialState = {
  currentUserReviews: [],
  currentUserReviewsCount: 0,
  singleProductReviews: [],
  singleProductReviewsCount: 0,
  totalReviews: 0,
  isLoading: false,
  reviews: [],
  isError: false,
  status: {
    createReview: { loading: false, error: null },
    updateReview: { loading: false, error: null },
    deleteReview: { loading: false, error: null },
    getSingleProductReviews: { loading: true, error: null },
    getCurrentUserReviews: { loading: true, error: null },
  },
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearAllReviews: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReview.pending, (state) => {
        state.status.createReview.loading = true;
      })
      .addCase(createReview.fulfilled,(state,action)=>{
        toast.success("Review added succesfully");
        state.status.createReview.loading = false;
      })
      .addCase(createReview.rejected,(state,action)=>{
        state.status.createReview.loading = false;
        state.status.createReview.error = action.payload;
        toast.error(action.payload)
      })
      .addCase(getCurrentUserReviews.pending, (state) => {
        state.status.getCurrentUserReviews.loading = true;
      })
      .addCase(getCurrentUserReviews.fulfilled, (state, action) => {
        const { reviews, count } = action.payload;
        state.currentUserReviews = reviews;
        state.currentUserReviewsCount = count;
        state.status.getCurrentUserReviews.loading = false;
      })
      .addCase(getCurrentUserReviews.rejected, (state, action) => {
        state.status.getCurrentUserReviews.loading = false;
        state.status.getCurrentUserReviews.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateReview.pending, (state, action) => {
        state.status.updateReview.loading = true;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.status.updateReview.loading = false;
        toast.success("Review updated successfully...");
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.status.updateReview.loading = false;
        state.status.updateReview.loading = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteReview.pending, (state) => {
        state.status.deleteReview.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state) => {
        state.status.deleteReview.loading = false;
        toast.success("Review deleted successfully...");
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.status.deleteReview.loading = false;
        state.status.deleteReview.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(getSingleProductReviews.pending, (state) => {
        state.status.getSingleProductReviews.loading = true;
      })
      .addCase(getSingleProductReviews.fulfilled, (state, action) => {
        const { reviews, count } = action.payload;
        state.singleProductReviews = reviews;
        state.singleProductReviewsCount = count;
        state.status.getSingleProductReviews.loading = false;
      })
      .addCase(getSingleProductReviews.rejected, (state, action) => {
        state.status.getSingleProductReviews.loading = false;
        state.status.getSingleProductReviews.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { clearAllReviews } = reviewSlice.actions;
export default reviewSlice.reducer;

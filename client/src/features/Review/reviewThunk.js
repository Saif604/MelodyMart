import axios from "axios";

const updateReviewThunk = async ({ reviewData, reviewId }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    await axios.patch(`/api/v1/reviews/${reviewId}`, reviewData);
    return;
  } catch (error) {
    return rejectWithValue(error.response.data.msg);
  }
};
const deleteReviewThunk = async (reviewId, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await axios.delete(`/api/v1/reviews/${reviewId}`);
    return data;
  } catch (error) {
    rejectWithValue(error.response.data.msg);
  }
};
const getCurrentUserReviewsThunk = async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await axios.get("/api/v1/reviews/showAllMyReviews");
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.msg);
  }
};

const createReviewThunk = async (reviewData, thunkAPI) => {
  const {rejectWithValue } = thunkAPI;
  try {
    const { data } = await axios.post("/api/v1/reviews", reviewData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.msg);
  }
};
const getSingleProductReviewsThunk = async (productId, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await axios.get(`/api/v1/products/${productId}/reviews`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.msg);
  }
};

export {
  updateReviewThunk,
  deleteReviewThunk,
  getCurrentUserReviewsThunk,
  createReviewThunk,
  getSingleProductReviewsThunk
};

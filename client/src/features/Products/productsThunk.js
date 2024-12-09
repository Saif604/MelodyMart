import axios from "axios";
const getAllProductsThunk = async(params,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try{
        const {data} = await axios.get(`/api/v1/products?${params}`);
        return data;
    }catch(error){
        return rejectWithValue(error.response.data.msg)
    }
}
const getSingleProductThunk = async (id, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await axios.get(`/api/v1/products/${id}`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.msg);
  }
};
const createReviewThunk = async (reviewData, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    const { data } = await axios.post("/api/v1/reviews", reviewData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.msg);
  }
};
const getSingleProductReviewsThunk = async (productId, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    const { data } = await axios.get(`/api/v1/products/${productId}/reviews`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.msg);
  }
};

export {getAllProductsThunk,getSingleProductThunk,createReviewThunk,getSingleProductReviewsThunk};
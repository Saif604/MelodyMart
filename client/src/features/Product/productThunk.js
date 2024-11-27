import axios from "axios";
const getSingleProductThunk = async (id, thunkAPI) => {
  try {
    const { data } = await axios.get(`/api/v1/products/${id}`);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
const getSingleProductReviewsThunk = async (productID, thunkAPI) =>{
  try{
      const {data} = await axios.get(`/api/v1/products/${productID}/reviews`);
      return data;
  }
  catch(error){
    thunkAPI.rejectWithValue(error.response.data.msg);
  }
}
export { getSingleProductThunk, getSingleProductReviewsThunk };

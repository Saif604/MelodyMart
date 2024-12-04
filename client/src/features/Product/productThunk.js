import axios from "axios";
const getSingleProductThunk = async (id, thunkAPI) => {
  const {rejectWithValue} = thunkAPI;
  try {
    const { data } = await axios.get(`/api/v1/products/${id}`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.msg);
  }
};
export { getSingleProductThunk};

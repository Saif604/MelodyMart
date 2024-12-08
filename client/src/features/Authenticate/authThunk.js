import axios from "axios";
import { clearAllReviews } from "../Review/reviewSlice";
import { clearAllProductStates } from "../Products/productsSlice";
import { clearAllOrders } from "../Orders/ordersSlice";
const registerUserThunk = async(userData,thunkAPI)=>{
  const {rejectWithValue} = thunkAPI;
    try{
        const {data} = await axios.post("/api/v1/auth/register",userData);
        return data;
    }
    catch(error){
        return rejectWithValue(error.response.data.msg);
    }
};

const loginUserThunk = async(credentials,thunkAPI)=>{
  const {rejectWithValue} = thunkAPI;
    try{
        const {data} = await axios.post("/api/v1/auth/login",credentials);
        return data;
    }
    catch(error){
        return rejectWithValue(error.response.data.msg)
    }
};

const logoutUserThunk =  async (_,thunkAPI) => {
  const {dispatch,rejectWithValue} = thunkAPI;
  try {
    const { data } = await axios.get("/api/v1/auth/logout");
    dispatch(clearAllReviews());
    dispatch(clearAllProductStates());
    dispatch(clearAllOrders());
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data.msg);
  }
};

export {registerUserThunk,loginUserThunk,logoutUserThunk};
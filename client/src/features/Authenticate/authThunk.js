import axios from "axios";
import { clearAllReviews } from "../Review/reviewSlice";
import { clearAllProductStates } from "../Products/productsSlice";
import { clearAllOrders } from "../Orders/ordersSlice";
import { clearAllUserStates } from "../User/userSlice";
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
    dispatch(clearAllUserStates());
    dispatch(clearAllProductStates());
    dispatch(clearAllOrders());
    dispatch(clearAllReviews());
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data.msg);
  }
};

export {registerUserThunk,loginUserThunk,logoutUserThunk};
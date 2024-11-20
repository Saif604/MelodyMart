import axios from "axios";
const registerUserThunk = async(userData,thunkAPI)=>{
    try{
        const {data} = await axios.post("/api/v1/auth/register",userData);
        return data;
    }
    catch(error){
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
};

const loginUserThunk = async(credentials,thunkAPI)=>{
    try{
        const {data} = await axios.post("/api/v1/auth/login",credentials);
        return data;
    }
    catch(error){
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
};

const logoutUserThunk =  async (thunkAPI) => {
  try {
    const { data } = await axios.get("/api/v1/auth/logout");
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.msg);
  }
};

export {registerUserThunk,loginUserThunk,logoutUserThunk};
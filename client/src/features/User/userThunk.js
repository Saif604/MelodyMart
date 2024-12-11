import axios from "axios";

const getAllUsersThunk = async (_,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try{
        const {data} = await axios.get("/api/v1/users");
        return data;
    }
    catch(error){
        return rejectWithValue(error.response.data.msg);
    }
}

const getCurrentUserThunk = async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await axios.get("/api/v1/users/showMe");
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.msg);
  }
};

const updateUserThunk = async (userData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await axios.patch(`/api/v1/users/updateUser`, userData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.msg);
  }
};

const updateUserPasswordThunk = async (passwords, thunkAPI) => {
  const {rejectWithValue } = thunkAPI;
  try {
    const { data } = await axios.patch(
      "/api/v1/users/updateUserPassword",
      passwords
    );
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.msg);
  }
};

const getSingleUserThunk = async(userId,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try{
        const {data} = await axios.get(`/api/v1/users/${userId}`);
        return data;
    }
    catch(error){
        return rejectWithValue(error.response.data.msg);
    }
}

export {getAllUsersThunk,getCurrentUserThunk,updateUserThunk,updateUserPasswordThunk,getSingleUserThunk};
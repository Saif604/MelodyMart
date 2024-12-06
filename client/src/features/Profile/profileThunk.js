import axios from "axios";

const getCurrentUserThunk = async(_,thunkAPI) =>{
    const {dispatch, rejectWithValue} = thunkAPI;
    try{
        const {data} = await axios.get("/api/v1/users/showMe");
        return data;
    }
    catch(error){
        return rejectWithValue(error.response.data.msg);
    }
}
const getCurrentUserOrdersThunk = async(_,thunkAPI) =>{
    const {dispatch,rejectWithValue} = thunkAPI;
    try{
        const {data} = await axios.get("/api/v1/orders/showAllMyOrders");
        return data;
    }
    catch(error){
        return rejectWithValue(error.response.data.msg);
    }
}
const updateUserThunk = async(userData,thunkAPI) =>{
    const {dispatch, rejectWithValue} = thunkAPI;
    try{
        const {data} = await axios.patch(`/api/v1/users/updateUser`,userData);
        return data;
    }
    catch(error){
        return rejectWithValue(error.response.data.msg);
    }
}
const updateUserPasswordThunk = async(passwords,thunkAPI) =>{
    const {dispatch, rejectWithValue} = thunkAPI;
    try{
        const {data} = await axios.patch("/api/v1/users/updateUserPassword",passwords);
        return data;
    }
    catch(error){
        return rejectWithValue(error.response.data.msg);
    }
}

export {getCurrentUserThunk,updateUserThunk,updateUserPasswordThunk,getCurrentUserOrdersThunk}
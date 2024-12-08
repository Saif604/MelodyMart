import axios from "axios";

const getAllUsersThunk = async(_,thunkAPI) =>{
    const {dispatch, rejectWithValue} = thunkAPI
    try{
        const {data} = await axios.get("/api/v1/users");
        return data;
    }
    catch(error){
        return rejectWithValue(error.response.data.msg);
    }
}

export {getAllUsersThunk};
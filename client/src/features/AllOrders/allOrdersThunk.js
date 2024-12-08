import axios from "axios";

const getAllOrdersThunk = async(_,thunkAPI) =>{
    const {dispatch, rejectWithValue} = thunkAPI;
    try{
        const {data} = await axios.get("/api/v1/orders");
        return data;
    }
    catch(error){
        return rejectWithValue(error.response.data.msg);
    }
}

export {getAllOrdersThunk};
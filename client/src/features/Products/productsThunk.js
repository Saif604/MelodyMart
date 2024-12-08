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
export {getAllProductsThunk};
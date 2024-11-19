import axios from "axios";
const getAllProductsThunk = async(params,thunkAPI) =>{
    try{
        const {data} = await axios.get(`/api/v1/products?${params}`);
        return data;
    }catch(error){
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}
export {getAllProductsThunk};
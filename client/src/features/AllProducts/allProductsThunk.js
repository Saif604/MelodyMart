import axios from "axios";

const getAllProductsThunk = async(params,thunkAPI)=>{
    const {dispatch,rejectWithValue} = thunkAPI;
    try{
        const {data} = await axios.get(`/api/v1/products${params}`);
        return data;
    }
    catch(error){
        return rejectWithValue(error.response.data.msg);
    }
}
const createProductThunk = async(product,thunkAPI) =>{
    const {dispatch, rejectWithValue} = thunkAPI;
    try{
        const { data } = await axios.post("/api/v1/products", product, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return data;
    }
    catch(error){
        return rejectWithValue(error.response.data.msg);
    }
}

export {getAllProductsThunk,createProductThunk};
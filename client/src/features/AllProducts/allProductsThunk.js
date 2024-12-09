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
const deleteProductThunk = async(productId,thunkAPI) =>{
    const {dispatch,rejectWithValue} = thunkAPI;
    try{
        const {data} = await axios.delete(`/api/v1/products/${productId}`);
        return data;
    }
    catch(error){
        return rejectWithValue(error.response.data.msg);
    }
}
const updateProductThunk = async({productId,updatedProduct},thunkAPI)=>{
    const {dispatch,rejectWithValue} = thunkAPI;
    try{
        const { data } = await axios.patch(`/api/v1/products/${productId}`, updatedProduct, {
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

export {getAllProductsThunk,createProductThunk,deleteProductThunk,updateProductThunk};
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getSingleProductThunk } from "./productThunk.js";

export const getSingleProduct = createAsyncThunk("product/getSingleProduct",getSingleProductThunk);

const initialState = {
    isLoading:false,
    isError:false,
    product:{},
}

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase(getSingleProduct.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(getSingleProduct.fulfilled,(state,action)=>{
                state.product = {...action.payload};
                state.isLoading=false;
            })
            .addCase(getSingleProduct.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError = true;
                console.log(action.payload)
            })
    }
});
export const {} = productSlice.actions;
export default productSlice.reducer;
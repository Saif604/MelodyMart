import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (query,thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const { data } = await axios.get(`/api/v1/products?${query}`);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  productsLoading: false,
  productsError: false,
  products: [],
  totalProducts:0,
  pages:0,
  featuredProducts: [],
  productLoading: false,
  productError: false,
  product: [],
  isGrid:true,
  maxPrice:500
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setView:(state,action)=>{
      state.isGrid = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(getAllProducts.pending, (state) => {
            state.productsLoading = true;
     })
     .addCase(getAllProducts.fulfilled,(state,action)=>{
        state.productsLoading = false;
        state.products = action.payload.products;
        state.totalProducts = action.payload.nbhits;
        state.pages = action.payload.pages;
        state.featuredProducts = action.payload.featured;
     })
     .addCase(getAllProducts.rejected,(state,action)=>{
        state.productsLoading = false;
        state.productsError = action.payload.response.data.msg || action.payload.response.data;
     })
  },
});

export const {setView} = productSlice.actions;
export default productSlice.reducer;

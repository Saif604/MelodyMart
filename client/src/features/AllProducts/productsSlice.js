import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProductsThunk } from "./productsThunk";

export const getAllProducts = createAsyncThunk("products/getAllProducts",getAllProductsThunk);

const initialState = {
  productsLoading: false,
  productsError: false,
  products: [],
  totalProducts:0,
  pages:0,
  featuredProducts: [],
  isGrid:true,
  maxPrice:500
};

const productsSlice = createSlice({
  name: "products",
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
        state.productsError = action.payload;
     })
  },
});

export const {setView} = productsSlice.actions;
export default productsSlice.reducer;

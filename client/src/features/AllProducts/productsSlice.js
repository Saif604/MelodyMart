import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProductsThunk } from "./productsThunk";

export const getAllProducts = createAsyncThunk("products/getAllProducts",getAllProductsThunk);

const initialFilters = {
    name:"",
    category:"",
    company:"",
    colors:[],
    price:200,
    freeShipping:false
}

const initialState = {
  productsLoading: false,
  productsError: false,
  products: [],
  totalProducts:0,
  pages:0,
  featuredProducts: [],
  isGrid:true,
  maxPrice:500,
  sort:"price",
  page:1,
  filters:{...initialFilters}
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setView:(state,action)=>{
      state.isGrid = action.payload
    },
    updateFilters:(state,action)=>{
      state.filters = {...state.filters,...action.payload};
      state.page = 1;
    },
    updateSort:(state,action)=>{
      state.sort = action.payload;
    },
    updatePage:(state,action)=>{
      state.page = action.payload;
    },
    clearFilters:(state)=>{
      state.filters = {...initialFilters};
      state.sort = "price";
      state.page = 1;
    },
    clearAllProductStates:(state)=>initialState
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

export const {setView,updateFilters,clearFilters,updateSort,updatePage,clearAllProductStates} = productsSlice.actions;
export default productsSlice.reducer;

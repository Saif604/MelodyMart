import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProductThunk, getAllProductsThunk } from "./allProductsThunk";
import {formatPrice} from "../../utils/format";
import {toast} from "react-toastify";

export const getAllProducts = createAsyncThunk("allProducts/getAllProducts",getAllProductsThunk);
export const createProduct = createAsyncThunk("allProducts",createProductThunk);

const initialState = {
  isLoading: false,
  isError: false,
  allProducts: [],
  tableColumns: [
    { field: "image", label: "Image" },
    { field: "productId", label: "Product ID" },
    { field: "name", label: "Name" },
    { field: "price", label: "Price" },
    { field: "category", label: "Category" },
    { field: "company", label: "Company" },
  ],
};

const allProductSlice = createSlice({
  name: "allProducts",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder
    .addCase(getAllProducts.pending,(state)=>{
        state.isLoading = true;
    })
    .addCase(getAllProducts.fulfilled,(state,action)=>{
        const {products} = action.payload;
        state.allProducts = products.map((product)=>({
            image:product.images[0],
            productId:product._id,
            name:product.name,
            price:formatPrice(product.price),
            category:product.category,
            company:product.company
        }))
        state.isLoading = false;
    })
    .addCase(getAllProducts.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
    })
    .addCase(createProduct.fulfilled,(state,action)=>{
      toast.success(action.payload.msg);
    })
    .addCase(createProduct.rejected,(_,action)=>{
      toast.error(action.payload);
    })
  },
});

export const {} = allProductSlice.actions;
export default allProductSlice.reducer;

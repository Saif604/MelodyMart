import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProductThunk, deleteProductThunk, getAllProductsThunk,updateProductThunk } from "./allProductsThunk";
import {formatPrice} from "../../utils/format";
import {toast} from "react-toastify";

export const getAllProducts = createAsyncThunk("allProducts/getAllProducts",getAllProductsThunk);
export const createProduct = createAsyncThunk("allProducts/createProduct",createProductThunk);
export const deleteProduct = createAsyncThunk('allProducts/deleteProduct',deleteProductThunk);
export const updateProduct = createAsyncThunk("allProducts/updateProduct",updateProductThunk);

const initialState = {
  isLoading: false,
  isError: false,
  allProducts: [],
  formatedProducts:[],
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
        state.formatedProducts = products.map((product)=>({
            image:product.images[0].url,
            productId:product._id,
            name:product.name,
            price:formatPrice(product.price),
            category:product.category,
            company:product.company
        }));
        state.allProducts = products;
        state.isLoading = false;
    })
    .addCase(getAllProducts.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
    })
    .addCase(createProduct.pending,(state)=>{
      state.isLoading = true;
    })
    .addCase(createProduct.fulfilled,(state,action)=>{
      toast.success(action.payload.msg);
      state.isLoading = false;
    })
    .addCase(createProduct.rejected,(state,action)=>{
      toast.error(action.payload);
      state.isLoading = false;
      state.isError = true;
    })
    .addCase(deleteProduct.fulfilled,(state,action)=>{
      toast.success(action.payload.msg);
    })
    .addCase(deleteProduct.rejected,(state,action)=>{
      toast.error(action.payload);
    })
    .addCase(updateProduct.fulfilled,(state,action)=>{
      toast.success("Product updated successfully...");
    })
    .addCase(updateProduct.rejected,(state,action)=>{
      toast.error(action.payload);
    })
  },
});

export const {} = allProductSlice.actions;
export default allProductSlice.reducer;

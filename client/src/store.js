import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./features/User/userSlice.js";
import toastReducer from "./features/Toast/toastSlice.js";
import productReducer from "./features/Product/productSlice.js";
import filterReducer from "./features/Filter/filterSlice.js";
export const store = configureStore({
    reducer:{
        user:userReducer,
        toast:toastReducer,
        products:productReducer,
        filters:filterReducer
    }
})
export default store;
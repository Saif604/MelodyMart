import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./features/User/userSlice.js";
import toastReducer from "./features/Toast/toastSlice.js";
import productsReducer from "./features/AllProducts/productsSlice.js"
import productReducer from "./features/Product/productSlice.js";
export const store = configureStore({
    reducer:{
        user:userReducer,
        toast:toastReducer,
        products:productsReducer,
        product:productReducer
    }
})
export default store;
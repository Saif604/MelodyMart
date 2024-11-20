import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "./features/AllProducts/productsSlice.js"
import productReducer from "./features/Product/productSlice.js";
import authReducer from "./features/Authenticate/authSlice.js";
export const store = configureStore({
    reducer:{
        auth:authReducer,
        products:productsReducer,
        product:productReducer
    }
})
export default store;
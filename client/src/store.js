import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "./features/AllProducts/productsSlice.js"
import productReducer from "./features/Product/productSlice.js";
import authReducer from "./features/Authenticate/authSlice.js";
import modalReducer from "./features/Modal/modalSlice.js";
import cartReducer from "./features/Cart/cartSlice.js";
export const store = configureStore({
    reducer:{
        auth:authReducer,
        products:productsReducer,
        product:productReducer,
        modal:modalReducer,
        cart:cartReducer
    }
})
export default store;
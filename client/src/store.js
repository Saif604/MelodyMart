import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "./features/Products/productsSlice.js"
import authReducer from "./features/Authenticate/authSlice.js";
import modalReducer from "./features/Modal/modalSlice.js";
import ordersReducer from "./features/Orders/ordersSlice.js";
import cartReducer from "./features/Cart/cartSlice.js";
import reviewReducer from "./features/Review/reviewSlice.js";
import userReducer from "./features/User/userSlice.js";

export const store = configureStore({
    reducer:{
        auth:authReducer,
        products:productsReducer,
        modal:modalReducer,
        cart:cartReducer,
        orders:ordersReducer,
        reviews:reviewReducer,
        users:userReducer
    }
})
export default store;
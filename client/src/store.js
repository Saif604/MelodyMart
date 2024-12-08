import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "./features/Products/productsSlice.js"
import productReducer from "./features/Product/productSlice.js";
import authReducer from "./features/Authenticate/authSlice.js";
import modalReducer from "./features/Modal/modalSlice.js";
import ordersReducer from "./features/Orders/ordersSlice.js";
import cartReducer from "./features/Cart/cartSlice.js";
import reviewReducer from "./features/Review/reviewSlice.js";
import profileReducer from "./features/Profile/profileSlice.js";
import allUsersReducer from "./features/AllUsers/allUsersSlice.js";
import allOrdersReducer from "./features/AllOrders/allOrdersSlice.js";
import allProductsReducer from "./features/AllProducts/allProductsSlice.js";

export const store = configureStore({
    reducer:{
        auth:authReducer,
        products:productsReducer,
        product:productReducer,
        modal:modalReducer,
        cart:cartReducer,
        orders:ordersReducer,
        reviews:reviewReducer,
        profile:profileReducer,
        allUsers:allUsersReducer,
        allOrders:allOrdersReducer,
        allProducts:allProductsReducer
    }
})
export default store;
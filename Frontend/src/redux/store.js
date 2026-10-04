import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/productSlice.js"
import cartReducer from "./slice/cartSlice.js"
import wishlistReducer from "./slice/wishlistSlice.js";
import authReducer from "./slice/authSlice.js";



const store = configureStore({
    reducer:{
        product: productReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        auth: authReducer
    }
})

export default store;


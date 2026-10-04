import { createSlice } from "@reduxjs/toolkit";

const cartSlice = new createSlice({
    name: "wishlist",

    initialState: {
        wishlist: [],
        isLoading: false,
    },

    reducers: {
        setWishlist: (state, action)=>{
             state.wishlist = action.payload;
        },

        setLoading: (state, action)=>{
            state.isLoading = action.payload;
        },

        clearWishlistState : (state)=>{
            state.wishlist = [];
        }
    }

})

export const {setWishlist, setLoading, clearWishlistState} = cartSlice.actions;

export default cartSlice.reducer;
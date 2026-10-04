import { createSlice } from "@reduxjs/toolkit";

const cartSlice = new createSlice({
    name: "cart",

    initialState: {
        cart: null,
        isLoading: false,
    },

    reducers: {
        setCart: (state, action)=>{
             state.cart = action.payload;
        },

        setLoading: (state, action)=>{
            state.isLoading = action.payload;
        },

        clearCartState : (state)=>{
            state.cart = {...state.cart, items: []};
        }
    }

})

export const {setCart, setLoading, clearCartState} = cartSlice.actions;

export default cartSlice.reducer;
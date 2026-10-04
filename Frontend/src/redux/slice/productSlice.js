import {createSlice} from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",

    initialState: {
       products: [],
       isLoading: false,
    },

    reducers:{
        setLoading: (state, action)=>{
            state.isLoading = action.payload;
        },  

        setProducts: (state, action)=>{
            state.products = action.payload;
        },

        addProductState: (state, action)=>{
            state.products.push(action.payload);
        },

        deleteProductState:(state, action)=>{
            state.products = state.products.filter((item)=> item._id !== action.payload);
        },

        updateProductState: (state, action)=>{
            const index = state.products.findIndex((item) => item._id ===  action.payload._id);

            if(index !== -1){
                state.products[index] = {
                    ...state.products[index], ...action.payload
                }
            }
        }

    }
})

export const {setLoading, setProducts, addProductState, deleteProductState, updateProductState} = productSlice.actions;

export default productSlice.reducer;
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user : null,
    isAuthenticated: false,
    loading: true
}

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        setAuthLoading: (state, action)=>{
            state.loading = action.payload;
        },

        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !! action.payload;
        },

        clearUser: (state) =>{
            state.user = null;
            state.isAuthenticated = false
        }
    }
})

export const {setAuthLoading, setUser, clearUser} = authSlice.actions;

export default authSlice.reducer;

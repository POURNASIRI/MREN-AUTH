import { createSlice } from "@reduxjs/toolkit";



const initialState = {
        currentUser:null,
        loading:false,
        error:false
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
            signInStart(state){
                state.loading = true
            },
            signInSuccess(state,action){
                state.currentUser = action.payload;
                state.loading = false,
                state.error = false
            },
            signInUnSuccess(state,action){
                state.loading = false,
                state.error = action.payload;
            },
            updateUserStart(state){
                state.loading = true
            },
            updateUserSuccess(state,action){
                state.loading = false
                state.currentUser = action.payload
                state.error = false
            },
            updateUserUnSuccess(state){
                state.loading = false,
                state.error = true

            },
            deleteUserStart(state){
                state.loading = true
            },
            deleteUserSuccess(state,action){
                state.loading = false
                state.currentUser = null
                state.error = false
            },
            deleteUserUnSuccess(state){
                state.loading = false,
                state.error = true

            },
            signout(state){
                state.loading = false
                state.currentUser = null
                state.error = false
            }
    }

})


export default userSlice.reducer
export const {signInStart,
    signInSuccess,
    signInUnSuccess,
    updateUserStart,
    updateUserSuccess,
    updateUserUnSuccess,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserUnSuccess,
    signout
} = userSlice.actions
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
    }

})


export default userSlice.reducer
export const {signInStart,signInSuccess,signInUnSuccess} = userSlice.actions
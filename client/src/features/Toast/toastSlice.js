import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show:false,
    message:null,
    background:null
}

const toastSlice = createSlice({
    name:'toast',
    initialState,
    reducers:{
        closeShow:(state)=>{
            state.show = false;
            state.message=null;
            state.background=null;
        },
        openShow: (state,action) =>{
            state.show = true;
            state.message = action.payload.message;
            state.background = action.payload.background;
        }
    }
});

export const {openShow, closeShow} = toastSlice.actions;
export default toastSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show:false,
    modalData:{},
}

const modalSlice = createSlice({
    name:"modal",
    initialState,
    reducers:{
        openModal:(state,action)=>{
            state.show = true;
            state.modalData = action.payload;
        },
        closeModal:(state)=>{
            state.show = false;
            state.modalData = {};
        }
    }
});

export const {openModal,closeModal} = modalSlice.actions;
export default modalSlice.reducer;
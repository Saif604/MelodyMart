import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  filters: {
    name: "",
    category: "",
    company: "",
    colors: [],
    price: 200,
    freeShipping: false,
  },
  sort:"price",
  page:1,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      state.filters = {...state.filters,...action.payload};
      state.page = 1;
    },
    updateSort:(state,action)=>{
        state.sort = action.payload;
    },
    updatePage:(state,action)=>{
        state.page = action.payload;
    },
    clearFilters: (state) => {
      return initialState;
    },
  },
});

export const { updateFilters, clearFilters,updateSort,updatePage} = filterSlice.actions;
export default filterSlice.reducer;

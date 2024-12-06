import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCurrentUserThunk,
  updateUserPasswordThunk,
  updateUserThunk,
  getCurrentUserOrdersThunk,
} from "./profileThunk";
import { toast } from "react-toastify";
import { formatDonut, formatLine, formatBar } from "../../utils/format";

export const getCurrentUser = createAsyncThunk(
  "profile/getCurrentUser",
  getCurrentUserThunk
);
export const updateUser = createAsyncThunk(
  "profile/updateUser",
  updateUserThunk
);
export const updateUserPassword = createAsyncThunk(
  "profile/updateUserPassword",
  updateUserPasswordThunk
);
export const getCurrentUserOrders = createAsyncThunk(
  "profile/getCurrentUserOrders",
  getCurrentUserOrdersThunk
);



const initialState = {
  isLoading: true,
  isError: false,
  currentUser: null,
  lineData: [],
  barData: [],
  donutData: [],
};

const userSlice = createSlice({
  name: "profile",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.currentUser = user;
        state.isLoading = false;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      })
      .addCase(getCurrentUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUserOrders.fulfilled, (state, action) => {
        const { orders } = action.payload;
        const line = formatLine(orders);
        const bar = formatBar(orders);
        const donut = formatDonut(orders);
        state.lineData = [...line];
        state.barData = [...bar];
        state.donutData = [...donut];
        state.isLoading = false;
      })
      .addCase(getCurrentUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      })
      .addCase(updateUser.fulfilled,(state,action)=>{
        const {user} = action.payload;
        state.currentUser = user;
        toast.success("User updated successfully...");
      })
      .addCase(updateUser.rejected,(state,action)=>{
        toast.error(action.payload);
      })
      .addCase(updateUserPassword.fulfilled,(state,action)=>{
        const {msg} = action.payload;
        toast.success(msg);
      })
      .addCase(updateUserPassword.rejected,(state,action)=>{
        toast.error(action.payload);
      })
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;

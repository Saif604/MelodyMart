import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
} from "../../utils/localStorage";
import {
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
} from "./authThunk";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  registerUserThunk
);
export const loginUser = createAsyncThunk("auth/loginUser", loginUserThunk);
export const logoutUser = createAsyncThunk("auth/logoutUser", logoutUserThunk);

const initialState = {
  user: getUserFromLocalStorage(),
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.user = { ...user };
        state.isLoading = false;
        addUserToLocalStorage(user);
        toast.success(`${action.payload.user.name} is successfully registered`);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.user = { ...user };
        state.isLoading = false;
        addUserToLocalStorage(action.payload.user);
        toast.success(`${action.payload.user.name} is successfully loggedin`);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        const {payload} = action;
        state.user = payload.user;
        state.isLoading = false;
        removeUserFromLocalStorage();
        toast.success("Logged out successfully!!!!");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});

export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/v1/auth/register", userData);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.msg);
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/login",
  async (loginData, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/v1/auth/login", loginData);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.msg);
    }
  }
);
export const logoutUser = createAsyncThunk("user/logout", async (thunkAPI) => {
  try {
    const { data } = await axios.get("/api/v1/auth/logout");
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.msg);
  }
});

const initialState = {
  user: null,
  userLoading: false,
  userError: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    // Handle user registration
    builder
      .addCase(registerUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload; // Store user data on successful registration
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store error message
      });
    // Handle user login
    builder
      .addCase(loginUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload; // Store user data on successful login
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload; // Store error message
      });
    //handle user logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected,(state,action)=>{
        state.userLoading = false;
        state.userError = action.payload;
      })
  },
});

export default userSlice.reducer;

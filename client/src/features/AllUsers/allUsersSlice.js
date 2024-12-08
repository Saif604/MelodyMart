import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsersThunk } from "./allUsersThunk";
import { toast } from "react-toastify";
export const getAllUsers = createAsyncThunk("allUsers/getAllUsers", getAllUsersThunk);
const initialState = {
  isLoading: true,
  isError: false,
  allUsers: [],
  tableColumns: [
    { field: "userId", label: "User ID" },
    { field: "name", label: "Name" },
    { field: "email", label: "Email" },
    { field: "role", label: "Role" },
  ],
};
const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        const {users} = action.payload;
        state.allUsers = users.map((user)=>({userId:user._id,name:user.name,email:user.email,role:user.role}));
        state.isLoading = false;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      });
  },
});

export const {} = allUsersSlice.actions;
export default allUsersSlice.reducer;

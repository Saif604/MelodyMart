import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllUsersThunk,
  getCurrentUserThunk,
  getSingleUserThunk,
  updateUserPasswordThunk,
  updateUserThunk,
} from "./userThunk";
import { toast } from "react-toastify";

export const getAllUsers = createAsyncThunk(
  "user/getAllusers",
  getAllUsersThunk
);
export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  getCurrentUserThunk
);
export const getSingleUser = createAsyncThunk(
  "user/getSingleUser",
  getSingleUserThunk
);
export const updateUser = createAsyncThunk("user/updateUser", updateUserThunk);
export const updateUserPassword = createAsyncThunk(
  "user/updateUserPassword",
  updateUserPasswordThunk
);

const initialState = {
  singleUser: null,
  allUsers: [],
  currentUser: null,
  allUsersTableColumns: [
    { field: "userId", label: "User ID" },
    { field: "name", label: "Name" },
    { field: "email", label: "Email" },
    { field: "role", label: "Role" },
  ],
  allUsersTableData:[],
  status: {
    getAllUsers: { loading: true, error: null },
    getSingleUser: { loading: true, error: null },
    getCurrentUser: { loading: true, error: null },
    updateUser: { loading: false, error: null },
    deleteUser: { loading: false, error: null },
    updateUserPassword: { loading: false, error: null },
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status.getAllUsers.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        const { users } = action.payload;
        state.allUsers = users;
        state.allUsersTableData = users.map((user) => ({
          userId: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        }));
        state.status.getAllUsers.loading = false;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status.getAllUsers.loading = false;
        state.status.getAllUsers.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.status.getCurrentUser.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.currentUser = user;
        state.status.getCurrentUser.loading = false;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.status.getCurrentUser.loading = false;
        state.status.getCurrentUser.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.status.updateUser.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.currentUser = user;
        toast.success("User updated successfully...");
        state.status.updateUser.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status.updateUser.loading = false;
        state.status.updateUser.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateUserPassword.pending, (state) => {
        state.status.updateUserPassword.loading = true;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        toast.success(action.payload.msg);
        state.status.updateUserPassword.loading = false;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.status.updateUserPassword.loading = false;
        state.status.updateUserPassword.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;

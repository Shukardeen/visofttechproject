import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, editUserRole, getAllUsers, updateProfile, changeAdminPass, resetPassword } from "../Thunks/thunks";

const initialState = {
  users: [],
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.payload;
        console.log("ERROR GETTING ALL USERS :: ", action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload.userId);
        state.error = null
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
        console.log("ERROR DELETING USER :: ", action.payload);
      })
      .addCase(editUserRole.fulfilled, (state, action) => {
        const user = state.users.find((user) => user._id == action.payload.userId);
        user.isAdmin = action.payload.isAdmin;
        state.error = null;
      })
      .addCase(editUserRole.rejected, (state, action) => {
        state.error = action.payload;
        console.log("ERROR UPDATING ROLE :: ", action.payload);
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user._id === action.payload.user._id);
        if(index !== -1) {
          state.users[index] = action.payload.user;
        }
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload;
        console.log("ERROR UPDATING PROFILE :: ", action.payload);
      })
      .addCase(changeAdminPass.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user._id === action.payload.userId);
        if(index !== -1) {
          state.users[index] = action.payload.user;
        }
        state.error = null;
      })
      .addCase(changeAdminPass.rejected, (state, action) => {
        state.error = action.payload;
        console.log("ERROR UPDATING ADMIN PASS :: ", action.payload);
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user._id === action.payload.user._id);
        if(index !== -1) {
          state.users[index] = action.payload.user
        }
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload;
        console.log("ERROR RESETTING PASSWORD :: ", action.payload);
      })
  },
});

export default userSlice.reducer;
export const { setUsers } = userSlice.actions;

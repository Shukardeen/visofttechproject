import { createSlice } from "@reduxjs/toolkit";
import { signupUser, loginUser, logoutUser } from "../Thunks/thunks";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.rejected, (state, action) => {
        console.log("ERROR SIGNING UP :: ", action.payload);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.data;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("ERROR LOGGING IN :: ", action.payload);
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        console.log("ERROR LOGGING OUT :: ", action.payload);
      })
  },
});

export default authSlice.reducer;

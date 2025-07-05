import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice.js";
import userReducer from "./Slice/userSlice.js";
import projectReducer from "./Slice/projectSlice.js";
import contactReducer from "./Slice/contactSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        project: projectReducer,
        contact: contactReducer
    }
});

export { store };
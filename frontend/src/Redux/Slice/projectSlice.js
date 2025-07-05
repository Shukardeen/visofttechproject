import { createSlice } from "@reduxjs/toolkit";
import { addNewProject, destroyProject, getAllProjects, updateProject } from "../Thunks/thunks.js";

const initialState = {
  projects: [],
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.error = null;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addNewProject.fulfilled, (state, action) => {
        state.projects.push(action.payload.project);
        state.error = null;
      })
      .addCase(addNewProject.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(destroyProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((project) => project._id != action.payload.projectId);
        state.error = null;
      })
      .addCase(destroyProject.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((project) => project._id != action.payload.projectId);
        state.projects.push(action.payload.project);
        state.error = null;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.error = action.payload.error;
      })
  },
});

export default projectSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../../config/config.js";
import axios from "axios";

//signupUser thunk
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (signupData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${config.backendUrl}/auth/register`,
        signupData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return {
        success: true,
        data: response.data.newUser,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//loginUser thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${config.backendUrl}/auth/login`,
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return {
        success: true,
        data: response.data.user,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//logoutUser thunk
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(
        `${config.backendUrl}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//change admin password
export const changeAdminPass = createAsyncThunk("user/changeAdminPass", async (userPassDetails, thunkAPI) => {
  try {
    const passDetails = {
      currentPassword: userPassDetails.currentPassword,
      newPassword: userPassDetails.newPassword
    }
    const response = await axios.patch(`${config.backendUrl}/auth/change-password`, passDetails, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });
    return {
      success: true,
      userId: userPassDetails.userId,
      user: response.data.user
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

//forgot user pass thunk
export const resetPassword = createAsyncThunk("user/resetPass", async (resetData, thunkAPI) => {
  try {
    const response = await axios.post(`${config.backendUrl}/auth/reset-password`, resetData, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });
    return {
      success: true,
      user: response.data.user
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
})

//update user profile thunk
export const updateProfile = createAsyncThunk("user/update", async (userData, thunkAPI) => {
  try {
    const response = await axios.patch(`${config.backendUrl}/auth/update-profile`, userData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true
    });
    return {
      success: true,
      user: response.data.user
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

//get all users thunk
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${config.backendUrl}/users`,
        {
          withCredentials: true,
        }
      );
      return response.data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//delete user thunk
export const deleteUser = createAsyncThunk("user/delete", async (userId, thunkAPI) => {
  try {
    const response = await axios.delete(`${config.backendUrl}/users/${userId}`, {
      withCredentials: true
    });
    return {
      success: true,
      userId
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

//edit role of user thunk
export const editUserRole = createAsyncThunk("user/editRole", async (userDetails, thunkAPI) => {
  try {
    const { userId, isAdmin } = userDetails;
    const response = await axios.patch(`${config.backendUrl}/users/${userId}`, {isAdmin: isAdmin}, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });
    return {
      success: true,
      userId,
      isAdmin
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
})

//get all projects thunks
export const getAllProjects = createAsyncThunk("project/getAllProjects", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${config.backendUrl}/projects`, {
      withCredentials: true
    });
    return response.data.projects;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

//add new project thunk
export const addNewProject = createAsyncThunk("project/addNew", async (projectData, thunkAPI) => {
  try {
    const response = await axios.post(`${config.backendUrl}/projects`, projectData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true
    });
    return {
      success: true,
      project: response.data.project
    }
  } catch (error) {
    console.log("ERROR CREATING PROJECT :: ", error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

//delete the project
export const destroyProject = createAsyncThunk("project/destroy", async (projectId, thunkAPI) => {
  try {
    const response = await axios.delete(`${config.backendUrl}/projects/${projectId}`, {
      withCredentials: true
    });
    console.log(response.data);
    return {
      success: true,
      projectId
    }
  } catch (error) {
    console.log("ERROR DESTROYING PROJECT :: ", error);
    return thunkAPI.rejectWithValue(error.response.data)
  }
});

//update project thunk
export const updateProject = createAsyncThunk("project/update", async ({ projectId, projectData }, thunkAPI) => {
  try {
    const response = await axios.patch(`${config.backendUrl}/projects/${projectId}`, projectData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true
    });
    return {
      success: true,
      projectId,
      project: response.data.project
    }
  } catch (error) {
    console.log("ERROR UPDATING PROJECT :: ", error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

//get all messages thunk
export const getAllContacts = createAsyncThunk("contact/getAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${config.backendUrl}/contact`, {
      withCredentials: true
    });
    return response.data.contacts
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

//create contact thunk
export const createContact = createAsyncThunk("contact/createNew", async (contactData, thunkAPI) => {
  try {
    const response = await axios.post(`${config.backendUrl}/contact`, contactData, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });
    return response.data.newContact;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
});

//mark all messages read thunk
export const markAllRead = createAsyncThunk("contact/markAllRead", async (_, thunkAPI) => {
  try {
    const response = await axios.patch(`${config.backendUrl}/contact`, {}, {
      withCredentials: true
    });
    return {
      success: true
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

//mark one message read
export const markAsRead = createAsyncThunk("contact/markAsRead", async (contactId, thunkAPI) => {
  try {
    const response = await axios.patch(`${config.backendUrl}/contact/${contactId}`, {}, {
      withCredentials: true
    });
    return {
      success: true,
      contactId
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

//delete contact thunk
export const destroyContact = createAsyncThunk("contact/destroyContact", async (contactId, thunkAPI) => {
  try {
    const response = await axios.delete(`${config.backendUrl}/contact/${contactId}`, {
      withCredentials: true
    });
    return {
      success: true,
      contactId
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
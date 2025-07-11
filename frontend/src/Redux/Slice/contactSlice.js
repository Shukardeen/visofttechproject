import { createSlice } from '@reduxjs/toolkit';
import { getAllContacts, createContact, markAllRead, markAsRead, destroyContact } from "../Thunks/thunks.js";

const initialState = {
  contacts: [],
  error: null,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;
      state.error = null
    })
    .addCase(getAllContacts.rejected, (state, action) => {
      state.error = action.payload;
      console.log("ERROR GETTING ALL CONTACTS :: ", action.payload);
    })
    .addCase(createContact.fulfilled, (state, action) => {
      state.contacts.push(action.payload);
      state.error = null;
    })
    .addCase(createContact.rejected, (state, action) => {
      state.error = action.payload;
      console.log("ERROR CREATING CONTACT :: ", action.payload);
    })
    .addCase(markAllRead.fulfilled, (state, action) => {
      state.contacts.forEach((contact) => contact.isRead = true);
      state.error = null;
    })
    .addCase(markAllRead.rejected, (state, action) => {
      state.error = action.payload;
      console.log("ERROR MARKING ALL AS READ :: ", action.payload);
    })
    .addCase(markAsRead.fulfilled, (state, action) => {
      const target = state.contacts.find((contact) => contact._id === action.payload.contactId);
      target.isRead = true;
      state.error = null;
    })
    .addCase(markAsRead.rejected, (state, action) => {
      state.error = action.payload;
      console.log("ERROR MARKING AS READ :: ", action.payload);
    })
    .addCase(destroyContact.fulfilled, (state, action) => {
      state.contacts = state.contacts.filter((contact) => contact._id !== action.payload.contactId);
      state.error = null
    })
    .addCase(destroyContact.rejected, (state, action) => {
      state.error = action.payload;
      console.log("ERROR DESTROYING CONTACT :: ", action.payload);
    })
  }
});

export default contactSlice.reducer;
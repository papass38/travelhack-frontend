import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token: null, username: null, email: null, photo: [] },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.email = null;
    },
    addPhoto: (state, action) => {
      state.value.photo.push(action.payload);
    },
  },
});

export const { login, logout, addPhoto } = userSlice.actions;
export default userSlice.reducer;

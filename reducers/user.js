import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    username: null,
    email: null,
    photo:
      "file:///Users/julienfoucart/Library/Developer/CoreSimulator/Devices/A8760E63-944F-4387-8B6C-FAEF7BB48800/data/Containers/Data/Application/1CEDA664-45A9-4A24-AE3A-9EB59D426B78/Library/Caches/ExponentExperienceData/%2540anonymous%252FTravelHack-a341965c-25ff-44f9-881d-c31b25158d6d/ImagePicker/72FBB89D-4F64-4310-BE35-864DB09F4B0B.jpg",
    width: 4032,
  },
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
      state.value.photo =
        "file:///Users/julienfoucart/Library/Developer/CoreSimulator/Devices/A8760E63-944F-4387-8B6C-FAEF7BB48800/data/Containers/Data/Application/1CEDA664-45A9-4A24-AE3A-9EB59D426B78/Library/Caches/ExponentExperienceData/%2540anonymous%252FTravelHack-a341965c-25ff-44f9-881d-c31b25158d6d/ImagePicker/72FBB89D-4F64-4310-BE35-864DB09F4B0B.jpg";
    },
    addPhoto: (state, action) => {
      state.value.photo = action.payload;
    },
  },
});

export const { login, logout, addPhoto } = userSlice.actions;
export default userSlice.reducer;

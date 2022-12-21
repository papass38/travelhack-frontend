import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    username: null,
    email: null,
    photo:
      "https://media.istockphoto.com/id/1300845620/fr/vectoriel/appartement-dic%C3%B4ne-dutilisateur-isol%C3%A9-sur-le-fond-blanc-symbole-utilisateur.jpg?b=1&s=170667a&w=0&k=20&c=HEO2nP4_uEAn0_JzVTU6_Y5hyn-qHxyCrWWTirBvScs=",
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
      state.value.photo = action.payload.photo;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.email = null;
      state.value.photo =
        "https://media.istockphoto.com/id/1300845620/fr/vectoriel/appartement-dic%C3%B4ne-dutilisateur-isol%C3%A9-sur-le-fond-blanc-symbole-utilisateur.jpg?b=1&s=170667a&w=0&k=20&c=HEO2nP4_uEAn0_JzVTU6_Y5hyn-qHxyCrWWTirBvScs=";
    },
    addPhoto: (state, action) => {
      state.value.photo = action.payload;
    },
  },
});

export const { login, logout, addPhoto } = userSlice.actions;
export default userSlice.reducer;

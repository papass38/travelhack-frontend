import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
   };

   export const arraySlice = createSlice({
    name: 'array',
     initialState,
    reducers: {
      addArray: (state, action) => {
        state.value.push(action.payload);
      },
      removeArray: (state, action) => {
        state.value = state.value.filter(e => e !== action.payload)
      }
    },
   });

   export const { addArray, removeArray } = arraySlice.actions
   export default arraySlice.reducer
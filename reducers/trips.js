import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
      initialDestination : {}, 
      trip : []
    },
   };

   export const tripSlice = createSlice({
    name: 'trip',
   
     initialState,
    reducers: {
      initializeTrip: (state, action) => {
        state.value.initialDestination = action.payload;
      },
      addTrip:(state, action) => {
        state.value.trip.push(action.payload)
      }, 
      removeTrip :(state, action) => {
        console.log(action.payload)
        state.value.trip = state.value.trip.filter(e => e.name !== action.payload)
      }
    },
   });

   export const { initializeTrip, addTrip, removeTrip} = tripSlice.actions;
    export default tripSlice.reducer;
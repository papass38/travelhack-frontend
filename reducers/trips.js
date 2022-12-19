import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    initialDestination: {},
    trip: [],
    startDate : "", 
    endDate : "",
    totalBudget : 0
  },
};

export const tripSlice = createSlice({
  name: "trip",

  initialState,
  reducers: {
    initializeTrip: (state, action) => {
      state.value.initialDestination = action.payload;
    },
    addTrip: (state, action) => {
      state.value.trip.push(action.payload);
    },
    removeTrip: (state, action) => {
      state.value.trip = state.value.trip.filter(
        (e) => e.name !== action.payload
      );
    },
    addDateandBudget:(state, action) => {
      state.value.startDate = action.payload.startDate, 
      state.value.endDate = action.payload.endDate, 
      state.value.totalBudget = action.payload.budget
    }
  },
});

export const { initializeTrip, addTrip, removeTrip, addDateandBudget} = tripSlice.actions;
export default tripSlice.reducer;

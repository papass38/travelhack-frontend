import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const toDoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.value.push(action.payload);
    },
    removeTodo: (state) => {
      state.value = [];
    },
    filterTodo: (state, action) => {
      state.value = state.value.filter((e) => e !== action.payload);
    },
  },
});

export const { addTodo, removeTodo, filterTodo } = toDoSlice.actions;
export default toDoSlice.reducer;

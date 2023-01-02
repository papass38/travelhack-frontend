import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    name: "",
    todoId: null,
  },
};

export const toDoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodoId: (state, action) => {
      state.value.todoId = action.payload.todoId;
      state.value.name = action.payload.name;
    },
  },
});

export const { addTodoId } = toDoSlice.actions;
export default toDoSlice.reducer;

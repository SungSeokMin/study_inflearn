const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  currentId: 4,
  todos: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    ADD_TODO: (state, action) => {
      state.todos.push({
        id: state.currentId++,
        text: action.payload.trim(),
        state: 'todo',
      });
    },
    UPDATE_TODO: (state, action) => {
      const itemIdx = state.todos.findIndex((item) => item.id === action.payload);

      state.todos[itemIdx].state = state.todos[itemIdx].state === 'todo' ? 'done' : 'todo';
      state.todos.push(state.todos.splice(itemIdx, 1)[0]);
    },
    DELETE_TODO: (state, action) => {
      const itemIdx = state.todos.findIndex((item) => item.id === action.payload);

      if (itemIdx > -1) state.todos.splice(itemIdx, 1);
    },
  },
});

export default todoSlice.reducer;

export const { ADD_TODO, UPDATE_TODO, DELETE_TODO } = todoSlice.actions;

export const selectTodos = (state) => state.todo.todos;

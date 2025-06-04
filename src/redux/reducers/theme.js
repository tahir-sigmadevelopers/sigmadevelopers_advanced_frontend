import { createAction, createReducer } from "@reduxjs/toolkit";

// Define the action creator
export const toggleTheme = createAction("theme/toggleTheme");

// Define the initial state
const initialState = {
  darkMode: true,
};

// Create the reducer
export const themeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleTheme, (state) => {
      state.darkMode = !state.darkMode;
    });
});
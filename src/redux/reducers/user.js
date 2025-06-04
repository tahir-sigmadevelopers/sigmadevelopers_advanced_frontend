import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer(
    {
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
        message: null,
    },
    {
        loadUserRequest: (state) => {
            state.loading = true;
        },
        loadUserSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.error = null;
        },
        loadUserFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            state.user = null;
        },

        loginUserRequest: (state) => {
            state.loading = true;
        },
        loginUserSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.message = action.payload.message;
            state.error = null;
        },
        loginUserFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },

        clearError: (state) => {
            state.error = null;
        },
        clearMessage: (state) => {
            state.message = null;
        },

        logoutUserRequest: (state) => {
            state.loading = true;
        },
        logoutUserSuccess: (state, action) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.message = action.payload.message;
        },
        logoutUserFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        registerUserRequest: (state) => {
            state.loading = true;
        },
        registerUserSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        registerUserFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },

        forgotPasswordRequest: (state) => {
            state.loading = true;
        },
        forgotPasswordSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        forgotPasswordFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        resetPasswordRequest: (state) => {
            state.loading = true;
        },
        resetPasswordSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        resetPasswordFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        updateProfileRequest: (state) => {
            state.loading = true;
        },
        updateProfileSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.user = action.payload.user;
        },
        updateProfileFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        
        deleteProfileRequest: (state) => {
            state.loading = true;
        },
        deleteProfileSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.isAuthenticated = false;
            state.user = null;
        },
        deleteProfileFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
)
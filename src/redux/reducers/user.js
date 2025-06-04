import { createReducer } from "@reduxjs/toolkit";



export const userReducer = createReducer({}, {


    loadUserRequest: (state) => {
        state.loading = true;
    },
    loadUserSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
    },
    loadUserFail: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
    },


    loginUserRequest: (state) => {
        state.loading = true
        state.isAuthenticated = false
    },

    loginUserSuccess: (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.message = action.payload.message
        state.error = null
    },

    loginUserFail: (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.error = action.payload
    },


    registerUserRequest: (state) => {
        state.loading = true
        state.isAuthenticated = false
    },

    registerUserSuccess: (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.message = action.payload.message
        state.error = null
    },

    registerUserFail: (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.error = action.payload
    },


    logoutUserRequest: (state) => {
        state.loading = true
    },

    logoutUserSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.isAuthenticated = false
        state.user = null
        state.error = null
    },

    logoutUserFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },




    forgotPasswordRequest: (state) => {
        state.loading = true
    },

    forgotPasswordSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.error = null
    },

    forgotPasswordFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

    resetPasswordRequest: (state) => {
        state.loading = true
    },

    resetPasswordSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.error = null
    },

    resetPasswordFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },


    updateProfileRequest: (state) => {
        state.loading = true
    },

    updateProfileSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.error = null
    },

    updateProfileFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },


    deleteProfileRequest: (state) => {
        state.loading = true
    },

    deleteProfileSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.error = null
    },

    deleteProfileFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },






    clearMessage: (state, action) => {
        state.message = null
    },
    clearError: (state, action) => {
        state.error = null
    }

})
import { createReducer } from "@reduxjs/toolkit";


export const adminReducer = createReducer({}, {


    getAllUsersRequest: (state) => {
        state.loading = true
    },

    getAllUsersSuccess: (state, action) => {
        state.loading = false
        state.users = action.payload.users
        state.usersCount = action.payload.usersCount
        state.error = null
    },

    getAllUsersFail: (state, action) => {
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


    deleteUserRequest: (state) => {
        state.loading = true
    },

    deleteUserSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.error = null
    },

    deleteUserFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },


    clearMessage: (state) => {
        state.message = null
    },
    clearError: (state) => {
        state.error = null
    }

})
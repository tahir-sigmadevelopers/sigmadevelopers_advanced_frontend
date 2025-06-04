import { createReducer } from "@reduxjs/toolkit";

export const categoryReducer = createReducer({}, {

    addCategoryRequest: (state) => {
        state.loading = true
    },

    addCategorySuccess: (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.error = null
    },

    addCategoryFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

    getAllCategoryRequest: (state) => {
        state.loading = true
    },

    getAllCategorySuccess: (state, action) => {
        state.loading = false
        state.categories = action.payload.categories
        state.error = null
    },

    getAllCategoryFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

  

    editCategoryRequest: (state) => {
        state.loading = true
    },

    editCategorySuccess: (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.error = null
    },

    editCategoryFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

    getCategoryRequest: (state) => {
        state.loading = true
    },

    getCategorySuccess: (state, action) => {
        state.loading = false
        state.category = action.payload.category
        state.error = null
    },

    getCategoryFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

    deleteCategoryRequest: (state) => {
        state.loading = true
    },

    deleteCategorySuccess: (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.error = null
    },

    deleteCategoryFail: (state, action) => {
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
import { createReducer } from "@reduxjs/toolkit";

export const blogReducer = createReducer({}, {

    addBlogRequest: (state) => {
        state.loading = true
    },

    addBlogSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.error = null
    },

    addBlogFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

    getAllBlogsRequest: (state) => {
        state.loading = true
    },

    getAllBlogsSuccess: (state, action) => {
        state.loading = false
        state.blogs = action.payload.blogs
        state.error = null
    },

    getAllBlogsFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },


    getBlogDetailsRequest: (state) => {
        state.loading = true
    },

    getBlogDetailsSuccess: (state, action) => {
        state.loading = false
        state.blog = action.payload.blog
        state.error = null
    },

    getBlogDetailsFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

    editBlogRequest: (state) => {
        state.loading = true
    },

    editBlogSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.error = null
    },

    editBlogFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

    deleteBlogRequest: (state) => {
        state.loading = true
    },

    deleteBlogSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.error = null
    },

    deleteBlogFail: (state, action) => {
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
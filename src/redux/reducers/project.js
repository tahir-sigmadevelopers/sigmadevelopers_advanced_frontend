import { createReducer } from "@reduxjs/toolkit";



export const projectReducer = createReducer({}, {

    addProjectRequest: (state) => {
        state.loading = true
    },

    addProjectSuccess: (state, action) => {
        state.loading = false
        state.project = action.payload.project
        state.message = action.payload.message
        state.error = null
    },

    addProjectFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

    getAllProjectsRequest: (state) => {
        state.loading = true
    },

    getAllProjectsSuccess: (state, action) => {
        state.loading = false
        state.projects = action.payload.projects
        state.projectsCount = action.payload.projectsCount
        state.featuredProjects = action.payload.featuredProjects
        state.error = null
    },

    getAllProjectsFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },


    getProjectDetailsRequest: (state) => {
        state.loading = true
    },

    getProjectDetailsSuccess: (state, action) => {
        state.loading = false
        state.project = action.payload.project
        state.error = null
    },

    getProjectDetailsFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

    editProjectRequest: (state) => {
        state.loading = true
    },

    editProjectSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.error = null
    },

    editProjectFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

    deleteProjectRequest: (state) => {
        state.loading = true
    },

    deleteProjectSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.error = null
    },

    deleteProjectFail: (state, action) => {
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
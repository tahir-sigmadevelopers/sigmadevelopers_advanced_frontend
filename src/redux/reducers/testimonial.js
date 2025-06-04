import { createReducer } from "@reduxjs/toolkit";



export const testimonialReducer = createReducer({}, {

    addTestimonialRequest: (state) => {
        state.loading = true
    },

    addTestimonialSuccess: (state, action) => {
        state.loading = false
        state.testimonial = action.payload.testimonial
        state.message = action.payload.message
        state.error = null
    },

    addTestimonialFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

    getAllTestimonialsRequest: (state) => {
        state.loading = true
    },

    getAllTestimonialsSuccess: (state, action) => {
        state.loading = false
        state.testimonials = action.payload.testimonials
        state.testimonialsCount = action.payload.testimonialsCount
        state.approvedTestimonials = action.payload.approvedTestimonials
        state.error = null
    },

    getAllTestimonialsFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },

    deleteTestimonialRequest: (state) => {
        state.loading = true
    },

    deleteTestimonialSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.error = null
    },

    deleteTestimonialFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    approveTestimonialRequest: (state) => {
        state.loading = true
    },

    approveTestimonialSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload.message
        state.error = null
    },

    approveTestimonialFail: (state, action) => {
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
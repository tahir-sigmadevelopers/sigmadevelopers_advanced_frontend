import axios from "axios";
import { server } from "../../store";
import { getToken } from "../../utils/authManager";

// Helper function to get auth headers
const getAuthConfig = (contentType = "application/json") => {
    const token = getToken();
    return {
        headers: {
            "Content-Type": contentType,
            ...(token && { "Authorization": `Bearer ${token}` })
        }
    };
};

export const addReview = (description) => async (dispatch) => {
    try {
        dispatch({
            type: "addTestimonialRequest"
        });

        const config = getAuthConfig();
        const { data } = await axios.post(`${server}/testimonial/add`, { description }, config);

        dispatch({
            type: "addTestimonialSuccess",
            payload: data
        });
        
        return {
            type: "addTestimonialSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "addTestimonialFail",
            payload: error.response?.data?.message || "Failed to add testimonial"
        });
        throw error;
    }
};

export const getAllTestimonials = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllTestimonialsRequest"
        });

        const config = getAuthConfig();
        const { data } = await axios.get(`${server}/testimonials`, config);

        dispatch({
            type: "getAllTestimonialsSuccess",
            payload: data
        });
        
        return {
            type: "getAllTestimonialsSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "getAllTestimonialsFail",
            payload: error.response?.data?.message || "Failed to fetch testimonials"
        });
        throw error;
    }
};

export const deleteUserTestimonial = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteTestimonialRequest"
        });

        const config = getAuthConfig();
        const { data } = await axios.delete(`${server}/testimonial/${id}`, config);

        dispatch({
            type: "deleteTestimonialSuccess",
            payload: data
        });
        
        return {
            type: "deleteTestimonialSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "deleteTestimonialFail",
            payload: error.response?.data?.message || "Failed to delete testimonial"
        });
        throw error;
    }
};

export const approveTestimonial = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "approveTestimonialRequest"
        });

        const config = getAuthConfig();
        const { data } = await axios.put(`${server}/testimonial/${id}`, {}, config);

        dispatch({
            type: "approveTestimonialSuccess",
            payload: data
        });
        
        return {
            type: "approveTestimonialSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "approveTestimonialFail",
            payload: error.response?.data?.message || "Failed to approve testimonial"
        });
        throw error;
    }
};

export const bulkDeleteTestimonials = (testimonialIds) => async (dispatch) => {
    try {
        dispatch({ type: "bulkDeleteTestimonialRequest" });

        const config = getAuthConfig();
        
        // Make individual delete requests for each testimonial
        const deletePromises = testimonialIds.map(id => 
            axios.delete(`${server}/testimonial/${id}`, config)
        );
        
        await Promise.all(deletePromises);

        dispatch({ 
            type: "bulkDeleteTestimonialSuccess", 
            payload: `Successfully deleted ${testimonialIds.length} testimonials` 
        });
        
        return {
            success: true,
            message: `Successfully deleted ${testimonialIds.length} testimonials`
        };
    } catch (error) {
        dispatch({
            type: "bulkDeleteTestimonialFail",
            payload: error.response?.data?.message || "Failed to delete testimonials",
        });
        throw error;
    }
};

export const bulkApproveTestimonials = (testimonialIds) => async (dispatch) => {
    try {
        dispatch({ type: "bulkApproveTestimonialRequest" });

        const config = getAuthConfig();
        
        // Make individual approve requests for each testimonial
        const approvePromises = testimonialIds.map(id => 
            axios.put(`${server}/testimonial/${id}`, {}, config)
        );
        
        await Promise.all(approvePromises);

        dispatch({ 
            type: "bulkApproveTestimonialSuccess", 
            payload: `Successfully approved ${testimonialIds.length} testimonials` 
        });
        
        return {
            success: true,
            message: `Successfully approved ${testimonialIds.length} testimonials`
        };
    } catch (error) {
        dispatch({
            type: "bulkApproveTestimonialFail",
            payload: error.response?.data?.message || "Failed to approve testimonials",
        });
        throw error;
    }
};
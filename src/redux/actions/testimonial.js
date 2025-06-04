import axios from "axios";
import { server } from "../../store";


export const addReview = (description) => async (dispatch) => {

    try {

        dispatch({
            type: "addTestimonialRequest"
        })

        const config = {

            headers: { "Content-Type": "application/json" },

            withCredentials: true,
        };




        const { data } = await axios.post(`${server}/testimonial/add`, { description }, config);


        dispatch({
            type: "addTestimonialSuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "addTestimonialFail",
            payload: error.response.data.message
        })
    }
}




export const getAllTestimonials = () => async (dispatch) => {

    try {

        dispatch({
            type: "getAllTestimonialsRequest"
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.get(`${server}/testimonials`, config)


        dispatch({
            type: "getAllTestimonialsSuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "getAllTestimonialsFail",
            payload: error.response.data.message
        })
    }
}



export const deleteUserTestimonial = (id) => async (dispatch) => {

    try {

        dispatch({
            type: "deleteTestimonialRequest"
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.delete(`${server}/testimonial/${id}`, config)


        dispatch({
            type: "deleteTestimonialSuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "deleteTestimonialFail",
            payload: error.response.data.message
        })
    }
}


export const approveTestimonial = (id) => async (dispatch) => {

    try {

        dispatch({
            type: "approveTestimonialRequest"
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.put(`${server}/testimonial/${id}`, config)


        dispatch({
            type: "approveTestimonialSuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "approveTestimonialFail",
            payload: error.response.data.message
        })
    }
}
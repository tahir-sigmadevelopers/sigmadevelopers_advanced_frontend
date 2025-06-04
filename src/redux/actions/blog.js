import axios from "axios";
import { server } from "../../store";


export const getBlogDetails = (id) => async (dispatch) => {

    try {

        dispatch({
            type: "getBlogDetailsRequest"
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        }

        const { data } = await axios.get(`${server}/blog/${id}`, config)

        dispatch({
            type: "getBlogDetailsSuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "getBlogDetailsFail",
            payload: error.response.data.message
        })
    }
}

export const addBlog = (formData) => async (dispatch) => {

    try {

        dispatch({
            type: "addBlogRequest"
        })

        const config = {

            headers: { "Content-Type": "application/json" },

        };



        const { data } = await axios.post(
            `${server}/blog/create`,
            formData,
            config
        );


        dispatch({
            type: "addBlogSuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "addBlogFail",
            payload: error.response.data.message
        })
    }
}


export const editBlog = (formData, id) => async (dispatch) => {

    try {

        dispatch({
            type: "editBlogRequest"
        })

        const config = {

            headers: { "Content-Type": "application/json" },
        };

        console.log(formData);
        const { data } = await axios.put(
            `${server}/blog/${id}`,
            formData,
            config
        );


        dispatch({
            type: "editBlogSuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "editBlogFail",
            payload: error.response.data.message
        })
    }
}


export const deleteBlog = (id) => async (dispatch) => {

    try {

        dispatch({
            type: "deleteBlogRequest"
        })

        const config = {

            headers: { "Content-Type": "application/json" },

        };


        const { data } = await axios.delete(
            `${server}/blog/delete/${id}`,
            config
        );


        dispatch({
            type: "deleteBlogSuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "deleteBlogFail",
            payload: error.response.data.message
        })
    }
}




export const getAllBlogs = () => async (dispatch) => {

    try {

        dispatch({
            type: "getAllBlogsRequest"
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        }

        const { data } = await axios.get(`${server}/blogs/all`, config)


        dispatch({
            type: "getAllBlogsSuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "getAllBlogsFail",
            payload: error.response.data.message
        })
    }
}


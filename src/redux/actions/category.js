import axios from "axios";
import { server } from "../../store";


export const addCategory = (category) => async (dispatch) => {

    try {

        dispatch({
            type: "addCategoryRequest"
        })

        const config = {

            headers: { "Content-Type": "application/json" },

        };


        const { data } = await axios.post(
            `${server}/category/create`,
            { category },
            config
        );

        console.log(data);


        dispatch({
            type: "addCategorySuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "addCategoryFail",
            payload: error.response.data.message
        })
    }
}


export const editCategory = (category, id) => async (dispatch) => {

    try {

        dispatch({
            type: "editCategoryRequest"
        })

        const config = {

            headers: { "Content-Type": "application/json" },

        };


        const { data } = await axios.put(
            `${server}/category/${id}`,
            { category },
            config
        );


        dispatch({
            type: "editCategorySuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "editCategoryFail",
            payload: error.response.data.message
        })
    }
}

export const getCategory = (id) => async (dispatch) => {

    try {

        dispatch({
            type: "getCategoryRequest"
        })

        const config = {

            headers: { "Content-Type": "application/json" },

        };


        const { data } = await axios.get(
            `${server}/category/${id}`,
            config
        );
        console.log(data);

        dispatch({
            type: "getCategorySuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "getCategoryFail",
            payload: error.response.data.message
        })
    }
}


export const deleteCategory = (id) => async (dispatch) => {

    try {

        dispatch({
            type: "deleteCategoryRequest"
        })

        const config = {

            headers: { "Content-Type": "application/json" },

        };


        const { data } = await axios.delete(
            `${server}/category/${id}`,
            config
        );


        dispatch({
            type: "deleteCategorySuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "deleteCategoryFail",
            payload: error.response.data.message
        })
    }
}




export const getAllCategories = () => async (dispatch) => {

    try {

        dispatch({
            type: "getAllCategoryRequest"
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        }

        const { data } = await axios.get(`${server}/categories/all`, config)


        dispatch({
            type: "getAllCategorySuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "getAllCategorysFail",
            payload: error.response.data.message
        })
    }
}


import axios from "axios";
import { server } from "../../store";


export const addProject = (formData) => async (dispatch) => {

    try {

        dispatch({
            type: "addProjectRequest"
        })

        const config = {

            headers: { "Content-Type": "multipart/form-data" },

            withCredentials: true,
        };




        const { data } = await axios.post(
            `${server}/project/new`,
            formData,
            config
        );


        dispatch({
            type: "addProjectSuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "addProjectFail",
            payload: error.response.data.message
        })
    }
}


export const editProject = (formData, id) => async (dispatch) => {

    try {

        dispatch({
            type: "editProjectRequest"
        })

        const config = {

            headers: { "Content-Type": "application/json" },

            withCredentials: true,
        };




        const { data } = await axios.put(
            `${server}/project/update/${id}`,
            formData,
            config
        );


        dispatch({
            type: "editProjectSuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "editProjectFail",
            payload: error.response.data.message
        })
    }
}


export const deleteProject = (id) => async (dispatch) => {

    try {

        dispatch({
            type: "deleteProjectRequest"
        })

        const config = {

            headers: { "Content-Type": "application/json" },

            withCredentials: true,
        };


        const { data } = await axios.delete(
            `${server}/project/delete/${id}`,
            config
        );


        dispatch({
            type: "deleteProjectSuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "deleteProjectFail",
            payload: error.response.data.message
        })
    }
}




export const getAllProjects = () => async (dispatch) => {

    try {

        dispatch({
            type: "getAllProjectsRequest"
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.get(`${server}/projects`, config)


        dispatch({
            type: "getAllProjectsSuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "getAllProjectsFail",
            payload: error.response.data.message
        })
    }
}


export const getProjectDetails = (id) => async (dispatch) => {

    try {

        dispatch({
            type: "getProjectDetailsRequest"
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.get(`${server}/project/${id}`, config)


        dispatch({
            type: "getProjectDetailsSuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "getProjectDetailsFail",
            payload: error.response.data.message
        })
    }
}
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
        },
        withCredentials: false
    };
};

export const addProject = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "addProjectRequest"
        });

        const config = {
            headers: { 
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${getToken()}`
            },
            withCredentials: false
        };

        const { data } = await axios.post(
            `${server}/project/new`,
            formData,
            config
        );

        dispatch({
            type: "addProjectSuccess",
            payload: data
        });
        
        return {
            type: "addProjectSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "addProjectFail",
            payload: error.response?.data?.message || "Failed to add project"
        });
        throw error;
    }
};

export const editProject = (formData, id) => async (dispatch) => {
    try {
        dispatch({
            type: "editProjectRequest"
        });

        const config = {
            headers: { 
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${getToken()}`
            },
            withCredentials: false
        };

        const { data } = await axios.put(
            `${server}/project/update/${id}`,
            formData,
            config
        );

        dispatch({
            type: "editProjectSuccess",
            payload: data
        });
        
        return {
            type: "editProjectSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "editProjectFail",
            payload: error.response?.data?.message || "Failed to edit project"
        });
        throw error;
    }
};

export const deleteProject = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteProjectRequest"
        });

        const config = getAuthConfig();

        const { data } = await axios.delete(
            `${server}/project/delete/${id}`,
            config
        );

        dispatch({
            type: "deleteProjectSuccess",
            payload: data
        });
        
        return {
            type: "deleteProjectSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "deleteProjectFail",
            payload: error.response?.data?.message || "Failed to delete project"
        });
        throw error;
    }
};

export const getAllProjects = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllProjectsRequest"
        });

        const config = getAuthConfig();

        const { data } = await axios.get(`${server}/projects`, config);

        dispatch({
            type: "getAllProjectsSuccess",
            payload: data
        });
        
        return {
            type: "getAllProjectsSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "getAllProjectsFail",
            payload: error.response?.data?.message || "Failed to fetch projects"
        });
        throw error;
    }
};

export const getProjectDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "getProjectDetailsRequest"
        });

        const config = getAuthConfig();

        const { data } = await axios.get(`${server}/project/${id}`, config);

        dispatch({
            type: "getProjectDetailsSuccess",
            payload: data
        });
        
        return {
            type: "getProjectDetailsSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "getProjectDetailsFail",
            payload: error.response?.data?.message || "Failed to fetch project details"
        });
        throw error;
    }
};
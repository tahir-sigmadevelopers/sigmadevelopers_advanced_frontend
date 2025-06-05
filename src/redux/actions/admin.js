import axios from "axios"
import { server } from "../../store"
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

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllUsersRequest"
        });

        const config = getAuthConfig();
        const { data } = await axios.get(`${server}/users`, config);

        dispatch({
            type: "getAllUsersSuccess",
            payload: data
        });
        
        return {
            type: "getAllUsersSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "getAllUsersFail",
            payload: error.response?.data?.message || "Failed to fetch users"
        });
        throw error;
    }
};

export const updateRole = (id, role) => async (dispatch) => {
    try {
        dispatch({
            type: "updateProfileRequest"
        });

        const config = getAuthConfig();
        const { data } = await axios.put(`${server}/user/${id}`, { role }, config);

        dispatch({
            type: "updateProfileSuccess",
            payload: data
        });
        
        return {
            type: "updateProfileSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "updateProfileFail",
            payload: error.response?.data?.message || "Failed to update role"
        });
        throw error;
    }
};

export const deleteUserProfile = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteUserRequest"
        });

        const config = getAuthConfig();
        const { data } = await axios.delete(`${server}/user/${id}`, config);

        dispatch({
            type: "deleteUserSuccess",
            payload: data
        });
        
        return {
            type: "deleteUserSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "deleteUserFail",
            payload: error.response?.data?.message || "Failed to delete user"
        });
        throw error;
    }
};

export const bulkDeleteUsers = (userIds) => async (dispatch) => {
    try {
        dispatch({ type: "bulkDeleteUserRequest" });

        const config = getAuthConfig();
        
        // Make individual delete requests for each user
        const deletePromises = userIds.map(id => 
            axios.delete(`${server}/user/${id}`, config)
        );
        
        await Promise.all(deletePromises);

        dispatch({ 
            type: "bulkDeleteUserSuccess", 
            payload: `Successfully deleted ${userIds.length} users` 
        });
        
        return {
            success: true,
            message: `Successfully deleted ${userIds.length} users`
        };
    } catch (error) {
        dispatch({
            type: "bulkDeleteUserFail",
            payload: error.response?.data?.message || "Failed to delete users",
        });
        throw error;
    }
};






import axios from "axios"
import { server } from "../../store"
import { saveToken, getToken, saveUser, getUser, clearAuth, getAuthHeaders } from '../../utils/authManager'

// Create a custom axios instance with default configurations
const api = axios.create({
    baseURL: server,
    withCredentials: false, // No need for credentials with token-based auth
    headers: {
        "Content-Type": "application/json"
    }
});

// Add a request interceptor to include auth token in every request
api.interceptors.request.use(
    config => {
        // Get token from localStorage
        const token = getToken();
        if (token) {
            // Add token to request headers
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Add a response interceptor to handle auth responses
api.interceptors.response.use(
    response => {
        // Check for JWT token in response
        const token = response.data?.token;
        if (token) {
            // Save token to localStorage
            saveToken(token);
            
            // If response contains user data, save it too
            if (response.data?.user) {
                saveUser(response.data.user);
            }
        }
        
        return response;
    },
    error => {
        // Handle auth errors
        if (error.response?.status === 401) {
            // Clear auth data
            clearAuth();
        }
        
        return Promise.reject(error);
    }
);

export const loadUser = () => async (dispatch) => {
    try {
        // Don't try to load user if there's no auth token
        if (!getToken()) {
            return dispatch({
                type: "loadUserFail",
                payload: "No authentication token",
            });
        }
        
        dispatch({
            type: "loadUserRequest",
        });
        
        // Set a timeout to prevent hanging requests
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Request timeout')), 3000)
        );
        
        // Wrap the API call in a Promise.race to add timeout
        const { data } = await Promise.race([
            api.get(`/user/profile`),
            timeoutPromise
        ]);
        
        // Save user data to localStorage
        if (data.user) {
            saveUser(data.user);
        }

        dispatch({
            type: "loadUserSuccess",
            payload: data,
        });
        
        return data;
    } catch (error) {
        // Clear auth data on profile load failure if unauthorized
        if (error.response?.status === 401) {
            clearAuth();
        }
        
        dispatch({
            type: "loadUserFail",
            payload: error.response?.data?.message || "Authentication failed",
        });
        
        return null;
    }
};

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "loginUserRequest"
        });
        
        const { data } = await api.post(`/user/login`, { email, password });
        
        // Handle JWT token from response
        if (data.token) {
            // Save token to localStorage
            saveToken(data.token);
            
            // Save user data if available
            if (data.user) {
                saveUser(data.user);
            }
        }

        dispatch({
            type: "loginUserSuccess",
            payload: data
        });
        
        return { type: "loginUserSuccess", payload: data };
    } catch (error) {
        dispatch({
            type: "loginUserFail",
            payload: error.response?.data?.message || "Login failed"
        });
        throw error;
    }
};

export const registerUser = (formData) => async (dispatch) => {
    try {
        console.log("Starting registration with formData");
        dispatch({
            type: "registerUserRequest"
        });

        // For multipart/form-data, we need to set the header specifically
        const { data } = await api.post('/user/register', formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        console.log("Registration response:", data);
        
        // Save token and user data if available
        if (data.token) {
            saveToken(data.token);
        }
        
        if (data.user) {
            saveUser(data.user);
        }
        
        dispatch({
            type: "registerUserSuccess",
            payload: data
        });
    } catch (error) {
        console.error("Registration error:", error);
        dispatch({
            type: "registerUserFail",
            payload: error.response?.data?.message || "Registration failed"
        });
    }
};

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({
            type: "forgotPasswordRequest"
        });

        const { data } = await api.post('/forgotpassword', { email });

        dispatch({
            type: "forgotPasswordSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "forgotPasswordFail",
            payload: error.response?.data?.message || "Password reset request failed"
        });
    }
};

export const resetPassword = (newPassword, confirmNewPassword, token) => async (dispatch) => {
    try {
        dispatch({
            type: "resetPasswordRequest"
        });

        const { data } = await api.put(`/password/reset/${token}`, { 
            newPassword, 
            confirmNewPassword 
        });

        dispatch({
            type: "resetPasswordSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "resetPasswordFail",
            payload: error.response?.data?.message || "Password reset failed"
        });
    }
};

export const updateProfile = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "updateProfileRequest"
        });

        // For multipart/form-data, we need to set the header specifically
        const { data } = await api.put('/user/update', formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        // Update user data in localStorage
        if (data.user) {
            saveUser(data.user);
        }

        dispatch({
            type: "updateProfileSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "updateProfileFail",
            payload: error.response?.data?.message || "Profile update failed"
        });
    }
};

export const deleteProfile = () => async (dispatch) => {
    try {
        dispatch({
            type: "deleteProfileRequest"
        });

        const { data } = await api.delete('/user/delete');

        // Clear all auth data
        clearAuth();

        dispatch({
            type: "deleteProfileSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "deleteProfileFail",
            payload: error.response?.data?.message || "Profile deletion failed"
        });
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "logoutUserRequest",
        });

        // Use the custom API instance instead of axios directly
        const { data } = await api.get(`/user/logout`);
        
        // Clear all authentication data
        clearAuth();

        dispatch({
            type: "logoutUserSuccess",
            payload: data,
        });
    } catch (error) {
        // Clear auth data even if logout API fails
        clearAuth();
        
        dispatch({
            type: "logoutUserFail",
            payload: error.response?.data?.message || "Logout failed",
        });
    }
};




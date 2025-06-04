import axios from "axios"
import { server } from "../../store"
import { getAuthToken, saveAuthToken, clearAuthToken } from '../../utils/authManager'

// Create a custom axios instance with default configurations
const api = axios.create({
    baseURL: server,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

// Add a request interceptor to include auth token in every request
api.interceptors.request.use(
    config => {
        const token = getAuthToken();
        if (token) {
            // Add token to request headers
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Add a response interceptor to log all responses and detect auth issues
api.interceptors.response.use(
    response => {
        // Check for successful authentication response
        if (response.config.url.includes('/login') && response.data?.user) {
            // Save token from successful login
            saveAuthToken('user-authenticated');
        }
        
        return response;
    },
    error => {
        // Handle auth errors
        if (error.response?.status === 401) {
            console.warn('Authentication error detected');
            clearAuthToken();
        }
        
        console.error('API Error:', error.response?.status, error.response?.data);
        return Promise.reject(error);
    }
);

export const loadUser = () => async (dispatch) => {
    try {
        // Don't try to load user if there's no auth token
        if (!getAuthToken()) {
            console.log("No auth token found, skipping loadUser");
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
            setTimeout(() => reject(new Error('Request timeout')), 5000)
        );
        
        // Wrap the API call in a Promise.race to add timeout
        const { data } = await Promise.race([
            api.get(`/user/profile`),
            timeoutPromise
        ]);
        
        console.log("Load user successful:", data);

        dispatch({
            type: "loadUserSuccess",
            payload: data,
        });
        
        return data;
    } catch (error) {
        console.error("Load user failed:", error.message);
        
        // Clear auth token on profile load failure
        if (error.response?.status === 401) {
            clearAuthToken();
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

        console.log("Login attempt with:", email);
        
        const { data } = await api.post(`/user/login`, { email, password });
        
        console.log("Login response:", data);
        
        // Save auth token on successful login
        if (data.user) {
            saveAuthToken('user-authenticated');
            
            // Immediately verify login with a separate user load
            try {
                await dispatch(loadUser());
            } catch (loadError) {
                console.warn("User load after login failed:", loadError);
                // Continue anyway since login was successful
            }
        }

        dispatch({
            type: "loginUserSuccess",
            payload: data
        });
        
        return { type: "loginUserSuccess", payload: data };
    } catch (error) {
        console.error("Login error:", error);
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

        dispatch({
            type: "logoutUserSuccess",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "logoutUserFail",
            payload: error.response?.data?.message || "Logout failed",
        });
    }
};




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

export const getBlogDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "getBlogDetailsRequest"
        });

        const config = getAuthConfig();
        const { data } = await axios.get(`${server}/blog/${id}`, config);

        dispatch({
            type: "getBlogDetailsSuccess",
            payload: data
        });
        
        return {
            type: "getBlogDetailsSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "getBlogDetailsFail",
            payload: error.response?.data?.message || "Failed to fetch blog details"
        });
        throw error;
    }
};

export const addBlog = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "addBlogRequest"
        });

        // For multipart/form-data, we need different headers
        const token = getToken();
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                ...(token && { "Authorization": `Bearer ${token}` })
            }
        };
        
        const { data } = await axios.post(
            `${server}/blog/create`,
            formData,
            config
        );

        dispatch({
            type: "addBlogSuccess",
            payload: data
        });
        
        return {
            type: "addBlogSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "addBlogFail",
            payload: error.response?.data?.message || "Failed to add blog"
        });
        throw error;
    }
};

export const editBlog = (formData, id) => async (dispatch) => {
    try {
        dispatch({
            type: "editBlogRequest"
        });

        // For multipart/form-data, we need different headers
        const token = getToken();
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                ...(token && { "Authorization": `Bearer ${token}` })
            }
        };
        
        const { data } = await axios.put(
            `${server}/blog/${id}`,
            formData,
            config
        );

        dispatch({
            type: "editBlogSuccess",
            payload: data
        });
        
        return {
            type: "editBlogSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "editBlogFail",
            payload: error.response?.data?.message || "Failed to edit blog"
        });
        throw error;
    }
};

export const deleteBlog = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteBlogRequest"
        });

        const config = getAuthConfig();
        const { data } = await axios.delete(
            `${server}/blog/delete/${id}`,
            config
        );

        dispatch({
            type: "deleteBlogSuccess",
            payload: data
        });
        
        return {
            type: "deleteBlogSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "deleteBlogFail",
            payload: error.response?.data?.message || "Failed to delete blog"
        });
        throw error;
    }
};

export const getAllBlogs = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllBlogsRequest"
        });

        const config = getAuthConfig();
        const { data } = await axios.get(`${server}/blogs/all`, config);

        dispatch({
            type: "getAllBlogsSuccess",
            payload: data
        });
        
        return {
            type: "getAllBlogsSuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "getAllBlogsFail",
            payload: error.response?.data?.message || "Failed to fetch blogs"
        });
        throw error;
    }
};

export const bulkDeleteBlogs = (blogIds) => async (dispatch) => {
    try {
        dispatch({ type: "bulkDeleteBlogRequest" });

        const config = getAuthConfig();
        
        // Make individual delete requests for each blog
        const deletePromises = blogIds.map(id => 
            axios.delete(`${server}/blog/delete/${id}`, config)
        );
        
        await Promise.all(deletePromises);

        dispatch({ 
            type: "bulkDeleteBlogSuccess", 
            payload: `Successfully deleted ${blogIds.length} blogs` 
        });
        
        return {
            success: true,
            message: `Successfully deleted ${blogIds.length} blogs`
        };
    } catch (error) {
        dispatch({
            type: "bulkDeleteBlogFail",
            payload: error.response?.data?.message || "Failed to delete blogs",
        });
        throw error;
    }
};


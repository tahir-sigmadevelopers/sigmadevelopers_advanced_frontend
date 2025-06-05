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

export const addCategory = (category) => async (dispatch) => {
    try {
        dispatch({
            type: "addCategoryRequest"
        });

        const config = getAuthConfig();
        const { data } = await axios.post(
            `${server}/category/create`,
            { category },
            config
        );

        dispatch({
            type: "addCategorySuccess",
            payload: data
        });
        
        return {
            type: "addCategorySuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "addCategoryFail",
            payload: error.response?.data?.message || "Failed to add category"
        });
        throw error;
    }
};

export const editCategory = (category, id) => async (dispatch) => {
    try {
        dispatch({
            type: "editCategoryRequest"
        });

        const config = getAuthConfig();
        const { data } = await axios.put(
            `${server}/category/${id}`,
            { category },
            config
        );

        dispatch({
            type: "editCategorySuccess",
            payload: data
        });
        
        return {
            type: "editCategorySuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "editCategoryFail",
            payload: error.response?.data?.message || "Failed to edit category"
        });
        throw error;
    }
};

export const getCategoryDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "getCategoryRequest"
        });

        const config = getAuthConfig();
        const { data } = await axios.get(
            `${server}/category/${id}`,
            config
        );

        dispatch({
            type: "getCategorySuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "getCategoryFail",
            payload: error.response?.data?.message || "Failed to get category"
        });
    }
};

export const deleteCategory = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteCategoryRequest"
        });

        const config = getAuthConfig();
        const { data } = await axios.delete(
            `${server}/category/${id}`,
            config
        );

        dispatch({
            type: "deleteCategorySuccess",
            payload: data
        });
        
        return {
            type: "deleteCategorySuccess",
            payload: data
        };
    } catch (error) {
        dispatch({
            type: "deleteCategoryFail",
            payload: error.response?.data?.message || "Failed to delete category"
        });
        throw error;
    }
};

export const getAllCategories = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllCategoryRequest"
        });

        const config = getAuthConfig();
        const { data } = await axios.get(`${server}/categories/all`, config);

        dispatch({
            type: "getAllCategorySuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "getAllCategorysFail",
            payload: error.response?.data?.message || "Failed to fetch categories"
        });
    }
};

export const bulkDeleteCategories = (categoryIds) => async (dispatch) => {
    try {
        dispatch({ type: "bulkDeleteCategoryRequest" });

        const config = getAuthConfig();
        
        // Make individual delete requests for each category
        const deletePromises = categoryIds.map(id => 
            axios.delete(`${server}/category/${id}`, config)
        );
        
        await Promise.all(deletePromises);

        dispatch({ 
            type: "bulkDeleteCategorySuccess", 
            payload: `Successfully deleted ${categoryIds.length} categories` 
        });
        
        return {
            success: true,
            message: `Successfully deleted ${categoryIds.length} categories`
        };
    } catch (error) {
        dispatch({
            type: "bulkDeleteCategoryFail",
            payload: error.response?.data?.message || "Failed to delete categories",
        });
        throw error;
    }
};

// For backward compatibility
export const getCategory = getCategoryDetails;


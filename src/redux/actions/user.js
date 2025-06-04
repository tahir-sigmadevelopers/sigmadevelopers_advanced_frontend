import axios from "axios"
import { server } from "../../store"



export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "loadUserRequest",
        });

        const { data } = await axios.get(`${server}/user/profile`, {
            withCredentials: true,
        });

        dispatch({
            type: "loadUserSuccess",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "loadUserFail",
            payload: error.response.data.message,
        });
    }
};


export const loginUser = (email, password) => async (dispatch) => {

    try {

        dispatch({
            type: "loginUserRequest"
        })

        const config = {
            headers: {
                "Content-Type": "Application/json"
            },
            withCredentials: true
        }

        console.log("I am going", email, password);


        const { data } = await axios.post(`${server}/user/login`, { email, password }, config)

        console.log("I am back", data);

        dispatch({
            type: "loginUserSuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "loginUserFail",
            payload: error.response.data.message
        })
    }
}



export const registerUser = (formData) => async (dispatch) => {

    try {

        console.log("I am going to backend", formData);


        dispatch({
            type: "registerUserRequest"
        })

        const config = {

            headers: { "Content-Type": "multipart/form-data" },

            withCredentials: true,
        };





        const { data } = await axios.post(
            `${server}/user/register`,
            formData,
            config
        );


        console.log("I am back", data);
        dispatch({
            type: "registerUserSuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "registerUserFail",
            payload: error.response.data.message
        })
    }
}


export const forgotPassword = (email) => async (dispatch) => {

    try {

        dispatch({
            type: "forgotPasswordRequest"
        })

        const config = {
            headers: {
                "Content-Type": "Application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.post(`${server}/forgotpassword`, { email }, config)


        dispatch({
            type: "forgotPasswordSuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "forgotPasswordFail",
            payload: error.response.data.message
        })
    }
}


export const resetPassword = (newPassword, confirmNewPassword, token) => async (dispatch) => {

    try {

        dispatch({
            type: "resetPasswordRequest"
        })

        const config = {
            headers: {
                "Content-Type": "Application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.put(`${server}/password/reset/${token}`, { newPassword, confirmNewPassword }, config)


        dispatch({
            type: "resetPasswordSuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "resetPasswordFail",
            payload: error.response.data.message
        })
    }
}


export const updateProfile = (formData) => async (dispatch) => {

    try {

        dispatch({
            type: "updateProfileRequest"
        })

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        }

        const { data } = await axios.put(`${server}/user/update`, formData, config)


        dispatch({
            type: "updateProfileSuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "updateProfileFail",
            payload: error.response.data.message
        })
    }
}


export const deleteProfile = () => async (dispatch) => {

    try {

        dispatch({
            type: "deleteProfileRequest"
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.delete(`${server}/user/delete`, config)


        dispatch({
            type: "deleteProfileSuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "deleteProfileFail",
            payload: error.response.data.message
        })
    }
}



export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "logoutUserRequest",
        });

        const { data } = await axios.get(`${server}/user/logout`, {
            withCredentials: true,
        });

        dispatch({
            type: "logoutUserSuccess",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "logoutUserFail",
            payload: error.response.data.message,
        });
    }
};




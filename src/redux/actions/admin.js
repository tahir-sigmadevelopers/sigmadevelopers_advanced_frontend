
import axios from "axios"
import { server } from "../../store"



export const getAllUsers = () => async (dispatch) => {

    try {

        dispatch({
            type: "getAllUsersRequest"
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.get(`${server}/users`, config)


        dispatch({
            type: "getAllUsersSuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "getAllUsersFail",
            payload: error.response.data.message
        })
    }
}




export const updateRole = (id, role) => async (dispatch) => {

    try {

        dispatch({
            type: "updateProfileRequest"
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.put(`${server}/user/${id}`, { role }, config)


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


export const deleteUserProfile = (id) => async (dispatch) => {

    try {

        dispatch({
            type: "deleteUserRequest"
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }

        const { data } = await axios.delete(`${server}/user/${id}`, config)


        dispatch({
            type: "deleteUserSuccess",
            payload: data
        })


    } catch (error) {
        dispatch({
            type: "deleteUserFail",
            payload: error.response.data.message
        })
    }
}






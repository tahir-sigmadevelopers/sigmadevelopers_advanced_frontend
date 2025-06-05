import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import Loader from '../components/Loader'
import { updateRole } from '../redux/actions/admin'
import { useNavigate, useParams } from 'react-router-dom'
import DashboardLayout from './DashboardLayout'

const UpdateRole = () => {
    const [role, setRole] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const dispatch = useDispatch()
    const { loading, message, error } = useSelector(state => state.admin)
    const { darkMode } = useSelector(state => state.theme)
    const navigate = useNavigate()
    const params = useParams()

    const updateRoleSubmit = async(e) => {
        e.preventDefault()
        
        if (!role.trim()) {
            toast.error("Role cannot be empty")
            return
        }

        setIsSubmitting(true)
        try {
            const result = await dispatch(updateRole(params.id, role))
            if (result?.type === "updateProfileSuccess") {
                toast.success(result.payload?.message || "User role updated successfully")
                navigate("/dashboard/users")
            }
        } catch (err) {
            toast.error(err?.message || "Failed to update user role")
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch({ type: "clearError" })
            setIsSubmitting(false)
        }
    }, [error, dispatch])

    return (
        <DashboardLayout title="Update User Role">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 max-w-md mx-auto`}>
                <form onSubmit={updateRoleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="role" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                            Role
                        </label>
                        <input 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)} 
                            type="text" 
                            name="role"
                            required 
                            className={`block w-full rounded-md border-0 py-2 px-3 shadow-sm ring-1 ring-inset 
                                ${darkMode ? 'bg-gray-700 text-white ring-gray-600' : 'bg-white text-gray-900 ring-gray-300'} 
                                focus:ring-2 focus:ring-blue-600`}
                            placeholder="Enter user role (e.g., admin, user)" 
                        />
                        <p className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Common roles: admin, user, editor, moderator
                        </p>
                    </div>

                    <div className="pt-4">
                        {loading || isSubmitting ? (
                            <div className="flex justify-center">
                                <Loader />
                            </div>
                        ) : (
                            <button 
                                type="submit" 
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Update Role
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </DashboardLayout>
    )
}

export default UpdateRole
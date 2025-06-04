import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserDetails, updateUserRole } from '../redux/actions/admin'
import Loader from '../components/Loader'
import DashboardLayout from './DashboardLayout'

const EditUser = () => {
    const [role, setRole] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    
    const { loading, message, error, user } = useSelector(state => state.admin)
    const { darkMode } = useSelector(state => state.theme)

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        await dispatch(updateUserRole(params.id, role))
        
        if (!error) {
            navigate("/dashboard/users")
        }
    }

    useEffect(() => {
        dispatch(getUserDetails(params.id))
        
        if (error) {
            toast.error(error)
            dispatch({ type: "clearError" })
        }
        if (message) {
            toast.success(message)
            dispatch({ type: "clearMessage" })
        }
    }, [error, message, dispatch, params.id])
    
    useEffect(() => {
        if (user) {
            setName(user.name || "")
            setEmail(user.email || "")
            setRole(user.role || "")
        }
    }, [user])

    return (
        <DashboardLayout title="Edit User">
            {loading && !user ? (
                <div className="flex justify-center items-center h-64">
                    <Loader />
                </div>
            ) : (
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 max-w-md mx-auto`}>
                    <div className="mb-6">
                        <div className={`flex items-center justify-center mb-4 bg-${darkMode ? 'gray-700' : 'gray-100'} p-4 rounded-lg`}>
                            <div className="h-20 w-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                                {name ? name.charAt(0).toUpperCase() : "U"}
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-3">
                            <div className={`p-3 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Name</p>
                                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{name}</p>
                            </div>
                            
                            <div className={`p-3 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{email}</p>
                            </div>
                            
                            <div className={`p-3 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Joined At</p>
                                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : "Unknown"}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="role" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                                User Role
                            </label>
                            <select 
                                value={role} 
                                onChange={(e) => setRole(e.target.value)} 
                                required 
                                className={`block w-full rounded-md border-0 py-2 px-3 shadow-sm ring-1 ring-inset 
                                    ${darkMode ? 'bg-gray-700 text-white ring-gray-600' : 'bg-white text-gray-900 ring-gray-300'} 
                                    focus:ring-2 focus:ring-blue-600`}
                            >
                                <option value="">Select a role</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                                <option value="dhola">Super Admin</option>
                            </select>
                        </div>

                        <div className="pt-4">
                            {loading ? (
                                <div className="flex justify-center">
                                    <Loader />
                                </div>
                            ) : (
                                <button 
                                    type="submit" 
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:-translate-y-1"
                                >
                                    Update User Role
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            )}
        </DashboardLayout>
    )
}

export default EditUser 
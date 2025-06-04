import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { editCategory, getCategory } from '../redux/actions/category'
import Loader from '../components/Loader'
import DashboardLayout from './DashboardLayout'

const EditCategory = () => {
    const [categoryName, setCategoryName] = useState("")
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    
    const { loading, message, error, category } = useSelector(state => state.category)
    const { darkMode } = useSelector(state => state.theme)

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!categoryName.trim()) {
            toast.error("Category name cannot be empty")
            return
        }
        
        await dispatch(editCategory(params.id, categoryName))
        
        if (!error) {
            navigate("/dashboard/categories")
        }
    }

    useEffect(() => {
        dispatch(getCategory(params.id))
        
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
        if (category) {
            setCategoryName(category.category || "")
        }
    }, [category])

    return (
        <DashboardLayout title="Edit Category">
            {loading && !category ? (
                <div className="flex justify-center items-center h-64">
                    <Loader />
                </div>
            ) : (
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 max-w-md mx-auto`}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="category" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                                Category Name
                            </label>
                            <input 
                                value={categoryName} 
                                type="text" 
                                name='category' 
                                onChange={(e) => setCategoryName(e.target.value)} 
                                required 
                                className={`block w-full rounded-md border-0 py-2 px-3 shadow-sm ring-1 ring-inset 
                                    ${darkMode ? 'bg-gray-700 text-white ring-gray-600' : 'bg-white text-gray-900 ring-gray-300'} 
                                    focus:ring-2 focus:ring-blue-600`} 
                                placeholder="Enter category name"
                            />
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
                                    Update Category
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            )}
        </DashboardLayout>
    )
}

export default EditCategory

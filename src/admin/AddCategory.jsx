import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addCategory } from '../redux/actions/category'
import Loader from '../components/Loader'
import DashboardLayout from './DashboardLayout'

const AddCategory = () => {
    const [category, setCategory] = useState("")
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const { loading, message, error } = useSelector(state => state.category)
    const { darkMode } = useSelector(state => state.theme)

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!category.trim()) {
            toast.error("Category name cannot be empty")
            return
        }
        
        await dispatch(addCategory(category))
        
        if (!error) {
            setCategory("")
            navigate("/dashboard/categories")
        }
    }

    useEffect(() => {
    if (error) {
            toast.error(error)
            dispatch({ type: "clearError" })
        }
        if (message) {
            toast.success(message)
            dispatch({ type: "clearMessage" })
        }
    }, [error, message, dispatch])

  return (
        <DashboardLayout title="Add Category">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 max-w-md mx-auto`}>
                <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                        <label htmlFor="category" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                            Category Name
              </label>
                <input
                  value={category}
                  type="text"
                            name='category' 
                  onChange={(e) => setCategory(e.target.value)}
                  required
                            className={`block w-full rounded-md border-0 py-2 px-3 shadow-sm ring-1 ring-inset 
                                ${darkMode ? 'bg-gray-700 text-white ring-gray-600' : 'bg-white text-gray-900 ring-gray-300'} 
                                focus:ring-2 focus:ring-blue-600`} 
                            placeholder="Enter category name"
                />
                        <p className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            This category will be available for both projects and blogs
                        </p>
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
                                Create Category
                </button>
              )}
            </div>
          </form>
        </div>
        </DashboardLayout>
    )
}

export default AddCategory

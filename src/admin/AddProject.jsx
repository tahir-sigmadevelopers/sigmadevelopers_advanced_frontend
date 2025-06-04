import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import { addProject } from '../redux/actions/project'
import DashboardLayout from './DashboardLayout'
import { CloudUpload } from '@mui/icons-material'

const AddProject = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [link, setLink] = useState("")
    const [image, setImage] = useState("/logo.webp")
    const [isDragging, setIsDragging] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, message, error } = useSelector(state => state.project)
    const { darkMode } = useSelector(state => state.theme)

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImage(reader.result)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        
        const file = e.dataTransfer.files[0]
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImage(reader.result)
                }
            }
            reader.readAsDataURL(file)
        } else {
            toast.error("Please upload an image file")
        }
    }

    const addProjectSubmit = async (e) => {
        e.preventDefault()

        const data = new FormData();
        data.set("title", title)
        data.set("description", description)
        data.set("category", category)
        data.set("link", link)
        data.set("image", image)

        await dispatch(addProject(data));

        if (!error) {
        setTitle("")
        setDescription("")
        setCategory("")
        setLink("")
        setImage("")
        navigate("/dashboard/projects")
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
        <DashboardLayout title="Add Project">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 max-w-xl mx-auto`}>
                <form onSubmit={addProjectSubmit} className="space-y-4" encType="multipart/form-data">
                    <div>
                        <label htmlFor="title" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                            Project Title
                        </label>
                        <input 
                            value={title} 
                            type="text" 
                            name='title' 
                            onChange={(e) => setTitle(e.target.value)} 
                            required 
                            className={`block w-full rounded-md border-0 py-2 px-3 shadow-sm ring-1 ring-inset 
                                ${darkMode ? 'bg-gray-700 text-white ring-gray-600' : 'bg-white text-gray-900 ring-gray-300'} 
                                focus:ring-2 focus:ring-blue-600`} 
                            placeholder="Enter project title"
                        />
                </div>

                        <div>
                        <label htmlFor="description" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                            Description
                        </label>
                        <textarea 
                            value={description} 
                            name='description' 
                            onChange={(e) => setDescription(e.target.value)} 
                            required 
                            rows="4"
                            className={`block w-full rounded-md border-0 py-2 px-3 shadow-sm ring-1 ring-inset 
                                ${darkMode ? 'bg-gray-700 text-white ring-gray-600' : 'bg-white text-gray-900 ring-gray-300'} 
                                focus:ring-2 focus:ring-blue-600`}
                            placeholder="Enter project description" 
                        />
                        </div>

                        <div>
                        <label htmlFor="category" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                            Category
                        </label>
                        <input 
                            value={category} 
                            name='category' 
                            onChange={(e) => setCategory(e.target.value)} 
                            type="text" 
                            required 
                            className={`block w-full rounded-md border-0 py-2 px-3 shadow-sm ring-1 ring-inset 
                                ${darkMode ? 'bg-gray-700 text-white ring-gray-600' : 'bg-white text-gray-900 ring-gray-300'} 
                                focus:ring-2 focus:ring-blue-600`}
                            placeholder="Enter project category" 
                        />
                            </div>

                        <div>
                        <label htmlFor="link" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                            Project URL
                        </label>
                        <input 
                            value={link} 
                            onChange={(e) => setLink(e.target.value)} 
                            type="url" 
                            name='link' 
                            required 
                            className={`block w-full rounded-md border-0 py-2 px-3 shadow-sm ring-1 ring-inset 
                                ${darkMode ? 'bg-gray-700 text-white ring-gray-600' : 'bg-white text-gray-900 ring-gray-300'} 
                                focus:ring-2 focus:ring-blue-600`}
                            placeholder="https://example.com" 
                        />
                        </div>

                        <div>
                        <label htmlFor="image" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                            Project Image
                        </label>
                        <div className="mt-1 flex flex-col gap-4">
                            <div 
                                className={`relative group rounded-lg overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-2 border-dashed ${isDragging ? 'border-blue-500' : darkMode ? 'border-gray-600' : 'border-gray-300'} transition-all duration-200`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <div className="flex flex-col items-center justify-center p-4 h-52">
                                    <div className={`mb-4 ${image !== '/logo.webp' ? 'h-full w-full' : 'h-20 w-20'}`}>
                                        {image === '/logo.webp' ? (
                                            <CloudUpload className={`h-full w-full ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                        ) : (
                                            <img 
                                                src={image} 
                                                alt="Project preview" 
                                                className="h-full w-full object-contain" 
                                            />
                                        )}
                        </div>

                                    {image === '/logo.webp' && (
                                        <div className="text-center">
                                            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                Drag & drop your image here, or click to browse
                                            </p>
                                            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                Supports JPG, PNG, GIF up to 5MB
                                            </p>
                                        </div>
                                    )}

                                <input
                                        id="image-upload"
                                    name="image"
                                    accept="image/*"
                                    required
                                        onChange={handleImageChange}
                                    type="file"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </div>
                                
                                {image !== '/logo.webp' && (
                                    <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                                        <p className="text-white text-sm font-medium">Click to change image</p>
                                    </div>
                                )}
                            </div>
                            </div>
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
                                Create Project
                            </button>
                        )}
                        </div>
                    </form>
            </div>
        </DashboardLayout>
    )
}

export default AddProject
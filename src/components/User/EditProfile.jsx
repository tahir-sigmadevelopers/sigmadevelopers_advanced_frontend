import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, updateProfile } from '../../redux/actions/user'
import Loader from '../Loader'
import { useNavigate } from 'react-router-dom'
import { AccountCircle, Email, Lock, CloudUpload, ArrowBack } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const EditProfile = () => {
    const dispatch = useDispatch()
    const { loading, user } = useSelector(state => state.user)
    const { darkMode } = useSelector((state) => state.theme)
    
    const [name, setName] = useState(user?.name || '')
    const [email, setEmail] = useState(user?.email || '')
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")
    const [previewImage, setPreviewImage] = useState(user?.picture || "")
    const [isDragging, setIsDragging] = useState(false)
    
    const navigate = useNavigate()

    // Validation functions
    const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isNameValid = (name) => {
        // Check if the name is between 3 and 15 characters
        if (name.length < 3 || name.length > 15) {
            return false;
        }

        // Check if the name contains only alphabetic characters and spaces
        return /^[a-zA-Z\s]+$/.test(name);
    };

    const isImageValid = (file) => {
        // Check if the file is not null
        if (!file) {
            toast.error('Please Select an Image.');
            return false;
        }

        // Check if the file type is an image
        if (!file.type.startsWith('image/')) {
            toast.error('Please Select a Valid Image file.');
            return false;
        }

        // Check if the file size is within limits (adjust as needed)
        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSizeInBytes) {
            toast.error('Image size exceeds the maximum allowed (5MB).');
            return false;
        }

        return true;
    };

    // Handle image change from file input
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        processImageFile(file);
    };

    // Process image file whether from drag-drop or file input
    const processImageFile = (file) => {
        if (isImageValid(file)) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImage(reader.result);
                    setPreviewImage(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Drag and drop handlers
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            processImageFile(file);
        }
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isNameValid(name)) {
            toast.error('Name must be 3-15 characters long and contain only letters and spaces');
            return;
        }

        if (!isEmailValid(email)) {
            toast.error('Invalid email format');
            return;
        }

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        
        if (password) {
            formData.set("password", password);
        }
        
        if (image) {
            formData.set("image", image);
        }

        await dispatch(updateProfile(formData));
        navigate("/profile");
    };

    // Load user data
    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    // Update form when user data changes
    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setPreviewImage(user.picture || '');
        }
    }, [user]);

    return (
        <div className={`container mx-auto px-4 py-24 max-w-4xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            <div className={`rounded-xl shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 md:p-8`}>
                <div className="flex items-center mb-6">
                    <Link to="/profile" className={`mr-4 p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-200`}>
                        <ArrowBack />
                    </Link>
                    <h1 className="text-2xl font-bold">Edit Profile</h1>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Image Upload Section */}
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium mb-2">Profile Picture</label>
                            <div 
                                className={`
                                    relative rounded-lg overflow-hidden border-2 border-dashed 
                                    ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'}
                                    transition-all duration-200 h-64
                                `}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                                    {previewImage ? (
                                        <div className="relative w-full h-full">
                                            <img 
                                                src={previewImage} 
                                                alt="Profile Preview" 
                                                className="w-full h-full object-cover rounded-md" 
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                                <p className="text-white text-sm">Click or drag to change</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <CloudUpload className={`h-12 w-12 mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                                                Drag & drop your image here
                                            </p>
                                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                or click to browse
                                            </p>
                                        </>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                            <p className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Maximum file size: 5MB. Supports: JPG, PNG, GIF
                            </p>
                        </div>
                        
                        {/* Form Fields */}
                        <div className="md:col-span-2 space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    Full Name
                                </label>
                                <div className={`relative rounded-md shadow-sm`}>
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <AccountCircle className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className={`
                                            block w-full pl-10 pr-3 py-3 rounded-md 
                                            ${darkMode 
                                                ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500' 
                                                : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
                                            }
                                            border focus:ring-blue-500 focus:ring-1 outline-none
                                        `}
                                        placeholder="Your full name"
                                    />
                                </div>
                                <p className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    3-15 characters, letters and spaces only
                                </p>
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Email Address
                                </label>
                                <div className={`relative rounded-md shadow-sm`}>
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Email className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`
                                            block w-full pl-10 pr-3 py-3 rounded-md 
                                            ${darkMode 
                                                ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500' 
                                                : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
                                            }
                                            border focus:ring-blue-500 focus:ring-1 outline-none
                                        `}
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium mb-2">
                                    New Password <span className="text-xs text-gray-500">(leave blank to keep current)</span>
                                </label>
                                <div className={`relative rounded-md shadow-sm`}>
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`
                                            block w-full pl-10 pr-3 py-3 rounded-md 
                                            ${darkMode 
                                                ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500' 
                                                : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
                                            }
                                            border focus:ring-blue-500 focus:ring-1 outline-none
                                        `}
                                        placeholder="••••••••"
                                    />
                                </div>
                                <p className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    For a strong password, use a mix of letters, numbers, and symbols
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-end mt-8">
                        <Link
                            to="/profile"
                            className={`
                                px-5 py-2.5 rounded-lg mr-3 font-medium
                                ${darkMode 
                                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }
                                transition-colors duration-200
                            `}
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className={`
                                px-5 py-2.5 rounded-lg font-medium flex items-center
                                ${loading ? 'opacity-75 cursor-not-allowed' : ''}
                                bg-blue-600 text-white hover:bg-blue-700
                                transition-colors duration-200
                            `}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Updating...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;




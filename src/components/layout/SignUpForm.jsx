import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../redux/actions/user'
import Loader from '../Loader'

const SignUpForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isNameValid = (name) => {
        // Check if the name is between 3 and 15 characters
        if (name.length < 3 || name.length > 15) {
            return false;
        }

        // Check if the name contains only alphabetic characters and spaces
        return /^[a-zA-Z\s]+$/.test(name);
    };

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const { loading, message, error, isAuthenticated } = useSelector(state => state.user)

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

    const imageUploadChange = (e) => {
        if (e.target.name === "image") {
            const selectedImage = e.target.files[0];

            if (isImageValid(selectedImage)) {
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setImage(reader.result);
                    }
                };

                reader.readAsDataURL(selectedImage);
            }
        }
    };
    
    const registerFormSubmit = async (e) => {
        e.preventDefault();
    
        if (!isNameValid(name)) {
            toast.error('Name Must Be 3-15 Characters Long');
            return;
        }
    
        if (!isEmailValid(email)) {
            toast.error('Invalid Email Format');
            return;
        }
    
        const data = new FormData();
        data.set("name", name);
        data.set("email", email);
        data.set("password", password);
        data.set("image", image);
    
        try {
            await dispatch(registerUser(data));
    
            // Only clear fields if registration is successful
            setName("");
            setEmail("");
            setPassword("");
            setImage("");
        } catch (error) {
            console.error("Registration failed:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    const { darkMode } = useSelector((state) => state.theme);

    useEffect(() => {
        if (message) {
            toast.success(message)
            dispatch({ type: "clearMessage" })
        }
        if (error) {
            toast.error(error)
            dispatch({ type: "clearError" })
        }
        if (isAuthenticated) {
            return navigate("/profile")
        }
    }, [message, error, dispatch, isAuthenticated])
    
    return (
        <div className={`flex min-h-full flex-col justify-center px-6 py-8 lg:px-8 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <img className="h-28 w-auto rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300" 
                        src="/logo.webp" alt="Sigma Developers Programmer" />
                </div>
                <h2 className={`mt-6 text-center text-3xl font-extrabold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Create an Account
                </h2>
                <p className={`mt-2 text-center text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Join our developer community
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className={`${darkMode ? "bg-gray-800" : "bg-white"} py-8 px-6 shadow-xl rounded-lg sm:px-10`}>
                    <form onSubmit={registerFormSubmit} className="space-y-4" encType="multipart/form-data">
                        <div>
                            <label htmlFor="name" className={`block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                                Full Name
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className={`h-5 w-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input 
                                    value={name} 
                                    type="text" 
                                    name='name' 
                                    onChange={(e) => setName(e.target.value)} 
                                    autoComplete="name" 
                                    required 
                                    className={`pl-10 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${darkMode ? "ring-gray-600 bg-gray-700 text-white" : "ring-gray-300"} focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm`} 
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                                Email address
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className={`h-5 w-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                                <input 
                                    value={email} 
                                    name='email' 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    type="email" 
                                    autoComplete="email" 
                                    required 
                                    className={`pl-10 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${darkMode ? "ring-gray-600 bg-gray-700 text-white" : "ring-gray-300"} focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm`} 
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                                Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className={`h-5 w-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    type={showPassword ? "text" : "password"} 
                                    name='password' 
                                    autoComplete="new-password" 
                                    required 
                                    className={`pl-10 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${darkMode ? "ring-gray-600 bg-gray-700 text-white" : "ring-gray-300"} focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm`} 
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="image" className={`block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                                Profile Image
                            </label>
                            <div className="mt-1">
                                <div className={`flex items-center justify-center w-full`}>
                                    <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${darkMode ? "border-gray-600 bg-gray-700 hover:bg-gray-600" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}`}>
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            {image ? (
                                                <div className="flex flex-col items-center">
                                                    <img src={image} alt="Preview" className="w-16 h-16 mb-2 rounded-full object-cover" />
                                                    <p className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-500"}`}>Click to change</p>
                                                </div>
                                            ) : (
                                                <>
                                                    <svg className={`w-8 h-8 mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                    </svg>
                                                    <p className={`mb-1 text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>PNG, JPG or JPEG (MAX. 5MB)</p>
                                                </>
                                            )}
                                        </div>
                                        <input 
                                            name="image"
                                            accept="image/*"
                                            required
                                            onChange={imageUploadChange}
                                            className="hidden"
                                            type="file"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            {loading ? (
                                <div className="flex justify-center">
                                    <Loader />
                                </div>
                            ) : (
                                <button 
                                    type="submit" 
                                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${darkMode 
                                        ? "bg-blue-600 hover:bg-blue-700 text-white" 
                                        : "bg-blue-600 hover:bg-blue-700 text-white"} 
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                                >
                                    Sign Up
                                </button>
                            )}
                        </div>
                    </form>

                    <p className="mt-6 text-center text-sm">
                        Already have an account?{' '}
                        <Link to={"/login"} className={`font-medium ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"}`}>
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm
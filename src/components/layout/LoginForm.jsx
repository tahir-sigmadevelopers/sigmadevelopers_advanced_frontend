import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser, loadUser } from '../../redux/actions/user'
import { toast } from 'react-hot-toast'
import Loader from '../Loader'
import { debugCookies } from '../../utils/cookieDebugger'
import { saveAuthToken, isAuthenticated } from '../../utils/authManager'

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loginSuccess, setLoginSuccess] = useState(false)

    const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const navigate = useNavigate()
    const { loading, message, error, isAuthenticated: reduxIsAuthenticated } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const { darkMode } = useSelector((state) => state.theme);

    // Do NOT automatically redirect on component mount
    // This prevents the redirect loop between login and profile

    const formSubmit = async (e) => {
        e.preventDefault();

        if (!isEmailValid(email)) {
            toast.error('Invalid Email Format');
            return;
        }

        try {
            const result = await dispatch(loginUser(email, password));
            
            // Check for login success and manually save token if needed
            if (result?.type === 'loginUserSuccess' && result?.payload?.user) {
                console.log('Login success detected, saving token');
                
                // Save token after successful login
                saveAuthToken('authenticated-user');
                
                // Clear fields on success
            setEmail("");
            setPassword("");
                
                // Set login success flag to trigger navigation after message is shown
                setLoginSuccess(true);
            }
            
        } catch (error) {
            console.error("Login failed:", error);
            toast.error(error.message || "Something went wrong. Please try again.");
        }
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" });
        }
        
        if (message) {
            toast.success(message);
            dispatch({ type: "clearMessage" });
            
            // Only navigate to profile if login was successful
            if (loginSuccess) {
                console.log("Login successful, navigating to profile");
                setTimeout(() => {
                    navigate("/profile");
                }, 1000);
            }
        }
    }, [message, error, dispatch, navigate, loginSuccess]);
    
    return (
        <div className={`flex max-h-screen min-h-full flex-col justify-center px-6 py-12 lg:px-8 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <img className="h-28 w-auto rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300" 
                        src="/logo.webp" alt="Sigma Developers Programmer" />
                </div>
                <h2 className={`mt-6 text-center text-3xl font-extrabold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Welcome Back
                </h2>
                <p className={`mt-2 text-center text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Sign in to your account
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className={`${darkMode ? "bg-gray-800" : "bg-white"} py-8 px-6 shadow-xl rounded-lg sm:px-10`}>
                    <form className="space-y-6" onSubmit={formSubmit}>
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
                        <div className="flex items-center justify-between">
                                <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                                    Password
                                </label>
                            <div className="text-sm">
                                    <Link to={"/forgotpassword"} className={`font-medium ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"}`}>
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className={`h-5 w-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input 
                                    placeholder="Enter your password"
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    type={showPassword ? "text" : "password"} 
                                    autoComplete="password" 
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
                        {
                                loading ? <div className="flex justify-center"><Loader /></div> : 
                                <button type="submit" className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${darkMode 
                                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                                    : "bg-blue-600 hover:bg-blue-700 text-white"} 
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}>
                                    Sign in
                                </button>
                        }
                    </div>
                </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className={`w-full border-t ${darkMode ? "border-gray-600" : "border-gray-300"}`}></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className={`px-2 ${darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-500"}`}>
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <div>
                                <a href="#" className={`w-full inline-flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium ${darkMode 
                                    ? "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600" 
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>
                            </div>

                            <div>
                                <a href="#" className={`w-full inline-flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium ${darkMode 
                                    ? "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600" 
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <p className="mt-6 text-center text-sm">
                        Not a member yet?{' '}
                        <Link to={"/register"} className={`font-medium ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"}`}>
                            Sign up now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
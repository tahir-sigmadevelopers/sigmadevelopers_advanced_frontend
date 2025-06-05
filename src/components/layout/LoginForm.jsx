import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { loginUser } from '../../redux/actions/user'
import { toast } from 'react-hot-toast'
import Loader from '../Loader'
import { isAuthenticated, saveToken, saveUser, getToken } from '../../utils/authManager'

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const navigate = useNavigate()
    const location = useLocation()
    const { loading, message, error, isAuthenticated: reduxIsAuthenticated } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const { darkMode } = useSelector((state) => state.theme);

    // Get the return URL from location state or default to profile
    const from = location.state?.from || '/profile'

    // Check if user is already authenticated on component mount
    useEffect(() => {
        // Check if token exists
        const token = getToken();
        if (token || reduxIsAuthenticated) {
            navigate(from);
        }
    }, [navigate, reduxIsAuthenticated, from]);

    const formSubmit = async (e) => {
        e.preventDefault();

        if (!isEmailValid(email)) {
            toast.error('Invalid Email Format');
            return;
        }

        try {
            const result = await dispatch(loginUser(email, password));
            
            // Check for login success and JWT token
            if (result?.payload?.token) {
                const token = result.payload.token;
                
                // Save token to localStorage
                saveToken(token);
                
                // Save user data if available
                if (result.payload.user) {
                    saveUser(result.payload.user);
                }
                
                // Clear fields on success
                setEmail("");
                setPassword("");
                
                // Show success message
                toast.success(result.payload.message || "Login successful");
                
                // Navigate immediately to avoid auth issues
                navigate(from);
            } else {
                toast.error("Authentication failed - no token received");
            }
            
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" });
        }
        
        // We'll handle the success message directly in the formSubmit function
        if (message) {
            dispatch({ type: "clearMessage" });
        }
    }, [message, error, dispatch]);
    
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className={`w-full max-w-md p-8 space-y-8 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
                <div className="text-center">
                    <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Welcome Back</h1>
                    <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Sign in to access your account
                    </p>
            </div>

                <form onSubmit={formSubmit} className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Email
                            </label>
                        <div className="mt-1">
                                <input 
                                id="email"
                                name="email"
                                    type="email" 
                                    autoComplete="email" 
                                    required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'
                                }`}
                                placeholder="Enter your email"
                                />
                            </div>
                    </div>

                    <div>
                        <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Password
                                </label>
                        <div className="mt-1 relative">
                                <input 
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'
                                }`}
                                placeholder="Enter your password"
                            />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                className={`absolute inset-y-0 right-0 pr-3 flex items-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                    >
                                        {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                            </svg>
                                        )}
                                    </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                                    darkMode ? 'bg-gray-700 border-gray-600' : ''
                                }`}
                            />
                            <label htmlFor="remember-me" className={`ml-2 block text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link to="/forgotpassword" className="font-medium text-blue-600 hover:text-blue-500">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                loading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {loading ? <Loader size="small" /> : 'Sign in'}
                        </button>
                    </div>

                    <div className="text-center">
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Don't have an account?{' '}
                            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                                Sign up
                        </Link>
                    </p>
                </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Home, ArrowBack, SentimentDissatisfied } from '@mui/icons-material'

const PageNotFound = () => {
    const { darkMode } = useSelector(state => state.theme)

    return (
        <div className={`flex items-center justify-center min-h-[80vh] px-6 py-12 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            <div className="w-full max-w-md mx-auto text-center">
                {/* 404 with animation */}
                <div className="relative">
                    <h1 className={`text-9xl font-extrabold tracking-widest opacity-10 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center animate-bounce">
                        <SentimentDissatisfied className="w-24 h-24 text-blue-500" />
                    </div>
                </div>
                
                <h2 className="mt-8 text-3xl font-bold tracking-tight">Page Not Found</h2>
                
                <p className={`mt-4 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Sorry, we couldn't find the page you're looking for.
                </p>
                
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link 
                        to="/"
                        className={`
                            flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white 
                            bg-blue-600 hover:bg-blue-700 transition-all transform hover:scale-105
                            shadow-lg
                        `}
                    >
                        <Home className="w-5 h-5" />
                        Back to Home
                    </Link>
                    
                    <button 
                        onClick={() => window.history.back()} 
                        className={`
                            flex items-center gap-2 px-6 py-3 rounded-lg font-medium
                            ${darkMode 
                                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
                            transition-all transform hover:scale-105
                            shadow-md
                        `}
                    >
                        <ArrowBack className="w-5 h-5" />
                        Go Back
                    </button>
                </div>
                
                <div className={`mt-12 p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} shadow-md`}>
                    <h3 className="text-lg font-semibold mb-2">You might want to check:</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/projects" className="text-blue-500 hover:underline">Projects</Link>
                        </li>
                        <li>
                            <Link to="/blogs" className="text-blue-500 hover:underline">Blogs</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="text-blue-500 hover:underline">Contact</Link>
                        </li>
                        <li>
                            <Link to="/services" className="text-blue-500 hover:underline">Services</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound
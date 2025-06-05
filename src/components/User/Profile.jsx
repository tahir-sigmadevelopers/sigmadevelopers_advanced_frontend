import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DeleteProfile from './DeleteProfileModal'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { loadUser } from '../../redux/actions/user'
import { 
  Email, 
  Edit, 
  DeleteOutline, 
  CalendarToday, 
  Lock, 
  VerifiedUser, 
  Schedule 
} from '@mui/icons-material'

const Profile = () => {
    const { user, isAuthenticated, loading } = useSelector(state => state.user)
    const { darkMode } = useSelector(state => state.theme)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [activeTab, setActiveTab] = useState('profile')

    useEffect(() => {
        dispatch(loadUser())
        
        // Use a timeout to ensure we've given enough time for the user state to update
        const timeout = setTimeout(() => {
            if (!isAuthenticated) {
                navigate("/login")
            }
        }, 1000) // Wait 1 second before checking authentication
        
        return () => clearTimeout(timeout)
    }, [isAuthenticated, navigate, dispatch])

    const handleDelete = () => {
        setIsOpen(!isOpen)
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (!user) {
        return null; // Don't render anything if user isn't loaded yet
    }

    return (
        <div className={`container mx-auto px-4 py-24 max-w-5xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            <div className={`rounded-xl shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                {/* Profile Header */}
                <div className="relative">
                    {/* Cover Image */}
                    <div className="h-48 w-full overflow-hidden">
                        <img 
                            className="object-cover object-center w-full" 
                            src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' 
                            alt="Profile Cover" 
                        />
                    </div>
                    
                    {/* Profile Actions - Absolute positioned on top of cover */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                        <Link 
                            to="/editprofile" 
                            className="bg-white/30 hover:bg-white/50 backdrop-blur-md text-white p-2 rounded-full transition-all duration-200 shadow-lg"
                        >
                            <Edit className="h-5 w-5" />
                        </Link>
                    </div>
                    
                    {/* Profile Picture */}
                    <div className="absolute -bottom-16 left-6 md:left-10">
                        <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden shadow-lg transform transition-transform hover:scale-105">
                            <img 
                                className="object-cover object-center h-full w-full" 
                                src={user?.picture || '/avatar-placeholder.png'} 
                                alt={`${user?.name}'s profile`} 
                            />
                        </div>
                    </div>
                </div>
                
                {/* Profile Info */}
                <div className="pt-20 pb-6 px-6 md:px-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">{user?.name}</h1>
                            <div className="flex items-center mt-1">
                                <Email className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <p className="ml-2 text-gray-600 dark:text-gray-300">{user?.email}</p>
                            </div>
                            <div className="flex items-center mt-1">
                                <CalendarToday className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                    Joined on {formatDate(user?.joinedAt)}
                                </p>
                            </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0 flex space-x-3">
                            <button 
                                onClick={handleDelete}
                                className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                <DeleteOutline className="h-5 w-5 mr-1" />
                                <span>Delete Account</span>
                            </button>
                        </div>
                    </div>
                    
                    {/* Tabs */}
                    <div className="mt-8 border-b border-gray-200 dark:border-gray-700">
                        <nav className="flex space-x-8">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'profile'
                                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                }`}
                            >
                                Profile
                            </button>
                            <button
                                onClick={() => setActiveTab('security')}
                                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'security'
                                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                }`}
                            >
                                Security
                            </button>
                            <button
                                onClick={() => setActiveTab('activity')}
                                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'activity'
                                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                }`}
                            >
                                Activity
                            </button>
                        </nav>
                    </div>
                    
                    {/* Tab Content */}
                    <div className="mt-6">
                        {activeTab === 'profile' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <h3 className="font-medium mb-2">Personal Information</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                                            <p className="font-medium">{user?.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                                            <p className="font-medium">{user?.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                                            <p className="font-medium">{formatDate(user?.joinedAt)}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <h3 className="font-medium mb-2">Account Settings</h3>
                                    <div className="space-y-4">
                                        <Link 
                                            to="/editprofile" 
                                            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                                        >
                                            <div className="flex items-center">
                                                <Edit className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                <span className="ml-3">Edit Profile</span>
                                            </div>
                                            <span>&rarr;</span>
                                        </Link>
                                        
                                        <button 
                                            onClick={handleDelete} 
                                            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-left transition-colors duration-200"
                                        >
                                            <div className="flex items-center">
                                                <DeleteOutline className="h-5 w-5 text-red-500" />
                                                <span className="ml-3 text-red-500">Delete Account</span>
                                            </div>
                                            <span>&rarr;</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'security' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-medium">Security Settings</h3>
                                        <Link 
                                            to="/editprofile" 
                                            className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            Change Password
                                        </Link>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                                            <Lock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                            <div className="ml-3">
                                                <p className="font-medium">Password</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Last changed: Unknown</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                                            <VerifiedUser className="h-5 w-5 text-green-500" />
                                            <div className="ml-3">
                                                <p className="font-medium">Account Status</p>
                                                <p className="text-sm text-green-500">Active</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <h3 className="font-medium mb-4">Security Recommendations</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs mt-0.5 mr-2">✓</span>
                                            <span>Use a strong, unique password</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs mt-0.5 mr-2">✓</span>
                                            <span>Keep your email address up-to-date</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="h-5 w-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs mt-0.5 mr-2">!</span>
                                            <span>Change your password regularly</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'activity' && (
                            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                <h3 className="font-medium mb-4">Recent Activity</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <Schedule className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                                        <div className="ml-3">
                                            <p className="font-medium">Account Created</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(user?.joinedAt)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Schedule className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                                        <div className="ml-3">
                                            <p className="font-medium">Last Login</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Today</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 text-center text-gray-500 dark:text-gray-400">
                                    <p>Your complete activity history is available.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {isOpen && <DeleteProfile onClose={() => setIsOpen(false)} />}
        </div>
    )
}

export default Profile




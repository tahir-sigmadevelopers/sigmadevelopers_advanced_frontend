import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/actions/user';
import { toast } from 'react-hot-toast';
import { toggleTheme } from '../redux/reducers/theme';
import './styles/dashboard.css';
import { 
  Assignment, 
  BorderColor, 
  Category, 
  Chat, 
  Home, 
  Language, 
  Logout, 
  People, 
  Dashboard as DashboardIcon,
  DarkMode,
  LightMode,
  KeyboardArrowDown,
  Settings,
  MenuOpen,
  MenuBook
} from '@mui/icons-material';
import { useAuth0 } from "@auth0/auth0-react";

const Sidebar = () => {
  const { logout } = useAuth0();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode } = useSelector(state => state.theme);
  const { user } = useSelector(state => state.user);
  const [contentExpanded, setContentExpanded] = useState(true);
  const [settingsExpanded, setSettingsExpanded] = useState(false);

  const logoutHandle = async () => {
    try {
      await dispatch(logoutUser());
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
    toast.success(`Switched to ${darkMode ? 'light' : 'dark'} mode`);
  };

  // Define navigation items
  const contentItems = [
    { 
      name: 'Dashboard', 
      icon: <Home className="w-5 h-5" />, 
      path: '/dashboard',
      description: 'Overview and statistics'
    },
    { 
      name: 'Projects', 
      icon: <Assignment className="w-5 h-5" />, 
      path: '/dashboard/projects',
      description: 'Manage your portfolio'
    },
    { 
      name: 'Blogs', 
      icon: <BorderColor className="w-5 h-5" />, 
      path: '/dashboard/blogs',
      description: 'Manage your articles'
    },
  ];

  const settingsItems = [
    { 
      name: 'Categories', 
      icon: <Category className="w-5 h-5" />, 
      path: '/dashboard/categories',
      description: 'Organize content'
    },
    { 
      name: 'Users', 
      icon: <People className="w-5 h-5" />, 
      path: '/dashboard/users',
      description: 'Manage user accounts'
    },
    { 
      name: 'Testimonials', 
      icon: <Chat className="w-5 h-5" />, 
      path: '/dashboard/testimonials',
      description: 'Customer reviews'
    },
  ];

  // Helper to determine if a nav item is active
  const isActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/dashboard';
  };

  return (
    <div className={`
      sidebar-container h-screen w-64 flex flex-col
      ${darkMode ? 'bg-gray-800 text-white dark' : 'bg-white text-gray-800'}
      shadow-lg border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'}
      transition-all duration-300
    `}>
      {/* Sidebar Header */}
      <div className="px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white">
              <DashboardIcon className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">Sigma<span className="text-blue-500">Dev</span></h2>
          </div>
        </div>
      </div>

      {/* User Profile */}
      {user && (
        <div className={`mx-4 p-3 rounded-lg mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium truncate max-w-[140px]">{user.name}</p>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></div>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  Admin
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        <div className="mb-4">
          <button 
            onClick={() => setContentExpanded(!contentExpanded)}
            className={`
              w-full flex items-center justify-between px-3 py-2 text-sm
              ${darkMode ? 'text-gray-300' : 'text-gray-500'} 
              font-semibold uppercase tracking-wider
            `}
          >
            <span>Content</span>
            <KeyboardArrowDown className={`transform transition-transform ${contentExpanded ? 'rotate-180' : ''}`} />
          </button>

          {contentExpanded && (
            <ul className="mt-1 space-y-1">
              {contentItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`
                      sidebar-nav-item relative group flex items-center px-4 py-2.5 rounded-lg transition-all duration-150
                      ${isActive(item.path)
                        ? darkMode 
                          ? 'bg-blue-600/10 text-blue-500' 
                          : 'bg-blue-50 text-blue-700'
                        : darkMode
                          ? 'text-gray-300 hover:bg-gray-700/50' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    {isActive(item.path) && (
                      <span className="sidebar-active-indicator absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full"></span>
                    )}
                    <span className={`
                      ${isActive(item.path) 
                        ? 'text-blue-500' 
                        : darkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-gray-700'
                      }
                    `}>
                      {item.icon}
                    </span>
                    <div className="ml-3 flex flex-col">
                      <span className={`text-sm font-medium ${isActive(item.path) ? 'text-blue-500' : ''}`}>{item.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 hidden group-hover:block">{item.description}</span>
                    </div>
                    {isActive(item.path) && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-blue-500"></span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-4">
          <button 
            onClick={() => setSettingsExpanded(!settingsExpanded)}
            className={`
              w-full flex items-center justify-between px-3 py-2 text-sm
              ${darkMode ? 'text-gray-300' : 'text-gray-500'} 
              font-semibold uppercase tracking-wider
            `}
          >
            <span>Management</span>
            <KeyboardArrowDown className={`transform transition-transform ${settingsExpanded ? 'rotate-180' : ''}`} />
          </button>

          {settingsExpanded && (
            <ul className="mt-1 space-y-1">
              {settingsItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`
                      sidebar-nav-item relative group flex items-center px-4 py-2.5 rounded-lg transition-all duration-150
                      ${isActive(item.path)
                        ? darkMode 
                          ? 'bg-blue-600/10 text-blue-500' 
                          : 'bg-blue-50 text-blue-700'
                        : darkMode
                          ? 'text-gray-300 hover:bg-gray-700/50' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    {isActive(item.path) && (
                      <span className="sidebar-active-indicator absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full"></span>
                    )}
                    <span className={`
                      ${isActive(item.path) 
                        ? 'text-blue-500' 
                        : darkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-gray-700'
                      }
                    `}>
                      {item.icon}
                    </span>
                    <div className="ml-3 flex flex-col">
                      <span className={`text-sm font-medium ${isActive(item.path) ? 'text-blue-500' : ''}`}>{item.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 hidden group-hover:block">{item.description}</span>
                    </div>
                    {isActive(item.path) && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-blue-500"></span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
          <ul className="space-y-1">
            <li>
              <Link
                to="/"
                className={`
                  group flex items-center px-4 py-2.5 rounded-lg
                  ${darkMode
                    ? 'text-gray-300 hover:bg-gray-700/50' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                  transition-all duration-150
                `}
              >
                <Language className={`${darkMode ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-blue-500'} transition-colors duration-150`} />
                <span className="ml-3 group-hover:text-blue-500 transition-colors duration-150">Visit Website</span>
              </Link>
            </li>
            <li>
              <button
                onClick={handleThemeToggle}
                className={`
                  w-full group flex items-center px-4 py-2.5 rounded-lg
                  ${darkMode
                    ? 'text-gray-300 hover:bg-gray-700/50' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                  transition-all duration-150
                `}
              >
                {darkMode 
                  ? <LightMode className="text-yellow-400" />
                  : <DarkMode className="text-gray-500 group-hover:text-yellow-500 transition-colors duration-150" />
                }
                <span className={`ml-3 ${darkMode ? '' : 'group-hover:text-yellow-500'} transition-colors duration-150`}>
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={logoutHandle}
                className={`
                  w-full group flex items-center px-4 py-2.5 rounded-lg
                  ${darkMode
                    ? 'text-gray-300 hover:bg-red-900/20' 
                    : 'text-gray-700 hover:bg-red-50'
                  }
                  transition-all duration-150
                `}
              >
                <Logout className={`${darkMode ? 'text-gray-400 group-hover:text-red-400' : 'text-gray-500 group-hover:text-red-500'} transition-colors duration-150`} />
                <span className={`ml-3 ${darkMode ? 'group-hover:text-red-400' : 'group-hover:text-red-500'} transition-colors duration-150`}>Logout</span>
              </button>
            </li>
          </ul>
          <div className="mt-8 mb-4 px-4">
            <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'} text-center`}>
              <p>Sigma Developers v1.0.0</p>
              <p className="mt-1">© {new Date().getFullYear()} All Rights Reserved</p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
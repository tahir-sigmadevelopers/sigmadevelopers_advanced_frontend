import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { Menu, Close, Add, Notifications, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import './styles/dashboard.css';

const DashboardLayout = ({ 
  children, 
  title, 
  addButton = null, 
  addButtonLink = null, 
  addButtonText = "Add New"
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(3); // Mock notification count
  const { darkMode } = useSelector(state => state.theme);

  // Automatically close sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      {/* Mobile menu button */}
      <div className={`fixed top-4 ${sidebarOpen ? 'left-64' : 'left-4'} md:hidden z-50 transition-all duration-300`}>
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-md ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-800 hover:bg-gray-50'} shadow-lg transition-all duration-200`}
        >
          {sidebarOpen ? <Close /> : <Menu />}
        </button>
      </div>
      
      {/* Sidebar */}
      <div className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transform transition-transform duration-300 ease-in-out
        fixed md:static z-40 h-full
      `}>
        <Sidebar />
      </div>
      
      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-0' : 'ml-0'} overflow-hidden`}>
        <header className={`
          ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} 
          shadow-md border-b py-4 px-6 sticky top-0 z-30`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className={`p-2 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} hidden md:block`}
              >
                <Menu className={darkMode ? 'text-gray-300' : 'text-gray-500'} />
              </button>
              <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Manage your {title.toLowerCase()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className={`relative hidden md:block rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} px-3 py-1.5`}>
                <div className="flex items-center">
                  <Search className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <input
                    type="text"
                    placeholder="Search..."
                    className={`ml-2 bg-transparent border-none focus:ring-0 outline-none text-sm ${darkMode ? 'text-gray-200 placeholder-gray-500' : 'text-gray-700 placeholder-gray-400'}`}
                  />
                </div>
              </div>
              
              <div className="relative">
                <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-200`}>
                  <Notifications className={darkMode ? 'text-gray-300' : 'text-gray-500'} />
                  {notifications > 0 && (
                    <span className="notification-badge absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
              </div>
              
              {addButton && addButtonLink && (
                <Link 
                  to={addButtonLink}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white 
                    bg-blue-600 hover:bg-blue-700 transition-all transform hover:-translate-y-1 hover:shadow-lg
                    shadow-md
                  `}
                >
                  <Add className="w-5 h-5" />
                  {addButtonText}
                </Link>
              )}
            </div>
          </div>
        </header>
        
        <main className="px-6 py-6">
          <div className={`rounded-lg transition-all duration-300 pb-6`}>
            {children}
          </div>
        </main>
        
        <footer className={`px-6 py-4 border-t ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} text-center text-xs`}>
          <p>© {new Date().getFullYear()} Sigma Developers. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout; 
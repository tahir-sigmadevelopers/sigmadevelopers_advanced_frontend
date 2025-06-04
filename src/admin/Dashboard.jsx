import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Homepage from './Hompage'
import { useSelector } from 'react-redux'
import { Menu, Close } from '@mui/icons-material'

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { darkMode } = useSelector(state => state.theme)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      {/* Mobile menu button */}
      <div className={`fixed top-4 ${sidebarOpen ? 'left-64' : 'left-4'} md:hidden z-50`}>
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg`}
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
      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-0' : 'ml-0'}`}>
        <div className={`py-4 px-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md mb-6`}>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Welcome to your portfolio admin panel</p>
        </div>
        <div className="px-6 pb-6">
          <Homepage />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
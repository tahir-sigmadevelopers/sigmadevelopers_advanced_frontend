import React from 'react'
import { useSelector } from 'react-redux'
import { 
  Visibility, 
  AccountCircle, 
  Code, 
  Article, 
  Comment, 
  TrendingUp, 
  ArrowUpward, 
  ArrowDownward
} from '@mui/icons-material'

const Homepage = () => {
  const { darkMode } = useSelector(state => state.theme)
  
  // Sample data - would be replaced with real data from API
  const stats = [
    { 
      title: 'Total Projects', 
      value: '25', 
      icon: <Code className="text-blue-500" />, 
      change: '+12%',
      isPositive: true,
      linkTo: '/dashboard/projects'
    },
    { 
      title: 'Total Blogs', 
      value: '38', 
      icon: <Article className="text-green-500" />, 
      change: '+5%',
      isPositive: true,
      linkTo: '/dashboard/blogs'
    },
    { 
      title: 'Users', 
      value: '142', 
      icon: <AccountCircle className="text-purple-500" />, 
      change: '+18%',
      isPositive: true,
      linkTo: '/dashboard/users'
    },
    { 
      title: 'Testimonials', 
      value: '16', 
      icon: <Comment className="text-yellow-500" />, 
      change: '-2%',
      isPositive: false,
      linkTo: '/dashboard/testimonials'
    },
  ]

  const recentActivity = [
    { id: 1, action: 'New project added', date: '2 hours ago', user: 'You' },
    { id: 2, action: 'Blog post published', date: '1 day ago', user: 'You' },
    { id: 3, action: 'New user registered', date: '3 days ago', user: 'John Doe' },
    { id: 4, action: 'Testimonial approved', date: '1 week ago', user: 'You' },
  ]
  
  const popularContent = [
    { id: 1, title: 'React Development Guide', type: 'Blog', views: 1245 },
    { id: 2, title: 'E-commerce Store', type: 'Project', views: 932 },
    { id: 3, title: 'Portfolio Website', type: 'Project', views: 821 },
    { id: 4, title: 'Ultimate Guide to NextJS', type: 'Blog', views: 756 },
  ]

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <a 
            href={stat.linkTo} 
            key={index} 
            className={`
              ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} 
              p-6 rounded-lg shadow-md transition duration-300 ease-in-out 
              transform hover:-translate-y-1 hover:shadow-lg
            `}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {stat.title}
                </p>
                <h3 className="mt-1 text-3xl font-semibold">{stat.value}</h3>
                <div className="mt-2 flex items-center">
                  {stat.isPositive ? 
                    <ArrowUpward className="h-4 w-4 text-green-500" /> : 
                    <ArrowDownward className="h-4 w-4 text-red-500" />
                  }
                  <span className={`ml-1 text-sm ${
                    stat.isPositive ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change} from last month
                  </span>
                </div>
              </div>
              <div className={`
                p-3 rounded-full 
                ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}
              `}>
                {stat.icon}
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Middle Section - 2 columns on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className={`
          ${darkMode ? 'bg-gray-800' : 'bg-white'} 
          rounded-lg shadow-md p-6
        `}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Recent Activity</h2>
            <a href="#" className="text-blue-500 text-sm hover:underline">View all</a>
          </div>
          <div className="space-y-4">
            {recentActivity.map(activity => (
              <div 
                key={activity.id} 
                className={`
                  flex items-start p-3 rounded-lg
                  ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'}
                  transition duration-300
                `}
              >
                <div className={`
                  p-2 rounded-full mr-4
                  ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}
                `}>
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <div className="flex mt-1 text-sm">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                      {activity.date}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="font-medium">{activity.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Content */}
        <div className={`
          ${darkMode ? 'bg-gray-800' : 'bg-white'} 
          rounded-lg shadow-md p-6
        `}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Popular Content</h2>
            <a href="#" className="text-blue-500 text-sm hover:underline">View all</a>
          </div>
          <div className="space-y-4">
            {popularContent.map(content => (
              <div 
                key={content.id} 
                className={`
                  flex items-center justify-between p-3 rounded-lg
                  ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'}
                  transition duration-300
                `}
              >
                <div className="flex items-center">
                  <div className={`
                    p-2 rounded-full mr-4
                    ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}
                    ${content.type === 'Blog' ? 'text-green-500' : 'text-purple-500'}
                  `}>
                    {content.type === 'Blog' ? 
                      <Article className="h-5 w-5" /> : 
                      <Code className="h-5 w-5" />
                    }
                  </div>
                  <div>
                    <p className="font-medium">{content.title}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {content.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Visibility className={`h-5 w-5 mr-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span>{content.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section - Quick Actions */}
      <div className={`
        ${darkMode ? 'bg-gray-800' : 'bg-white'} 
        rounded-lg shadow-md p-6
      `}>
        <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'Add Project', icon: <Code />, color: 'blue', link: '/dashboard/addprojects' },
            { title: 'Write Blog', icon: <Article />, color: 'green', link: '/dashboard/blog/create' },
            { title: 'Add Category', icon: <Comment />, color: 'yellow', link: '/dashboard/category/add' },
            { title: 'View Users', icon: <AccountCircle />, color: 'purple', link: '/dashboard/users' },
          ].map((action, index) => (
            <a 
              key={index}
              href={action.link}
              className={`
                flex flex-col items-center justify-center p-4 rounded-lg
                ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'}
                transition duration-300 ease-in-out
                text-center
              `}
            >
              <div className={`
                p-3 rounded-full mb-2
                ${action.color === 'blue' ? 'bg-blue-100 text-blue-500' : 
                 action.color === 'green' ? 'bg-green-100 text-green-500' :
                 action.color === 'yellow' ? 'bg-yellow-100 text-yellow-500' :
                 'bg-purple-100 text-purple-500'}
              `}>
                {action.icon}
              </div>
              <span className="font-medium">{action.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Homepage
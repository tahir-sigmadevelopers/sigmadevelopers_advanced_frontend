import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './redux/reducers/user'
import { adminReducer } from './redux/reducers/admin'
import { projectReducer } from './redux/reducers/project'
import { testimonialReducer } from './redux/reducers/testimonial'
import { themeReducer } from './redux/reducers/theme'
import { blogReducer } from './redux/reducers/blog'
import { categoryReducer } from './redux/reducers/category'

// Get server URL from environment or use default
// Check for development environment
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Production URL
export const server = isDevelopment 
  ? "http://localhost:4000"  // Development server
  : "https://mern-advanced-portfolio.vercel.app"; // Production server

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    project: projectReducer,
    testimonial: testimonialReducer,
    blog: blogReducer,
    category: categoryReducer,
    theme: themeReducer,
  },
})



import React, { useEffect, useState } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer.jsx'
import Home from './components/Home/Home'
import { BrowserRouter as MyRouter, Routes, Route, useLocation } from 'react-router-dom'
import Projects from './components/Projects/Projects'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Services from './components/Services/Services'
import LoginForm from './components/layout/LoginForm'
import SignUpForm from './components/layout/SignUpForm'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import Dashboard from './admin/Dashboard'
import AdminProjects from './admin/AdminProjects'
import AdminBlogs from './admin/AdminBlogs.jsx'
import Users from './admin/Users'
import Profile from './components/User/Profile'
import EditProfile from './components/User/EditProfile'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './redux/actions/user'
import PageNotFound from './components/PageNotFound'
import UpdateRole from './admin/UpdateRole'
import AddProject from './admin/AddProject'
import EditProject from './admin/EditProject'
import Testimonials from './admin/Testimonials'
import Blogs from './components/Blog/Blogs.jsx'
import Blog from './components/Blog/Post.jsx'
import ThemeProvider from './components/themeProvider'
import UserOptions from './components/layout/UserOptions.jsx'
import ParticleComponent from './components/layout/Particles.jsx'
import AddBlog from './admin/AddBlog.jsx'
import EditBlog from './admin/EditBlog'
import AddCategory from './admin/AddCategory.jsx'
import Categories from './admin/Categories.jsx'
import EditCategory from './admin/EditCategory.jsx'
import AuthCheck from './AuthCheck.jsx'
import { getToken, isAuthenticated, isTokenExpired, debugAuth } from './utils/authManager.js'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const App = () => {
  return (
    <>
      <ThemeProvider>
        <MyRouter>
          <HeaderWithRoutes />
        </MyRouter>
      </ThemeProvider>
    </>
  )
}

export default App

const HeaderWithRoutes = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.theme);
  const { user, loading, isAuthenticated: reduxIsAuthenticated } = useSelector(state => state.user);
  const [authChecked, setAuthChecked] = useState(false);
  const location = useLocation();
  
  // Initialize authentication on component mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check if we have a token in localStorage
        const token = getToken();
        
        if (token && !isTokenExpired(token)) {
          // Token is valid, try to load user data with timeout protection
          const timeoutPromise = new Promise(resolve => {
            setTimeout(() => resolve({ timedOut: true }), 2000);
          });
          
          await Promise.race([
            dispatch(loadUser()),
            timeoutPromise
          ]);
        }
      } catch (err) {
        // Error handled silently
      } finally {
        // Mark auth as checked regardless of outcome
        setAuthChecked(true);
      }
    };
    
    if (!authChecked) {
      initAuth();
      
      // Safety timeout to prevent infinite loading
      const safetyTimeout = setTimeout(() => {
        setAuthChecked(true);
      }, 2000);
      
      return () => clearTimeout(safetyTimeout);
    }
  }, [dispatch, authChecked]);

  // Show loading indicator briefly during initial auth check
  if (loading && !authChecked) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={` ${darkMode ? `dark:bg-gradient-to-r from-[#000428] to-[#004e92] dark:text-white` : `bg-gradient-to-r from-blue-300 to-[#0210a9]`}`}>
      {!location.pathname.startsWith('/dashboard') && <Header />}
      {user && <UserOptions user={user} />}
      <ParticleComponent />

      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/password/reset/:token' element={<ResetPassword />} />
        <Route path='/auth-check' element={<AuthCheck />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<SignUpForm />} />
        
        {/* Protected User Routes */}
        <Route path='/profile' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path='/editprofile' element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        } />

        {/* Protected Admin Routes */}
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='/dashboard/projects' element={
          <ProtectedRoute>
            <AdminProjects />
          </ProtectedRoute>
        } />
        <Route path='/dashboard/blogs' element={
          <ProtectedRoute>
            <AdminBlogs />
          </ProtectedRoute>
        } />
        <Route path='/dashboard/blog/create' element={
          <ProtectedRoute>
            <AddBlog />
          </ProtectedRoute>
        } />
        <Route path='/dashboard/blog/edit/:id' element={
          <ProtectedRoute>
            <EditBlog />
          </ProtectedRoute>
        } />
        <Route path='/dashboard/categories' element={
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        } />
        <Route path='/dashboard/category/add' element={
          <ProtectedRoute>
            <AddCategory />
          </ProtectedRoute>
        } />
        <Route path='/dashboard/category/edit/:id' element={
          <ProtectedRoute>
            <EditCategory />
          </ProtectedRoute>
        } />
        <Route path='/dashboard/addprojects' element={
          <ProtectedRoute>
            <AddProject />
          </ProtectedRoute>
        } />
        <Route path='/dashboard/testimonials' element={
          <ProtectedRoute>
            <Testimonials />
          </ProtectedRoute>
        } />
        <Route path='/dashboard/project/:id' element={
          <ProtectedRoute>
            <EditProject />
          </ProtectedRoute>
        } />
        <Route path='/dashboard/users' element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        } />
        <Route path='/dashboard/user/:id' element={
          <ProtectedRoute>
            <UpdateRole />
          </ProtectedRoute>
        } />
        
        {/* Catch-all route for 404 */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};
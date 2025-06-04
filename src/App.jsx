import React, { useEffect } from 'react'
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
import { ProtectedRoute } from 'protected-route-react'
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

  const { darkMode } = useSelector((state) => state.theme);

  const { isAuthenticated, user } = useSelector(state => state.user)

  const location = useLocation();
  const showHeader = !location.pathname.startsWith('/dashboard');

  return (


    <div className={` ${darkMode ? `dark:bg-gradient-to-r from-[#000428] to-[#004e92] dark:text-white` : `bg-gradient-to-r from-blue-300 to-[#0210a9]`}`}>


      {showHeader && <Header />}
      {user && isAuthenticated && <UserOptions user={user} />}
      <ParticleComponent />

      <Routes>


        {/* Any Body Can Access These Routes  */}

        <Route path='/' element={<Home />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<SignUpForm />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/password/reset/:token' element={<ResetPassword />} />

        {/* Logged In User Routes  */}

        <Route path='/profile' element={<Profile />} />
        {
          user && isAuthenticated &&
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>


            <Route path='/editprofile' element={<EditProfile />} />

          </Route>

        }


        {/* Admin Routes  */}

        {
          user && isAuthenticated && user?.role === "dhola" &&
          < Route element={<ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={user && user.role === "dhola"} adminRoute={true} />}>

            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/dashboard/projects' element={<AdminProjects />} />
            <Route path='/dashboard/blogs' element={<AdminBlogs />} />
            <Route path='/dashboard/blog/create' element={<AddBlog />} />
            <Route path='/dashboard/blog/edit/:id' element={<EditBlog />} />
            <Route path='/dashboard/categories' element={<Categories />} />
            <Route path='/dashboard/category/add' element={<AddCategory />} />
            <Route path='/dashboard/category/edit/:id' element={<EditCategory />} />
            <Route path='/dashboard/addprojects' element={<AddProject />} />
            <Route path='/dashboard/testimonials' element={<Testimonials />} />
            <Route path='/dashboard/project/:id' element={<EditProject />} />
            <Route path='/dashboard/users' element={<Users />} />
            <Route path='/dashboard/user/:id' element={<UpdateRole />} />

          </Route>

        }

        <Route path='*' element={<PageNotFound />} />

      </Routes >
      <Footer />
    </div>



  );
};
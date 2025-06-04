import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/actions/user';
import { toast } from 'react-hot-toast';
import { toggleTheme } from '../redux/reducers/theme';
import { Assignment, BorderColor, Category, Chat, Home, Language, Logout, People } from '@mui/icons-material';
import { useAuth0 } from "@auth0/auth0-react";

const Sidebar = () => {

    const { logout } = useAuth0();

    const dispatch = useDispatch()

    // const { error, message } = useSelector(state => state.user)

    const navigate = useNavigate()

    const refreshPage = () => {
        navigate(0);
    }
    const logoutHandle = async () => {
        await dispatch(logoutUser())
        navigate("/")
        refreshPage()

    }

    const { darkMode } = useSelector(state => state.theme)
    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };


    return (


        <>
            <div className="flex flex-col h-screen p-3 shadow w-60">
                <div className="space-y-3">
                    <div className="flex items-center">
                        <h2 className="text-xl font-bold">Dashboard</h2>
                    </div>
                    <div className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li className="rounded-sm">
                                <Link
                                    to="/dashboard"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <Home className='h-6 w-6' />
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li className="rounded-sm">
                                <Link
                                    to="/dashboard/projects"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >

                                    <Assignment className='h-6 w-6' />

                                    <span>Projects</span>
                                </Link>
                            </li>
                            <li className="rounded-sm">
                                <Link
                                    to="/dashboard/blogs"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >

                                    <BorderColor className='h-6 w-6' />

                                    <span>Blogs</span>
                                </Link>
                            </li>
                            <li className="rounded-sm">
                                <Link
                                    to="/dashboard/categories"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >

                                    <Category className='h-6 w-6' />

                                    <span>Categories</span>
                                </Link>
                            </li>
                            <li className="rounded-sm">
                                <Link
                                    to="/dashboard/users"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >

                                    <People className='h-6 w-6' />

                                    <span>Users</span>
                                </Link>
                            </li>
                            <li className="rounded-sm">
                                <Link
                                    to="/dashboard/testimonials"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >

                                    <Chat className='h-6 w-6' />


                                    <span>Testimonials</span>
                                </Link>
                            </li>


                            <li className="rounded-sm">
                                <Link
                                    to="/"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >


                                    <Language className='h-6 w-6' />


                                    <span>Back to Website</span>
                                </Link>
                            </li>

                            <li className="rounded-sm">

                                <Link
                                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    {/* <img src="/logout.png" alt="logout" className='h-6 w-6' /> */}
                                    <Logout className='h-6 w-6' />

                                    <span>Logout</span>
                                </Link>
                            </li>
                            <li>
                                <Link onClick={handleThemeToggle} className={`transition ease-in-out delay-[700ms] ${darkMode && 'hover:text-gray-400'}  hover:text-gray-900 hover:font-semibold md:pt-2`}>
                                    {
                                        darkMode ? <img className={`${darkMode && 'transition ease-in-out delay-[700ms] hover:text-gray-400'} h-8 w-8`} src="/moon.jpg" alt="moon" /> : <img className='h-8 w-8 transition ease-in-out delay-[700ms]' src="/sun.webp" alt="moon" />
                                    }

                                </Link>
                            </li>


                        </ul>
                    </div>
                </div>
            </div>
        </>




    );
}

export default Sidebar
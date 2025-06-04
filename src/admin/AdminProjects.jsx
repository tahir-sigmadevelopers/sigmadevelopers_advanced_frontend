import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { deleteProject, getAllProjects } from '../redux/actions/project'
import Loader from '../components/Loader'
import { loadUser } from '../redux/actions/user'

const AdminProjects = () => {


    const dispatch = useDispatch()
    const { loading, error, projects, message } = useSelector(state => state.project)


    const deleteProjectHandle = async (projectId) => {
        await dispatch(deleteProject(projectId))
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch({ type: "clearError" })
        }
        if (message) {
            toast.success(message)
            dispatch({ type: "clearMessage" })
        }
        dispatch(loadUser())

        dispatch(getAllProjects())
    }, [error, message, dispatch])
    return (
        <div className='flex '>
            <Sidebar />

            <section className="body-font flex-grow ">
                <div className=" px-1 py-10 mx-auto">
                    <button className="flex ml-8 text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-gray-800 rounded">
                        <Link to={"/dashboard/addprojects"}>Add New Projects</Link>
                    </button>
                    <div className="flex flex-col text-center w-full mb-8">
                        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2">Projects</h1>

                    </div>

                    <div className="lg:px-2 w-full overflow-hidden">
                        <table className="table-auto w-full text-left whitespace-no-wrap">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-sm md:text-lg  rounded-tl rounded-bl">Title</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-sm md:text-lg ">Created At</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-sm md:text-lg ">Category</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-sm md:text-lg ">URL</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-sm md:text-lg ">Edit</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-sm md:text-lg ">Delete</th>

                                </tr>
                            </thead>
                            <tbody>


                                {
                                    loading ? <div className='flex h-full w-full justify-center mt-20 ml-72'><Loader /></div> : <>
                                        {
                                            projects && projects.map((project) => (

                                                <tr key={project._id}>
                                                    <td className="px-4 py-3">{project.title}</td>
                                                    <td className="px-4 py-3">{project.createdAt.slice(0, 10)}</td>
                                                    <td className="px-4 py-3">{project.category}</td>
                                                    <td className="px-4 py-3 text-lg">
                                                        <a href={project.link} target='blank'>{project.link}</a>
                                                    </td>
                                                    <td className="px-4 py-3 text-lg ">
                                                        <button className='bg-black hover:bg-gray-700 text-white w-full py-0.5 rounded-md px-3'>
                                                            <Link to={`/dashboard/project/${project._id}`}>Edit</Link>
                                                        </button>
                                                    </td>
                                                    <td className="px-4 py-3 text-lg text-gray-900">
                                                        <button className='bg-red-500 hover:bg-red-600 text-white w-full py-0.5 rounded-md' onClick={() => deleteProjectHandle(project._id)} >Delete</button>
                                                    </td>

                                                </tr>
                                            ))
                                        }

                                    </>
                                }



                            </tbody>
                        </table>
                    </div>

                </div>
            </section>

        </div>
    )
}

export default AdminProjects
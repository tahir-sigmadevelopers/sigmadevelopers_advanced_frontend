import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import { getAllProjects } from '../redux/actions/project'
import { Link } from 'react-router-dom'

const ProjectCard = () => {
    const dispatch = useDispatch()
    const { loading, error, featuredProjects } = useSelector(state => state.project)
    const { darkMode } = useSelector((state) => state.theme);

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch({ type: "clearError" })
        }

        dispatch(getAllProjects())
    }, [error])

    return (
        <section className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} py-16`}>
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className={`text-4xl font-bold mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                        Featured Projects
                    </h2>
                    <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
                    <p className={`max-w-2xl mx-auto text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        Explore our latest work and see how we bring ideas to life
                    </p>
                                        </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader />
                                            </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProjects && featuredProjects.map((project) => (
                            <div 
                                key={project._id} 
                                className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                                    darkMode ? "bg-gray-700" : "bg-white"
                                }`}
                            >
                                <div className="relative overflow-hidden h-56">
                                    <img 
                                        src={project?.image.url} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                                            darkMode ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800"
                                        }`}>
                                            {project.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                    <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                        {project.description}
                                    </p>
                                    
                                    <a 
                                        href={project.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            darkMode 
                                                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                                                : "bg-blue-600 hover:bg-blue-700 text-white"
                                        }`}
                                    >
                                        View Demo
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                <div className="text-center mt-12">
                    <Link 
                        to="/projects" 
                        className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                            darkMode 
                                ? "bg-gray-700 hover:bg-gray-600 text-white" 
                                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                        }`}
                    >
                        View All Projects
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default ProjectCard
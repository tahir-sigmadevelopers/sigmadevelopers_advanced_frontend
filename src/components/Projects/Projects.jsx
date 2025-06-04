import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import Typewriter from 'typewriter-effect';
import { getAllProjects } from '../../redux/actions/project';
import Loader from '../Loader';
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

const Project = () => {
  const { darkMode } = useSelector((state) => state.theme);
  const [filter, setFilter] = useState('all');
  const { projects, loading, error } = useSelector(state => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch({ type: "clearError" })
    }

    dispatch(getAllProjects())
  }, [error, dispatch]);

  // Extract unique categories from projects
  const categories = projects ? 
    ['all', ...new Set(projects?.map(project => project.category))] : 
    ['all'];

  // Filter projects based on selected category
  const filteredProjects = projects && filter === 'all' ? 
    projects : 
    projects?.filter(project => project.category === filter);

  return (
    <section className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"} min-h-screen py-16`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
            <Typewriter
              options={{
                strings: ["Our Projects", "Our Portfolio", "Our Work"],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-lg max-w-2xl mx-auto">
            Explore our portfolio of successful projects across various industries and technologies.
            Each project showcases our commitment to quality, innovation, and client satisfaction.
          </p>
        </div>

        {/* Category Filter - Enhanced UI */}
        <div className="mb-16">
          <div className={`p-2 rounded-xl mx-auto max-w-3xl ${darkMode ? "bg-gray-800" : "bg-gray-100"} shadow-lg`}>
            <div className="flex flex-wrap justify-center">
              {categories.map((category, index) => {
                const isActive = filter === category;
                
                return (
                  <motion.button
                    key={index}
                    onClick={() => setFilter(category)}
                    className={`relative px-5 py-2.5 m-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                      darkMode 
                        ? "text-gray-300 hover:text-white" 
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <motion.span
                        className={`absolute inset-0 rounded-lg ${
                          darkMode ? "bg-blue-600" : "bg-blue-500"
                        }`}
                        layoutId="categoryBubble"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                      ></motion.span>
                    )}
                    <span className={`relative z-10 ${isActive ? "text-white font-semibold" : ""}`}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                    
                    {/* Category Count Badge */}
                    {category !== 'all' && (
                      <span className={`ml-2 relative z-10 inline-flex items-center justify-center w-5 h-5 text-xs rounded-full ${
                        isActive 
                          ? "bg-white text-blue-600" 
                          : darkMode 
                            ? "bg-gray-700 text-gray-300" 
                            : "bg-gray-200 text-gray-700"
                      }`}>
                        {projects?.filter(project => project.category === category).length}
                      </span>
                    )}
                    {category === 'all' && (
                      <span className={`ml-2 relative z-10 inline-flex items-center justify-center w-5 h-5 text-xs rounded-full ${
                        isActive 
                          ? "bg-white text-blue-600" 
                          : darkMode 
                            ? "bg-gray-700 text-gray-300" 
                            : "bg-gray-200 text-gray-700"
                      }`}>
                        {projects?.length || 0}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {loading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loader />
            </div>
          ) : (
            <>
              {filteredProjects && filteredProjects.map((project) => (
                <ProjectCard key={project._id} project={project} darkMode={darkMode} />
              ))}
            </>
          )}
        </motion.div>

        {/* No Projects Message */}
        {filteredProjects && filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20h.01M12 14h.01M12 8h.01M12 4h.01M4 12a8 8 0 1116 0 8 8 0 01-16 0z" />
            </svg>
            <h3 className="text-xl font-medium mb-1">No projects found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        )}

        {/* Contact CTA */}
        <div className={`mt-20 p-8 rounded-xl text-center ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
          <h2 className="text-2xl font-bold mb-4">Have a project in mind?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            We'd love to help bring your vision to life. Contact us today for a free consultation.
          </p>
          <Link
            to="/contact"
            className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
              darkMode 
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Get in Touch
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

const ProjectCard = ({ project, darkMode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
        isHovered ? "shadow-xl transform scale-[1.02]" : ""
      } ${darkMode ? "bg-gray-800" : "bg-white"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Project Image */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={project?.image.url} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform-gpu"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300" style={{ opacity: isHovered ? 1 : 0 }}></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
            darkMode ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800"
          }`}>
            {project.category}
          </span>
        </div>
      </div>
      
      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className={`mb-6 line-clamp-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          {project.description}
        </p>
        
        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['React', 'Node.js', 'MongoDB'].map((tech, index) => (
            <span 
              key={index}
              className={`text-xs px-2 py-1 rounded-full ${
                darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Action Button */}
        <div className="flex justify-between items-center">
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
          
          <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Project
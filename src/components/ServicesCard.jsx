import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ServicesCard = () => {
    const { darkMode } = useSelector((state) => state.theme);

    const services = [
        {
            id: 1,
            title: "Web Development",
            description: "Custom websites and web applications built with the latest technologies and best practices.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            ),
            color: "from-blue-500 to-blue-600"
        },
        {
            id: 2,
            title: "Content Writing",
            description: "Engaging and SEO-optimized content that connects with your audience and drives results.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            ),
            color: "from-purple-500 to-purple-600"
        },
        {
            id: 3,
            title: "Digital Marketing",
            description: "Strategic marketing solutions to boost your online presence and reach your target audience.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: "from-green-500 to-green-600"
        },
        {
            id: 4,
            title: "Cyber Security",
            description: "Comprehensive security solutions to protect your digital assets and sensitive information.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            color: "from-red-500 to-red-600"
        },
        {
            id: 5,
            title: "Blockchain Development",
            description: "Innovative blockchain solutions for secure, transparent, and efficient digital transactions.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
            color: "from-yellow-500 to-yellow-600"
        },
        {
            id: 6,
            title: "SEO Optimization",
            description: "Data-driven SEO strategies to improve your search rankings and drive organic traffic.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            color: "from-indigo-500 to-indigo-600"
        }
    ];

    return (
        <section className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} py-20`}>
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className={`text-4xl font-bold mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                        Our Services
                    </h2>
                    <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
                    <p className={`max-w-2xl mx-auto text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        Comprehensive solutions tailored to meet your business needs
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <ServiceCard 
                            key={service.id}
                            title={service.title}
                            description={service.description}
                            icon={service.icon}
                            color={service.color}
                            darkMode={darkMode}
                        />
                    ))}
                </div>

                <div className="text-center mt-16">
                    <Link 
                        to="/contact" 
                        className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                            darkMode 
                                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                    >
                        Get a Free Consultation
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    )
}

const ServiceCard = ({ title, description, icon, color, darkMode }) => {
    return (
        <div className={`group rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${
            darkMode ? "bg-gray-800 shadow-gray-700/20" : "bg-white shadow-lg"
        }`}>
            <div className="p-8">
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center mb-6 text-white transform transition-transform group-hover:scale-110`}>
                    {icon}
                </div>
                
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-800"}`}>
                    {title}
                </h3>
                
                <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {description}
                </p>
                
                <a href="#" className={`inline-flex items-center font-medium ${
                    darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"
                }`}>
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default ServicesCard


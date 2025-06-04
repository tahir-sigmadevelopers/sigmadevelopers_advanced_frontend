import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Education = () => {
    const { darkMode } = useSelector((state) => state.theme);
    
    const education = [
        {
            degree: "BS Computer Science",
            institution: "Bahauddin Zakariya University (BZU)",
            location: "Multan, Pakistan",
            period: "2021 - 2025",
            description: "Studying advanced programming concepts, algorithms, data structures, and software development methodologies. Focusing on web development and modern application architecture.",
            courses: ["Data Structures & Algorithms", "Database Systems", "Web Development", "Software Engineering", "Artificial Intelligence", "Operating Systems"]
        }
    ];
    
    // Add more education items as needed

    return (
        <section className={`py-16 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className={`text-3xl font-bold mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>Education</h2>
                    <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
                    <p className="text-lg max-w-2xl mx-auto">
                        My academic journey that forms the foundation of my technical expertise.
                    </p>
                </div>
                
                <div className="max-w-4xl mx-auto">
                    {education.map((item, index) => (
                        <motion.div 
                            key={index}
                            className={`mb-8 p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-700" : "bg-white"}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex flex-col md:flex-row md:items-center mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold">{item.degree}</h3>
                                    <p className={`text-lg ${darkMode ? "text-blue-300" : "text-blue-600"}`}>{item.institution}</p>
                                    <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>{item.location}</p>
                                </div>
                                <div className={`md:ml-auto mt-2 md:mt-0 px-4 py-2 rounded-full text-sm font-medium ${
                                    darkMode ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"
                                }`}>
                                    {item.period}
                                </div>
                            </div>
                            
                            <p className="mb-4">{item.description}</p>
                            
                            <div>
                                <h4 className={`text-sm font-semibold mb-3 ${darkMode ? "text-gray-400" : "text-gray-700"}`}>KEY COURSES</h4>
                                <div className="flex flex-wrap gap-2">
                                    {item.courses.map((course, courseIndex) => (
                                        <span 
                                            key={courseIndex} 
                                            className={`text-xs px-3 py-1 rounded-full ${
                                                darkMode 
                                                ? "bg-gray-600 text-gray-200" 
                                                : "bg-gray-200 text-gray-700"
                                            }`}
                                        >
                                            {course}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Award or achievement if applicable */}
                            <div className={`mt-6 px-4 py-3 rounded-lg ${
                                darkMode ? "bg-gray-800/60" : "bg-blue-50"
                            }`}>
                                <div className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mt-0.5 mr-2 ${
                                        darkMode ? "text-blue-400" : "text-blue-500"
                                    }`} viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-sm">
                                        <span className="font-medium">Achievement: </span> 
                                        Consistently maintained a strong GPA while actively contributing to programming competitions and hackathons.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education; 
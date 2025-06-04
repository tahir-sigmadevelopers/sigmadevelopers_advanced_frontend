import React from 'react'
import Typewriter from 'typewriter-effect';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const About = () => {
    const { darkMode } = useSelector((state) => state.theme);

    const teamMembers = [
        {
            name: "Mohammad Tahir",
            role: "Founder & Lead Developer",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            bio: "Full-stack developer with expertise in React, Node.js, and modern web technologies.",
            skills: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"]
        },
        {
            name: "Sarah Johnson",
            role: "UI/UX Designer",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            bio: "Creative designer focused on creating intuitive and visually appealing user experiences.",
            skills: ["Figma", "Adobe XD", "UI Design", "User Research", "Prototyping"]
        },
        {
            name: "Ahmed Khan",
            role: "Backend Developer",
            image: "https://randomuser.me/api/portraits/men/36.jpg",
            bio: "Specialized in building robust backend systems and database architecture.",
            skills: ["Python", "Django", "PostgreSQL", "API Development", "Docker"]
        }
    ];

    const companyValues = [
        {
            title: "Innovation",
            description: "We constantly explore new technologies and approaches to deliver cutting-edge solutions.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        },
        {
            title: "Quality",
            description: "We're committed to excellence in every project, ensuring the highest standards in all our work.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        },
        {
            title: "Client Focus",
            description: "We prioritize understanding our clients' needs and delivering solutions that exceed expectations.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            title: "Reliability",
            description: "We deliver on our promises, maintaining transparency and integrity throughout the development process.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    ];

    const services = [
        "E-Commerce Websites",
        "Business Websites",
        "Portfolio Websites",
        "Real Estate Websites",
        "Web Applications",
        "Mobile Applications",
        "UI/UX Design",
        "SEO Optimization"
    ];

    return (
        <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"} min-h-screen`}>
            {/* Hero Section */}
            <section className="relative mb-24">
                <div className={`w-full h-[300px] overflow-hidden bg-cover bg-center ${darkMode ? "bg-gray-800" : ""}`} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')" }}>
                    <div className={`w-full h-full ${darkMode ? "bg-gray-900/70" : "bg-gray-800/50"} flex items-center justify-center`}>
                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            <Typewriter
                                options={{
                                    strings: ["About Us", "Our Story", "Our Team"],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </h1>
                    </div>
                </div>
                
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        className={`max-w-4xl mx-auto rounded-lg shadow-xl p-8 -mt-20 mb-16 ${darkMode ? "bg-gray-800" : "bg-white"}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                                <img className="h-48 w-auto rounded-full shadow-lg" src="/logo.webp" alt="Sigma Developers" />
                            </div>
                            <div className="md:w-2/3 md:pl-8">
                                <h2 className={`text-3xl font-bold mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>Sigma Developers</h2>
                                <p className="text-lg mb-4">
                                    We are a passionate team of developers and designers dedicated to creating exceptional digital experiences. Founded in 2020, Sigma Developers has grown into a trusted name in web development, delivering innovative solutions for businesses of all sizes.
                                </p>
                                <p className="text-lg">
                                    Our mission is to transform your digital dreams into reality through creative design, cutting-edge technology, and dedicated service. We believe that every business deserves a powerful online presence that drives growth and success.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section className={`py-16 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>Our Services</h2>
                        <p className="text-lg max-w-2xl mx-auto">
                            At Sigma Developers, we specialize in creating vibrant, effective, and memorable digital solutions tailored to your specific needs.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {services.map((service, index) => (
                            <motion.div 
                                key={index} 
                                className={`p-4 rounded-lg text-center ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-100"} shadow-md transition-all duration-300`}
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <span className="block text-lg font-medium">{service}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>Our Core Values</h2>
                        <p className="text-lg max-w-2xl mx-auto">
                            These principles guide our work and define our approach to every project we undertake.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {companyValues.map((value, index) => (
                            <motion.div 
                                key={index} 
                                className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
                                whileHover={{ y: -5 }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <div className={`mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                <p>{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className={`py-16 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>Meet Our Team</h2>
                        <p className="text-lg max-w-2xl mx-auto">
                            Our talented professionals bring diverse skills and expertise to every project.
                        </p>
                            </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div 
                                key={index} 
                                className={`rounded-lg overflow-hidden shadow-lg ${darkMode ? "bg-gray-700" : "bg-white"}`}
                                whileHover={{ y: -10 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.2 }}
                            >
                                <img 
                                    src={member.image} 
                                    alt={member.name} 
                                    className="w-full h-64 object-cover object-center"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                    <p className={`mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>{member.role}</p>
                                    <p className="mb-4">{member.bio}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {member.skills.map((skill, skillIndex) => (
                                            <span 
                                                key={skillIndex}
                                                className={`text-xs px-2 py-1 rounded-full ${darkMode ? "bg-gray-600 text-gray-200" : "bg-gray-200 text-gray-700"}`}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Connect Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className={`text-3xl font-bold mb-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>Connect With Us</h2>
                        <p className="text-lg mb-8">
                            Follow us on social media to stay updated with our latest projects and insights.
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-4">
                            <motion.a 
                                href="https://www.youtube.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={`p-3 rounded-full ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"} transition-colors duration-300`}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                                </svg>
                            </motion.a>
                            <motion.a 
                                href="https://www.facebook.com/selftaughtstunts1" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={`p-3 rounded-full ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"} transition-colors duration-300`}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                                </svg>
                            </motion.a>
                            <motion.a 
                                href="https://www.github.com/ghareebstar" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={`p-3 rounded-full ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"} transition-colors duration-300`}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </motion.a>
                            <motion.a 
                                href="https://www.linkedin.com/in/ghareebstar" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={`p-3 rounded-full ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"} transition-colors duration-300`}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                                </svg>
                            </motion.a>
                            <motion.a 
                                href="https://www.instagram.com/sigmadevelopers_ceo" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={`p-3 rounded-full ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"} transition-colors duration-300`}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </motion.a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';

const Services = () => {
    const { darkMode } = useSelector((state) => state.theme);

    const services = [
        {
            title: "Web Development",
            description: "Custom websites built with modern technologies to provide exceptional user experiences with responsive design and optimal performance.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            ),
            skills: ["React.js", "Next.js", "HTML5/CSS3", "JavaScript", "Responsive Design"]
        },
        {
            title: "Backend Development",
            description: "Robust and scalable server-side solutions that power your applications with secure APIs and efficient database management.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
            ),
            skills: ["Node.js", "Express.js", "MongoDB", "RESTful APIs", "Authentication"]
        },
        {
            title: "Full-Stack Development",
            description: "End-to-end solutions that combine front-end and back-end expertise to create complete, integrated applications.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
            skills: ["MERN Stack", "Redux", "JWT", "Context API", "Database Design"]
        },
        {
            title: "UI/UX Design",
            description: "Creating intuitive and visually appealing interfaces that enhance user satisfaction and engagement with your digital products.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
            ),
            skills: ["Tailwind CSS", "Material UI", "Wireframing", "Prototyping", "Responsive Design"]
        },
        {
            title: "E-Commerce Solutions",
            description: "Custom online shopping experiences with secure payment integration, inventory management, and user-friendly interfaces.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            skills: ["Payment Gateways", "Shopping Cart", "User Authentication", "Inventory Management", "Order Processing"]
        },
        {
            title: "Mobile App Development",
            description: "Cross-platform mobile applications that provide native-like experiences on both iOS and Android devices.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            skills: ["React Native", "Expo", "Mobile UI/UX", "Push Notifications", "App Store Deployment"]
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { 
            y: 0, 
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
            {/* Header Section */}
            <section className="pt-20 pb-12">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                            <Typewriter
                                options={{
                                    strings: ["My Services", "What I Offer", "My Expertise"],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </h1>
                        <div className="w-20 h-1 bg-blue-500 mx-auto mb-8"></div>
                        <p className="text-lg mb-10">
                            I offer a comprehensive range of development services tailored to meet your specific needs.
                            From designing beautiful user interfaces to building powerful backend systems, I'm committed to
                            delivering high-quality solutions that help you achieve your goals.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="pb-24">
                <div className="container mx-auto px-4">
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        {services.map((service, index) => (
                            <motion.div 
                                key={index} 
                                className={`rounded-xl overflow-hidden shadow-lg p-8 ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"} transition-all duration-300`}
                                variants={item}
                                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            >
                                <div className={`mb-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                                    {service.icon}
                                </div>
                                
                                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                                <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                    {service.description}
                                </p>
                                
                                <div>
                                    <h4 className={`text-sm font-semibold mb-3 ${darkMode ? "text-gray-400" : "text-gray-700"}`}>SKILLS & TECHNOLOGIES</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {service.skills.map((skill, skillIndex) => (
                                            <span 
                                                key={skillIndex} 
                                                className={`text-xs px-3 py-1 rounded-full ${
                                                    darkMode 
                                                    ? "bg-gray-700 text-blue-300" 
                                                    : "bg-blue-100 text-blue-800"
                                                }`}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={`py-16 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Ready to Work Together?</h2>
                        <p className="text-lg mb-8 max-w-2xl mx-auto">
                            Let's collaborate to bring your ideas to life. Whether you need a simple website or a complex web application,
                            I'm here to help you achieve your goals with high-quality development services.
                        </p>
                        <a 
                            href="https://wa.me/923266640988" 
                            target="_blank"
                            rel="noopener noreferrer" 
                            className={`inline-flex items-center px-8 py-4 rounded-lg font-medium text-white transition-all transform hover:scale-105 ${
                                darkMode 
                                ? "bg-blue-600 hover:bg-blue-700" 
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            Contact Me
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services; 
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

const HeroSection = () => {
    const { darkMode } = useSelector((state) => state.theme);

    const originalText = "Transforming ideas into exceptional digital experiences with cutting-edge web development solutions. Let's build something amazing together.";

    const [displayedText, setDisplayedText] = useState(originalText);

    useEffect(() => {
        const handleResize = () => {
            const newText = window.innerWidth <= 768 ? originalText.substring(0, 120) + "..." : originalText;
            setDisplayedText(newText);
        };

        // Set initial text
        handleResize();

        // Update text on window resize
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [originalText]);

    return (
        <section className={`${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 to-indigo-100"} overflow-hidden`}>
            <div className="container mx-auto px-12 py-24 md:py-36 lg:py-40 relative">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-0 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-10 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                    <div className="absolute bottom-20 right-20 w-60 h-60 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-3000"></div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
                    <div className="md:w-1/2 lg:w-5/12 md:pr-8 lg:pr-12 mb-10 md:mb-0">
                        <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-6 ${darkMode ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"}`}>
                            <span className="flex items-center">
                                <span className="h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                                Web Development & Design Studio
                            </span>
                        </div>
                        
                        <h1 className={`text-4xl xl:text-5xl md:text-7xl lg:text-5xl font-extrabold mb-8 leading-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
                            Welcome to{" "}
                            <span className={`mt-3 ${darkMode ? "text-blue-400" : "text-blue-600"} relative`}>
                                <Typewriter
                                    options={{
                                        strings: ["Sigma Developers", "Creative Solutions", "Digital Excellence"],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                            </span>
                        </h1>

                        <p className={`text-lg md:text-xl mb-10 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                            {displayedText}
                        </p>
                        
                        <div className="flex flex-wrap gap-4">
                            <Link 
                                to="/projects" 
                                className={`px-8 py-4 rounded-lg font-medium text-white transition-all shadow-lg ${
                                    darkMode 
                                        ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-900/20" 
                                        : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-blue-500/30"
                                }`}
                            >
                                <span className="flex items-center">
                                    View Portfolio
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </Link>
                            <a 
                                href="https://wa.me/923266640988" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`px-8 py-4 rounded-lg font-medium transition-all shadow-lg flex items-center ${
                                    darkMode 
                                        ? "bg-gray-800 text-white hover:bg-gray-700 shadow-gray-900/20" 
                                        : "bg-white text-gray-800 hover:bg-gray-100 shadow-gray-200/50"
                                }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                                </svg>
                                Hire Me
                            </a>
                        </div>
                        
                        <div className="mt-12">
                            <p className={`text-sm font-medium mb-3 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                Trusted by professionals worldwide
                            </p>
                            <div className="flex items-center">
                                <div className="flex -space-x-3">
                                    <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Client" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                                    <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="Client" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                                    <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="Client" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                                    <div className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"}`}>
                                        +15
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                        <span className={`ml-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                            5.0 (20+ reviews)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2 lg:w-7/12 relative">
                        <div className="relative">
                            <div className={`absolute inset-0 rounded-3xl ${darkMode ? "bg-blue-900/20" : "bg-blue-100/50"} transform rotate-6`}></div>
                            
                            {/* Hero Image */}
                            <img 
                                src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                                alt="Hero" 
                                className="relative z-10 rounded-3xl shadow-xl object-cover w-full max-w-xl lg:max-w-2xl mx-auto transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl" 
                            />
                            
                            {/* Floating badge - increased z-index */}
                            <div className={`absolute -bottom-4 -right-4 px-6 py-3 rounded-lg shadow-lg z-20 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="pl-4">
                                        <p className="text-base font-medium">Quality Guaranteed</p>
                                        <p className="text-sm opacity-75">100% Satisfaction</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Tech stack badge - increased z-index */}
                            <div className={`absolute -top-4 -left-4 px-4 py-2 rounded-lg shadow-lg z-20 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
                                <div className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-medium">Modern Tech Stack</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Tech icons - increased z-index */}
                        <div className="flex justify-center mt-6 space-x-4 relative z-20">
                            {/* React */}
                            <div className={`p-2 rounded-full ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="2.139" fill="currentColor"/>
                                    <path fill="currentColor" d="M12,1.25A12.743,12.743,0,0,0,8.794,21.771c.381.066.777.127,1.181.177.622.077,1.263.127,1.922.127.659,0,1.3-.05,1.922-.127.4-.05.8-.111,1.181-.177A12.743,12.743,0,0,0,12,1.25Zm.03,17.75a6.862,6.862,0,0,1-1.98-.281,6.782,6.782,0,0,1,3.96-10.969,6.782,6.782,0,0,1,3.96,10.969A6.862,6.862,0,0,1,12.03,19Z"/>
                                    <path fill="currentColor" d="M12,1.25c-.659,0-1.3.05-1.922.127-.4.05-.8.111-1.181.177A12.743,12.743,0,0,0,12,22.075c.659,0,1.3-.05,1.922-.127.4-.05.8-.111,1.181-.177A12.743,12.743,0,0,0,12,1.25ZM8.05,19a6.862,6.862,0,0,1-1.98-.281,6.782,6.782,0,0,1,3.96-10.969,6.782,6.782,0,0,1,3.96,10.969A6.862,6.862,0,0,1,8.05,19Z"/>
                                </svg>
                            </div>
                            
                            {/* Node.js */}
                            <div className={`p-2 rounded-full ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12,1.85a1.51,1.51,0,0,0-.7.17L4.23,6.76A1.46,1.46,0,0,0,3.5,8v8a1.46,1.46,0,0,0,.73,1.2l7.07,4.74a1.51,1.51,0,0,0,1.4,0l7.07-4.74A1.46,1.46,0,0,0,20.5,16V8a1.46,1.46,0,0,0-.73-1.2L12.7,2A1.51,1.51,0,0,0,12,1.85Zm0,5.72A4.43,4.43,0,1,1,7.57,12,4.43,4.43,0,0,1,12,7.57Z"/>
                                </svg>
                            </div>
                            
                            {/* MongoDB */}
                            <div className={`p-2 rounded-full ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12,2C9.8,2,7.79,4.19,7.79,6.67S9.83,13,12,13s4.21-3.85,4.21-6.33S14.2,2,12,2Zm0,10a3.5,3.5,0,0,1-3.5-3.5A3.5,3.5,0,0,1,12,5a3.5,3.5,0,0,1,3.5,3.5A3.5,3.5,0,0,1,12,12Z"/>
                                    <path fill="currentColor" d="M13.5,14h-3a9.32,9.32,0,0,0-9.5,9.21A.79.79,0,0,0,1.5,24h21a.79.79,0,0,0,.5-.79A9.32,9.32,0,0,0,13.5,14Z"/>
                                </svg>
                            </div>
                            
                            {/* Tailwind */}
                            <div className={`p-2 rounded-full ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wave divider */}
            <div className={`${darkMode ? "text-gray-800" : "text-white"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
                    <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
        </section>
    )
}

export default HeroSection
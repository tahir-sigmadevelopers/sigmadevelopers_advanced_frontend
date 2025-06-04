import React, { useRef } from 'react'
import { animate, motion } from "framer-motion"
import { useSelector } from 'react-redux';

const IndustryExperince = () => {
  const { darkMode } = useSelector((state) => state.theme);
  const clientCount = useRef(null);
  const projectCount = useRef(null);
  const yearCount = useRef(null);

  const animateClientCount = () => {
    animate(0, 20, {
      duration: 1,
      onUpdate: (v) => clientCount.current.textContent = v.toFixed()
    })
  }

  const animateProjectCount = () => {
    animate(0, 50, {
      duration: 1,
      onUpdate: (v) => projectCount.current.textContent = v.toFixed()
    })
  }

  const animateYearCount = () => {
    animate(0, 3, {
      duration: 2,
      onUpdate: (v) => yearCount.current.textContent = v.toFixed()
    })
  }

  return (
    <section className={`py-20 ${darkMode ? "bg-gray-800" : "bg-blue-50"}`}>
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
            Our Experience
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className={`max-w-2xl mx-auto text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Delivering excellence through years of industry expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard 
            reference={clientCount} 
            functionName={animateClientCount} 
            heading="Clients Worldwide" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            darkMode={darkMode}
          />
          
          <StatCard 
            reference={projectCount} 
            functionName={animateProjectCount} 
            heading="Projects Completed" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            }
            darkMode={darkMode}
          />
          
          <StatCard 
            reference={yearCount} 
            functionName={animateYearCount} 
            heading="Years of Experience" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            darkMode={darkMode}
          />
        </div>
        
        <div className={`mt-20 p-8 rounded-xl ${darkMode ? "bg-gray-700" : "bg-white"} shadow-xl`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
                Ready to transform your ideas into reality?
              </h3>
              <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Our team of experts is ready to help you achieve your business goals with cutting-edge solutions tailored to your needs.
              </p>
              <a 
                href="#contact" 
                className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                  darkMode 
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-blue-50"}`}>
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 mr-2 ${darkMode ? "text-blue-400" : "text-blue-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h4 className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>Quality Assurance</h4>
                </div>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Rigorous testing for flawless results
                </p>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-blue-50"}`}>
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 mr-2 ${darkMode ? "text-blue-400" : "text-blue-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>Affordable Pricing</h4>
                </div>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Competitive rates for premium services
                </p>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-blue-50"}`}>
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 mr-2 ${darkMode ? "text-blue-400" : "text-blue-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h4 className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>Fast Delivery</h4>
                </div>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Quick turnaround on all projects
                </p>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-blue-50"}`}>
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 mr-2 ${darkMode ? "text-blue-400" : "text-blue-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>24/7 Support</h4>
                </div>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Always available to assist you
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const StatCard = ({ reference, functionName, heading, icon, darkMode }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={`rounded-xl p-8 ${darkMode ? "bg-gray-700" : "bg-white"} shadow-xl`}
    >
      <div className={`w-16 h-16 rounded-full ${darkMode ? "bg-blue-900/30" : "bg-blue-100"} flex items-center justify-center mb-6 mx-auto ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
        {icon}
      </div>
      
      <div className="text-center">
        <div className="flex items-center justify-center">
          <motion.span 
            className={`text-5xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`} 
            whileInView={functionName} 
            ref={reference}
          />
          <span className={`text-5xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>+</span>
        </div>
        
        <h3 className={`text-xl font-medium mt-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          {heading}
        </h3>
      </div>
    </motion.div>
  )
}

export default IndustryExperince
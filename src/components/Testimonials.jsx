import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import AddReview from './AddReviewModal';
import { getAllTestimonials } from '../redux/actions/testimonial';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Loader from './Loader';

const Testimonials = () => {
    const dispatch = useDispatch()
    const { loading, error, approvedTestimonials, message } = useSelector(state => state.testimonial)
    const { isAuthenticated } = useSelector(state => state.user)
    const { darkMode } = useSelector((state) => state.theme);

    useEffect(() => {
        dispatch(getAllTestimonials())
    }, [error, message])

    const [isOpen, setIsOpen] = useState(false)

    const handleReview = () => {
        setIsOpen(!isOpen)
    }

    return (
        <section className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"} py-12 transition-colors duration-300`}>
            <div className="container px-4 mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className={`text-4xl font-bold mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                        Client Testimonials
                    </h2>
                    <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
                    <p className={`max-w-2xl mx-auto text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        See what our clients have to say about their experience working with us
                    </p>
                </div>

                {isAuthenticated ? (
                    <div className="flex justify-center mb-8">
                        <button 
                            onClick={handleReview} 
                            className={`flex items-center px-6 py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 ${
                                darkMode 
                                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                                    : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Share Your Experience
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-center mb-8">
                        <Link 
                            to="/login" 
                            className={`flex items-center px-6 py-3 rounded-lg shadow-md transition-all duration-300 ${
                                darkMode 
                                    ? "bg-gray-700 hover:bg-gray-600 text-white" 
                                    : "bg-white hover:bg-gray-100 text-gray-800 border border-gray-200"
                            }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                            </svg>
                            Login to Submit Review
                        </Link>
                    </div>
                )}

                {isOpen && <AddReview onClose={() => setIsOpen(!isOpen)} />}

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader />
                    </div>
                ) : approvedTestimonials && approvedTestimonials.length > 0 ? (
                    <div className={`relative rounded-xl overflow-hidden shadow-xl ${darkMode ? "bg-gray-800" : "bg-white"} p-4 md:p-8`}>
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                        
                        <div className="absolute opacity-10 top-10 left-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-24 h-24 text-blue-500" viewBox="0 0 975.036 975.036">
                                <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                            </svg>
                        </div>
                        
                        <Carousel 
                            autoPlay={true} 
                            interval={5000} 
                            infiniteLoop={true} 
                            showThumbs={false} 
                            showStatus={false} 
                            showArrows={true}
                            showIndicators={true}
                            renderArrowPrev={(onClickHandler, hasPrev, label) =>
                                hasPrev && (
                                    <button 
                                        type="button" 
                                        onClick={onClickHandler} 
                                        title={label} 
                                        className="absolute left-0 z-10 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-20 hover:bg-opacity-40 rounded-full p-2 ml-4 focus:outline-none transition-all duration-300"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                        </svg>
                                    </button>
                                )
                            }
                            renderArrowNext={(onClickHandler, hasNext, label) =>
                                hasNext && (
                                    <button 
                                        type="button" 
                                        onClick={onClickHandler} 
                                        title={label} 
                                        className="absolute right-0 z-10 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-20 hover:bg-opacity-40 rounded-full p-2 mr-4 focus:outline-none transition-all duration-300"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </button>
                                )
                            }
                        >
                            {approvedTestimonials.map((testimonial) => (
                                <div 
                                    key={testimonial._id} 
                                    className={`px-4 py-8 md:py-12 md:px-16 ${darkMode ? "text-white" : "text-gray-800"}`}
                                >
                                    <div className="flex flex-col md:flex-row items-center">
                                        <div className="md:w-1/3 flex justify-center mb-8 md:mb-0">
                                            <div className="relative">
                                                <div className="absolute inset-0 rounded-full bg-blue-500 blur-md opacity-30 transform scale-110"></div>
                                                <img
                                                    src={testimonial?.user?.image?.url}
                                                    className="relative w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-lg"
                                                    alt={testimonial?.user?.name}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="md:w-2/3 md:pl-10 text-center md:text-left">
                                            <div className="flex mb-4 justify-center md:justify-start">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <svg 
                                                        key={star}
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        viewBox="0 0 24 24" 
                                                        fill="#FBBF24"
                                                        className="w-5 h-5"
                                                    >
                                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                    </svg>
                                                ))}
                                            </div>
                                            
                                            <p className={`text-lg md:text-xl mb-6 italic ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                                "{testimonial.description}"
                                            </p>
                                            
                                            <div>
                                                <h3 className="text-xl md:text-2xl font-bold">{testimonial.user.name}</h3>
                                                <p className={`${darkMode ? "text-blue-400" : "text-blue-600"} font-medium`}>
                                                    {testimonial.user.role || "Client"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                ) : (
                    <div className={`text-center py-16 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto mb-4 opacity-50">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                        </svg>
                        <p className="text-xl">No testimonials available yet. Be the first to share your experience!</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Testimonials
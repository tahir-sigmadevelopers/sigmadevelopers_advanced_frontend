import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { addReview } from '../redux/actions/testimonial'
import { useNavigate } from 'react-router-dom'

export default function AddReview() {
    const [open, setOpen] = useState(true)
    const [description, setDescription] = useState("")
    const [rating, setRating] = useState(5)
    const [hoverRating, setHoverRating] = useState(0)

    const cancelButtonRef = useRef(null)
    const { darkMode } = useSelector((state) => state.theme);
    const dispatch = useDispatch()

    const { error, message } = useSelector(state => state.testimonial)

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch({ type: "clearError" })
        }
        if (message) {
            toast.success(message)
            dispatch({ type: "clearMessage" })
        }
    }, [error, message])

    const navigate = useNavigate()
    const handleReview = async () => {
        if (description === "") return toast.error("Please add your review text")
        await dispatch(addReview(description))
        setOpen(!open)
        navigate("/")
        return null
    }

    // Handle star rating
    const handleRatingClick = (value) => {
        setRating(value)
    }

    const handleRatingHover = (value) => {
        setHoverRating(value)
    }

    const handleRatingLeave = () => {
        setHoverRating(0)
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className={`relative transform overflow-hidden rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg`}>
                                <div className={`${darkMode ? "bg-gray-800" : "bg-white"} px-4 pb-4 pt-5 sm:p-6 sm:pb-4`}>
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                            </svg>
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                            <Dialog.Title as="h3" className={`text-lg font-semibold leading-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
                                                Share Your Experience
                                            </Dialog.Title>
                                            
                                            <div className="mt-4">
                                                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                                    How would you rate your experience?
                                                </label>
                                                <div className="flex items-center space-x-1 mb-4">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            type="button"
                                                            className="focus:outline-none"
                                                            onClick={() => handleRatingClick(star)}
                                                            onMouseEnter={() => handleRatingHover(star)}
                                                            onMouseLeave={handleRatingLeave}
                                                        >
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                viewBox="0 0 24 24" 
                                                                fill={(hoverRating || rating) >= star ? "#FBBF24" : "none"}
                                                                stroke={(hoverRating || rating) >= star ? "#FBBF24" : "#D1D5DB"}
                                                                className="w-8 h-8 transition-colors duration-150"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                            </svg>
                                                        </button>
                                                    ))}
                                                </div>
                                                
                                                <label htmlFor="review-text" className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                                    Your Review
                                                </label>
                                                <textarea 
                                                    id="review-text"
                                                    required 
                                                    value={description} 
                                                    onChange={(e) => setDescription(e.target.value)} 
                                                    className={`w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                                                        darkMode 
                                                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
                                                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                                                    }`}
                                                    placeholder="Share your thoughts and experience..."
                                                    rows="6"
                                                ></textarea>
                                                <p className={`mt-2 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                    Your review will be submitted for approval before being published.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${darkMode ? "bg-gray-700" : "bg-gray-50"} px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6`}>
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto transition duration-150"
                                        onClick={handleReview}
                                    >
                                        Submit Review
                                    </button>
                                    <button
                                        type="button"
                                        className={`mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset sm:mt-0 sm:w-auto ${
                                            darkMode 
                                                ? "bg-gray-600 text-gray-200 ring-gray-500 hover:bg-gray-500" 
                                                : "bg-white text-gray-900 ring-gray-300 hover:bg-gray-50"
                                        }`}
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

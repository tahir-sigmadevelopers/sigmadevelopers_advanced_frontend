import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { deleteProfile } from '../../redux/actions/user'
import { DeleteOutline, WarningAmber } from '@mui/icons-material'

export default function DeleteProfile({ onClose }) {
    const [open, setOpen] = useState(true)
    const [isDeleting, setIsDeleting] = useState(false)
    const [confirmText, setConfirmText] = useState('')
    const cancelButtonRef = useRef(null)
    const dispatch = useDispatch()
    const { loading, error, message } = useSelector(state => state.user)
    const { darkMode } = useSelector(state => state.theme)

    // Effect to handle API response
    useEffect(() => {
        if (error) {
            toast.error(error)
            setIsDeleting(false)
        }
        if (message) {
            toast.success(message)
            handleClose()
        }
    }, [error, message])

    // Close the modal
    const handleClose = () => {
        setOpen(false)
        // Add a short delay to allow the closing animation to play
        setTimeout(() => {
            if (onClose) onClose()
        }, 200)
    }

    // Handle delete action
    const handleDelete = async () => {
        // Check for confirmation text
        if (confirmText !== 'delete my account') {
            toast.error('Please type "delete my account" to confirm')
            return
        }

        setIsDeleting(true)
        await dispatch(deleteProfile())
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog 
                as="div" 
                className="relative z-50" 
                initialFocus={cancelButtonRef} 
                onClose={handleClose}
            >
                {/* Background overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm transition-opacity" />
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
                            <Dialog.Panel className={`
                                relative transform overflow-hidden rounded-xl 
                                ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
                                text-left shadow-xl transition-all 
                                sm:my-8 sm:w-full sm:max-w-lg
                            `}>
                                {/* Warning Icon Header */}
                                <div className={`${darkMode ? 'bg-red-900/30' : 'bg-red-50'} px-4 py-6 sm:p-6 text-center`}>
                                    <div className="mx-auto flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-16 sm:w-16 mb-4 sm:mb-0 sm:mr-6 sm:float-left">
                                        <WarningAmber className="h-10 w-10 text-red-600" aria-hidden="true" />
                                    </div>
                                    <Dialog.Title as="h3" className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Delete Your Account
                                    </Dialog.Title>
                                    <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                                        This action cannot be undone. Think carefully before proceeding.
                                    </p>
                                </div>

                                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                        <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-red-900/20 text-red-200' : 'bg-red-50 text-red-800'}`}>
                                            <h4 className="text-lg font-medium mb-2">Warning: Permanent Data Loss</h4>
                                            <ul className="list-disc list-inside text-sm space-y-2">
                                                <li>Your account information will be permanently deleted</li>
                                                <li>All your content and data will be removed</li>
                                                <li>You will lose access to any premium features</li>
                                                <li>This action is irreversible and cannot be undone</li>
                                            </ul>
                                        </div>

                                        <div className="mt-6">
                                            <label htmlFor="confirm-text" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                                                Type "delete my account" to confirm
                                            </label>
                                            <input
                                                type="text"
                                                id="confirm-text"
                                                value={confirmText}
                                                onChange={(e) => setConfirmText(e.target.value)}
                                                className={`
                                                    block w-full px-3 py-2 border rounded-md shadow-sm
                                                    ${darkMode 
                                                        ? 'bg-gray-700 border-gray-600 text-white focus:border-red-500' 
                                                        : 'bg-white border-gray-300 text-gray-900 focus:border-red-500'
                                                    }
                                                    placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:ring-1
                                                `}
                                                placeholder="delete my account"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className={`
                                    px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t
                                    ${darkMode ? 'border-gray-700' : 'border-gray-200'}
                                `}>
                                    <button
                                        type="button"
                                        className={`
                                            inline-flex w-full justify-center items-center rounded-md px-4 py-2.5 
                                            text-sm font-medium text-white 
                                            ${confirmText === 'delete my account' ? 'bg-red-600 hover:bg-red-700' : 'bg-red-400 cursor-not-allowed'}
                                            shadow-sm transition-colors duration-200
                                            sm:ml-3 sm:w-auto
                                        `}
                                        onClick={handleDelete}
                                        disabled={isDeleting || confirmText !== 'delete my account'}
                                    >
                                        {isDeleting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Deleting...
                                            </>
                                        ) : (
                                            <>
                                                <DeleteOutline className="w-4 h-4 mr-1.5" />
                                                Delete Forever
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        className={`
                                            mt-3 inline-flex w-full justify-center rounded-md 
                                            ${darkMode 
                                                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                            }
                                            px-4 py-2.5 text-sm font-medium shadow-sm 
                                            ring-1 ring-inset ${darkMode ? 'ring-gray-600' : 'ring-gray-300'}
                                            transition-colors duration-200
                                            sm:mt-0 sm:w-auto
                                        `}
                                        onClick={handleClose}
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

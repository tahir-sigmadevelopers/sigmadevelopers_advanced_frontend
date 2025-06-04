import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { resetPassword } from '../redux/actions/user'
import Loader from './Loader'

const ResetPassword = () => {

    const params = useParams()
    const token = params.token

    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")

    const dispatch = useDispatch()

    const { loading, message, error } = useSelector(state => state.user)

    const resetFormSubmit = (e) => {
        e.preventDefault()

        dispatch(resetPassword(newPassword, confirmNewPassword, token));
        setNewPassword("")
        setConfirmNewPassword("")
    }

    useEffect(() => {
        if (message) {
            toast.success(message)
            dispatch({ type: "clearMessage" })
        }
        if (error) {
            toast.error(error)
            dispatch({ type: "clearError" })
        }

    }, [message, error, dispatch])


    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-28 w-auto rounded-full" src="/logo.webp" alt="Sigma Developers Programmer" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight t">Reset Password</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={resetFormSubmit} >


                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 ">Password</label>

                        </div>
                        <div className="mt-2">
                            <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-text-gray-800sm:text-sm sm:leading-6 px-2" />
                        </div>
                    </div>


                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 ">Confirm Password</label>
                        </div>
                        <div className="mt-2">
                            <input value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}
                                type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-text-gray-800sm:text-sm sm:leading-6 px-2" />
                        </div>
                    </div>

                    <div>
                        {
                            loading ? <Loader /> : <button type="submit" className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">Submit</button>
                        }
                    </div>
                </form>

                <p className="mt-10 text-center text-sm ">
                    Remember the Password?
                    <Link to={"/login"} className="font-semibold leading-6 hover:ml-2 ml-1">Login Here</Link>
                </p>
            </div>
        </div>
    )
}

export default ResetPassword
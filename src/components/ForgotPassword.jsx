import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../redux/actions/user'
import { toast } from 'react-hot-toast'
import Loader from './Loader'

const ForgotPassword = () => {


    const [email, setEmail] = useState("")

    const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const dispatch = useDispatch()

    const { loading, message, error } = useSelector(state => state.user)

    const forgotFormSubmit = (e) => {
        e.preventDefault()
        if (!isEmailValid(email)) {
            toast.error('Invalid Email Format');
            return;
        }

        dispatch(forgotPassword(email));

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
        <div className="flex min-h-[74vh] overflow-hidden flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-28 w-auto rounded-full" src="/logo.webp" alt="Sigma Developers Programmer" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot Password</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={forgotFormSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input value={email} name='email' onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-grey-600 sm:text-sm sm:leading-6 px-2" />
                        </div>
                    </div>


                    <div>
                        {
                            loading ? <Loader /> : <button type="submit" className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">Submit</button>
                        }
                    </div>
                </form>

                <p className="mt-10 text-center text-sm">
                    Remember the Password?
                    <Link to={"/login"} className="font-semibold leading-6 hover:ml-2 ml-1">Login Here</Link>
                </p>
            </div>
        </div>
    )
}

export default ForgotPassword
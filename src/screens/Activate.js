import axios from 'axios';
import jwt from 'jsonwebtoken';
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import { isAuth } from '../helpers/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import registerImg from '../assets/auth.png';



const Activate = ({match}) => {

    const [formData, setFormData] = useState({
        name: '',
        token: '',
        show: true
    })

    useEffect(() => {
        let token = match.params.token
        let { name } = jwt.decode(token)

        if(token) {
            setFormData({...formData,name,token})
        }

    }, [])


    const {token, name, show} = formData


    const handleSubmit = e => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/activate`, {
            token
        }).then(res => {
            setFormData({...formData, show: false})
            toast.success(res.data.message)
        }).catch(err => {
            toast.error(err.response.data.error)
        })

    }


    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            {isAuth() ? <Redirect to="/"/> : null}
            <ToastContainer/>
            <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">
                            Welcome {name}
                        </h1>


                        <form 
                            onSubmit={handleSubmit}
                            className="w-full flex-1 mt-8 text-indigo-500"
                        >
                            <div className="mx-auto max-w-xs relative">
                            <button 
                                type="submit"
                                className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"    
                            >
                                <FontAwesomeIcon icon={faUserPlus} size="1x"/>
                                <span className="ml-3">Activate Your Account</span>
                            </button>
                            </div>
                            <div className="my-12 border-b text-center">
                                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Or sign up again
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <Link to="/register">
                                    <FontAwesomeIcon icon={faSignInAlt}/>
                                    Register
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${registerImg})` }}>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Activate;
import React from 'react'
import { MdError } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
    const navigate = useNavigate();
    return (
        <div className='py-30 w-full flex flex-col justify-center items-center gap-2'>
            <div className='flex justify-center items-end gap-2'>
                <span className='text-5xl text-red-500'>
                    <MdError />
                </span>
                <h1 className='text-5xl font-bold'>404</h1>
                <p className='text-3xl font-semibold'>Page not found</p>
            </div>
            <button className='bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-white px-3 py-2 mt-4 rounded-lg cursor-pointer' onClick={() => navigate("/")}>Back to Home</button>
        </div>
    )
}

export default PageNotFound

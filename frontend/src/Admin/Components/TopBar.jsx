import React from 'react'
import { IoOptionsOutline } from "react-icons/io5";

function TopBar({ setSidebarOpen }) {
    return (
        <div className="sticky top-0 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between h-16 px-6">
                <button 
                    className="lg:hidden text-gray-500 hover:text-gray-700 rounded-sm p-1"
                    type='button'
                    onClick={() => setSidebarOpen(true)}
                >
                    <span className="text-2xl text-black">
                        <IoOptionsOutline />
                    </span>
                </button>
            </div>
        </div>
    )
}

export default TopBar 
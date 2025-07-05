import React, { useCallback, useEffect, useState } from 'react'
import { FaUsers, FaProjectDiagram, FaComments, FaStar, FaPlus } from 'react-icons/fa'
import { getAllUsers, getAllProjects, getAllContacts } from '../../Redux/Thunks/thunks'
import { useDispatch, useSelector } from 'react-redux'
import { CreateProject } from "./Components.js"

function Dashboard({ setActiveTab }) {
    const dispatch = useDispatch();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const { users } = useSelector((state)=>state.user);
    const { projects } = useSelector((state) => state.project);
    const { contacts } = useSelector((state) => state.contact);
    const unreadMessages = contacts?.filter((contact) => contact?.isRead == false).length || 0;
    // Mock data for demonstration
    const stats = [
        { title: 'Total Users', value: {count: users?.length}, icon: <FaUsers className="text-2xl" />, color: 'from-blue-500 to-blue-600' },
        { title: 'Projects', value: {count: projects?.length}, icon: <FaProjectDiagram className="text-2xl" />, color: 'from-purple-500 to-purple-600' },
        { title: 'New Messages', value: {count: unreadMessages}, icon: <FaComments className="text-2xl" />, color: 'from-green-500 to-green-600' },
    ];

    const closeCreateModal = useCallback(() => {
        setIsCreateModalOpen(false);
    });

    useEffect(()=>{
        dispatch(getAllUsers());
        dispatch(getAllProjects());
        dispatch(getAllContacts());
    },[])

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value.count}</p>
                            </div>
                            <div className={`bg-card-bg border border-card-border text-black p-3 rounded-lg`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="flex items-center justify-center p-4 bg-card-bg rounded-lg border border-card-border hover:bg-button-hover transition-all duration-300 cursor-pointer" onClick={() => setIsCreateModalOpen(true)}>
                        <FaPlus className="mr-2" />
                        Add New Project
                    </button>
                    <button className="flex items-center justify-center p-4 bg-card-bg border border-card-border hover:bg-button-hover rounded-lg transition-all duration-300 cursor-pointer" onClick={() => setActiveTab("users")}>
                        <FaUsers className="mr-2" />
                        Manage Users
                    </button>
                    <button className="flex items-center justify-center p-4 bg-card-bg rounded-lg border border-card-border hover:bg-button-hover transition-all duration-300 cursor-pointer" onClick={() => setActiveTab("contacts")}>
                        <FaComments className="mr-2" />
                        View Messages
                    </button>
                </div>
            </div>

            <CreateProject
            isOpen={isCreateModalOpen}
            onClose={closeCreateModal}
            />
        </div>
    )
}

export default Dashboard 
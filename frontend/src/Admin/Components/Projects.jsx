import React, { useCallback, useState } from 'react'
import { FaPlus, FaEye, FaEdit, FaTrash, FaCalendarAlt } from 'react-icons/fa'
import { destroyProject } from "../../Redux/Thunks/thunks.js"
import { useDispatch, useSelector } from 'react-redux'
import { CreateProject } from "./Components.js"
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'

function Projects() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { projects } = useSelector((state) => state.project);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editProject, setEditProject] = useState(null);
    // console.log(projects);

    const closeCreateModal = useCallback(() => {
        setIsCreateModalOpen(false);
        // document.body.style.overflow = "";
    });

    const handleProjectDelete = async (projectId) => {
        const deleteConfirmation = confirm("This project will be deleted permanently");
        if(deleteConfirmation) {
            const result = await dispatch(destroyProject(projectId));
            if(destroyProject.fulfilled.match(result)) {
                toast.success("Project removed successfully");
            } else {
                toast.error("Something went wrong");
            }
        }
    }

    const openCreateModal = () => {
        setEditProject(null);
        setIsCreateModalOpen(true);
    };

    const openEditModal = (project) => {
        setEditProject(project);
        setIsCreateModalOpen(true);
    };

    return (
        <div className="bg-white rounded-xl shadow-md">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Project Management</h3>
                    <button className="w-10 h-10 bg-text text-white px-4 rounded-lg hover:bg-card-border transition-all duration-300 relative flex justify-center items-center cursor-pointer" onClick={openCreateModal}>
                        <span className='absolute h-full w-full flex justify-center items-center text-lg'>
                            <FaPlus />
                        </span>
                    </button>
                </div>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.length === 0 ? (
                        <div>
                            <p className='font-semibold text-gray-600'>No projects to show</p>
                        </div>
                    ) : (
                        projects.map((project, index) => (
                            <div key={project.id || index} className="bg-card-bg border border-card-border rounded-lg p-6 hover:shadow-md transition-all duration-300">
                                <div className="flex flex-col items-start justify-between mb-2">
                                    <h4 className="font-semibold text-xl text-gray-900">{project.title}</h4>
                                    <p className='text-sm text-gray-600'>{project.category}</p>
                                </div>

                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-base">{project.description}</p>
                                    </div>
                                </div>

                                <div className='w-full flex gap-2 mb-4 flex-wrap'>
                                    {project.technologies.map((tech, index) => (
                                        <p key={index} className='bg-button-hover shadow-[0_0_2px_rgba(0,0,0,0.5)] px-3 py-0.5 rounded-full'>{tech}</p>
                                    ))}
                                </div>

                                <div className="flex items-center justify-end">
                                    <div className="flex items-center space-x-3">
                                        <button className="text-blue-600 hover:text-blue-900 cursor-pointer" onClick={() => navigate(`/project/${project._id}`)}><FaEye /></button>
                                        <button className="text-green-600 hover:text-green-900 cursor-pointer" onClick={() => openEditModal(project)}><FaEdit /></button>
                                        <button className="text-red-600 hover:text-red-900 cursor-pointer" onClick={() => handleProjectDelete(project._id)}><FaTrash /></button>
                                    </div>
                                </div>
                            </div>
                        )))}
                </div>
            </div>

            <CreateProject
                isOpen={isCreateModalOpen}
                onClose={closeCreateModal}
                project={editProject}
            />
        </div>
    )
}

export default Projects 
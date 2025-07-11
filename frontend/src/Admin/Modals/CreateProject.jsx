import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosClose } from "react-icons/io";
import { addNewProject, updateProject } from "../../Redux/Thunks/thunks.js";
import { useDispatch } from 'react-redux';
import toast from "react-hot-toast";

const technologies = [
    'HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'Node', 'MongoDB', 'SQL', 'PostgreSQL', 'Flutter', 'Kotlin', 'Java', 'Firebase', 'Express', 'SpringBoot', 'Python', 'Django', 'ElasticSearch', 'Kibana', "Terraform", "Docker", "Kubernetes", "AWS", "GCP"
];
const categories = [
    'Mobile App Development',
    'Web Development',
    'Data Analytics',
    'Cybersecurity',
    'Cloud Infrastructure',
    'Custom Software Development'
];

function CreateProject({ isOpen, onClose, project }) {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue } = useForm();
    
    useEffect(() => {
        if (project) {
            // Pre-fill form for edit
            setValue("title", project.title || "");
            setValue("description", project.description || "");
            setValue("projectUrl", project.projectUrl || "");
            setValue("category", project.category || "");
            setValue("technologies", project.technologies || []);
        } else {
            reset();
        }
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen, project, reset, setValue]);

    const onSubmit = async (formData) => {
        const projectData = new FormData();
        projectData.append("title", formData.title);
        projectData.append("description", formData.description);
        projectData.append("projectUrl", formData.projectUrl);
        projectData.append("category", formData.category);
        (formData.technologies || []).forEach((tech, index) => {
            projectData.append(`technologies[${index}]`, tech);
        });
        if (formData.projectImages && formData.projectImages.length > 0) {
            Array.from(formData.projectImages).forEach((file) => {
                projectData.append("projectImages", file);
            });
        }
        let result;
        if (project && project._id) {
            result = await dispatch(updateProject({ projectId: project._id, projectData }));
            if(updateProject.fulfilled.match(result)) {
                onClose();
                toast.success("Project updated successfully");
            } else {
                toast.error("Something went wrong");
            }
        } else {
            result = await dispatch(addNewProject(projectData));
            if(addNewProject.fulfilled.match(result)) {
                onClose();
                toast.success("Project added successfully");
            } else {
                toast.error("Something went wrong");
            }
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-10 px-4">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8 animate-fadeIn">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{project ? "Edit Project" : "Add New Project"}</h2>
                    <button
                        className="h-8 w-8 rounded-full cursor-pointer hover:bg-card-bg text-gray-700 text-3xl font-bold focus:outline-none flex justify-center items-center"
                        onClick={onClose}
                    >
                        <IoIosClose />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            placeholder="Project Title"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-card-border focus:outline-none"
                            {...register("title", {
                                required: { value: true, message: "Project title is required" }
                            })}
                        />
                        {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            rows="3"
                            placeholder="Project Description"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-card-border focus:outline-none"
                            {...register("description", {
                                required: { value: true, message: "Project description is required" }
                            })}
                        ></textarea>
                        {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                    </div>

                    {/* Project URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project URL</label>
                        <input
                            type="url"
                            placeholder="https://project-url.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-card-border focus:outline-none"
                            {...register("projectUrl", {
                                required: { value: true, message: "Project URL is required" }
                            })}
                        />
                        {errors.projectUrl && <p className='text-red-500'>{errors.projectUrl.message}</p>}
                    </div>

                    {/* Project Images */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Images</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-card-border focus:outline-none bg-white file:bg-gray-200 file:px-3 file:py-2 file:cursor-pointer file:mr-2 pr-4"
                            {...register("projectImages", {
                                required: { value: !project, message: "Upload atleast one project image" }
                            })}
                        />
                        <p className="text-xs text-gray-500 mt-1">Select at least five images (you can select multiple files).</p>
                        {/* Show existing images in edit mode */}
                        {project && project.images && project.images.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {project.images.map((img, idx) => (
                                    <div key={idx} className="w-16 h-16 rounded overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
                                        <img
                                            src={img.imageUrl || img.url || img}
                                            alt={`Project ${idx + 1}`}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Technologies */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {technologies.map((tech) => (
                                <label
                                    key={tech}
                                    className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-md hover:bg-card-bg transition cursor-pointer border border-gray-200"
                                >
                                    <input type="checkbox" value={tech} className="accent-text" {...register("technologies")} />
                                    <span className="text-sm text-gray-800">{tech}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-card-border focus:outline-none"
                            {...register("category", {
                                required: { value: true, message: "Project category is required" }
                            })}
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        {errors.category && <p className='text-red-500'>{errors.category.message}</p>}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 font-medium transition cursor-pointer"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 cursor-pointer rounded-lg font-semibold bg-button hover:bg-button-hover transition"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (project ? "Updating..." : "Adding...") : (project ? "Update" : "Add")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateProject;

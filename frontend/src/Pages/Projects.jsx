import React from 'react';
import { useSelector } from 'react-redux';
import { CallToAction, ProjectPageHeadline } from '../Components/Components.js';

function Projects() {
    const { projects } = useSelector((state) => state.project);

    return (
        <div className="w-full min-h-screen flex flex-col items-center px-4 pt-32 pb-12 bg-gradient-to-br from-gray-50 to-white">
            {/* Headline */}
            <ProjectPageHeadline />

            {/* Projects Grid */}
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6">
                {projects.length === 0 ? null : (projects.map((project, index) => (
                    <div
                        key={project.id || project._id || index}
                        className="bg-card-bg rounded-2xl p-7 shadow-xl border border-card-border hover:shadow-2xl transition-all duration-300 flex flex-col gap-4"
                    >
                        <div className="flex flex-col items-start gap-1 mb-2">
                            <h4 className="font-bold text-2xl mb-1 tracking-tight">
                                {project.title}
                            </h4>
                            <p className="text-xs font-semibold text-purple-500 uppercase tracking-wider bg-purple-50 px-2 py-0.5 rounded-full">
                                {project.category}
                            </p>
                        </div>
                        <div className="mb-2">
                            <p className="text-gray-700 text-base leading-relaxed">
                                {project.description}
                            </p>
                        </div>
                        <div className="w-full flex gap-2 flex-wrap mb-2">
                            {project.technologies.map((tech, idx) => (
                                <span
                                    key={idx}
                                    className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 font-medium px-3 py-1 rounded-full text-xs shadow-sm border border-blue-200"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )))}
            </div>

            {/* Call to Action */}
            <CallToAction 
            title="Ready to Start Your Project?"
            description="Let's discuss how we can bring your vision to life with cutting-edge technology and proven expertise."            
            />
        </div>
    );
}

export default Projects; 
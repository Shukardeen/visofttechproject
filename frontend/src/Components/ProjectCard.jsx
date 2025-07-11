import React from 'react'

function ProjectCard({ project }) {
    return (
        <div
            key={project.id}
            className={`group relative overflow-hidden rounded-xl border ${project.borderColor} bg-gradient-to-br ${project.bgGradient} p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}
        >
            {/* Project Icon */}
            <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed mb-4 text-base">
                {project.description}
            </p>

            {/* Tech Stack */}
            <div className="space-y-3">
                <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                        <div
                            key={techIndex}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                        >
                            <span className="text-xs font-medium text-gray-700">{tech}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Visual Placeholder */}
            <div className="mt-4 p-3 bg-white/50 rounded-lg border border-white/20">
                <div className="flex items-center justify-center h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-md">
                    <span className="text-gray-500 text-xs font-medium">
                        Project Screenshots & UI Mockups
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard

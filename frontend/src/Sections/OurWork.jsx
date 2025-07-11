import React from 'react'
import 'aos/dist/aos.css';
import { FaShoppingCart, FaHospital, FaChartLine, FaReact, FaNodeJs, FaVuejs, FaAngular, FaPython } from 'react-icons/fa';
import { SiMongodb, SiPostgresql, SiD3Dotjs, SiMysql } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';

function OurWork() {
    const navigate = useNavigate();
    
    const projects = [
        {
            title: "E-Commerce Platform",
            description: "Full-stack solution for online retail with advanced inventory management",
            image: "https://images.pexels.com/photos/7679796/pexels-photo-7679796.jpeg",
            techStack: [
                { name: "React", icon: FaReact, color: "text-cyan-400" },
                { name: "Node.js", icon: FaNodeJs, color: "text-green-600" },
                { name: "MongoDB", icon: SiMongodb, color: "text-green-500" }
            ],
            icon: FaShoppingCart,
            iconColor: "text-blue-600",
            bgGradient: "from-blue-50 to-cyan-50",
            borderColor: "border-blue-200"
        },
        {
            title: "Healthcare Management System",
            description: "Comprehensive patient management platform with secure data handling",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
            techStack: [
                { name: "Vue.js", icon: FaVuejs, color: "text-green-500" },
                { name: "Python", icon: FaPython, color: "text-blue-500" },
                { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-600" }
            ],
            icon: FaHospital,
            iconColor: "text-green-600",
            bgGradient: "from-green-50 to-emerald-50",
            borderColor: "border-green-200"
        },
        {
            title: "Financial Analytics Dashboard",
            description: "Real-time financial data visualization and reporting solution",
            image: "https://images.pexels.com/photos/15096572/pexels-photo-15096572.jpeg",
            techStack: [
                { name: "Angular", icon: FaAngular, color: "text-red-500" },
                { name: "D3.js", icon: SiD3Dotjs, color: "text-orange-500" },
                { name: "MySQL", icon: SiMysql, color: "text-blue-500" }
            ],
            icon: FaChartLine,
            iconColor: "text-purple-600",
            bgGradient: "from-purple-50 to-indigo-50",
            borderColor: "border-purple-200"
        }
    ];

    return (
        <section id="projects" className="py-10 bg-white">
            <div className="w-[83%] max-w-6xl mx-auto md:px-4" data-aos="fade-up">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Work</h2>
                    <p className="text-[1rem] md:text-lg text-gray-600 max-w-3xl mx-auto">
                        Discover some of our recent projects and success stories that demonstrate our expertise in delivering innovative solutions.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {projects.map((project, index) => (
                        <div 
                            key={index}
                            className={`group relative overflow-hidden rounded-xl border border-card-border bg-card-bg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer`}
                            onClick={() => navigate("/projects")}
                        >
                            {/* Project Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>

                            {/* Project Content */}
                            <div className="p-6">
                                {/* Project Icon & Title */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`p-2 rounded-lg bg-white shadow-md ${project.iconColor}`}>
                                        <project.icon className="text-lg" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
                                </div>

                                {/* Description */}
                                <p className="text-gray-700 leading-relaxed text-sm mb-4">
                                    {project.description}
                                </p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech, techIndex) => (
                                        <div 
                                            key={techIndex}
                                            className="flex items-center gap-1 px-2 py-1 bg-white/80 rounded-full text-xs font-medium text-gray-700"
                                        >
                                            <tech.icon className={`text-xs ${tech.color}`} />
                                            <span>{tech.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Hover Effect Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <button 
                        className="bg-button hover:bg-button-hover px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
                        onClick={() => navigate("/projects")}
                    >
                        View All Projects
                    </button>
                </div>
            </div>
        </section>
    )
}

export default OurWork

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const ProjectDetail = () => {
    const { id } = useParams();
    const { projects } = useSelector((state) => state.project);
    const project = projects.find((p) => p._id === id);
    console.log(project);

    if (!project) {
        return (
            <div className="max-w-2xl mx-auto pt-28 pb-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-white flex justify-center items-start pt-24 pb-10 px-2 md:px-4">
            <div className="w-full max-w-4xl rounded-2xl p-0 md:p-8 flex flex-col md:flex-row gap-8 md:gap-12">
                {/* Swiper Section */}
                <div className="md:w-1/2 w-full flex flex-col items-center">
                    <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-2xl transition-shadow duration-300 mb-6">
                        {project.images && project.images.length > 0 ? (
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 3500, disableOnInteraction: false }}
                                loop={true}
                                spaceBetween={10}
                                slidesPerView={1}
                                className="w-full h-64 md:h-80"
                            >
                                {project.images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="relative w-full h-64 md:h-80">
                                            <img
                                                src={image.imageUrl}
                                                alt={`Slide ${index + 1}`}
                                                className="w-full h-full object-cover rounded-2xl"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl pointer-events-none" />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <div className="w-full h-64 md:h-80 flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl">
                                <span className="text-gray-400 text-lg font-semibold">No Images Available</span>
                            </div>
                        )}
                    </div>
                    
                </div>
                {/* Info Section */}
                <div className="md:w-1/2 w-full px-8 md:p-0 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs font-semibold shadow-sm border border-blue-200">
                            {project.category}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
                        {project.title}
                    </h1>
                    <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6" />
                    <Link to={project.projectUrl} className='mb-4 text-blue-500 font-semibold hover:underline'>Check the result</Link>
                    <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
                        {project.description}
                    </p>
                    <div className="mb-4">
                        <span className="font-semibold text-gray-800">Technologies:</span>
                        <ul className="flex flex-wrap gap-2 mt-2">
                            {project.technologies && project.technologies.map((tech, idx) => (
                                <li key={idx} className="flex items-center gap-1 text-xs md:text-sm bg-gradient-to-r from-blue-50 to-purple-50 font-medium shadow px-3 py-1 rounded-full border border-blue-100">
                                    <span>{tech}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Add more project details here if needed */}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail; 
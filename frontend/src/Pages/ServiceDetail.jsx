import React from 'react';
import { useParams } from 'react-router-dom';
import { services } from '../utils/services.js';

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = services.find(s => s.title.replace(/\s+/g, '-').toLowerCase() === slug);

  if (!service) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
        <p className="text-gray-600">The requested service does not exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pt-24 pb-10 px-4">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4 text-blue-700">{service.title}</h1>
          <p className="text-base text-gray-700 mb-4">{service.description}</p>
          <div className="mb-4">
            <span className="font-semibold text-gray-800">Tech Stack:</span>
            <ul className="flex flex-wrap gap-3 mt-2">
              {service.techStack && service.techStack.map((tech, idx) => (
                <li key={idx} className="flex items-center gap-1 text-sm shadow-[0_0_2px_rgba(0,0,0,0.5)] px-3 py-1 rounded-full">
                  {tech.icon && <tech.icon className={tech.color + ' text-lg'} />}
                  <span>{tech.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <span className="inline-block px-3 py-2 rounded-md bg-blue-100 text-blue-700 font-semibold">
              {service.shortDescription}
            </span>
          </div>
        </div>
        {service.bgImage && (
          <img src={service.bgImage} alt={service.title} className="w-full object-cover md:w-1/2 rounded-lg shadow-lg mb-6 md:mb-0" />
        )}
      </div>
    </div>
  );
};

export default ServiceDetail; 
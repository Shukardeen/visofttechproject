import React from 'react';
import { useParams } from 'react-router-dom';
import { services } from '../utils/services.js';
import { StepsTimeline } from "../Components/Components.js";
import { serviceStepsMap } from "../utils/serviceStepsMap.js";

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = services.find(s =>
    s.title.replace(/\s+/g, '-').toLowerCase() === slug
  );

  if (!service) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
        <p className="text-gray-600">The requested service does not exist.</p>
      </div>
    );
  }

  const stepsData = serviceStepsMap[service.title];

  return (
    <div className="max-w-5xl mx-auto pt-24 pb-10 px-4">
      <h1 className="text-3xl font-bold text-center text-text mb-10">{service.title}</h1>

      {stepsData && <StepsTimeline steps={stepsData} />}

      <div className="mt-12">
        <p className="text-base text-justify text-gray-700 mb-4 whitespace-pre-line">
          {service.description}
        </p>

        <div className="mb-4">
          <span className="font-semibold text-gray-800">Tech Stack:</span>
          <ul className="flex flex-wrap gap-3 mt-4">
            {service.techStack?.map((tech, idx) => (
              <li
                key={idx}
                className="flex items-center gap-1 text-sm shadow-[0_0_2px_rgba(0,0,0,0.5)] px-3 py-1 rounded-full"
              >
                {tech.icon && <tech.icon className={`${tech.color} text-lg`} />}
                <span>{tech.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <span className="w-full bg-card-bg border-card-border text-center inline-block px-3 py-2 rounded-md text-text border font-semibold">
            {service.shortDescription}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;

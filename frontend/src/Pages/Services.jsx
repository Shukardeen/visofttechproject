import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CallToAction, ServiceCard, ServicePageHeadline } from "../Components/Components.js";
import { services } from '../utils/services.js';

function Services() {
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen flex flex-col items-center px-4 pt-32 pb-12 bg-gradient-to-br from-gray-50 to-white">
            {/* Headline */}
            <ServicePageHeadline />

            {/* Services Grid */}
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6">
                {services.map((service, index) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>

            {/* Call to Action */}
            <CallToAction
            gradient='from-green-600 to-blue-600'
            buttonTextColor='text-green-600'
            />
        </div>
    );
}

export default Services; 
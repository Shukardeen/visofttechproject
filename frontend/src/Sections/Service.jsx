import React from 'react'
import 'aos/dist/aos.css';
import { ServiceCard } from "../Components/Components.js";
import { useNavigate } from 'react-router-dom';
import { services } from '../utils/services';

function Service() {
  const navigate = useNavigate();

  return (
    <section id="services" className="py-10 bg-white place-items-center">
      <div className="w-[83%] max-w-6xl md:px-4" data-aos="fade-up">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-[1rem] md:text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive IT solutions tailored to your business needs. We deliver scalable, secure, and innovative services that drive growth and efficiency.
          </p>
        </div>
        
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} shortDescription={service.shortDescription} />
          ))}
        </div>
        
        <div className="text-center">
          <button 
            className="bg-button hover:bg-button-hover px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
            onClick={() => navigate("/services")}
          >
            View All Services
          </button>
        </div>
      </div>
    </section>
  )
}

export default Service

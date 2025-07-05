import React from 'react';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import { FaRocket, FaArrowRight } from 'react-icons/fa';

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="pt-32 pb-24 md:py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"></div>
      
      <div className="relative max-w-5xl mx-auto px-4 text-center">
        
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 text-gray-900 leading-tight" data-aos="fade-up">
          Reliable IT Services to{' '}
          <span className="text-[#c4a964]">
            Power Your Business
          </span>
        </h1>
        
        <p className="text-[1rem] md:text-xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up">
          Transform your business with cutting-edge technology solutions. We deliver scalable, secure, and innovative IT services that drive growth and efficiency.
        </p>
        
        <div className="flex justify-center gap-4 mb-8" data-aos="fade-up">
          <button 
            className="w-1/2 h-14 md:w-auto bg-button hover:bg-button-hover px-8 py-4 rounded-xl font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            onClick={() => navigate("/contact")}
            >
            Talk to Us
            <FaArrowRight className="text-sm" />
          </button>
          <button 
            className="w-1/2 h-14 md:w-auto border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 cursor-pointer whitespace-nowrap"
            onClick={() => navigate("/services")}
            >
            View Services
          </button>
        </div>
          <div className="mb-6" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card-bg rounded-full text-text border border-card-border text-sm font-medium mb-4">
              <FaRocket className="text-sm" />
              Empowering Businesses Through Technology
            </div>
          </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto" data-aos="fade-up">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#c4a964] mb-1">500+</div>
            <div className="text-gray-600 text-sm">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#c4a964] mb-1">10+</div>
            <div className="text-gray-600 text-sm">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#c4a964] mb-1">24/7</div>
            <div className="text-gray-600 text-sm">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero;
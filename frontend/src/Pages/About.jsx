import React from 'react';
import { FaRocket, FaLightbulb } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AboutPageHeadline, CallToAction, ExpertiseCard } from "../Components/Components.js";
import { expertiseItems } from "../utils/expertiseItems.js";
import { whyChooseUs } from "../utils/whyChooseUs.js";

function About() {
    const navigate = useNavigate();    

    return (
        <div className="w-full min-h-screen flex flex-col items-center px-4 pt-32 pb-12 bg-gradient-to-br from-gray-50 to-white">
            {/* Headline */}
            <AboutPageHeadline />

            {/* Mission Section */}
            <div className="w-full max-w-5xl mb-16">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <FaRocket className="text-2xl" />
                        <h2 className="text-2xl font-bold">Our Mission</h2>
                    </div>
                    <p className="text-lg text-blue-100 leading-relaxed">
                        To deliver reliable, scalable, and secure IT services that create measurable impact for businesses across the globe.
                    </p>
                </div>
            </div>

            {/* Expertise Section */}
            <div className="w-full max-w-5xl mb-16">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <FaLightbulb className="text-2xl text-yellow-500" />
                        <h2 className="text-2xl font-bold text-gray-900">Our Expertise</h2>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <ExpertiseCard textColor="blue-600" stats="10+" description="Years of Industry Experience" />
                    
                    <ExpertiseCard textColor="green-600" stats="500+" description="Successful Projects Delivered" />

                    <ExpertiseCard textColor="purple-600" stats="50+" description="Expert Team Members" />
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Technologies We Master</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {expertiseItems.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-200">
                                <item.icon className={`text-lg ${item.color}`} />
                                <span className="text-sm font-medium text-gray-700">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="w-full max-w-5xl mb-16">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {whyChooseUs.map((item, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <item.icon className="text-xl text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Call to Action */}
            <CallToAction 
            description="Let's discuss how our expertise can drive your digital transformation and accelerate your growth."
            gradient='from-green-600 to-blue-600'
            buttonTextColor='text-green-600'
            wrapperClass='mt-0 md:w-[83%] text-center'
            />
        </div>
    );
}

export default About; 
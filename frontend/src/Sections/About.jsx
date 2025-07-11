import React from 'react';
import 'aos/dist/aos.css';
import { whoweare } from "../assets/assets.js";
import { FaUsers, FaTrophy, FaHeadset, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();
    const features = [
        {
            icon: FaUsers,
            title: "Expert Team",
            description: "Certified professionals with 10+ years of industry experience",
            color: "text-blue-600"
        },
        {
            icon: FaTrophy,
            title: "Proven Results",
            description: "500+ successful projects delivered across various industries",
            color: "text-green-600"
        },
        {
            icon: FaHeadset,
            title: "24/7 Support",
            description: "Round-the-clock technical support and maintenance services",
            color: "text-purple-600"
        }
    ];

    return (
        <section id="about" className="py-10 bg-gradient-to-br from-gray-50 to-white">
            <div className="w-[83%] max-w-6xl mx-auto md:px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" data-aos="fade-up">
                    {/* Image Section */}
                    <div className="relative">
                        <div className="bg-card-border rounded-2xl p-1">
                            <img 
                                src={whoweare} 
                                alt="Team" 
                                className="rounded-xl w-full md:h-80 object-cover" 
                            />
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20"></div>
                        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-400 rounded-full opacity-20"></div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Who We Are</h2>
                            <p className="text-[1rem] md:text-lg text-gray-600 leading-relaxed">
                                We are a team of passionate technologists dedicated to delivering innovative IT solutions that transform businesses and drive digital success.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className={`p-3 bg-white rounded-lg shadow-md ${feature.color}`}>
                                        <feature.icon className="text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Call to Action */}
                        <div className="pt-4 flex justify-center items-center md:block">
                            <button className="bg-button hover:bg-button-hover px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer" onClick={() => navigate("/about")}>
                                <FaCheckCircle />
                                Learn More About Us
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About

import React from 'react'
import 'aos/dist/aos.css';
import { CallToAction } from "../Components/Components.js";
import { contactInfo } from "../utils/contactInfo.js";

function Contact() {   

    return (
        <section id="contact" className="py-10 bg-white">
            <div className="w-[83%] max-w-6xl mx-auto md:px-4" data-aos="fade-up">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
                    <p className="md:text-lg text-gray-600 max-w-3xl mx-auto">
                        Ready to start your project? Contact us today for a free consultation and let's discuss how we can bring your vision to life.
                    </p>
                </div>

                {/* Contact Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {contactInfo.map((info, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-card-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-lg ${info.bgColor}`}>
                                    <info.icon className={`text-xl ${info.color}`} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                                    <p className="text-gray-600 text-sm">{info.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <CallToAction
                buttonText='Start Your Project'
                buttonShape='rounded-xl'
                showArrow={true}
                wrapperClass='w-full mt-10 text-center'
                />
            </div>
        </section>
    )
}

export default Contact

import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaPaperPlane, FaUser } from 'react-icons/fa';
import { CgOrganisation } from "react-icons/cg";
import { ContactPageHeadline } from "../Components/Components.js"
import { useForm } from 'react-hook-form';
import { createContact } from "../Redux/Thunks/thunks.js";
import { useDispatch, useSelector } from 'react-redux';
import toast from "react-hot-toast";

function Contact() {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    
    const onSubmit = async (formData) => {
        if(!isAuthenticated) {
            alert("Please login to send message");
            return;
        }
        const result = await dispatch(createContact(formData));
        if(createContact.fulfilled.match(result)) {
            toast.success("Message sent successfully");
        } else {
            toast.error("Something went wrong");
        }
    }

    useEffect(() => {
        reset();
    }, [])

    return (
        <div className="w-full min-h-screen flex flex-col items-center px-4 pt-32 pb-12 bg-gradient-to-br from-gray-50 to-white">
            {/* Headline */}
            <ContactPageHeadline />

            {/* Main Content */}
            <div className="md:w-[83%] max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-card-border">
                    <div className="flex items-center gap-3 mb-6">
                        <FaEnvelope className="text-2xl text-blue-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Contact Form</h2>
                    </div>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name <span className='text-red-500'>*</span>
                            </label>
                            <div className="relative">
                                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    id="fullName"
                                    className="w-full pl-10 pr-4 py-3 border border-card-border rounded-lg focus:ring-2 focus:ring-card-border focus:outline-none focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your full name"
                                    {...register("name", {
                                        required: {value: true, message: "Name is required"}
                                    })}
                                />
                                {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email <span className='text-red-500'>*</span>
                            </label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    id="email"
                                    className={`w-full pl-10 pr-4 py-3 ${isAuthenticated ? "bg-gray-100 text-gray-600" : ""} border border-card-border rounded-lg focus:ring-2 focus:ring-card-border focus:outline-none focus:border-transparent transition-all duration-200`}
                                    placeholder="Enter your email address"
                                    {...register("email", {
                                        required: {value: true, message: "Email is required"}
                                    })}
                                />
                                {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                                Company <span>&#40;Optional&#41;</span>
                            </label>
                            <div className="relative">
                                <CgOrganisation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    id="company"
                                    className="w-full pl-10 pr-4 py-3 border border-card-border rounded-lg focus:ring-2 focus:ring-card-border focus:outline-none focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your company name"
                                    {...register("company")}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number (Optional)
                            </label>
                            <div className="relative">
                                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="tel"
                                    id="phone"
                                    className="w-full pl-10 pr-4 py-3 border border-card-border rounded-lg focus:ring-2 focus:ring-card-border focus:outline-none focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your phone number"
                                    {...register("phone", {
                                        maxLength: {value: 10, message: "Phone must contain ten digits"},
                                        minLength: {value: 10, message: "Phone must contain ten digits"}
                                    })}
                                />
                                {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                Message <span className='text-red-500'>*</span>
                            </label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                                <textarea
                                    id="message"
                                    rows="2"
                                    className="w-full pl-10 pr-4 py-3 border border-card-border rounded-lg focus:ring-2 focus:ring-card-border focus:outline-none focus:border-transparent transition-all duration-200 resize-none"
                                    placeholder="Tell us about your project or inquiry..."
                                    {...register("message", {
                                        required: {value: true, message: "Message is required"}
                                    })}
                                />
                                {errors.message && <p className='text-red-500'>{errors.message.message}</p>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-button hover:bg-button-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <FaPaperPlane />
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>

                {/* Contact Details */}
                <div className="space-y-8">
                    {/* Contact Information */}
                    <div className="bg-white rounded-2xl px-8 py-10 shadow-xl border border-card-border">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Details</h2>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <FaEnvelope className="text-xl text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                                    <p className="text-gray-600">hello@aitech.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-green-50 rounded-lg">
                                    <FaPhone className="text-xl text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                                    <p className="text-gray-600">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-purple-50 rounded-lg">
                                    <FaMapMarkerAlt className="text-xl text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                                    <p className="text-gray-600">123 Business Ave, Tech City, TC 12345</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Office Hours */}
                    <div className="bg-white rounded-2xl px-8 py-10 shadow-xl border border-card-border">
                        <div className="flex items-center gap-3 mb-6">
                            <FaClock className="text-2xl text-blue-600" />
                            <h2 className="text-2xl font-bold text-gray-900">Office Hours</h2>
                        </div>
                        
                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-700">Monday - Friday</span>
                                <span className="font-semibold text-gray-900">9:00 AM – 6:00 PM</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-700">Saturday - Sunday</span>
                                <span className="font-semibold text-gray-900">Closed</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;

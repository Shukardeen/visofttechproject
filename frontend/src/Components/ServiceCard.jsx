import React from 'react'

function ServiceCard({ service, shortDescription }) {
    return (
        <div className={`cursor-pointer group relative overflow-hidden rounded-xl bg-card-bg border border-card-border p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}>
            {/* Service Icon */}
            <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-white shadow-md ${service?.iconColor}`}>
                    <service.icon className="text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{service?.title}</h3>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed mb-4 text-base">
                {shortDescription ? shortDescription : service?.description}
            </p>

            {/* Tech Stack */}
            {!shortDescription && (
                <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Technologies & Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {service?.techStack.map((tech, techIndex) => (
                            <div
                                key={techIndex}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                            >
                                <tech.icon className={`text-sm ${tech.color}`} />
                                <span className="text-xs font-medium text-gray-700">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Visual Placeholder */}
            {!shortDescription && (
                <div className="mt-4 p-3 bg-white/50 rounded-lg border border-white/20 inset-shadow-[0_0_5px_rgba(0,0,0,0.3)]">
                    <img src={service?.bgImage} alt="serviceImage" className='w-full h-30 object-cover rounded-lg shadow-lg' />
                </div>
            )}
        </div>
    )
}

export default ServiceCard

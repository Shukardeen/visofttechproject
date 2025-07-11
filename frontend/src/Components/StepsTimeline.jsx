import React from "react";

const StepsTimeline = ({ steps }) => {
  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-4">
      {/* Vertical dotted center line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full border-l-2 border-dotted border-gray-300 z-0" />

      <div className="flex flex-col gap-16 relative z-10">
        {steps.map((step, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center justify-between gap-8"
            >
              {/* Text Section */}
              <div
                className={`md:w-5/12 ${
                  isEven ? "md:order-1 text-right" : "md:order-2 text-left"
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>

              {/* Dot in center */}
              <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
                <div className="w-6 h-6 bg-text border-4 border-white rounded-full shadow-md z-10" />
              </div>

              {/* Image Section */}
              <div
                className={`md:w-5/12 ${
                  isEven ? "md:order-2" : "md:order-1"
                }`}
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full aspect-video object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepsTimeline;

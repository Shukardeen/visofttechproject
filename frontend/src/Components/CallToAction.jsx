import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CallToAction({
  title = "Ready to Transform Your Business?",
  description = "Let's discuss how our comprehensive IT solutions can drive your digital transformation and accelerate your growth.",
  buttonText = "Get Started Today",
  buttonShape = "rounded-full",
  showArrow = false,
  wrapperClass = "w-full md:w-[83%] mt-10 text-center",
}) {
  const navigate = useNavigate();

  return (
    <div className={`${wrapperClass}`}>
      <div
        className={`bg-gradient-to-r from-text to-card-border rounded-2xl p-8 w-full`}
      >
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className={`mb-6 max-w-2xl mx-auto `}>{description}</p>
        <button
          className={`bg-button hover:bg-button-hover px-8 text-black py-3 cursor-pointer ${buttonShape} font-semibold transition-all duration-200 flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl border`}
          onClick={() => navigate("/contact")}
        >
          {buttonText}
          {showArrow && <FaArrowRight className="text-sm" />}
        </button>
      </div>
    </div>
  );
}

export default CallToAction;

import React from 'react'
import { Link } from 'react-router-dom'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaArrowRight } from 'react-icons/fa'
import { logo } from '../assets/assets.js'

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  const services = [
    "Custom Software Development",
    "Cybersecurity Solutions", 
    "Cloud Infrastructure",
    "Data Analytics",
    "Mobile App Development",
    "IT Consulting"
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { icon: FaInstagram, href: "#", label: "Instagram" }
  ];

  return (
    <footer className="w-full bg-black text-white">
      {/* Main Footer Content */}
      <div className="w-[83%] max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <Link to="/" className='text-3xl font-bold'>Logo</Link>
              <p className="text-gray-300 leading-relaxed mt-3">
                Delivering innovative IT solutions that transform businesses and drive digital success. 
                We are committed to excellence and cutting-edge technology.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-text transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white mb-4">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-gray-300 hover:text-text transition-colors duration-300">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaPhone className="text-text" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-text" />
                <span className="text-gray-300">hello@aitech.com</span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-text" />
                <span className="text-gray-300">123 Business Ave, Tech City, TC 12345</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <p className="text-gray-300 text-sm">Follow us on social media</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-gray-700 hover:bg-text rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="text-gray-300 hover:text-white transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700">
        <div className="w-[83%] max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {currentYear} AI SoftTech. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/" className="text-gray-400 text-center hover:text-blue-400 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/" className="text-gray-400 text-center hover:text-blue-400 transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/" className="text-gray-400 text-center hover:text-blue-400 transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

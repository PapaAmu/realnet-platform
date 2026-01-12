// components/ServicesSummaryCompact.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FaCode, 
  FaMobileAlt, 
  FaLaptopCode, 
  FaServer, 
  FaShoppingCart, 
  FaArrowRight,
  FaRocket
} from 'react-icons/fa';

const ServicesSummaryCompact = () => {
  const services = [
    {
      icon: <FaCode className="text-2xl" />,
      title: "Website Development",
      description: "Custom, responsive websites built with modern technologies",
      href: "/solutions/web-development",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50/80 to-cyan-50/80",
      borderColor: "border-blue-200/50"
    },
    {
      icon: <FaMobileAlt className="text-2xl" />,
      title: "Mobile Apps",
      description: "iOS & Android applications for your business",
      href: "/solutions/mobile-app-development",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50/80 to-emerald-50/80",
      borderColor: "border-green-200/50"
    },
    {
      icon: <FaLaptopCode className="text-2xl" />,
      title: "Software Solutions",
      description: "Custom business software and systems",
      href: "/solutions/software-development",
      gradient: "from-purple-500 to-violet-500",
      bgGradient: "from-purple-50/80 to-violet-50/80",
      borderColor: "border-purple-200/50"
    },
    {
      icon: <FaShoppingCart className="text-2xl" />,
      title: "Ecommerce Stores",
      description: "Complete online store development",
      href: "/solutions/web-development/e-commerce-quote-request",
      gradient: "from-red-500 to-pink-500",
      bgGradient: "from-red-50/80 to-pink-50/80",
      borderColor: "border-red-200/50"
    },
    {
      icon: <FaServer className="text-2xl" />,
      title: "Hosting & Emails",
      description: "Reliable hosting and business email solutions",
      href: "/solutions/email-and-hosting",
      gradient: "from-indigo-500 to-blue-500",
      bgGradient: "from-indigo-50/80 to-blue-50/80",
      borderColor: "border-indigo-200/50"
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-orange-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/5 to-violet-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full px-6 py-3 mb-6 shadow-lg">
            <FaRocket className="text-orange-500 text-lg" />
            <span className="text-sm font-semibold text-gray-700">Our Digital Solutions</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            Transform Your <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Digital Presence</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive digital solutions designed to elevate your business with cutting-edge technology and innovative design
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group relative"
            >
              {/* Glassmorphism Card */}
              <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Animated Background */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon Container */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <div className="text-white">
                      {service.icon}
                    </div>
                  </div>

                  {/* Text Content */}
                  <h3 className="font-black text-gray-900 text-lg mb-3 text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 group-hover:bg-clip-text transition-all duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed text-center mb-4 group-hover:text-gray-700 transition-colors">
                    {service.description}
                  </p>

                  {/* Animated Arrow */}
                  <div className="flex justify-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                      <FaArrowRight className={`text-xs text-transparent bg-gradient-to-r ${service.gradient} bg-clip-text group-hover:translate-x-0.5 transition-transform`} />
                    </div>
                  </div>
                </div>

                {/* Hover Border */}
                <div className={`absolute inset-0 rounded-2xl border-2 ${service.borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              </div>

              {/* Floating Particles (on hover) */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-500"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-500 delay-150"></div>
            </Link>
          ))}
        </div>

        {/* Enhanced CTA */}
        <div className="text-center relative">
          {/* Animated Background for CTA */}
          <div className="absolute inset-0 flex justify-center">
            <div className="w-48 h-48 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse"></div>
          </div>
          
          <Link
            href="/services"
            className="relative inline-flex items-center bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-md font-black text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group/btn shadow-lg"
          >
           
            
            {/* Button Content */}
            <span className="relative z-10">Explore All Services</span>
            <FaArrowRight className="ml-3 relative z-10 group-hover/btn:translate-x-2 transition-transform duration-300" />
            
            {/* Border Animation */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 opacity-0 group-hover/btn:opacity-100 animate-pulse"></div>
            <div className="absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 m-0.5"></div>
          </Link>

          {/* Supporting Text */}
          <p className="text-gray-500 text-sm mt-6 font-medium">
            Trusted by businesses across South Africa
          </p>
        </div>
      </div>

      {/* Bottom Gradient Border */}
    </section>
  );
};

export default ServicesSummaryCompact;
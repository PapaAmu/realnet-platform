"use client";

import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  FaShoppingCart, 
  FaHeartbeat, 
  FaGraduationCap, 
  FaHome, 
  FaLandmark, 
  FaUtensils, 
  FaIndustry, 
  FaRocket,
  FaArrowRight
} from "react-icons/fa";

const Industries = () => {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const industries = [
    { 
      id: 1, 
      name: "E-Commerce", 
      description: "Custom online stores with secure payment integration, inventory management, and conversion optimization.",
      stats: "300% avg growth",
      icon: FaShoppingCart,
      color: "blue"
    },
    { 
      id: 2, 
      name: "Healthcare", 
      description: "HIPAA-compliant solutions for clinics, telehealth platforms, and electronic medical records.",
      stats: "40% faster processing",
      icon: FaHeartbeat,
      color: "emerald"
    },
    { 
      id: 3, 
      name: "Education", 
      description: "E-learning platforms, student management systems, and virtual classroom solutions.",
      stats: "60% engagement increase",
      icon: FaGraduationCap,
      color: "primary"
    },
    { 
      id: 4, 
      name: "Real Estate", 
      description: "Property listing platforms, virtual tours, CRM systems, and agent management tools.",
      stats: "2x more leads",
      icon: FaHome,
      color: "amber"
    },
    { 
      id: 5, 
      name: "Finance", 
      description: "Fintech applications, secure banking solutions, and real-time financial data visualization.",
      stats: "99.9% uptime",
      icon: FaLandmark,
      color: "cyan"
    },
    { 
      id: 6, 
      name: "Hospitality", 
      description: "Booking engines, hotel management systems, and customer experience platforms.",
      stats: "45% booking increase",
      icon: FaUtensils,
      color: "rose"
    },
    { 
      id: 7, 
      name: "Manufacturing", 
      description: "Supply chain management, IoT monitoring, and production efficiency systems.",
      stats: "30% efficiency gain",
      icon: FaIndustry,
      color: "orange"
    },
    { 
      id: 8, 
      name: "Startups", 
      description: "MVP development, scalable architecture, and investor-ready applications.",
      stats: "50% faster to market",
      icon: FaRocket,
      color: "indigo"
    },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative py-24 lg:py-32 bg-white dark:bg-[#050505] overflow-hidden transition-colors duration-300"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gray-200 dark:bg-white/10" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gray-200 dark:bg-white/10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-50 dark:from-white/[0.02] to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-600 dark:text-white/60 font-medium mb-6">
            <FaIndustry className="w-4 h-4 text-blue-600 dark:text-primary-400" />
            Industry Expertise
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
            Solutions For Every
            <br />
            <span className="text-blue-600 dark:text-primary-400">
              Industry Vertical
            </span>
          </h2>
          
          <p className="mt-6 text-lg text-gray-600 dark:text-white/50 leading-relaxed">
            We bring deep domain expertise across diverse sectors, delivering 
            tailored digital solutions that drive measurable business outcomes.
          </p>
        </motion.div>

        {/* Horizontal Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[500px]"
        >
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              onClick={() => setActiveIndustry(index)}
              onMouseEnter={() => setActiveIndustry(index)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                activeIndustry === index 
                  ? "lg:flex-[3] flex-1" 
                  : "lg:flex-1 flex-none h-20 lg:h-auto"
              }`}
            >
              {/* Background */}
              <div className={`absolute inset-0 transition-colors duration-500 ${
                activeIndustry === index
                  ? "bg-gray-900 dark:bg-white/[0.03]"
                  : "bg-gray-100 dark:bg-white/[0.02] hover:bg-gray-200 dark:hover:bg-white/[0.04]"
              }`} />
              
              {/* Border */}
              <div className={`absolute inset-0 rounded-2xl border transition-colors duration-500 ${
                activeIndustry === index
                  ? "border-blue-500/30 dark:border-primary-500/30"
                  : "border-gray-200 dark:border-white/[0.06]"
              }`} />

              {/* Content Container */}
              <div className="relative h-full p-6 flex flex-col justify-between">
                
                {/* Collapsed State (Mobile/Inactive) */}
                <div className={`flex lg:flex-col items-center lg:items-start gap-4 transition-all duration-500 ${
                  activeIndustry === index ? "opacity-0 lg:opacity-100" : "opacity-100"
                }`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    activeIndustry === index 
                      ? "bg-blue-500/10 dark:bg-primary-500/10" 
                      : "bg-white dark:bg-white/5"
                  }`}>
                    <industry.icon className={`w-6 h-6 transition-colors duration-300 ${
                      activeIndustry === index 
                        ? "text-blue-600 dark:text-primary-400" 
                        : "text-gray-600 dark:text-white/60"
                    }`} />
                  </div>
                  
                  <h3 className={`text-lg font-semibold whitespace-nowrap transition-colors duration-300 ${
                    activeIndustry === index 
                      ? "text-white" 
                      : "text-gray-900 dark:text-white/80"
                  }`}>
                    {industry.name}
                  </h3>
                </div>

                {/* Expanded Content */}
                <AnimatePresence mode="wait">
                  {activeIndustry === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="mt-6 lg:mt-0"
                    >
                      <p className="text-gray-400 dark:text-white/50 text-sm lg:text-base leading-relaxed mb-6">
                        {industry.description}
                      </p>
                      
                      <div className="flex items-center gap-4 mb-6">
                        <div className="px-4 py-2 rounded-full bg-white/10 dark:bg-white/5 border border-white/10">
                          <span className="text-2xl font-bold text-white dark:text-white">
                            {industry.stats}
                          </span>
                        </div>
                      </div>

                      <Link 
                        href={`/industries/${industry.name.toLowerCase().replace(/ /g, '-')}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 dark:text-primary-400 hover:text-blue-300 dark:hover:text-primary-300 transition-colors"
                      >
                        View Solutions
                        <FaArrowRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Index Number */}
                <div className={`absolute bottom-6 right-6 text-6xl font-bold transition-all duration-500 ${
                  activeIndustry === index 
                    ? "text-white/10 dark:text-white/5" 
                    : "text-gray-200 dark:text-white/[0.02]"
                }`}>
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Active Indicator Line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-blue-500 dark:bg-primary-500 transition-transform duration-500 origin-left ${
                activeIndustry === index ? "scale-x-100" : "scale-x-0"
              }`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-gray-200 dark:border-white/10"
        >
          {[
            { value: "8+", label: "Industries Served" },
            { value: "150+", label: "Projects Delivered" },
            { value: "95%", label: "Client Retention" },
            { value: "10+", label: "Years Experience" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 dark:text-white/40 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link
            href="/contact-us"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-medium hover:shadow-2xl hover:shadow-gray-900/20 dark:hover:shadow-white/10 transition-all duration-300"
          >
            <span>Discuss Your Industry</span>
            <FaArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Industries;
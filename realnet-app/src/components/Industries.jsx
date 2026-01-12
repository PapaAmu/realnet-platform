"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const MotionLink = motion(Link);

const Industries = () => {
  const [hoveredIndustry, setHoveredIndustry] = useState(null);

  const industries = [
    { id: 1, name: "E-Commerce", description: "Custom online stores with secure payment integration and inventory management.", stats: "300% average growth" },
    { id: 2, name: "Healthcare", description: "HIPAA-compliant solutions for clinics, telehealth, and medical records management.", stats: "40% faster patient processing" },
    { id: 3, name: "Education", description: "E-learning platforms, student management systems, and virtual classroom solutions.", stats: "60% engagement increase" },
    { id: 4, name: "Real Estate", description: "Property listing platforms, virtual tours, and agent management systems.", stats: "2x more leads generated" },
    { id: 5, name: "Finance", description: "Fintech applications, banking solutions, and financial data visualization tools.", stats: "99.9% uptime guarantee" },
    { id: 6, name: "Hospitality", description: "Booking systems, hotel management, and customer experience platforms.", stats: "45% booking increase" },
    { id: 7, name: "Manufacturing", description: "Supply chain management, inventory tracking, and production monitoring systems.", stats: "30% efficiency improvement" },
    { id: 8, name: "Startups", description: "MVP development, scalable architecture, and investor-ready applications.", stats: "50% faster to market" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.3, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const IconWrapper = ({ children, isHovered }) => (
    <div
      className={`p-3 rounded-lg transition-all duration-300 ${
        isHovered
          ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      {children}
    </div>
  );

  return (
    <div className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Industries We <span className="text-orange-500">Serve</span>
          </h2>
          <p className="mt-6 max-w-3xl text-xl text-gray-600 mx-auto leading-relaxed">
            Delivering cutting-edge digital solutions across diverse sectors,
            driving innovation and measurable business growth through
            technology.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {industries.map((industry) => (
            <motion.div
              key={industry.id}
              className="group cursor-pointer"
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndustry(industry.id)}
              onMouseLeave={() => setHoveredIndustry(null)}
            >
              <div
                className={`bg-white rounded-2xl p-8 h-full transition-all duration-500 border-2 ${
                  hoveredIndustry === industry.id
                    ? "border-orange-500 shadow-2xl scale-105"
                    : "border-gray-100 shadow-lg hover:shadow-xl"
                }`}
              >
                <div className="mb-6">
                  <IconWrapper isHovered={hoveredIndustry === industry.id}>
                    <div className="w-6 h-6 bg-current rounded-full opacity-90"></div>
                  </IconWrapper>
                </div>

                <h3
                  className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
                    hoveredIndustry === industry.id ? "text-orange-500" : "text-gray-900"
                  }`}
                >
                  {industry.name}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                  {industry.description}
                </p>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 tracking-wide uppercase">
                    {industry.stats}
                  </p>
                </div>

                <div
                  className={`mt-4 h-1 w-12 rounded-full transition-all duration-300 ${
                    hoveredIndustry === industry.id ? "bg-gradient-to-r from-orange-500 to-pink-500 w-16" : "bg-gray-200"
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <MotionLink
            href="/contact-us"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Project
            <motion.svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </motion.svg>
          </MotionLink>
        </motion.div>
      </div>
    </div>
  );
};

export default Industries;

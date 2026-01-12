// components/pages/NotFound.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaHome, FaArrowLeft, FaSearch, FaRocket } from "react-icons/fa";

const NotFoundComponent = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      y: {
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8">
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-400/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-pink-400/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-amber-400/10 rounded-full blur-xl"></div>
        </div>
      </div>

      <motion.div
        className="max-w-4xl w-full bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-orange-200/50"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
          {/* Left side - Illustration and error code */}
          <div className="flex flex-col items-center justify-center">
            <motion.div
              className="relative mb-8"
              variants={itemVariants}
              animate={floatingAnimation}
            >
              <div className="text-9xl font-bold text-gray-800 opacity-10">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-64 h-64" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#FF9E5E" d="M44.7,-76.1C58.1,-69.5,69.1,-58.1,77.2,-44.3C85.3,-30.5,90.5,-14.3,90.4,0.1C90.3,14.4,85,28.8,76.1,40.3C67.2,51.8,54.8,60.4,40.9,67.6C27,74.8,11.5,80.6,-3.7,85.8C-18.9,91,-37.8,95.5,-51.7,89.2C-65.6,82.9,-74.5,65.7,-80.3,48C-86.1,30.2,-88.9,11.8,-86.8,-5.7C-84.7,-23.2,-77.8,-39.8,-66.9,-51.5C-56,-63.2,-41.2,-70.1,-26.5,-75.9C-11.8,-81.8,2.8,-86.7,16.9,-85.2C31,-83.7,44.5,-75.9,55.3,-65.8L44.7,-76.1Z" transform="translate(100 100)" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
                    className="text-6xl font-bold text-white"
                  >
                    404
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Lost in Space</h2>
              <p className="text-gray-600">The page you're looking for doesn't exist or has been moved.</p>
            </motion.div>
          </div>

          {/* Right side - Content and actions */}
          <div className="flex flex-col justify-center">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Oops!
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-700 mb-8"
              variants={itemVariants}
            >
              It seems like the page you're trying to reach is no longer available. This might be because of a broken link, the page has been moved, or you entered the wrong URL.
            </motion.p>

            <motion.div 
              className="space-y-4 mb-8"
              variants={itemVariants}
            >
              <h3 className="font-semibold text-gray-800">Here are some helpful links instead:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <FaHome className="text-orange-500 mr-2" />
                  <Link href="/" className="hover:text-orange-600 transition-colors duration-200">Homepage</Link>
                </li>
                <li className="flex items-center">
                  <FaSearch className="text-orange-500 mr-2" />
                  <Link href="/services" className="hover:text-orange-600 transition-colors duration-200">Our Services</Link>
                </li>
                <li className="flex items-center">
                  <FaRocket className="text-orange-500 mr-2" />
                  <Link href="/projects" className="hover:text-orange-600 transition-colors duration-200">Our Projects</Link>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200 w-full sm:w-auto"
                >
                  <FaHome className="text-sm" />
                  Go to Homepage
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-800 font-medium rounded-xl shadow-sm hover:bg-gray-50 transition-colors duration-200 w-full sm:w-auto"
                onClick={() => window.history.back()}
              >
                <FaArrowLeft className="text-sm" />
                Go Back
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Additional decorative elements */}
        <div className="absolute bottom-4 right-4 opacity-10">
          <svg width="160" height="160" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FF9E5E" d="M44.7,-76.1C58.1,-69.5,69.1,-58.1,77.2,-44.3C85.3,-30.5,90.5,-14.3,90.4,0.1C90.3,14.4,85,28.8,76.1,40.3C67.2,51.8,54.8,60.4,40.9,67.6C27,74.8,11.5,80.6,-3.7,85.8C-18.9,91,-37.8,95.5,-51.7,89.2C-65.6,82.9,-74.5,65.7,-80.3,48C-86.1,30.2,-88.9,11.8,-86.8,-5.7C-84.7,-23.2,-77.8,-39.8,-66.9,-51.5C-56,-63.2,-41.2,-70.1,-26.5,-75.9C-11.8,-81.8,2.8,-86.7,16.9,-85.2C31,-83.7,44.5,-75.9,55.3,-65.8L44.7,-76.1Z" transform="translate(80 80)" />
          </svg>
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default NotFoundComponent;
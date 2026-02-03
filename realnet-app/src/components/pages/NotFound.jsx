// components/pages/NotFound.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaHome, FaArrowLeft, FaSearch, FaRocket } from "react-icons/fa";

const NotFoundComponent = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const helpfulLinks = [
    { icon: FaHome, label: "Homepage", href: "/" },
    { icon: FaSearch, label: "Services", href: "/services" },
    { icon: FaRocket, label: "Projects", href: "/projects" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] dark:bg-[#050505] px-6 py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 max-w-2xl w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Large 404 */}
        <motion.div variants={itemVariants} className="relative mb-8">
          <div className="text-[12rem] md:text-[16rem] font-bold text-white/[0.03] leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl md:text-8xl font-bold text-white tracking-tighter">
              4<span className="text-primary-400">0</span>4
            </span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div variants={itemVariants} className="space-y-6 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Page Not Found
          </h1>
          <p className="text-lg text-white/50 max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved to a new location.
          </p>
        </motion.div>

        {/* Helpful Links */}
        <motion.div variants={itemVariants} className="mb-12">
          <p className="text-sm text-white/30 uppercase tracking-wider mb-6">
            Helpful Links
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {helpfulLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-primary-500/30 hover:bg-white/10 transition-all duration-300"
              >
                <link.icon className="w-4 h-4 text-primary-400" />
                <span className="text-sm font-medium">{link.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors shadow-lg shadow-white/10"
            >
              <FaHome className="w-4 h-4" />
              Back to Home
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.history.back()}
            className="flex items-center gap-3 px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-medium hover:bg-white/5 hover:border-white/30 transition-all"
          >
            <FaArrowLeft className="w-4 h-4" />
            Go Back
          </motion.button>
        </motion.div>

        {/* Bottom Quote */}
        <motion.p
          variants={itemVariants}
          className="mt-16 text-white/20 text-sm"
        >
          Lost in the digital void since {new Date().getFullYear()}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NotFoundComponent;
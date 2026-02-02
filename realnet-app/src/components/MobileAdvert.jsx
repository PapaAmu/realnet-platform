"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { FaApple, FaGooglePlay, FaRocket, FaStar, FaDownload, FaCheck } from "react-icons/fa";

const Advert = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const phoneY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const features = [
    { icon: FaStar, text: "App Store Optimized" },
    { icon: FaDownload, text: "Play Store Ready" },
    { icon: FaRocket, text: "Launch Support" }
  ];

  return (
    <section
      ref={containerRef}
      id="pricing"
      className="relative py-32 lg:py-40 bg-gray-50 dark:bg-[#050505] overflow-hidden transition-colors duration-300"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div 
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-400/10 dark:bg-violet-600/10 rounded-full blur-3xl"
          style={{ y: backgroundY }}
        />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-400/10 dark:bg-cyan-600/10 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(0,0,0,0.5) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }} />
        </div>

        {/* Top Border */}
        <div className="absolute top-0 left-0 w-full h-px bg-gray-200 dark:bg-white/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-sm">
              <FaRocket className="w-4 h-4 text-blue-600 dark:text-violet-400" />
              <span className="text-sm text-gray-600 dark:text-white/60 font-medium">Mobile Development</span>
            </div>

            {/* Headline - Solid Colors Only */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-[1.1] tracking-tight">
                Native Apps for
                <br />
                <span className="text-blue-600 dark:text-violet-400">
                  iOS & Android
                </span>
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-white/50 max-w-lg leading-relaxed">
                We build and deploy production-ready mobile applications that meet 
                store guidelines and delight users. From concept to App Store publication.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-700 dark:text-white/70"
                >
                  <feature.icon className="w-4 h-4 text-blue-600 dark:text-violet-400" />
                  {feature.text}
                </motion.div>
              ))}
            </div>

            {/* Store Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-3 px-6 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-medium transition-all duration-300 hover:shadow-2xl hover:shadow-gray-900/20 dark:hover:shadow-white/10"
              >
                <FaApple className="w-8 h-8" />
                <div className="text-left">
                  <div className="text-xs opacity-70">Download on the</div>
                  <div className="text-lg font-semibold -mt-0.5">App Store</div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-3 px-6 py-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300"
              >
                <FaGooglePlay className="w-7 h-7" />
                <div className="text-left">
                  <div className="text-xs text-gray-500 dark:text-white/50">Get it on</div>
                  <div className="text-lg font-semibold -mt-0.5">Google Play</div>
                </div>
              </motion.button>
            </motion.div>

            {/* Trust Indicator */}
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-4 pt-4 text-sm text-gray-500 dark:text-white/40"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gradient-to-br dark:from-violet-500 dark:to-cyan-500 border-2 border-gray-50 dark:border-[#050505] flex items-center justify-center text-xs text-gray-600 dark:text-white font-medium"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span>Trusted by 50+ published apps</span>
            </motion.div> */}
          </motion.div>

          {/* Right Side - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <motion.div 
              className="relative"
              style={{ y: phoneY }}
            >
              {/* Phone Frame */}
              <div className="relative w-[300px] h-[600px] bg-gray-800 dark:bg-gray-900 rounded-[3rem] border-8 border-gray-300 dark:border-gray-800 shadow-2xl shadow-gray-900/20 dark:shadow-violet-500/20 overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-300 dark:bg-gray-800 rounded-b-2xl z-20" />
                
                {/* Screen Content */}
                <div className="relative h-full bg-white dark:bg-[#0a0a0a] overflow-hidden transition-colors duration-300">
                  {/* App UI */}
                  <div className="p-6 pt-12 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-full bg-blue-500 dark:bg-gradient-to-br dark:from-violet-500 dark:to-cyan-500" />
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10" />
                    </div>

                    {/* Welcome Text */}
                    <div className="space-y-2">
                      <div className="h-3 w-20 bg-gray-200 dark:bg-white/20 rounded-full" />
                      <div className="h-6 w-32 bg-gray-100 dark:bg-white/10 rounded-full" />
                    </div>

                    {/* Cards */}
                    <div className="space-y-3">
                      <div className="h-24 rounded-2xl bg-blue-50 dark:bg-gradient-to-br dark:from-violet-500/20 dark:to-transparent border border-gray-100 dark:border-white/10 p-4">
                        <div className="w-8 h-8 rounded-lg bg-blue-200 dark:bg-violet-500/30 mb-2" />
                        <div className="h-2 w-24 bg-gray-200 dark:bg-white/20 rounded-full" />
                      </div>
                      <div className="h-24 rounded-2xl bg-cyan-50 dark:bg-gradient-to-br dark:from-cyan-500/20 dark:to-transparent border border-gray-100 dark:border-white/10 p-4">
                        <div className="w-8 h-8 rounded-lg bg-cyan-200 dark:bg-cyan-500/30 mb-2" />
                        <div className="h-2 w-20 bg-gray-200 dark:bg-white/20 rounded-full" />
                      </div>
                    </div>

                    {/* Bottom Nav */}
                    <div className="absolute bottom-6 left-6 right-6 h-16 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-around">
                      <div className="w-6 h-6 rounded-full bg-blue-500/50 dark:bg-violet-500/50" />
                      <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-white/10" />
                      <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-white/10" />
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-400/20 dark:bg-violet-500/30 rounded-full blur-3xl" />
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-400/20 dark:bg-cyan-500/20 rounded-full blur-3xl" />
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-gray-900 dark:bg-gradient-to-br dark:from-violet-500 dark:to-purple-600 flex items-center justify-center shadow-xl shadow-gray-900/20 dark:shadow-violet-500/30"
              >
                <FaApple className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-blue-600 dark:bg-gradient-to-br dark:from-cyan-500 dark:to-blue-600 flex items-center justify-center shadow-xl shadow-blue-900/20 dark:shadow-cyan-500/30"
              >
                <FaGooglePlay className="w-6 h-6 text-white" />
              </motion.div>

              {/* Notification Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute top-20 -left-8 px-3 py-2 rounded-lg bg-white dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 shadow-lg text-xs text-gray-700 dark:text-white"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live on Store
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#050505] to-transparent pointer-events-none" />
    </section>
  );
};

export default Advert;
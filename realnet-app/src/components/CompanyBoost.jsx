"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import PrimaryButton from "./ui/PrimaryButton";
import { 
  FaServer, 
  FaShieldAlt, 
  FaEnvelope, 
  FaCode,
  FaArrowRight,
  FaCheck
} from "react-icons/fa";

const CompanyBoost = () => {
  const router = useRouter();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0.8]);

  const features = [
    {
      icon: FaCode,
      title: "Professional Solutions",
      description: "Custom-built platforms engineered for scale"
    },
    {
      icon: FaShieldAlt,
      title: "Enterprise Security",
      description: "Bank-grade encryption & compliance"
    },
    {
      icon: FaServer,
      title: "Fully Managed",
      description: "Zero-maintenance infrastructure"
    },
    {
      icon: FaEnvelope,
      title: "Business Email",
      description: "Branded @yourcompany.com accounts"
    }
  ];

  const stats = [
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" },
    { value: "0", label: "Downtime" }
  ];

  return (
    <section 
      ref={containerRef}
      id="joinsection"
      className="relative py-32 lg:py-40 bg-white dark:bg-[#050505] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />
        
        {/* Large Background Text */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-bold text-gray-100 dark:text-white/[0.02] select-none pointer-events-none whitespace-nowrap leading-none">
          SCALE
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Typography & CTA (5 cols) */}
          <motion.div 
            className="lg:col-span-5 space-y-8"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400 tracking-wider uppercase">
                <FaCheck className="w-4 h-4" />
                Why Choose Us
              </span>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-[1.1] tracking-tight">
                Empower Your
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-cyan-500">
                  Business Growth
                </span>
              </h2>
            </div>

            <p className="text-lg text-gray-600 dark:text-white/50 leading-relaxed max-w-md">
              Take your company to new heights with professional, secure, and 
              scalable digital infrastructure that drives measurable results.
            </p>

            {/* Stats Row */}
            <div className="flex gap-8 py-6 border-y border-gray-200 dark:border-white/10">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-white/40 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <PrimaryButton 
              onClick={() => router.push('/about-us')}
              className="px-8 py-4 font-medium"
            >
              More About Us
              <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </PrimaryButton>
          </motion.div>

          {/* Right Column - Image & Features (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Image Container with Mask */}
            <motion.div 
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 dark:bg-white/5"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ opacity }}
            >
              <motion.img
                src="/desktop.webp"
                alt="Platform Dashboard"
                className="w-full h-full object-cover"
                style={{ y: imageY }}
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent dark:from-[#050505]/80" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
                  Live Dashboard
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  System Online
                </div>
              </div>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.4 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="group p-6 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] hover:border-primary-500/30 dark:hover:border-primary-500/30 hover:bg-white dark:hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-white/50">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 pt-8 border-t border-gray-200 dark:border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-gray-500 dark:text-white/40 text-sm">
              Trusted by industry leaders across South Africa
            </p>
            
            <div className="flex items-center gap-8">
              {['ISO 27001', 'GDPR Compliant', 'SOC 2'].map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyBoost;
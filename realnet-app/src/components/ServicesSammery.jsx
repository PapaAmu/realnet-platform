// components/ServicesSummaryCompact.jsx
'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { 
  FaCode, 
  FaMobileAlt, 
  FaLaptopCode, 
  FaServer, 
  FaShoppingCart, 
  FaArrowRight,
  FaArrowLeft,
  FaRocket
} from 'react-icons/fa';

const ServicesSummaryCompact = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    {
      id: "01",
      icon: FaCode,
      title: "Website Development",
      description: "Custom, responsive websites built with modern technologies. High-performance, SEO-optimized, and designed for conversion.",
      href: "/solutions/web-development",
      stack: ["Next.js", "React", "Tailwind"]
    },
    {
      id: "02",
      icon: FaMobileAlt,
      title: "Mobile Apps",
      description: "Native iOS & Android applications with seamless user experiences. From concept to App Store deployment.",
      href: "/solutions/mobile-app-development",
      stack: ["React Native", "Flutter", "Swift"]
    },
    {
      id: "03",
      icon: FaLaptopCode,
      title: "Software Solutions",
      description: "Enterprise-grade custom software tailored to your business processes. Scalable architecture, robust security.",
      href: "/solutions/software-development",
      stack: ["Node.js", "Python", "PostgreSQL"]
    },
    {
      id: "04",
      icon: FaShoppingCart,
      title: "Ecommerce Stores",
      description: "Complete online store solutions with payment integration, inventory management, and analytics dashboard.",
      href: "/solutions/web-development/e-commerce-quote-request",
      stack: ["Shopify", "WooCommerce", "Stripe"]
    },
    {
      id: "05",
      icon: FaServer,
      title: "Hosting & Emails",
      description: "Reliable cloud hosting with 99.9% uptime guarantee. Business email solutions and managed infrastructure.",
      href: "/solutions/email-and-hosting",
      stack: ["AWS", "Vercel", "Cloudflare"]
    }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = 380;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, services.length - 1));
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-24 lg:py-32   bg-white dark:bg-[#050505] overflow-hidden"
    >
      {/* Ambient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header - Asymmetric Layout */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 text-sm text-primary-400 font-medium tracking-wider uppercase mb-4">
              <FaRocket className="w-4 h-4" />
              Our Services
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
              Digital Solutions<br />
              <span className="text-gray-400 dark:text-white/40">For Modern Business</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4"
          >
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/5 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300"
              aria-label="Previous service"
            >
              <FaArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full bg-white dark:bg-white text-black dark:text-black flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary-500/20"
              aria-label="Next service"
            >
              <FaArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Horizontal Scroll Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          {/* Fade Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-[#050505] to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8 -mx-6 px-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.4 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="snap-start shrink-0 w-[340px] md:w-[380px]"
              >
                <Link href={service.href} className="group block h-full">
                  <div className="relative h-full bg-gray-50/50 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200 dark:border-white/[0.06] rounded-2xl p-8 hover:bg-white dark:hover:bg-white/[0.04] hover:border-gray-300 dark:hover:border-white/[0.12] transition-all duration-500 overflow-hidden">
                    
                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-transparent to-cyan-500/0 group-hover:from-primary-500/5 group-hover:to-cyan-500/5 transition-all duration-700" />
                    
                    {/* Number */}
                    <div className="absolute top-6 right-6 text-6xl font-bold text-gray-200 dark:text-white/[0.03] select-none">
                      {service.id}
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-primary-500/30 transition-all duration-300">
                        <service.icon className="w-6 h-6 text-gray-700 dark:text-white/70 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-white/50 text-sm leading-relaxed mb-6 line-clamp-3">
                        {service.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {service.stack.map((tech) => (
                          <span 
                            key={tech}
                            className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/40 border border-gray-200 dark:border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Link */}
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white/80 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                        <span>Learn more</span>
                        <FaArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* View All Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="snap-start shrink-0 w-[340px] md:w-[380px]"
            >
              <Link href="/services" className="group block h-full">
                <div className="relative h-full min-h-[400px] bg-gradient-to-br from-primary-600 to-cyan-600 rounded-2xl p-8 flex flex-col justify-between overflow-hidden hover:shadow-2xl hover:shadow-primary-500/25 transition-all duration-500">
                  
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                      backgroundSize: '24px 24px'
                    }} />
                  </div>

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                      <FaRocket className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      View All Services
                    </h3>
                    <p className="text-white/70 text-sm">
                      Explore our complete range of digital solutions
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center gap-2 text-white font-medium">
                    <span>Get Started</span>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-primary-600 transition-all duration-300">
                      <FaArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (scrollRef.current) {
                    scrollRef.current.scrollTo({
                      left: index * 380,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'w-8 bg-primary-500' 
                    : 'w-2 bg-gray-300 dark:bg-white/20 hover:bg-gray-400 dark:hover:bg-white/40'
                }`}
                aria-label={`Go to service ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 dark:text-white/30 text-sm">
            Trusted by businesses across South Africa • Enterprise-grade solutions
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSummaryCompact;
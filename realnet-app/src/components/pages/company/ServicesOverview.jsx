// components/pages/company/ServicesOverview.jsx
'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  FaGlobe, 
  FaMobileAlt, 
  FaShoppingCart, 
  FaCode, 
  FaServer, 
  FaRocket,
  FaCheck,
  FaArrowRight,
  FaShieldAlt,
  FaChartLine,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

const ServicesOverview = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeService, setActiveService] = useState(0);
  const [hoveredPackage, setHoveredPackage] = useState(null);

  const services = [
    {
      icon: FaGlobe,
      title: 'Website Development',
      description: 'Professional, responsive websites that convert visitors into customers. From simple business sites to complex web applications.',
      features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Mobile-First'],
      link: '/solutions/web-development',
      stat: '150+ Sites'
    },
    {
      icon: FaMobileAlt,
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android that engage users and drive business growth.',
      features: ['iOS & Android', 'Cross-Platform', 'User-Friendly', 'App Store Ready'],
      link: '/solutions/mobile-app-development',
      stat: '50+ Apps'
    },
    {
      icon: FaShoppingCart,
      title: 'Ecommerce',
      description: 'Complete online store development with secure payment gateways, inventory management, and marketing tools.',
      features: ['Online Payments', 'Inventory Management', 'Marketing Tools', 'Analytics'],
      link: '/solutions/web-development/e-commerce-quote-request',
      stat: '80+ Stores'
    },
    {
      icon: FaCode,
      title: 'Custom Software',
      description: 'Custom business software and management systems that streamline operations and improve efficiency.',
      features: ['Custom Solutions', 'System Integration', 'Database Design', 'API Development'],
      link: '/solutions/software-development',
      stat: '40+ Systems'
    },
    {
      icon: FaServer,
      title: 'Hosting & Email',
      description: 'Reliable hosting solutions and professional business email services with 99.9% uptime guarantee.',
      features: ['99.9% Uptime', 'SSL Certificates', 'Business Emails', '24/7 Support'],
      link: '/solutions/email-and-hosting',
      stat: '99.9% Up'
    },
    {
      icon: FaRocket,
      title: 'Digital Strategy',
      description: 'Comprehensive digital strategy and implementation to modernize your business operations and customer experience.',
      features: ['Digital Strategy', 'Process Automation', 'Cloud Migration', 'Training'],
      link: '/contact-us',
      stat: '30+ Clients'
    }
  ];

  const packages = [
    {
      name: 'Starter',
      price: 'R2,800',
      description: 'Perfect for small businesses',
      features: [
        '5-Page Responsive Website',
        'Basic SEO Setup',
        'Contact Form',
        'Social Media Integration',
        '1 Month Support'
      ],
      link: '/solutions/web-development/starter-website-quote-request'
    },
    {
      name: 'Business',
      price: 'R5,999',
      description: 'Complete ecommerce solution',
      features: [
        'Product Catalog',
        'Secure Payments',
        'Inventory Management',
        'Order Tracking',
        '3 Months Support'
      ],
      link: '/solutions/web-development/e-commerce-quote-request',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'R9,999',
      description: 'Custom web applications',
      features: [
        'Custom Development',
        'Database Integration',
        'User Management',
        'API Development',
        '12 Months Support'
      ],
      link: '/solutions/web-development/custom-website-quote-request'
    }
  ];

  const whyUs = [
    {
      icon: FaShieldAlt,
      title: 'Proven Expertise',
      description: 'Years of experience delivering successful projects across various industries.'
    },
    {
      icon: FaChartLine,
      title: 'Results-Driven',
      description: 'We focus on solutions that deliver measurable business growth and ROI.'
    },
    {
      icon: FaRocket,
      title: 'Modern Stack',
      description: 'Using the latest technologies and best practices for optimal performance.'
    },
    {
      icon: FaCheck,
      title: 'End-to-End Support',
      description: 'From concept to launch and beyond, we support you every step.'
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

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-300">
      
      {/* Hero Section - Minimal, Typography Focused */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gray-200 dark:bg-white/10" />
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-100/50 dark:bg-primary-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-primary-400 mb-6">
                <FaRocket className="w-4 h-4" />
                Our Services
              </span>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-[1.1] tracking-tight mb-6">
                Digital Solutions That Drive Growth
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-white/50 leading-relaxed mb-8 max-w-2xl">
                From concept to deployment, we build scalable digital products 
                that transform businesses and delight users.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-medium hover:scale-[1.02] transition-transform duration-200"
                >
                  Start Your Project
                  <FaArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white rounded-full font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-200"
                >
                  View Work
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services - Horizontal Scroll */}
      <section className="py-20 border-y border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                What We Do
              </h2>
              <p className="text-gray-600 dark:text-white/50">
                Comprehensive digital services for modern businesses
              </p>
            </div>
            
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full border border-gray-300 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-105 transition-transform"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6 pb-4 -mx-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="snap-start shrink-0 w-[350px] group"
              onMouseEnter={() => setActiveService(index)}
            >
              <Link href={service.link} className="block h-full">
                <div className="h-full p-8 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] hover:border-blue-500/30 dark:hover:border-primary-500/30 hover:bg-white dark:hover:bg-white/[0.04] transition-all duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-white/5 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-primary-500/10 transition-colors">
                      <service.icon className="w-6 h-6 text-gray-700 dark:text-white/70 group-hover:text-blue-600 dark:group-hover:text-primary-400 transition-colors" />
                    </div>
                    <span className="text-xs font-medium text-gray-400 dark:text-white/30 px-3 py-1 rounded-full bg-gray-200 dark:bg-white/5">
                      {service.stat}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-primary-400 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-white/50 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-500 dark:text-white/40">
                        <div className="w-1 h-1 rounded-full bg-blue-500 dark:bg-primary-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-white/10 flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <FaArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing - Table Style */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Development Packages
            </h2>
            <p className="text-gray-600 dark:text-white/50">
              Transparent pricing for every stage of business
            </p>
          </motion.div>

          <div className="space-y-4">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-2xl border transition-all duration-300 ${
                  pkg.popular 
                    ? 'border-blue-500 dark:border-primary-500 bg-blue-50/50 dark:bg-primary-500/5' 
                    : 'border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] hover:border-gray-300 dark:hover:border-white/10'
                }`}
                onMouseEnter={() => setHoveredPackage(index)}
                onMouseLeave={() => setHoveredPackage(null)}
              >
                <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
                  <div className="md:w-1/4">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {pkg.name}
                      </h3>
                      {pkg.popular && (
                        <span className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-primary-500/20 text-blue-700 dark:text-primary-300 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {pkg.price}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-white/40 mt-1">
                      {pkg.description}
                    </p>
                  </div>

                  <div className="md:w-2/4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {pkg.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/60">
                          <FaCheck className={`w-3 h-3 flex-shrink-0 ${pkg.popular ? 'text-blue-500 dark:text-primary-400' : 'text-gray-400 dark:text-white/30'}`} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="md:w-1/4 flex justify-start md:justify-end">
                    <Link
                      href={pkg.link}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                        pkg.popular
                          ? 'bg-gray-900 dark:bg-white text-white dark:text-black hover:scale-[1.02]'
                          : 'border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                      }`}
                    >
                      Get Quote
                      <FaArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Grid */}
      <section className="py-24 bg-gray-50 dark:bg-white/[0.02] border-y border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Work With Us
            </h2>
            <p className="text-gray-600 dark:text-white/50 max-w-2xl mx-auto">
              Beyond code—we deliver strategic partnerships
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center mx-auto mb-6 group-hover:border-blue-500/30 dark:group-hover:border-primary-500/30 transition-colors">
                  <item.icon className="w-7 h-7 text-gray-700 dark:text-white/70 group-hover:text-blue-600 dark:group-hover:text-primary-400 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-white/50 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Minimal */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Start?
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/50 mb-10 max-w-2xl mx-auto">
              Let's discuss your project and create a solution that drives your business forward.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-medium hover:scale-[1.02] transition-transform duration-200"
              >
                Schedule Consultation
                <FaArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white rounded-full font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-200"
              >
                View Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesOverview;
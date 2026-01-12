// components/pages/company/ServicesOverview.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaGlobe, 
  FaMobileAlt, 
  FaShoppingCart, 
  FaCode, 
  FaServer, 
  FaRocket,
  FaCheckCircle,
  FaArrowRight,
  FaShieldAlt,
  FaChartLine
} from 'react-icons/fa';

const ServicesOverview = () => {
  const services = [
    {
      icon: FaGlobe,
      title: 'Website Development',
      description: 'Professional, responsive websites that convert visitors into customers. From simple business sites to complex web applications.',
      features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Mobile-First'],
      link: '/solutions/web-development',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      icon: FaMobileAlt,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android that engage users and drive business growth.',
      features: ['iOS & Android', 'Cross-Platform', 'User-Friendly', 'App Store Ready'],
      link: '/solutions/mobile-app-development',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      icon: FaShoppingCart,
      title: 'Ecommerce Solutions',
      description: 'Complete online store development with secure payment gateways, inventory management, and marketing tools.',
      features: ['Online Payments', 'Inventory Management', 'Marketing Tools', 'Analytics'],
      link: '/solutions/web-development/e-commerce-quote-request',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      icon: FaCode,
      title: 'Software Development',
      description: 'Custom business software and management systems that streamline operations and improve efficiency.',
      features: ['Custom Solutions', 'System Integration', 'Database Design', 'API Development'],
      link: '/solutions/software-development',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      icon: FaServer,
      title: 'Managed Hosting & Emails',
      description: 'Reliable hosting solutions and professional business email services with 99.9% uptime guarantee.',
      features: ['99.9% Uptime', 'SSL Certificates', 'Business Emails', '24/7 Support'],
      link: '/solutions/email-and-hosting',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    },
    {
      icon: FaRocket,
      title: 'Digital Transformation',
      description: 'Comprehensive digital strategy and implementation to modernize your business operations and customer experience.',
      features: ['Digital Strategy', 'Process Automation', 'Cloud Migration', 'Training & Support'],
      link: '/contact-us',
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600'
    }
  ];

  const packages = [
    {
      name: 'Starter Business Website',
      price: 'From R2,800',
      description: 'Perfect for small businesses and personal brands',
      features: [
        '5-Page Responsive Website',
        'Basic SEO Setup',
        'Contact Form',
        'Social Media Integration',
        '1 Month Free Support',
        'Self Hosting',
      ],
      cta: 'Get Quote',
      link: '/solutions/web-development/starter-website-quote-request',
      popular: false
    },
    {
      name: 'Ecommerce Website',
      price: 'From R5,999',
      description: 'Complete online store with payment integration',
      features: [
        'Product Catalog',
        'Secure Payment Gateway',
        'Inventory Management',
        'Order Tracking',
        '3 Months Support'
      ],
      cta: 'Get Quote',
      link: '/solutions/web-development/e-commerce-quote-request',
      popular: true
    },
    {
      name: 'Advanced Custom Website',
      price: 'From R9,999',
      description: 'Custom web applications and complex systems',
      features: [
        'Custom Design & Development',
        'Database Integration',
        'User Management',
        'API Development',
        '12 Months Support'
      ],
      cta: 'Get Quote',
      link: '/solutions/web-development/custom-website-quote-request',
      popular: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed opacity-95">
              Comprehensive digital solutions to transform your business and drive growth. 
              From stunning websites to powerful mobile apps and custom software.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                href="/contact-us"
                className="px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Start Your Project
              </Link>
              <Link
                href="/projects"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-200"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group"
              >
                <div className={`p-8 ${service.bgColor} group-hover:bg-gradient-to-br ${service.color} group-hover:text-white transition-all duration-300`}>
                  <div className="flex items-center justify-between mb-4">
                    <service.icon className={`text-4xl ${service.textColor} group-hover:text-white transition-colors duration-300`} />
                    <FaArrowRight className={`text-xl ${service.textColor} group-hover:text-white opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-white/90 leading-relaxed transition-colors duration-300">
                    {service.description}
                  </p>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <FaCheckCircle className="text-green-500 mr-3 text-sm" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    href={service.link}
                    className={`w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl ${service.textColor} ${service.bgColor} hover:bg-gradient-to-r ${service.color} hover:text-white hover:shadow-lg transition-all duration-200 group/btn`}
                  >
                    Learn More
                    <FaArrowRight className="ml-2 text-xs group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Website Packages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Website Development Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect package for your business needs. All packages include responsive design, 
              SEO optimization, and professional development.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid md:grid-cols-3 gap-8"
          >
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl border-2 hover:shadow-2xl transition-all duration-300 ${
                  pkg.popular 
                    ? 'border-orange-500 transform scale-105' 
                    : 'border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="px-6 py-2 bg-orange-500 text-white text-sm font-bold rounded-full shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-black text-orange-500 mb-4">{pkg.price}</div>
                  <p className="text-gray-600 mb-6">{pkg.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <FaCheckCircle className="text-green-500 mr-3 text-sm flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    href={pkg.link}
                    className={`w-full inline-flex items-center justify-center px-6 py-4 font-bold rounded-xl transition-all duration-200 ${
                      pkg.popular
                        ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-xl'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {pkg.cta}
                    <FaArrowRight className="ml-2 text-sm" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Why Choose RealNet Web Solutions?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We deliver more than just code - we deliver solutions that drive real business results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
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
                title: 'Modern Technology',
                description: 'Using the latest technologies and best practices for optimal performance.'
              },
              {
                icon: FaCheckCircle,
                title: 'End-to-End Support',
                description: 'From concept to launch and beyond, we support you every step of the way.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create a custom solution that drives your business forward.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact-us"
                className="px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Free Consultation
              </Link>
              <Link
                href="/projects"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-200"
              >
                View Our Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesOverview;
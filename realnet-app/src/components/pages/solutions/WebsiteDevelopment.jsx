"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaDesktop,
  FaShoppingCart,
  FaSearch,
  FaRocket,
  FaTools,
  FaMobile,
  FaGlobe,
  FaCogs,
  FaChartLine,
  FaCrown,
  FaStar,
  FaCheck,
  FaArrowRight,
} from "react-icons/fa";

const WebsiteDevelopment = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };


  // Services data
  const services = [
    {
      title: "Responsive Web Design",
      description: "Websites that look beautiful and function perfectly on all devices, from desktops to smartphones with mobile-first approach.",
      icon: <FaDesktop className="text-3xl" />,
    },
    {
      title: "E-Commerce Solutions",
      description: "Complete online stores with secure payment processing, inventory management, and customer accounts for South African businesses.",
      icon: <FaShoppingCart className="text-3xl" />,
    },
    {
      title: "SEO Optimization",
      description: "Websites built with search engine optimization to help you rank higher in Google search results across South Africa.",
      icon: <FaSearch className="text-3xl" />,
    },
    {
      title: "Starter Websites",
      description: "Affordable, professional websites perfect for small businesses and startups in Johannesburg and Pretoria areas.",
      icon: <FaRocket className="text-3xl" />,
    },
    {
      title: "Performance Optimization",
      description: "Lightning-fast websites with optimized loading times and smooth performance for better user experience.",
      icon: <FaChartLine className="text-3xl" />,
    },
    {
      title: "Maintenance & Support",
      description: "Ongoing updates, security patches, and technical support to keep your website running smoothly 24/7.",
      icon: <FaTools className="text-3xl" />,
    },
  ];

  // Pricing packages
  const pricingPackages = [
    {
      name: "Starter Business Website",
      price: "R3,499 - R5,999",
      description: "Perfect for small businesses and personal brands in South Africa",
      popular: false,
      features: [
        "Up to 8 pages",
        "Responsive design",
        "Basic Google SEO setup",
        "Managed Hosting for 1 year",
        "Support & Maintenance",
        "Social media integration",
        "Email Accounts",
      ],
      icon: <FaRocket className="text-2xl" />,
      url: "/solutions/web-development/starter-website-quote-request",
    },
    {
      name: "E-Commerce Store",
      price: "R6,000 - R19,999",
      description: "Complete online store with payment processing for South African market",
      popular: true,
      features: [
        "Up to 200 products",
        "Secure payment gateway",
        "Inventory management",
        "Customer accounts",
        "Order tracking",
        "Support & Maintenance",
        "SEO optimized",
        "Social media integration",
        "Dashboard/Login Panel",
      ],
      icon: <FaShoppingCart className="text-2xl" />,
      url: "/solutions/web-development/e-commerce-quote-request",
    },
    {
      name: "Advanced Custom",
      price: "R10,000+",
      description: "Fully custom website with advanced functionality for growing businesses",
      popular: false,
      features: [
        "Completely custom design",
        "Advanced functionality",
        "Premium SEO package",
        "Content management system",
        "Support & Maintenance",
        "Performance optimization",
        "Priority development",
        "SSL Certificate",
      ],
      icon: <FaCrown className="text-2xl" />,
      url: "/solutions/web-development/custom-website-quote-request",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
        {/* Hero Section */}
        <section 
          className="relative py-20 lg:py-32 overflow-hidden pt-8"
          data-section="hero"
          itemScope
          itemType="https://schema.org/WebPage"
        >
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10"></div>
            <div className="absolute inset-0 bg-[url(https://i.pinimg.com/1200x/b8/05/35/b80535a7d8dabb5eb080ba7ab8d619f0.jpg)] bg-cover bg-center mix-blend-overlay"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={fadeIn}
                itemScope
                itemType="https://schema.org/Service"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Professional{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">
                    Websites
                  </span>{" "}
                  That Convert
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  We create stunning, high-performance websites that convert visitors into customers and help your business grow online across South Africa.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="#pricing" aria-label="View our website development pricing packages">
                    <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-1">
                      Check Our Prices
                    </button>
                  </Link>

                  <Link href="/solutions/web-development/live-projects" aria-label="View our web development portfolio and projects">
                    <button className="px-6 py-3 border border-orange-500 text-orange-300 font-semibold rounded-lg shadow-sm hover:bg-orange-500/10 transition-all duration-300">
                      View Our Projects
                    </button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-1 rounded-2xl shadow-2xl transform rotate-3 border border-orange-500/20">
                  <div className="bg-gray-800 rounded-2xl p-4">
                    <div className="flex gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="font-mono text-sm">
                      <div className="text-orange-400">
                        function{" "}
                        <span className="text-pink-400">createWebsite</span>(){" "}
                        {"{"}
                      </div>
                      <div className="ml-4 text-green-400">
                        // Beautiful, functional websites
                      </div>
                      <div className="ml-4 text-blue-400">const</div>
                      <div className="ml-8 text-yellow-200">design</div>
                      <div className="ml-8 text-yellow-200">functionality</div>
                      <div className="ml-8 text-yellow-200">results</div>
                      <div className="text-orange-400">{"}"}</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-orange-500 to-pink-500 p-1 rounded-xl shadow-lg transform -rotate-6 z-10">
                  <div className="bg-gray-800 rounded-lg p-2">
                    <FaGlobe className="text-4xl text-orange-300" aria-label="Web Development Icon" />
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 bg-gradient-to-br from-pink-500 to-orange-500 p-1 rounded-xl shadow-lg transform rotate-6 z-10">
                  <div className="bg-gray-800 rounded-lg p-2">
                    <FaMobile className="text-4xl text-pink-300" aria-label="Mobile Responsive Icon" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section 
          className="relative py-20 lg:py-28"
          data-section="services"
          aria-labelledby="services-heading"
        >
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-orange-500/5 to-transparent"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 id="services-heading" className="text-3xl md:text-4xl font-bold mb-4">
                Our{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">
                  Website
                </span>{" "}
                Services
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive website development solutions for businesses of all sizes across South Africa.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              role="list"
              aria-label="Website development services list"
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:shadow-xl group relative overflow-hidden"
                  role="listitem"
                  itemScope
                  itemType="https://schema.org/Service"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="mb-4 flex justify-center">
                      <div className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-white">
                        {service.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-center text-white" itemProp="name">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-center" itemProp="description">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section 
          id="pricing" 
          className="py-20 lg:py-28 bg-gradient-to-br from-gray-800 to-gray-900 relative"
          data-section="pricing"
          aria-labelledby="pricing-heading"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1015&q=80')] bg-cover bg-center opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 id="pricing-heading" className="text-3xl md:text-4xl font-bold mb-4">
                Website{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">
                  Packages
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Affordable pricing options to get your business online quickly and professionally in South Africa.
              </p>
            </motion.div>

            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              itemScope
              itemType="https://schema.org/OfferCatalog"
            >
              {pricingPackages.map((pkg, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeIn}
                  transition={{ delay: index * 0.1 }}
                  className={`relative rounded-2xl overflow-hidden ${
                    pkg.popular
                      ? "border-2 border-orange-500 transform scale-105"
                      : "border border-orange-500/20"
                  }`}
                  itemScope
                  itemType="https://schema.org/Offer"
                >
                  {pkg.popular && (
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-1 rounded-full text-sm font-semibold z-10 flex items-center">
                      <FaStar className="mr-2" aria-hidden="true" /> Most Popular
                    </div>
                  )}

                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 h-full">
                    <div className="text-center mb-6">
                      <div className="flex justify-center mb-4 text-orange-500">
                        {pkg.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2" itemProp="name">
                        {pkg.name}
                      </h3>
                      <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400 mb-1" itemProp="price">
                        {pkg.price}
                      </div>
                      <p className="text-orange-400 text-sm">Starting Price</p>
                      <p className="text-gray-300 mt-2" itemProp="description">
                        {pkg.description}
                      </p>
                    </div>

                    <ul className="space-y-3 mb-8 text-sm">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <FaCheck className="text-green-500 mr-3 flex-shrink-0" aria-hidden="true" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href={pkg.url} aria-label={`Get started with ${pkg.name} package`}>
                      <button
                        className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                          pkg.popular
                            ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600"
                            : "bg-gray-700 text-white hover:bg-gray-600"
                        }`}
                      >
                        Get Started
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Pricing Information */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mt-12"
            >
              <p className="text-gray-400 text-sm">
                All packages include free consultation, domain guidance, and 30 days of free support. 
                Custom quotes available for enterprise solutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          className="py-20 lg:py-28 bg-gradient-to-r from-orange-600 to-pink-600 text-white relative overflow-hidden"
          data-section="cta"
          aria-labelledby="cta-heading"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1015&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-6">
                Ready to <span className="text-white">Launch</span> Your Website?
              </h2>
              <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
                Let's create a stunning website that represents your brand and drives growth for your South African business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact-us" 
                  className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
                  aria-label="Get free consultation for website development"
                >
                  Get Your Free Consultation
                </Link>
                <Link 
                  href="/projects" 
                  className="px-8 py-4 border border-white text-white font-semibold rounded-lg shadow-sm hover:bg-white/10 transition-all duration-300"
                  aria-label="View our web development portfolio"
                >
                  View Our Portfolio
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Local Business Info */}
        <section 
          className="py-12 bg-gray-800 border-t border-gray-700"
          data-section="local-info"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-400 text-sm">
              Serving businesses across <strong>Johannesburg, Pretoria, and surrounding areas</strong> with professional website development services since 2023.
            </p>
          </div>
        </section>

      </div>
    </>
  );
};

export default WebsiteDevelopment;


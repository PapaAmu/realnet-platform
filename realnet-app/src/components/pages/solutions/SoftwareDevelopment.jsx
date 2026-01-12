"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FaCode, 
  FaDesktop, 
  FaServer, 
  FaDatabase, 
  FaPaintBrush, 
  FaTools, 
  FaRocket,
  FaShoppingCart,
  FaUsers,
  FaShieldAlt,
  FaCloud,
  FaMobile,
  FaGlobe,
  FaCogs,
  FaChartLine,
  FaSync,
  FaArrowRight
} from "react-icons/fa";

const WebSoftware = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Services data
  const services = [
    {
      title: "Custom Web Applications",
      description: "Tailor-made web applications built to solve your specific business challenges and streamline operations for South African businesses.",
      icon: <FaCode className="text-3xl" />,
      ariaLabel: "Learn about our custom web application development services"
    },
    {
      title: "Responsive Web Design",
      description: "Websites that look and function perfectly across all devices, from desktops to smartphones, optimized for South African users.",
      icon: <FaDesktop className="text-3xl" />,
      ariaLabel: "Discover our responsive web design solutions"
    },
    {
      title: "E-Commerce Solutions",
      description: "Full-featured online stores with secure payment processing, inventory management, and customer portals for South African retailers.",
      icon: <FaShoppingCart className="text-3xl" />,
      ariaLabel: "Explore our e-commerce development services"
    },
    {
      title: "UI/UX Design",
      description: "Intuitive and engaging user interfaces designed to maximize user satisfaction and conversion rates for African markets.",
      icon: <FaPaintBrush className="text-3xl" />,
      ariaLabel: "Learn about our UI/UX design services"
    },
    {
      title: "API Development",
      description: "Custom API development and seamless integration with third-party services and platforms used in South Africa.",
      icon: <FaCogs className="text-3xl" />,
      ariaLabel: "Discover our API development capabilities"
    },
    {
      title: "Maintenance & Support",
      description: "Ongoing updates, security patches, and performance optimization to keep your web application running smoothly 24/7.",
      icon: <FaTools className="text-3xl" />,
      ariaLabel: "Learn about our maintenance and support services"
    }
  ];

  // Process steps
  const processSteps = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "We analyze your requirements, target audience, and business goals to create a comprehensive project plan tailored for South African markets."
    },
    {
      step: "02",
      title: "UI/UX Design",
      description: "Our designers create wireframes and prototypes focused on creating exceptional user experiences for African users."
    },
    {
      step: "03",
      title: "Development",
      description: "Our developers build your web application using the latest technologies and coding best practices with security in mind."
    },
    {
      step: "04",
      title: "Quality Assurance",
      description: "Rigorous testing across browsers and devices to ensure flawless performance and security for all users."
    },
    {
      step: "05",
      title: "Deployment",
      description: "We handle the complete deployment process, including server configuration and domain setup with South African hosting."
    },
    {
      step: "06",
      title: "Maintenance",
      description: "Continuous support, security updates, and feature enhancements based on user feedback and analytics."
    }
  ];

  // Tech stack
  const techStack = [
    { name: "React", icon: <FaCode />, description: "Modern frontend framework" },
    { name: "Node.js", icon: <FaServer />, description: "Scalable backend runtime" },
    { name: "MongoDB", icon: <FaDatabase />, description: "NoSQL database solutions" },
    { name: "PHP", icon: <FaCogs />, description: "Server-side scripting" },
    { name: "Laravel", icon: <FaCloud />, description: "PHP web framework" },
    { name: "Python", icon: <FaGlobe />, description: "Versatile programming" }
  ];

  const handleCTAClick = (buttonText, location) => {
    // trackCTAClick(buttonText, location);
    console.log(`CTA clicked: ${buttonText} at ${location}`);
  };

  const handleInternalLink = (linkText, destination) => {
    // trackInternalLinkClick(linkText, destination);
    console.log(`Internal link clicked: ${linkText} to ${destination}`);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
        {/* Hero Section with Code Background */}
        <section 
          className="relative py-20 lg:py-32 overflow-hidden pt-8"
          data-section="hero"
          itemScope
          itemType="https://schema.org/WebPage"
        >
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')] bg-cover bg-center mix-blend-overlay"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" itemProp="headline">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">Web & Software Development</span> Solutions for South Africa
                </h1>
                <p className="text-xl text-gray-300 mb-8" itemProp="description">
                  We build powerful, scalable web applications and software solutions that drive business growth, enhance productivity, and deliver exceptional user experiences across South Africa.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/new-project/request-quotation"
                    legacyBehavior
                  >
                    <motion.a
                      className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                      onClick={() => handleCTAClick("Start Your Project", "software-hero")}
                      aria-label="Start your software development project"
                    >
                      Start Your Project
                    </motion.a>
                  </Link>
                  <Link
                    href="/features/web-development/live-projects"
                    legacyBehavior
                  >
                    <motion.a
                      className="px-6 py-3 border border-orange-500 text-orange-300 font-semibold rounded-lg shadow-sm hover:bg-orange-500/10 transition-all duration-300 cursor-pointer"
                      onClick={() => handleInternalLink("See Our Trending Product", "/features/web-development/live-projects")}
                      aria-label="View our software development portfolio"
                    >
                      See Our Projects
                    </motion.a>
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
                      <div className="text-orange-400">function <span className="text-pink-400">developWebApp</span>() {"{"}</div>
                      <div className="ml-4 text-green-400">// Custom solutions for South African businesses</div>
                      <div className="ml-4 text-blue-400">const</div>
                      <div className="ml-8 text-yellow-200">innovation</div>
                      <div className="ml-8 text-yellow-200">creativity</div>
                      <div className="ml-8 text-yellow-200">expertise</div>
                      <div className="text-orange-400">{"}"}</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-orange-500 to-pink-500 p-1 rounded-xl shadow-lg transform -rotate-6 z-10">
                  <div className="bg-gray-800 rounded-lg p-2">
                    <FaRocket className="text-4xl text-orange-300" />
                  </div>
                </div>
                
                <div className="absolute -top-6 -right-6 bg-gradient-to-br from-pink-500 to-orange-500 p-1 rounded-xl shadow-lg transform rotate-6 z-10">
                  <div className="bg-gray-800 rounded-lg p-2">
                    <FaGlobe className="text-4xl text-pink-300" />
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
                Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">Web Software</span> Solutions
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive web application and software development solutions tailored for South African businesses of all sizes.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              role="list"
              aria-label="Web software development services"
            >
              {services.map((service, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:shadow-xl group relative overflow-hidden"
                  role="listitem"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="mb-4 flex justify-center">
                      <div className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-white">
                        {service.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-center text-white">{service.title}</h3>
                    <p className="text-gray-400 text-center">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section 
          className="py-20 lg:py-28 bg-gradient-to-br from-gray-800 to-gray-900 relative"
          data-section="process"
          aria-labelledby="process-heading"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')] bg-cover bg-center opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 id="process-heading" className="text-3xl md:text-4xl font-bold mb-4">
                Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">Development</span> Process
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A structured approach to transform your idea into a successful web application tailored for the South African market.
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-orange-500 to-pink-500 hidden lg:block"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {processSteps.map((step, index) => (
                  <motion.div 
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeIn}
                    transition={{ delay: index * 0.1 }}
                    className={`relative ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8 lg:mt-20'}`}
                  >
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-orange-500/20 hover:shadow-xl transition-all duration-300 relative">
                      <div className="absolute -left-4 top-6 w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg lg:block">
                        {index + 1}
                      </div>
                      <div className="text-4xl font-bold text-orange-500/30 mb-2">{step.step}</div>
                      <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section 
          className="py-20 lg:py-28 relative"
          data-section="tech-stack"
          aria-labelledby="tech-stack-heading"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-pink-500/5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 id="tech-stack-heading" className="text-3xl md:text-4xl font-bold mb-4">
                Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">Technology Stack</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We use cutting-edge technologies to build high-performance, scalable web applications for South African businesses.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {techStack.map((tech, index) => (
                <motion.div 
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-center border border-orange-500/20 hover:border-orange-500/40 shadow-md hover:shadow-xl transition-all duration-300 group"
                  aria-label={`${tech.name} - ${tech.description}`}
                >
                  <div className="flex justify-center mb-4 text-orange-500 group-hover:text-pink-400 text-3xl">
                    {tech.icon}
                  </div>
                  <h3 className="font-semibold text-white">{tech.name}</h3>
                  <p className="text-gray-400 text-xs mt-2">{tech.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          className="py-20 lg:py-28 bg-gradient-to-r from-orange-600 to-pink-600 text-white relative overflow-hidden"
          data-section="cta"
          aria-labelledby="cta-heading"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Build Your <span className="text-white">Web Application</span>?
              </h2>
              <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
                Let's turn your idea into a powerful web solution with our expert development team serving South Africa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/new-project/request-quotation"
                  legacyBehavior
                >
                  <motion.a
                    className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                    onClick={() => handleCTAClick("Get Your Free Consultation", "software-cta")}
                    aria-label="Get free consultation for software development"
                  >
                    Get Your Free Consultation
                  </motion.a>
                </Link>
                <Link
                  href="/features/web-development/live-projects"
                  legacyBehavior
                >
                  <motion.a
                    className="px-8 py-4 border border-white text-white font-semibold rounded-lg shadow-sm hover:bg-white/10 transition-all duration-300 cursor-pointer"
                    onClick={() => handleInternalLink("View Case Studies", "/features/web-development/live-projects")}
                    aria-label="View our software development case studies"
                  >
                    View Case Studies
                  </motion.a>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
};

export default WebSoftware;
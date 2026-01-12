"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FaMobile, 
  FaAndroid, 
  FaApple, 
  FaPaintBrush, 
  FaTools, 
  FaRocket,
  FaSync,
  FaUsers,
  FaShoppingCart,
  FaBriefcase,
  FaCode,
  FaServer,
  FaDatabase,
  FaGlobe,
  FaCogs,
  FaChartLine,
  FaDownload,
  FaStar,
  FaGooglePlay,
  FaAppStoreIos
} from "react-icons/fa";


const MobileAppDevelopment = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const floatAnimation = {
    hidden: { y: 0 },
    visible: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseAnimation = {
    hidden: { scale: 1 },
    visible: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Services data
  const services = [
    {
      title: "iOS App Development",
      description: "Native iOS applications built with Swift for seamless performance on Apple devices.",
      icon: <FaApple className="text-3xl" />
    },
    {
      title: "Android App Development",
      description: "Native Android apps developed with Java/Kotlin for optimal performance on all Android devices.",
      icon: <FaAndroid className="text-3xl" />
    },
    {
      title: "Cross-Platform Apps",
      description: "React Native apps that work seamlessly across both iOS and Android platforms.",
      icon: <FaSync className="text-3xl" />
    },
    {
      title: "UI/UX Design",
      description: "Intuitive and engaging mobile interfaces designed for exceptional user experiences.",
      icon: <FaPaintBrush className="text-3xl" />
    },
    {
      title: "App Maintenance & Support",
      description: "Ongoing updates, bug fixes, and performance optimization to keep your app running smoothly.",
      icon: <FaTools className="text-3xl" />
    },
    {
      title: "App Store Deployment",
      description: "Complete assistance with publishing your app to Google Play Store and Apple App Store.",
      icon: <FaRocket className="text-3xl" />
    }
  ];

  // Process steps
  const processSteps = [
    {
      step: "01",
      title: "Strategy & Planning",
      description: "We define your app's purpose, target audience, features, and technical requirements.",
      icon: <FaChartLine className="text-2xl" />
    },
    {
      step: "02",
      title: "UI/UX Design",
      description: "Our designers create wireframes and prototypes focused on intuitive user experiences.",
      icon: <FaPaintBrush className="text-2xl" />
    },
    {
      step: "03",
      title: "App Development",
      description: "Our developers code your app using the latest technologies and best practices.",
      icon: <FaCode className="text-2xl" />
    },
    {
      step: "04",
      title: "Quality Assurance",
      description: "Rigorous testing across devices and scenarios to ensure bug-free performance.",
      icon: <FaCogs className="text-2xl" />
    },
    {
      step: "05",
      title: "Deployment",
      description: "We handle the complete process of submitting your app to respective app stores.",
      icon: <FaRocket className="text-2xl" />
    },
    {
      step: "06",
      title: "Maintenance & Updates",
      description: "Continuous support, updates, and feature additions based on user feedback.",
      icon: <FaTools className="text-2xl" />
    }
  ];

  // App showcase
  const appShowcase = [
    {
      platform: "iOS",
      icon: <FaApple className="text-4xl text-white" />,
      title: "App Store",
      description: "We'll help you navigate Apple's strict guidelines to get your app published",
      rating: "4.9",
      reviews: "12K+",
      color: "from-blue-600 to-purple-600",
      storeIcon: <FaAppStoreIos className="text-xl" />
    },
    {
      platform: "Android",
      icon: <FaAndroid className="text-4xl text-white" />,
      title: "Google Play",
      description: "We ensure your app meets all requirements for the Play Store",
      rating: "4.8",
      reviews: "15K+",
      color: "from-green-500 to-teal-500",
      storeIcon: <FaGooglePlay className="text-xl" />
    }
  ];

  // Tech stack
  const techStack = [
    { name: "React Native", icon: <FaCode /> },
    { name: "Native PHP", icon: <FaServer /> },
    { name: "Node.js", icon: <FaDatabase /> },
    { name: "Swift", icon: <FaApple /> },
    { name: "Java", icon: <FaAndroid /> },
    { name: "Firebase", icon: <FaGlobe /> }
  ];

  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden relative">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-orange-500/10 to-pink-500/10"
              style={{
                width: Math.random() * 200 + 100,
                height: Math.random() * 200 + 100,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Floating App Store Icons */}
        <motion.div 
          className="absolute top-1/4 left-10 hidden lg:block"
          variants={floatAnimation}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-2xl shadow-2xl flex items-center justify-center w-16 h-16">
            <FaAppStoreIos className="text-3xl text-white" />
          </div>
        </motion.div>

        <motion.div 
          className="absolute bottom-1/3 right-10 hidden lg:block"
          variants={floatAnimation}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <div className="bg-gradient-to-br from-green-500 to-teal-500 p-3 rounded-2xl shadow-2xl flex items-center justify-center w-16 h-16">
            <FaGooglePlay className="text-3xl text-white" />
          </div>
        </motion.div>

        {/* Hero Section */}
        <section 
          className="relative py-20 lg:py-32 overflow-hidden"
          data-section="hero"
          itemScope
          itemType="https://schema.org/WebPage"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  itemProp="headline"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">Mobile Apps</span> That Captivate & Convert
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-300 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  itemProp="description"
                >
                  We create stunning, high-performance mobile applications that engage users and drive business growth across iOS and Android platforms. Serving businesses across South Africa with expert mobile development.
                </motion.p>
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Link href="/new-project/request-quotation" >
                    <motion.a 
                      className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Start your mobile app development project with a free quote"
                    >
                      <FaRocket className="text-lg" />
                      Start Your Project
                    </motion.a>
                  </Link>
                  <Link href="/features/web-development/live-projects" >
                    <motion.a 
                      className="px-6 py-3 border border-orange-500 text-orange-300 font-semibold rounded-lg shadow-sm hover:bg-orange-500/10 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="View our portfolio of mobile app development projects"
                    >
                      <FaDownload className="text-lg" />
                      View Portfolio
                    </motion.a>
                  </Link>
                </motion.div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="relative"
              >
                <motion.div 
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-1 rounded-3xl shadow-2xl border border-orange-500/20 relative overflow-hidden"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')] bg-cover bg-center opacity-20"></div>
                  <div className="bg-gradient-to-b from-gray-900/80 to-gray-800/80 rounded-3xl p-6 backdrop-blur-sm">
                    <div className="flex gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="font-mono text-sm">
                      <div className="text-orange-400">function <span className="text-pink-400">developMobileApp</span>() {"{"}</div>
                      <div className="ml-4 text-green-400">// Stunning native & cross-platform apps</div>
                      <div className="ml-4 text-blue-400">const</div>
                      <div className="ml-8 text-yellow-200">innovation = "cutting-edge"</div>
                      <div className="ml-8 text-yellow-200">design = "breathtaking"</div>
                      <div className="ml-8 text-yellow-200">performance = "blazing-fast"</div>
                      <div className="text-orange-400">{"}"}</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-6 -left-6 bg-gradient-to-br from-orange-500 to-pink-500 p-1 rounded-xl shadow-2xl z-10"
                  variants={floatAnimation}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="bg-gray-800 rounded-lg p-3 flex items-center justify-center">
                    <FaApple className="text-3xl text-orange-300" />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -top-6 -right-6 bg-gradient-to-br from-pink-500 to-orange-500 p-1 rounded-xl shadow-2xl z-10"
                  variants={floatAnimation}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.5 }}
                >
                  <div className="bg-gray-800 rounded-lg p-3 flex items-center justify-center">
                    <FaAndroid className="text-3xl text-pink-300" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* App Stores Section */}
        <section 
          className="relative py-16 lg:py-24"
          data-section="app-stores"
          aria-labelledby="app-stores-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
            >
              <h2 id="app-stores-heading" className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">App Store</span> Excellence
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We ensure your app stands out in both major app stores with optimized listings and ratings for South African users
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {appShowcase.map((store, index) => (
                <motion.div 
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeIn}
                  transition={{ delay: index * 0.2 }}
                  className={`bg-gradient-to-br ${store.color} rounded-3xl p-1 shadow-2xl hover:shadow-3xl transition-all duration-500`}
                >
                  <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-3xl p-6 h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-white/10">
                        {store.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{store.title}</h3>
                    </div>
                    <p className="text-gray-300 mb-6">{store.description}</p>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-white font-semibold">{store.rating}/5</span>
                      <span className="text-gray-400">({store.reviews} reviews)</span>
                    </div>
                    <Link href="/new-project/request-quotation" >
                      <motion.a 
                        className="w-full py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                        aria-label={`Get started with ${store.platform} app development`}
                      >
                        {store.storeIcon}
                        Explore {store.platform} Apps
                      </motion.a>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section 
          className="relative py-20 lg:py-28"
          data-section="services"
          aria-labelledby="services-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
            >
              <h2 id="services-heading" className="text-3xl md:text-4xl font-bold mb-4">
                Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">Mobile App</span> Services
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive mobile app development solutions for startups and enterprises across South Africa
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {services.map((service, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-1 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-500 group relative overflow-hidden h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 h-full bg-gradient-to-b from-gray-900/70 to-gray-800/70 rounded-3xl p-6 backdrop-blur-sm">
                    <motion.div 
                      className="mb-4 flex justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl text-white shadow-lg">
                        {service.icon}
                      </div>
                    </motion.div>
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
          className="py-20 lg:py-28 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden"
          data-section="process"
          aria-labelledby="process-heading"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')] bg-cover bg-center opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
            >
              <h2 id="process-heading" className="text-3xl md:text-4xl font-bold mb-4">
                Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">App Development</span> Process
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A structured approach to transform your idea into a successful mobile application for the South African market
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <motion.div 
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeIn}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-1 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-500 group"
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-gradient-to-b from-gray-900/70 to-gray-800/70 rounded-3xl p-6 backdrop-blur-sm h-full">
                    <div className="text-5xl font-bold text-orange-500/30 mb-2">{step.step}</div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-lg">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                    </div>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
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
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
            >
              <h2 id="tech-stack-heading" className="text-3xl md:text-4xl font-bold mb-4">
                Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">Technology Stack</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We use cutting-edge technologies to build high-performance, scalable mobile applications for South African businesses
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {techStack.map((tech, index) => (
                <motion.div 
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeIn}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-1 border border-orange-500/20 hover:border-orange-500/40 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  whileHover={{ y: -5, scale: 1.05 }}
                >
                  <div className="bg-gradient-to-b from-gray-900/70 to-gray-800/70 rounded-2xl p-5 text-center backdrop-blur-sm h-full flex flex-col items-center justify-center">
                    <motion.div 
                      className="flex justify-center mb-3 text-orange-500 group-hover:text-pink-400 text-3xl"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      {tech.icon}
                    </motion.div>
                    <h3 className="font-semibold text-white">{tech.name}</h3>
                  </div>
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
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
            >
              <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Build Your <span className="text-white">Mobile Masterpiece</span>?
              </h2>
              <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
                Let's turn your app idea into reality with our expert mobile development team and dominate both app stores in South Africa.
              </p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={staggerChildren}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Link href="/new-project/request-quotation" >
                  <motion.a 
                    className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-xl shadow-2xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ y: 0 }}
                    variants={fadeIn}
                    aria-label="Start your mobile app development project now"
                  >
                    <FaRocket className="text-xl" />
                    Launch Your App Now
                  </motion.a>
                </Link>
                <Link href="/features/web-development/live-projects" >
                  <motion.a 
                    className="px-8 py-4 border border-white text-white font-semibold rounded-xl shadow-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ y: 0 }}
                    variants={fadeIn}
                    transition={{ delay: 0.1 }}
                    aria-label="View our mobile app development case studies"
                  >
                    <FaDownload className="text-xl" />
                    View Case Studies
                  </motion.a>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MobileAppDevelopment;
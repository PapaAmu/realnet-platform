"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FaServer, 
  FaEnvelope, 
  FaShieldAlt, 
  FaRocket, 
  FaDatabase,
  FaSync,
  FaHeadset,
  FaGlobe,
  FaLock,
  FaCogs,
  FaChartLine,
  FaCloud,
  FaCheckCircle,
  FaTimes,
  FaArrowRight
} from "react-icons/fa";

// Fixed background element positions - consistent between server and client
const backgroundElements = [
  { width: 155, height: 162, top: 32, left: 50 },
  { width: 203, height: 250, top: 64, left: 40 },
  { width: 162, height: 251, top: 41, left: 62 },
  { width: 195, height: 183, top: 36, left: 32 },
  { width: 104, height: 150, top: 62, left: 83 }
];

const HostingAndEmail = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("professional");
  const [selectedEmailPlan, setSelectedEmailPlan] = useState("business");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setIsClient(true);
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

  // Hosting features
  const hostingFeatures = [
    {
      title: "99.9% Uptime Guarantee",
      description: "Maximum reliability with our SLA-backed uptime guarantee for South African businesses",
      icon: <FaChartLine className="text-2xl" />
    },
    {
      title: "Free SSL Certificates",
      description: "Secure your website with free SSL certificates for all domains and subdomains",
      icon: <FaLock className="text-2xl" />
    },
    {
      title: "Daily Backups",
      description: "Automatic daily backups with easy one-click restoration and data protection",
      icon: <FaDatabase className="text-2xl" />
    },
    {
      title: "24/7 Expert Support",
      description: "Round-the-clock technical support from our South African hosting experts",
      icon: <FaHeadset className="text-2xl" />
    },
    {
      title: "Server Monitoring",
      description: "Proactive monitoring to prevent issues before they affect your website",
      icon: <FaCogs className="text-2xl" />
    },
    {
      title: "One-Click Installs",
      description: "Install WordPress, Joomla, and 100+ applications with one click",
      icon: <FaRocket className="text-2xl" />
    }
  ];

  // Email features
  const emailFeatures = [
    {
      title: "Professional Address",
      description: "you@yourbusiness.co.za - Build trust with professional South African email addresses",
      icon: <FaEnvelope className="text-2xl" />
    },
    {
      title: "Enhanced Security",
      description: "Advanced spam filtering and malware protection for business communications",
      icon: <FaShieldAlt className="text-2xl" />
    },
    {
      title: "Generous Storage",
      description: "Ample storage space for all your business emails and attachments",
      icon: <FaDatabase className="text-2xl" />
    },
    {
      title: "Anywhere Access",
      description: "Access your email from any device, anywhere in South Africa",
      icon: <FaGlobe className="text-2xl" />
    },
    {
      title: "Calendar & Contacts",
      description: "Integrated calendar and contacts synchronization across devices",
      icon: <FaSync className="text-2xl" />
    },
    {
      title: "No Ads",
      description: "Professional, ad-free email experience for your business",
      icon: <FaTimes className="text-2xl" />
    }
  ];

  // Hosting plans
  const hostingPlans = [
    {
      name: "Starter",
      price: "R139.99",
      period: "month",
      description: "Perfect for small websites and personal blogs in South Africa",
      features: [
        "1 Website",
        "10 GB SSD Storage",
        "Unmetered Bandwidth",
        "Free .co.za Domain (1 year)",
        "Free SSL Certificate",
        "Standard Performance"
      ],
      recommended: false
    },
    {
      name: "Professional",
      price: "R249.99",
      period: "month",
      description: "Ideal for growing South African businesses and e-commerce",
      features: [
        "Unlimited Websites",
        "50 GB SSD Storage",
        "Unmetered Bandwidth",
        "Free .co.za Domain (1 year)",
        "Free SSL Certificate",
        "Enhanced Performance",
        "Daily Backups",
        "Free Email Account"
      ],
      recommended: true
    },
    {
      name: "Enterprise",
      price: "R399.99",
      period: "month",
      description: "For high-traffic websites and online stores in South Africa",
      features: [
        "Unlimited Websites",
        "100 GB NVMe Storage",
        "Unmetered Bandwidth",
        "Free .co.za Domain (1 year)",
        "Free SSL Certificate",
        "Maximum Performance",
        "Daily Backups",
        "Free Email Accounts",
        "Premium Support",
        "Free CDN"
      ],
      recommended: false
    }
  ];

  // Email plans
  const emailPlans = [
    {
      name: "Basic",
      price: "R99.99",
      period: "month",
      description: "For individuals and small teams in South Africa",
      features: [
        "8 Email Accounts",
        "10 GB Storage",
        "Webmail Access",
        "Spam Protection",
        "Email Forwarding"
      ],
      recommended: false
    },
    {
      name: "Business",
      price: "R199.99",
      period: "month",
      description: "Perfect for small to medium South African businesses",
      features: [
        "20 Email Accounts",
        "30 GB Storage",
        "Webmail & Mobile Access",
        "Advanced Spam Protection",
        "Email Forwarding",
        "Calendar & Contacts Sync",
        "99.9% Uptime"
      ],
      recommended: true
    },
    {
      name: "Enterprise",
      price: "R499.99",
      period: "month",
      description: "For large South African organizations with advanced needs",
      features: [
        "Unlimited Email Accounts",
        "100 GB Storage",
        "Webmail & Mobile Access",
        "Advanced Spam Protection",
        "Email Forwarding",
        "Calendar & Contacts Sync",
        "99.9% Uptime",
        "Priority Support",
        "Email Archiving"
      ],
      recommended: false
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden relative">
        {/* Animated background elements - FIXED with consistent values */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {backgroundElements.map((element, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10"
              style={{
                width: element.width,
                height: element.height,
                top: `${element.top}%`,
                left: `${element.left}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 10 + (i * 2), // Consistent durations
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Floating Icons - Only render on client side */}
        {isClient && (
          <>
            <motion.div 
              className="absolute top-1/4 left-10 hidden lg:block"
              variants={floatAnimation}
              initial="hidden"
              animate="visible"
            >
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-3 rounded-2xl shadow-2xl flex items-center justify-center w-16 h-16">
                <FaServer className="text-3xl text-white" />
              </div>
            </motion.div>

            <motion.div 
              className="absolute bottom-1/3 right-10 hidden lg:block"
              variants={floatAnimation}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
            >
              <div className="bg-gradient-to-br from-cyan-500 to-blue-500 p-3 rounded-2xl shadow-2xl flex items-center justify-center w-16 h-16">
                <FaEnvelope className="text-3xl text-white" />
              </div>
            </motion.div>
          </>
        )}

        {/* Hero Section */}
        <section 
          className="relative py-20 lg:py-32 overflow-hidden"
          data-section="hero"
          aria-labelledby="hosting-hero-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={fadeIn}
              >
                <motion.h1 
                  id="hosting-hero-heading"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Managed Hosting</span> & Professional Email
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-300 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Powerful, reliable hosting solutions and professional business email services for South African businesses. Elevate your online presence with 99.9% uptime guarantee.
                </motion.p>
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Link 
                    href="/new-project/request-quotation"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                  >
                    <motion.span
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2"
                    >
                      <FaRocket className="text-lg" />
                      Get Started Now
                    </motion.span>
                  </Link>
                  <Link 
                    href="/contact-us"
                    className="px-6 py-3 border border-blue-500 text-blue-300 font-semibold rounded-lg shadow-sm hover:bg-blue-500/10 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                  >
                    <motion.span
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2"
                    >
                      <FaHeadset className="text-lg" />
                      Speak to an Expert
                    </motion.span>
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
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-1 rounded-3xl shadow-2xl border border-blue-500/20 relative overflow-hidden"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563207153-f403bf289096?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80')] bg-cover bg-center opacity-20"></div>
                  <div className="bg-gradient-to-b from-gray-900/80 to-gray-800/80 rounded-3xl p-6 backdrop-blur-sm">
                    <div className="flex gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="font-mono text-sm">
                      <div className="text-blue-400">function <span className="text-cyan-400">setupInfrastructure</span>() {"{"}</div>
                      <div className="ml-4 text-green-400">// Reliable hosting + professional email</div>
                      <div className="ml-4 text-blue-400">const</div>
                      <div className="ml-8 text-yellow-200">performance = "blazing-fast"</div>
                      <div className="ml-8 text-yellow-200">reliability = "99.9% uptime"</div>
                      <div className="ml-8 text-yellow-200">security = "enterprise-grade"</div>
                      <div className="text-blue-400">{"}"}</div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Only render floating elements on client side */}
                {isClient && (
                  <>
                    <motion.div 
                      className="absolute -bottom-6 -left-6 bg-gradient-to-br from-blue-500 to-cyan-500 p-1 rounded-xl shadow-2xl z-10"
                      variants={floatAnimation}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className="bg-gray-800 rounded-lg p-3 flex items-center justify-center">
                        <FaServer className="text-3xl text-blue-300" />
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="absolute -top-6 -right-6 bg-gradient-to-br from-cyan-500 to-blue-500 p-1 rounded-xl shadow-2xl z-10"
                      variants={floatAnimation}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.5 }}
                    >
                      <div className="bg-gray-800 rounded-lg p-3 flex items-center justify-center">
                        <FaEnvelope className="text-3xl text-cyan-300" />
                      </div>
                    </motion.div>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Hosting Features Section */}
        <section 
          className="relative py-20 lg:py-28"
          data-section="hosting-features"
          aria-labelledby="hosting-features-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
            >
              <h2 id="hosting-features-heading" className="text-3xl md:text-4xl font-bold mb-4">
                Powerful <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Managed Hosting</span> Solutions
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Focus on your South African business while we handle the technical details of your hosting infrastructure with enterprise-grade reliability.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {hostingFeatures.map((feature, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-1 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-500 group relative overflow-hidden h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 h-full bg-gradient-to-b from-gray-900/70 to-gray-800/70 rounded-3xl p-6 backdrop-blur-sm">
                    <motion.div 
                      className="mb-4 flex justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl text-white shadow-lg">
                        {feature.icon}
                      </div>
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-3 text-center text-white">{feature.title}</h3>
                    <p className="text-gray-400 text-center">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Email Features Section */}
        <section 
          className="py-20 lg:py-28 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden"
          data-section="email-features"
          aria-labelledby="email-features-heading"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')] bg-cover bg-center opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
            >
              <h2 id="email-features-heading" className="text-3xl md:text-4xl font-bold mb-4">
                Professional <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Business Email</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Ditch generic email addresses and build trust with professional email that matches your South African domain and business identity.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {emailFeatures.map((feature, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-1 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 group relative overflow-hidden h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 h-full bg-gradient-to-b from-gray-900/70 to-gray-800/70 rounded-3xl p-6 backdrop-blur-sm">
                    <motion.div 
                      className="mb-4 flex justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl text-white shadow-lg">
                        {feature.icon}
                      </div>
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-3 text-center text-white">{feature.title}</h3>
                    <p className="text-gray-400 text-center">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section 
          className="py-20 lg:py-28 relative"
          data-section="pricing"
          aria-labelledby="pricing-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
            >
              <h2 id="pricing-heading" className="text-3xl md:text-4xl font-bold mb-4">
                Flexible <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Pricing Plans</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Choose the perfect plan for your South African business needs with our transparent, competitive pricing
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Hosting Plans */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
              >
                <div className="text-center mb-8">
                  <div className="inline-flex bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-1 mb-4">
                    <FaServer className="text-2xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Hosting Plans</h3>
                  <p className="text-gray-400">High-performance hosting solutions for South African websites</p>
                </div>

                <div className="space-y-6">
                  {hostingPlans.map((plan, index) => (
                    <motion.div 
                      key={index}
                      className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-1 ${plan.recommended ? 'border-2 border-blue-500' : 'border border-blue-500/20'} transition-all duration-300 hover:shadow-xl`}
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedPlan(plan.name.toLowerCase())}
                    >
                      <div className="bg-gradient-to-b from-gray-900/70 to-gray-800/70 rounded-2xl p-6 backdrop-blur-sm">
                        {plan.recommended && (
                          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                            MOST POPULAR
                          </div>
                        )}
                        <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
                        <div className="flex items-baseline justify-center mb-4">
                          <span className="text-3xl font-bold text-white">{plan.price}</span>
                          <span className="text-gray-400 ml-1">/{plan.period}</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                        <ul className="space-y-3 mb-6">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                              <span className="text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Link 
                          href="/new-project/request-quotation"
                          className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${plan.recommended ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                        >
                          <motion.span
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 0 }}
                            className="flex items-center gap-2"
                          >
                            Get Started <FaArrowRight className="text-sm" />
                          </motion.span>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Email Plans */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
                transition={{ delay: 0.2 }}
              >
                <div className="text-center mb-8">
                  <div className="inline-flex bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full p-1 mb-4">
                    <FaEnvelope className="text-2xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Email Plans</h3>
                  <p className="text-gray-400">Professional business email solutions for South African companies</p>
                </div>

                <div className="space-y-6">
                  {emailPlans.map((plan, index) => (
                    <motion.div 
                      key={index}
                      className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-1 ${plan.recommended ? 'border-2 border-cyan-500' : 'border border-cyan-500/20'} transition-all duration-300 hover:shadow-xl`}
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedEmailPlan(plan.name.toLowerCase())}
                    >
                      <div className="bg-gradient-to-b from-gray-900/70 to-gray-800/70 rounded-2xl p-6 backdrop-blur-sm">
                        {plan.recommended && (
                          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                            RECOMMENDED
                          </div>
                        )}
                        <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
                        <div className="flex items-baseline justify-center mb-4">
                          <span className="text-3xl font-bold text-white">{plan.price}</span>
                          <span className="text-gray-400 ml-1">/{plan.period}</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                        <ul className="space-y-3 mb-6">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                              <span className="text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Link 
                          href="/new-project/request-quotation"
                          className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${plan.recommended ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                        >
                          <motion.span
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 0 }}
                            className="flex items-center gap-2"
                          >
                            Get Started <FaArrowRight className="text-sm" />
                          </motion.span>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          className="py-20 lg:py-28 bg-gradient-to-r from-blue-600 to-cyan-600 text-white relative overflow-hidden"
          data-section="cta"
          aria-labelledby="hosting-cta-heading"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563207153-f403bf289096?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
            >
              <h2 id="hosting-cta-heading" className="text-3xl md:text-4xl font-bold mb-6">
                Ready to <span className="text-white">Elevate Your Business</span>?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Get enterprise-grade hosting and professional email that builds trust and drives growth for your South African business. Join hundreds of satisfied customers today.
              </p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={staggerChildren}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Link 
                  href="/new-project/request-quotation"
                  className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-2xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <motion.span
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ y: 0 }}
                    className="flex items-center gap-2"
                  >
                    <FaRocket className="text-xl" />
                    Launch Your Infrastructure
                  </motion.span>
                </Link>
                <Link 
                  href="/contact-us"
                  className="px-8 py-4 border border-white text-white font-semibold rounded-xl shadow-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <motion.span
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ y: 0 }}
                    className="flex items-center gap-2"
                  >
                    <FaHeadset className="text-xl" />
                    Speak to an Expert
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Local Business Info */}
        <section 
          className="py-12 bg-gray-800 border-t border-gray-700"
          data-section="local-info"
          itemScope
          itemType="https://schema.org/LocalBusiness"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-lg font-semibold text-white mb-4" itemProp="name">REALNET WEB SOLUTIONS - Hosting Services</h3>
            <div className="text-gray-300 text-sm space-y-1">
              <p itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <span itemProp="streetAddress">Matsau Street, Ivory Park</span>,{" "}
                <span itemProp="addressLocality">Midrand</span>,{" "}
                <span itemProp="addressRegion">Gauteng</span>{" "}
                <span itemProp="postalCode">1689</span>
              </p>
              <p itemProp="telephone"><strong>Phone:</strong> +27-64-038-8883</p>
              <p itemProp="email"><strong>Email:</strong> lukhele@realnet-web.co.za</p>
              <p><strong>Serving:</strong> Johannesburg, Pretoria, and businesses across South Africa</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HostingAndEmail;
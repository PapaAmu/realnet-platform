"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaLightbulb, FaHeart, FaRocket, FaStar, FaCode, FaMobile, FaGlobe } from "react-icons/fa";
import Link from "next/link";

const AboutUs = () => {
  const values = [
    {
      icon: FaLightbulb,
      title: "Innovation",
      description: "We stay at the forefront of technology to deliver cutting-edge solutions that give our clients a competitive advantage."
    },
    {
      icon: FaHeart,
      title: "Quality",
      description: "We're committed to delivering high-quality work that exceeds expectations and stands the test of time."
    },
    {
      icon: FaUsers,
      title: "Partnership",
      description: "We believe in building long-term relationships with our clients, working together as partners to achieve success."
    },
    {
      icon: FaRocket,
      title: "Growth",
      description: "We help businesses grow and scale by providing robust, scalable solutions that evolve with your needs."
    }
  ];

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "25+", label: "Happy Clients" },
    { number: "5+", label: "Years Experience" },
    { number: "99%", label: "Client Satisfaction" }
  ];

  const services = [
    {
      icon: FaGlobe,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies"
    },
    {
      icon: FaMobile,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android"
    },
    {
      icon: FaCode,
      title: "Software Development",
      description: "Custom software solutions tailored to your business needs"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-20 pt-32"
          data-section="about-hero"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">REALNET</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              We're a passionate team of developers and designers dedicated to creating innovative digital solutions that help businesses thrive in the digital age.
            </motion.p>
          </div>
        </motion.section>

        {/* Our Story Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-20"
          data-section="our-story"
          itemScope
          itemType="https://schema.org/Organization"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-lg text-gray-600 mb-6" itemProp="description">
                  Founded with a vision to bridge the gap between technology and business success, <strong itemProp="name">REALNET WEB SOLUTIONS</strong> has been at the forefront of digital transformation in South Africa. We started as a small team of passionate developers who believed that every business deserves access to world-class technology solutions.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Today, we've grown into a trusted partner for businesses across various industries, helping them leverage the power of web and mobile technologies to achieve their goals. Our journey has been marked by continuous learning, innovation, and an unwavering commitment to our clients' success.
                </p>
                <p className="text-lg text-gray-600" itemProp="location" itemScope itemType="https://schema.org/Place">
                  Based in <span itemProp="name">Pretoria</span>, we serve clients throughout <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress"><span itemProp="addressCountry">South Africa</span></span> and beyond, bringing together local expertise with global best practices to deliver exceptional results.
                </p>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="relative"
              >
                <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-lg mb-6">
                    To empower businesses with innovative, scalable, and reliable technology solutions that drive growth and success in the digital era.
                  </p>
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-lg">
                    To be South Africa's leading web and mobile development company, known for excellence, innovation, and client satisfaction.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 bg-gray-50"
          data-section="our-values"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These core values guide everything we do and shape our approach to client relationships and project delivery.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <value.icon className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white"
          data-section="achievements"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Achievements</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Numbers that reflect our commitment to excellence and client satisfaction.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 mb-2">
                    {stat.number}
                  </div>
                  <p className="text-lg text-gray-300">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Services Overview */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-20"
          data-section="services-overview"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Do</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We specialize in creating comprehensive digital solutions that help businesses succeed online.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 text-center"
                  itemScope
                  itemType="https://schema.org/Service"
                >
                  <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                    <service.icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4" itemProp="name">{service.title}</h3>
                  <p className="text-gray-600" itemProp="description">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Local Business Info */}
        <section 
          className="py-12 bg-white border-t border-gray-200"
          data-section="local-info"
          itemScope
          itemType="https://schema.org/LocalBusiness"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6" itemProp="name">REALNET WEB SOLUTIONS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="text-gray-600 space-y-2">
                  <p itemProp="telephone">
                    <strong>Phone:</strong> +27-64-038-8883
                  </p>
                  <p itemProp="email">
                    <strong>Email:</strong> lukhele@realnet-web.co.za
                  </p>
                  <p>
                    <strong>Hours:</strong> Mon-Fri 8:00-17:00
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
                <div className="text-gray-600 space-y-2" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <p itemProp="streetAddress">Mashau Street, Ivory Park</p>
                  <p>
                    <span itemProp="addressLocality">Midrand</span>,{" "}
                    <span itemProp="addressRegion">Gauteng</span>
                  </p>
                  <p itemProp="postalCode">1689</p>
                  <p itemProp="addressCountry">South Africa</p>
                </div>
              </div>
            </div>
            <div className="mt-8 text-sm text-gray-500">
              <p>Serving businesses across Gauteng, including Johannesburg, Pretoria, and surrounding areas.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="py-20 bg-gray-50"
          data-section="cta"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Work Together?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Let's discuss how we can help transform your ideas into reality and take your business to the next level.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                aria-label="Contact our team for web development services"
              >
                Get In Touch
              </Link>
              <Link
                href="/new-project/request-quotation"
                className="inline-flex items-center justify-center px-8 py-3 bg-white border border-gray-300 text-gray-800 font-semibold rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-300"
                aria-label="Request a free quote for your project"
              >
                Request Quote
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default AboutUs;
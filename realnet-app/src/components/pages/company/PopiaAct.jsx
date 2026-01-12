"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaLock, FaUserCheck, FaClipboardList, FaPhone, FaEnvelope } from "react-icons/fa";

const POPIA = () => {
  const principles = [
    {
      icon: FaShieldAlt,
      title: "Accountability",
      description: "We take full responsibility for protecting your personal information and complying with all applicable data protection laws."
    },
    {
      icon: FaLock,
      title: "Processing Limitation",
      description: "We only process personal information for lawful purposes and in a manner that is adequate, relevant, and not excessive."
    },
    {
      icon: FaUserCheck,
      title: "Purpose Specification",
      description: "We collect personal information for specific, explicitly defined, and legitimate purposes related to our business activities."
    },
    {
      icon: FaClipboardList,
      title: "Further Processing Limitation",
      description: "We do not use your personal information for purposes other than those for which it was originally collected without your consent."
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
          data-section="popia-hero"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              POPIA <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">Compliance</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Your privacy matters to us. Learn how we protect your personal information in compliance with South Africa's Protection of Personal Information Act (POPIA).
            </motion.p>
          </div>
        </motion.section>

        {/* Introduction Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-20"
          data-section="popia-introduction"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Commitment to Your Privacy</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                At REALNET Web Solutions, we are committed to protecting your privacy and ensuring compliance with the Protection of Personal Information Act (POPIA). This page outlines our privacy practices, your rights, and how we handle your personal information in accordance with South African data protection laws.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* POPIA Principles */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 bg-gray-50"
          data-section="popia-principles"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">POPIA Principles We Follow</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We adhere to all eight conditions for lawful processing of personal information as outlined in POPIA to ensure your data is protected according to South African law.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {principles.map((principle, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                    <principle.icon className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{principle.title}</h3>
                  <p className="text-gray-600">{principle.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Privacy Policy Content */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-20"
          data-section="popia-policy"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {/* Information We Collect */}
              <motion.div variants={itemVariants} className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Information We Collect</h3>
                <div className="space-y-4 text-gray-600">
                  <p><strong>Personal Information:</strong> Name, email address, phone number, company information, and other details you provide when contacting us or requesting services in South Africa.</p>
                  <p><strong>Technical Information:</strong> IP addresses, browser types, device information, and website usage data collected through cookies and analytics tools.</p>
                  <p><strong>Communication Records:</strong> Records of our correspondence, including emails, phone calls, and meeting notes related to web development projects.</p>
                </div>
              </motion.div>

              {/* How We Use Information */}
              <motion.div variants={itemVariants} className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">How We Use Your Information</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• To provide and deliver our web development, mobile app development, and hosting services to South African businesses</li>
                  <li>• To communicate with you about projects, quotations, and service updates</li>
                  <li>• To improve our website functionality and user experience for our South African clients</li>
                  <li>• To comply with legal obligations under POPIA and resolve disputes</li>
                  <li>• To send marketing communications about our web development services (with your consent)</li>
                </ul>
              </motion.div>

              {/* Information Sharing */}
              <motion.div variants={itemVariants} className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Information Sharing and Disclosure</h3>
                <div className="space-y-4 text-gray-600">
                  <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances as permitted by POPIA:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• <strong>Service Providers:</strong> We may share information with trusted service providers who assist us in operating our business (hosting providers, payment processors, analytics services)</li>
                    <li>• <strong>Legal Requirements:</strong> When required by South African law, court order, or government regulations</li>
                    <li>• <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of business assets within South Africa</li>
                    <li>• <strong>Protection of Rights:</strong> To protect our rights, property, or safety, or that of our clients or others as permitted by law</li>
                  </ul>
                </div>
              </motion.div>

              {/* Your Rights */}
              <motion.div variants={itemVariants} className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Rights Under POPIA</h3>
                <div className="space-y-4 text-gray-600">
                  <p>As a data subject under South African law, you have the following rights:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• <strong>Right to Access:</strong> Request access to your personal information we hold</li>
                    <li>• <strong>Right to Correction:</strong> Request correction of inaccurate or incomplete personal information</li>
                    <li>• <strong>Right to Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                    <li>• <strong>Right to Objection:</strong> Object to the processing of your personal information for direct marketing</li>
                    <li>• <strong>Right to Portability:</strong> Request your personal information in a structured, machine-readable format</li>
                    <li>• <strong>Right to Restriction:</strong> Request restriction of processing under certain circumstances</li>
                  </ul>
                </div>
              </motion.div>

              {/* Data Security */}
              <motion.div variants={itemVariants} className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Data Security Measures</h3>
                <div className="space-y-4 text-gray-600">
                  <p>We implement appropriate technical and organizational measures to protect your personal information in compliance with POPIA, including:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• SSL encryption for data transmission</li>
                    <li>• Secure hosting infrastructure with regular backups</li>
                    <li>• Access controls and employee training on POPIA compliance</li>
                    <li>• Regular security assessments and updates</li>
                    <li>• Incident response procedures for data breaches</li>
                  </ul>
                </div>
              </motion.div>

              {/* Cookies */}
              <motion.div variants={itemVariants} className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Cookies and Tracking Technologies</h3>
                <div className="space-y-4 text-gray-600">
                  <p>We use cookies and similar tracking technologies in compliance with POPIA to:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• Remember your preferences and settings</li>
                    <li>• Analyze website traffic and usage patterns for South African visitors</li>
                    <li>• Provide personalized content and recommendations</li>
                    <li>• Improve website performance and user experience</li>
                  </ul>
                  <p>You can control cookie preferences through our cookie consent banner and your browser settings as required by POPIA.</p>
                </div>
              </motion.div>

              {/* Data Retention */}
              <motion.div variants={itemVariants} className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Data Retention Policy</h3>
                <div className="space-y-4 text-gray-600">
                  <p>We retain your personal information only as long as necessary in compliance with POPIA to:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• Fulfill the purposes for which it was collected</li>
                    <li>• Comply with legal obligations under South African law</li>
                    <li>• Resolve disputes and enforce agreements</li>
                    <li>• Maintain business records as required by South African legislation</li>
                  </ul>
                  <p>When personal information is no longer needed, we securely delete or anonymize it in accordance with POPIA requirements.</p>
                </div>
              </motion.div>

              {/* Updates to Policy */}
              <motion.div variants={itemVariants} className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Updates to This Policy</h3>
                <p className="text-gray-600">
                  We may update this privacy policy from time to time to reflect changes in our practices or applicable South African laws, including POPIA amendments. 
                  We will notify you of any material changes by posting the updated policy on our website and updating the 
                  "Last Updated" date. Your continued use of our services after any changes constitutes acceptance of the updated policy.
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  <strong>Last Updated:</strong> January 2024
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Contact Information */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="py-20 bg-gray-50"
          data-section="popia-contact"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Questions About Your Privacy?</h2>
              <p className="text-lg text-gray-600 mb-8">
                If you have any questions about this privacy policy or wish to exercise your rights under POPIA, please contact our Information Officer in South Africa:
              </p>
              
              <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-full w-12 h-12 flex items-center justify-center">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Email</p>
                    <a href="mailto:info@realnet-web.co.za" className="text-orange-500 hover:underline">
                      info@realnet-web.co.za
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-full w-12 h-12 flex items-center justify-center">
                    <FaPhone className="text-white text-xl" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Phone</p>
                    <a href="tel:+27640388883" className="text-orange-500 hover:underline">
                      +27 64 038 8883
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Information Officer:</strong> REALNET Web Solutions<br />
                  <strong>Physical Address:</strong> Matsau Street, Ivory Park, Midrand, Gauteng 1689, South Africa<br />
                  <strong>Response Time:</strong> We will respond to POPIA privacy requests within 30 days as required by South African law.
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default POPIA;
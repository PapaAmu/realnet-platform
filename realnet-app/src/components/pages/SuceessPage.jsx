// app/form-success/page.jsx
'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  FaCheckCircle, 
  FaClock, 
  FaEnvelope, 
  FaPhone, 
  FaArrowRight,
  FaWhatsapp,
  FaStar,
  FaShieldAlt
} from 'react-icons/fa';

// Create a motion-enhanced Link component
const MotionLink = motion(Link);

const FormSuccessPage = () => {
  const searchParams = useSearchParams();
  const formType = searchParams.get('type') || 'form';
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Optionally auto-redirect here
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getFormDetails = () => {
    switch (formType) {
      case 'contact':
        return {
          title: 'Message Sent Successfully!',
          description: 'Thank you for reaching out to us. We have received your message and will get back to you shortly.',
          icon: '💬',
          nextSteps: [
            'We will review your message',
            'Our team will contact you within 2-24 hours',
            'We will provide detailed responses to your queries'
          ]
        };
      case 'quotation':
        return {
          title: 'Quote Request Received!',
          description: 'Thank you for your interest in our services. We are excited to work with you and will prepare a detailed quotation.',
          icon: '💰',
          nextSteps: [
            'We are analyzing your requirements',
            'Our experts are preparing your custom quote',
            'You will receive the quotation within 2-24 hours'
          ]
        };
      default:
        return {
          title: 'Form Submitted Successfully!',
          description: 'Thank you for your submission. We have received your information and will process it shortly.',
          icon: '✅',
          nextSteps: [
            'We are processing your submission',
            'Our team will review the information',
            'You will hear from us within 2-24 hours'
          ]
        };
    }
  };

  const details = getFormDetails();

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-6xl mb-6"
            variants={pulseVariants}
            initial="initial"
            animate="pulse"
          >
            {details.icon}
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            variants={itemVariants}
          >
            {details.title}
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {details.description}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Success Card */}
          <motion.div
            className="bg-white rounded-3xl shadow-xl p-8 border border-green-200"
            variants={itemVariants}
          >
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaCheckCircle className="text-green-600 text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What Happens Next?</h2>
            </div>
            
            <ul className="space-y-4 mb-6">
              {details.nextSteps.map((step, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                >
                  <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">{step}</span>
                </motion.li>
              ))}
            </ul>

            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
              <div className="flex items-center mb-2">
                <FaClock className="text-yellow-600 mr-2" />
                <span className="font-semibold text-yellow-800">Response Time</span>
              </div>
              <p className="text-yellow-700 text-sm">
                We typically respond within <strong>2 to 24 hours</strong> during business hours. 
                For urgent matters, feel free to contact us directly.
              </p>
            </div>
          </motion.div>

          {/* Contact & Next Steps */}
          <motion.div
            className="space-y-6"
            variants={itemVariants}
          >
            {/* Quick Contact */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FaEnvelope className="text-blue-600 mr-2" />
                Need Immediate Assistance?
              </h3>
              <div className="space-y-4">
                <motion.a
                  href="mailto:lukhele@realnet-web.co.za"
                  className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FaEnvelope className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Email Us</div>
                      <div className="text-sm text-gray-600">lukhele@realnet-web.co.za</div>
                    </div>
                  </div>
                  <FaArrowRight className="text-blue-600 group-hover:translate-x-1 transition-transform" />
                </motion.a>

                <motion.a
                  href="tel:+27640388883"
                  className="flex items-center justify-between p-4 bg-green-50 rounded-2xl hover:bg-green-100 transition-colors group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <FaPhone className="text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Call Us</div>
                      <div className="text-sm text-gray-600">+27 64 038-8883</div>
                    </div>
                  </div>
                  <FaArrowRight className="text-green-600 group-hover:translate-x-1 transition-transform" />
                </motion.a>

                <motion.a
                  href="https://wa.me/27640388883"
                  className="flex items-center justify-between p-4 bg-[#25D366] bg-opacity-10 rounded-2xl hover:bg-opacity-20 transition-colors group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    <div className="bg-[#25D366] bg-opacity-20 p-2 rounded-full mr-3">
                      <FaWhatsapp className="text-[#25D366]" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">WhatsApp</div>
                      <div className="text-sm text-gray-600">Instant messaging</div>
                    </div>
                  </div>
                  <FaArrowRight className="text-[#25D366] group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-purple-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <FaShieldAlt className="text-purple-600 mr-2" />
                Why Choose RealNet?
              </h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-purple-50 rounded-2xl p-3">
                  <div className="text-2xl font-bold text-purple-600">24h</div>
                  <div className="text-xs text-purple-700">Max Response</div>
                </div>
                <div className="bg-orange-50 rounded-2xl p-3">
                  <div className="text-2xl font-bold text-orange-600">100%</div>
                  <div className="text-xs text-orange-700">Satisfaction</div>
                </div>
                <div className="bg-green-50 rounded-2xl p-3">
                  <div className="text-2xl font-bold text-green-600">50+</div>
                  <div className="text-xs text-green-700">Projects</div>
                </div>
                <div className="bg-blue-50 rounded-2xl p-3">
                  <div className="text-2xl font-bold text-blue-600">5★</div>
                  <div className="text-xs text-blue-700">Rated</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <MotionLink
            href="/"
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Back to Homepage</span>
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </MotionLink>

          <MotionLink
            href="/projects"
            className="px-8 py-4 border border-gray-300 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 transition-all duration-200 flex items-center group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View Our Work</span>
            <FaStar className="ml-2 text-yellow-500 group-hover:scale-110 transition-transform" />
          </MotionLink>

          <MotionLink
            href="/contact-us"
            className="px-8 py-4 border border-blue-300 text-blue-600 font-semibold rounded-2xl hover:bg-blue-50 transition-all duration-200 flex items-center group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Contact Again</span>
            <FaEnvelope className="ml-2 group-hover:scale-110 transition-transform" />
          </MotionLink>
        </motion.div>

        {/* Countdown Notice */}
        <motion.div
          className="text-center mt-12 p-6 bg-white rounded-2xl shadow-lg border border-gray-200 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex items-center justify-center mb-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">You will be redirected in</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {countdown} second{countdown !== 1 ? 's' : ''}
          </div>
          <p className="text-sm text-gray-600">
            Or click any button above to navigate manually
          </p>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/4 left-10 w-4 h-4 bg-green-400 rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-20 w-6 h-6 bg-blue-400 rounded-full opacity-30"
          animate={{
            y: [0, 30, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-purple-400 rounded-full opacity-25"
          animate={{
            y: [0, -15, 0],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </div>
    </div>
  );
};

export default FormSuccessPage;
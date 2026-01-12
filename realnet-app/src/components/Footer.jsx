'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaEnvelope, 
  FaInstagram, 
  FaFacebook, 
  FaLinkedin, 
  FaGithub,
  FaArrowRight,
  FaHeart,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaSignInAlt
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      // Here you would typically send the email to your backend
      console.log("Subscribed email:", email);
    }
  };

  const handleAdminLogin = () => {
    window.open("https://admin.realnet-web.co.za", "_blank");
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <footer className="pt-16 relative overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://i.pinimg.com/736x/56/76/5f/56765fd8f4d40b2550b4ad70de14f41f.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />
      
      {/* Enhanced Dark Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-900/97 via-gray-900/95 to-gray-800/97"></div>
      
      {/* Simplified background elements */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        <div className="absolute -top-40 -right-40 transform-gpu overflow-hidden blur-3xl">
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-orange-500/5 to-pink-500/5"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
      
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 relative z-10">
        {/* Newsletter Section */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 max-w-2xl mx-auto">
            <h3 className="text-white text-2xl font-bold mb-3">
              Stay <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">Updated</span> with Our Latest Offers
            </h3>
            <p className="text-gray-300 mb-6">Get exclusive web development tips and special offers delivered to your inbox</p>
            
            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4"
              >
                <p className="text-green-400 font-semibold">🎉 Thank you for subscribing!</p>
                <p className="text-green-300 text-sm mt-1">We've sent a welcome email to your inbox.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="relative w-full sm:w-80">
                  <FaEnvelope className="w-5 h-5 text-gray-400 absolute left-3 inset-y-0 my-auto" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 text-white bg-gray-700/80 backdrop-blur-sm outline-none border border-gray-600 focus:border-orange-500 shadow-sm rounded-xl transition-all duration-300"
                    required
                  />
                </div>
                <motion.button 
                  type="submit"
                  className="py-3 px-6 font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 rounded-xl shadow-lg flex items-center gap-2 transition-all duration-300 whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe <FaArrowRight className="text-xs" />
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Links Grid - All original columns included */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12 justify-between mb-16"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Resources Column */}
          <motion.div className="space-y-4 text-gray-300" variants={fadeIn}>
            <h4 className="text-orange-400 font-semibold pb-2 text-lg">Resources</h4>
            <div className="space-y-4">
              <a
                href="/contact-us"
                className="duration-150 hover:text-orange-400 flex items-center gap-1 group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">Support</span>
              </a>
              <a
                href="/popia-act"
                className="duration-150 hover:text-orange-400 flex items-center gap-1 group "
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">POPIA</span>
              </a>
              <motion.button
                onClick={handleAdminLogin}
                className="duration-150 hover:text-orange-400 flex items-center gap-2 group w-full text-left"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSignInAlt className="text-sm text-gray-400 group-hover:text-orange-400 transition-colors" />
                <span className="group-hover:translate-x-1 transition-transform duration-200">Admin Login</span>
              </motion.button>
            </div>
          </motion.div>
          
          {/* Quick Quotes Column */}
          <motion.ul className="space-y-4 text-gray-300" variants={fadeIn}>
            <h4 className="text-orange-400 font-semibold pb-2 text-lg">Quick Quotes</h4>
            <li>
              <a
                href="/solutions/web-development/starter-website-quote-request"
                className="duration-150 hover:text-orange-400 flex items-center gap-1 group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">Starter Business Website</span>
              </a>
            </li>
            <li>
              <a
                href="/solutions/web-development/e-commerce-quote-request"
                className="duration-150 hover:text-orange-400 flex items-center gap-1 group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">Ecommerce Website</span>
              </a>
            </li>
            <li>
              <a
                href="/solutions/web-development/custom-website-quote-request"
                className="duration-150 hover:text-orange-400 flex items-center gap-1 group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">Custom Website Dev</span>
              </a>
            </li>
          </motion.ul>
          
          {/* Explore Column */}
          <motion.ul className="space-y-4 text-gray-300" variants={fadeIn}>
            <h4 className="text-orange-400 font-semibold pb-2 text-lg">Explore</h4>
            <li>
              <a
                href="/solutions/web-development"
                className="duration-150 hover:text-orange-400 flex items-center gap-1 group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">Website Development</span>
              </a>
            </li>
            <li>
              <a
                href="/solutions/mobile-app-development"
                className="duration-150 hover:text-orange-400 flex items-center gap-1 group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">Mobile App Development</span>
              </a>
            </li>
            <li>
              <a
                href="/solutions/software-development"
                className="duration-150 hover:text-orange-400 flex items-center gap-1 group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">Software Development</span>
              </a>
            </li>
            <li>
              <a
                href="/solutions/email-and-hosting"
                className="duration-150 hover:text-orange-400 flex items-center gap-1 group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">Hosting & Business Emails</span>
              </a>
            </li>
          </motion.ul>
          
          {/* Company Column */}
          <motion.ul className="space-y-4 text-gray-300" variants={fadeIn}>
            <h4 className="text-orange-400 font-semibold pb-2 text-lg">Company</h4>
            <li>
              <a
                href="/about-us"
                className="duration-150 hover:text-orange-400 flex items-center gap-1 group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">About Us</span>
              </a>
            </li>
            <li>
              <a
                href="/projects"
                className="duration-150 hover:text-orange-400 flex items-center gap-1 group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">Projects</span>
              </a>
            </li>
            <li>
              <a
                href="/contact-us"
                className="duration-150 hover:text-orange-400 flex items-center gap-1 group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">Contact Us</span>
              </a>
            </li>
            <li>
              <a
                href="/resources"
                className="duration-150 hover:text-orange-400 flex items-center gap-1 group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">Resources</span>
              </a>
            </li>
          </motion.ul>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="py-6 border-t border-gray-700/50 flex items-center justify-between flex-col sm:flex-row gap-4 text-center sm:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >  
          <div className="flex items-center gap-4 flex-col sm:flex-row">
            <div className="flex items-center gap-3">
              <img src="/logo.png" className="h-8 invert" alt="RealNet Web Solutions" />
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 - {new Date().getFullYear()} RealNet Web Solutions PTY. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-col sm:flex-row">
            <p className="text-orange-400 text-sm flex items-center gap-1">
              "Empowering Businesses with Dignity and Digital Excellence"
            </p>
            
            <div className="flex items-center gap-5 text-gray-400">
              <motion.a 
                href="https://www.instagram.com/realnet_web/" 
                className="hover:text-orange-500 transition-colors duration-300"
                whileHover={{ y: -3 }}
              >
                <FaInstagram className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="https://web.facebook.com/profile.php?id=61565067420433" 
                className="hover:text-orange-500 transition-colors duration-300"
                whileHover={{ y: -3 }}
              >
                <FaFacebook className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/company/realnet-web-solutions-pty" 
                className="hover:text-orange-500 transition-colors duration-300"
                whileHover={{ y: -3 }}
              >
                <FaLinkedin className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="https://github.com/PapaAmu" 
                className="hover:text-orange-500 transition-colors duration-300"
                whileHover={{ y: -3 }}
              >
                <FaGithub className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
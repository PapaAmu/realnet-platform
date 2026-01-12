"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import bg_image from "../../../assets/images/bg_image.png"
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaArrowRight,
  FaGithub,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useAnalytics } from "@/hooks/useAnalytics";

// Custom loader component with advanced animations
const AdvancedLoader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Main spinner */}
      <motion.div
        className="w-8 h-8 border-4 border-white border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Orbiting particles */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            repeatType: "reverse",
            delay: i * 0.2,
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              x: [0, 20 * Math.cos((i * 2 * Math.PI) / 3)],
              y: [0, 20 * Math.sin((i * 2 * Math.PI) / 3)],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.2,
            }}
          />
        </motion.div>
      ))}
      
      {/* Pulsing rings */}
      <motion.div
        className="absolute inset-0 border-2 border-white rounded-full"
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      <motion.div
        className="absolute inset-0 border border-white rounded-full"
        animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      />
    </div>
  );
};

const Contact = () => {
  const router = useRouter();
  const { 
    trackFormSubmission, 
    trackServiceQuote, 
    trackServiceNavigation,
    trackPhoneInteraction, 
    trackEmailInteraction,
    trackEvent 
  } = useAnalytics();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Message sent successfully!");
        
        // Track successful contact form submission
        trackFormSubmission('contact_page');
        trackEvent({
          action: 'contact_form_submitted',
          category: 'Lead Generation',
          label: `Contact: ${formData.subject}`,
          value: 1
        });
        
        setFormData({ name: "", email: "", subject: "", message: "" });
        
        // Redirect to success page after a short delay
        setTimeout(() => {
          router.push('/form-success?type=contact');
        }, 1500);
      } else {
        toast.error(data.message || "Failed to send message.");
        
        // Track failed form submission
        trackEvent({
          action: 'contact_form_failed',
          category: 'Errors',
          label: `Contact Form Error: ${data.message || 'Unknown error'}`,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      
      // Track form submission error
      trackEvent({
        action: 'contact_form_error',
        category: 'Errors',
        label: 'Network error or server issue',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneClick = () => {
    trackPhoneInteraction('+27-63-038-8883');
    trackEvent({
      action: 'phone_click',
      category: 'Conversion',
      label: 'Contact Page Phone Click',
    });
  };

  const handleEmailClick = () => {
    trackEmailInteraction('lukhele@realnet-web.co.za');
    trackEvent({
      action: 'email_click',
      category: 'Conversion',
      label: 'Contact Page Email Click',
    });
  };

  const handleQuoteClick = () => {
    trackServiceQuote('general_quote');
    trackEvent({
      action: 'quote_request_click',
      category: 'Lead Generation',
      label: 'Contact Page Quote Button',
    });
  };

  const handleServicesClick = () => {
    trackServiceNavigation('web_development');
    trackEvent({
      action: 'services_click',
      category: 'Navigation',
      label: 'Contact Page Services Button',
    });
  };

  const handleSocialMediaClick = (platform) => {
    trackEvent({
      action: 'social_media_click',
      category: 'Engagement',
      label: platform,
    });
  };

  const handleInputFocus = (fieldName) => {
    trackEvent({
      action: 'form_field_focus',
      category: 'Engagement',
      label: `Contact Form - ${fieldName}`,
    });
  };

  return (
    <>
      <div
        id="contact"
        className="relative bg-cover bg-center bg-no-repeat py-20 px-6 md:px-16 overflow-hidden"
        style={{
          backgroundImage: `url(${bg_image.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        data-section="contact"
        itemScope
        itemType="https://schema.org/ContactPage"
      >
        {/* Subtle overlay to enhance text readability */}
        <div className="absolute inset-0 bg-white/90 backdrop-blur-xs"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-orange-400/20 rounded-full -translate-x-1/2 -translate-y-1/2 filter blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400/20 rounded-full translate-x-1/3 translate-y-1/3 filter blur-xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto mt-24 pt-4">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">
              Get In Touch With Us
            </h1>
            <p className="text-lg md:text-sm text-gray-700 max-w-3xl mx-auto">
              Have a project in mind or questions about our web development services? 
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          {/* Contact Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-orange-200/50"
              itemScope
              itemType="https://schema.org/ContactPoint"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleInputFocus('Name')}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                      placeholder="John Doe"
                      aria-required="true"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleInputFocus('Email')}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                      placeholder="john@example.com"
                      aria-required="true"
                      itemProp="email"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => handleInputFocus('Subject')}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                    placeholder="What is this regarding?"
                    aria-required="true"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleInputFocus('Message')}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                    placeholder="Tell us about your project or questions..."
                    aria-required="true"
                    itemProp="description"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={isLoading ? {} : { scale: 1.02 }}
                  whileTap={isLoading ? {} : { scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 relative overflow-hidden"
                  aria-label={isLoading ? "Sending message..." : "Send message"}
                >
                  <motion.span
                    animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 10 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center"
                  >
                    Send Message
                  </motion.span>
                  
                  {isLoading && <AdvancedLoader />}
                  
                  {/* Animated progress bar that fills from left to right */}
                  {isLoading && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-white/50"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, ease: "linear" }}
                    />
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Company Info */}
              <div 
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-orange-200/50"
                itemScope
                itemType="https://schema.org/LocalBusiness"
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-800">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-orange-100 p-3 rounded-full mr-4">
                      <FaMapMarkerAlt className="text-orange-500 text-xl" />
                    </div>
                    <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                      <h4 className="font-semibold text-gray-800">Address</h4>
                      <p className="text-gray-600" itemProp="streetAddress">Matsau Street, Ivory Park</p>
                      <p className="text-gray-600">
                        <span itemProp="addressLocality">Midrand</span>{", "}
                        <span itemProp="addressRegion">Gauteng</span>{", "}
                        <span itemProp="postalCode">1689</span>
                      </p>
                      <meta itemProp="addressCountry" content="ZA" />
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-pink-100 p-3 rounded-full mr-4">
                      <FaPhone className="text-pink-500 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Phone</h4>
                      <a 
                        href="tel:+27630388883" 
                        onClick={handlePhoneClick}
                        className="text-gray-600 hover:text-orange-500 transition-colors"
                        itemProp="telephone"
                      >
                        (+27) 63 038-8883
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-amber-100 p-3 rounded-full mr-4">
                      <FaEnvelope className="text-amber-500 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <a 
                        href="mailto:lukhele@realnet-web.co.za" 
                        onClick={handleEmailClick}
                        className="text-gray-600 hover:text-orange-500 transition-colors"
                        itemProp="email"
                      >
                        lukhele@realnet-web.co.za
                      </a>
                    </div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="mt-8 space-y-3">
                  <motion.a
                    href="/solutions/web-development/starter-website-quote-request"
                    whileHover={{ scale: 1.02 }}
                    onClick={handleQuoteClick}
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                    aria-label="Get a free project quote"
                  >
                    <span>Get Free Quote</span>
                    <FaArrowRight className="ml-2 text-sm" />
                  </motion.a>
                  
                  <motion.a
                    href="/solutions/web-development"
                    whileHover={{ scale: 1.02 }}
                    onClick={handleServicesClick}
                    className="w-full border border-orange-500 text-orange-600 font-semibold py-3 px-6 rounded-xl hover:bg-orange-50 transition-all duration-200 flex items-center justify-center"
                    aria-label="View our web development services"
                  >
                    <span>Our Services</span>
                    <FaArrowRight className="ml-2 text-sm" />
                  </motion.a>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-orange-200/50">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">
                  Follow Us
                </h3>

                <div className="flex space-x-4">
                  <motion.a
                    whileHover={{ scale: 1.1, y: -5 }}
                    href="https://web.facebook.com/profile.php?id=61565067420433"
                    onClick={() => handleSocialMediaClick('Facebook')}
                    className="bg-blue-100 text-blue-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                    aria-label="Visit our Facebook page"
                    target="_blank"
                    rel="noopener noreferrer"
                    itemProp="sameAs"
                  >
                    <FaFacebook className="text-2xl" />
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.1, y: -5 }}
                    href="https://www.linkedin.com/company/realnet-web-solutions-pty"
                    onClick={() => handleSocialMediaClick('LinkedIn')}
                    className="bg-blue-100 text-blue-700 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                    aria-label="Visit our LinkedIn page"
                    target="_blank"
                    rel="noopener noreferrer"
                    itemProp="sameAs"
                  >
                    <FaLinkedin className="text-2xl" />
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.1, y: -5 }}
                    href="https://instagram.com/realnet_web"
                    onClick={() => handleSocialMediaClick('Instagram')}
                    className="bg-pink-100 text-pink-600 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                    aria-label="Visit our Instagram page"
                    target="_blank"
                    rel="noopener noreferrer"
                    itemProp="sameAs"
                  >
                    <FaInstagram className="text-2xl" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -5 }}
                    href="https://github.com/PapaAmu"
                    onClick={() => handleSocialMediaClick('GitHub')}
                    className="bg-gray-300 text-gray-900 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                    aria-label="Visit our Github page"
                    target="_blank"
                    rel="noopener noreferrer"
                    itemProp="sameAs"
                  >
                    <FaGithub className="text-2xl" />
                  </motion.a>
                </div>
              </div>

              {/* Business Hours */}
              <div 
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-orange-200/50"
                itemScope
                itemType="https://schema.org/OpeningHoursSpecification"
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-800">
                  Business Hours
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">
                      Monday - Friday
                    </span>
                    <span className="text-gray-600">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Saturday</span>
                    <span className="text-gray-600">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Sunday</span>
                    <span className="text-gray-600">Closed</span>
                  </div>
                </div>

                {/* Service Area */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">Service Area</h4>
                  <p className="text-gray-600 text-sm">
                    Serving Johannesburg, Pretoria, Midrand, and surrounding areas in Gauteng, South Africa
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-16"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V56.44Z"
              className="fill-white/90"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export default Contact;
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaDollarSign,
  FaCalendarAlt,
  FaFileAlt,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { useAnalytics } from "@/hooks/useAnalytics";

// Custom loader component with advanced animations (matching Contact page)
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

const Quotation = ({ onClose }) => {
  const router = useRouter();
  const { 
    trackFormSubmission, 
    trackServiceQuote, 
    trackEvent,
    trackServiceNavigation 
  } = useAnalytics();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    projectDescription: "",
    budget: "",
    timeline: "",
    reference: "",
    agreeToTerms: false,
    additionalDetails: "",
    preferredContactMethod: "",
    projectType: "",
    urgency: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [redirectTimer, setRedirectTimer] = useState(5);

  // Handle redirect on success
  useEffect(() => {
    let interval;
    if (submitStatus === "success") {
      if (redirectTimer > 0) {
        interval = setInterval(() => {
          setRedirectTimer((prev) => prev - 1);
        }, 1000);
      } else {
        router.push('/form-success?type=quotation');
        if (onClose) onClose();
      }
    }
    return () => clearInterval(interval);
  }, [submitStatus, redirectTimer, router, onClose]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Track service selection for analytics
    if (name === "service" && value) {
      trackServiceNavigation(value);
      trackEvent({
        action: 'service_selected',
        category: 'Quotation Form',
        label: value
      });
    }

    // Track budget selection for lead quality
    if (name === "budget" && value) {
      trackEvent({
        action: 'budget_selected',
        category: 'Quotation Form',
        label: value
      });
    }

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateStep1 = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors = {};
    
    if (!formData.service) {
      errors.service = "Service selection is required";
    }
    
    if (!formData.projectDescription.trim()) {
      errors.projectDescription = "Project description is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      return;
    }
    
    if (!formData.agreeToTerms) {
      setFormErrors({ agreeToTerms: "You must agree to the terms" });
      return;
    }
    
    setIsSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/quotations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Track successful form submission for analytics
        trackFormSubmission('quotation_request');
        trackServiceQuote(formData.service);
        
        // Track detailed conversion event
        trackEvent({
          action: 'quote_submitted',
          category: 'Conversions',
          label: formData.service,
          value: formData.budget ? parseInt(formData.budget.replace(/[^0-9]/g, '')) || 1 : 1
        });
        
        // Track lead quality based on service and budget
        if (formData.service) {
          trackEvent({
            action: 'service_interest',
            category: 'Lead Quality',
            label: formData.service
          });
        }
        
        // Track budget range for conversion value
        if (formData.budget) {
          trackEvent({
            action: 'budget_range',
            category: 'Lead Quality',
            label: formData.budget
          });
        }

        // Track project urgency
        if (formData.urgency) {
          trackEvent({
            action: 'project_urgency',
            category: 'Lead Quality',
            label: formData.urgency
          });
        }

        // Track form completion time and steps
        trackEvent({
          action: 'form_completed',
          category: 'User Engagement',
          label: `Steps: ${currentStep}, Service: ${formData.service}`
        });
        
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          projectDescription: "",
          budget: "",
          timeline: "",
          reference: "",
          agreeToTerms: false,
          additionalDetails: "",
          preferredContactMethod: "",
          projectType: "",
          urgency: "",
        });
        setSubmitStatus("success");
        setRedirectTimer(5);
        
        // Timer handled by useEffect
        
      } else {
        // Track form submission error
        trackEvent({
          action: 'form_submission_error',
          category: 'Errors',
          label: data.message || 'Unknown error'
        });
        
        setSubmitStatus("error");
      }
    } catch (error) {
      // Track network or other errors
      trackEvent({
        action: 'form_submission_failed',
        category: 'Errors',
        label: error.message || 'Network error'
      });
      
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && !validateStep1()) {
      return;
    }
    
    if (currentStep === 2 && !validateStep2()) {
      return;
    }

    // Track step progression
    trackEvent({
      action: 'form_step_completed',
      category: 'User Engagement',
      label: `Step ${currentStep} completed`
    });
    
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleClose = () => {
    // Track modal closure
    trackEvent({
      action: 'quotation_modal_closed',
      category: 'User Engagement',
      label: `Closed at step ${currentStep}`
    });
    
    router.push('/');
    if (onClose) onClose();
  };

  const services = [
    "Website Development",
    "Mobile App Development",
    "Software Development",
    "Hosting & Business Email",
    "E-Commerce Solution",
    "UI/UX Design",
    "Digital Marketing",
    "Not Sure / Consultation",
  ];

  const budgetRanges = [
    "Less than R5,000",
    "R5,000 - R15,000",
    "R15,000 - R30,000",
    "R30,000 - R50,000",
    "R50,000 - R100,000",
    "R100,000+",
  ];

  const timelineOptions = [
    "ASAP (Within 1 week)",
    "Within 2 weeks",
    "Within 1 month",
    "Within 3 months",
    "Within 6 months",
    "Flexible",
  ];

  const projectTypes = [
    "New Project",
    "Redesign/Rebuild",
    "Ongoing Maintenance",
    "Add New Features",
  ];

  const urgencyLevels = [
    "Low - Just exploring options",
    "Medium - Planning phase",
    "High - Ready to start soon",
    "Critical - Need immediate assistance",
  ];

  const preferredContactMethods = ["Email", "Phone", "WhatsApp"];

  // Step 1: Contact Information
  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        Contact Information
      </h3>
      <p className="text-gray-600 mb-6">
        Let us know how to reach you. All fields marked with <span className="text-red-500">*</span> are required.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 rounded-xl border text-gray-900 bg-white placeholder-gray-500 ${
              formErrors.name ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200`}
            placeholder="John Doe"
          />
          {formErrors.name && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <FaExclamationCircle className="mr-1" /> {formErrors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 rounded-xl border text-gray-900 bg-white placeholder-gray-500 ${
              formErrors.email ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200`}
            placeholder="john@example.com"
          />
          {formErrors.email && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <FaExclamationCircle className="mr-1" /> {formErrors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 bg-white placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
            placeholder="+27 12 345 6789"
          />
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Company (if applicable)
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 bg-white placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
            placeholder="Your Company Name"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <motion.button
          type="button"
          onClick={nextStep}
          className="bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next: Project Details
        </motion.button>
      </div>
    </motion.div>
  );

  // Step 2: Project Details
  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        Project Details
      </h3>
      <p className="text-gray-600 mb-6">
        Tell us about your project so we can provide an accurate quote. Fields marked with <span className="text-red-500">*</span> are required.
      </p>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="service"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Service Needed <span className="text-red-500">*</span>
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 rounded-xl border text-gray-900 bg-white ${
              formErrors.service ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200`}
          >
            <option value="">Select a service</option>
            {services.map((service, index) => (
              <option key={index} value={service}>
                {service}
              </option>
            ))}
          </select>
          {formErrors.service && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <FaExclamationCircle className="mr-1" /> {formErrors.service}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="projectType"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Project Type
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 bg-white focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
          >
            <option value="">Select project type</option>
            {projectTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="projectDescription"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Project Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="projectDescription"
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Please describe your project requirements, goals, and any specific features you need..."
            className={`w-full px-4 py-3 rounded-xl border text-gray-900 bg-white placeholder-gray-500 ${
              formErrors.projectDescription ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200`}
          />
          {formErrors.projectDescription && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <FaExclamationCircle className="mr-1" /> {formErrors.projectDescription}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="budget"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Estimated Budget
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaDollarSign className="text-gray-400" />
              </div>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full pl-10 px-4 py-3 rounded-xl border border-gray-300 text-gray-900 bg-white focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
          >
                <option value="">Select budget range</option>
                {budgetRanges.map((range, index) => (
                  <option key={index} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="timeline"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Project Timeline
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="text-gray-400" />
              </div>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="w-full pl-10 px-4 py-3 rounded-xl border border-gray-300 text-gray-900 bg-white focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
          >
                <option value="">Select timeline</option>
                {timelineOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="urgency"
            className="block text-sm font-medium text-gray-700 mb-2"
            >
            Project Urgency
          </label>
          <select
            id="urgency"
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 bg-white focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
          >
            <option value="">How urgent is your project?</option>
            {urgencyLevels.map((level, index) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="reference"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Reference Website or Example (if any)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFileAlt className="text-gray-400" />
            </div>
          <input
            type="url"
            id="reference"
            name="reference"
            value={formData.reference}
            onChange={handleChange}
            placeholder="https://example.com"
            className="w-full pl-10 px-4 py-3 rounded-xl border border-gray-300 text-gray-900 bg-white placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
          />
          </div>
        </div>

        <div>
          <label
            htmlFor="additionalDetails"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Additional Details
          </label>
          <textarea
            id="additionalDetails"
            name="additionalDetails"
            value={formData.additionalDetails}
            onChange={handleChange}
            rows={3}
            placeholder="Any other details you'd like to share, special requirements, etc."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 bg-white placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <motion.button
          type="button"
          onClick={prevStep}
          className="bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-gray-300 transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back
        </motion.button>
        <motion.button
          type="button"
          onClick={nextStep}
          className="bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next: Contact Preferences
        </motion.button>
      </div>
    </motion.div>
  );

  // Step 3: Contact Preferences & Submission
  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        Almost Done!
      </h3>
      <p className="text-gray-600 mb-6">
        Just a few more details to complete your quotation request.
      </p>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="preferredContactMethod"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Preferred Contact Method
          </label>
          <select
            id="preferredContactMethod"
            name="preferredContactMethod"
            value={formData.preferredContactMethod}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 bg-white focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
          >
            <option value="">How would you prefer we contact you?</option>
            {preferredContactMethods.map((method, index) => (
              <option key={index} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
          <h4 className="font-bold text-orange-800 mb-3 flex items-center">
            <FaCheckCircle className="mr-2" /> What happens next?
          </h4>
          <ol className="list-decimal pl-5 space-y-2 text-orange-700">
            <li>We'll review your project requirements</li>
            <li>Our experts will prepare a detailed quotation</li>
            <li>We'll contact you within 24 hours to discuss</li>
            <li>You'll receive a formal proposal with timeline and cost</li>
          </ol>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="agreeToTerms"
              name="agreeToTerms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
              className="w-4 h-4 bg-gray-800 border-gray-700 rounded focus:ring-orange-500 focus:ring-2"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="agreeToTerms"
              className="font-medium text-gray-700"
            >
              I agree to the processing of my personal data to receive a quotation <span className="text-red-500">*</span>
            </label>
            <p className="text-gray-500 mt-1">
              We respect your privacy and will never share your information with third parties.
            </p>
            {formErrors.agreeToTerms && (
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <FaExclamationCircle className="mr-1" /> {formErrors.agreeToTerms}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <motion.button
          type="button"
          onClick={prevStep}
          className="bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-gray-300 transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back
        </motion.button>
        <motion.button
          type="submit"
          disabled={isSubmitting || !formData.agreeToTerms}
          className={`bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 relative overflow-hidden ${
            isSubmitting || !formData.agreeToTerms ? "opacity-75" : ""
          }`}
          whileHover={isSubmitting || !formData.agreeToTerms ? {} : { scale: 1.05 }}
          whileTap={isSubmitting || !formData.agreeToTerms ? {} : { scale: 0.95 }}
        >
          <motion.span
            animate={{ opacity: isSubmitting ? 0 : 1, y: isSubmitting ? 10 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center"
          >
            Submit Request
          </motion.span>
          
          {isSubmitting && <AdvancedLoader />}
          
          {/* Animated progress bar that fills from left to right */}
          {isSubmitting && (
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-white/50"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "linear" }}
            />
          )}
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-t-3xl">
          <div>
            <h2 className="text-2xl font-bold">Request a Custom Quote</h2>
            <p className="text-white/90">Step {currentStep} of 3</p>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div 
              className="bg-gradient-to-r from-orange-400 to-pink-500 h-2.5 rounded-full"
              initial={{ width: `${(currentStep-1)/3*100}%` }}
              animate={{ width: `${(currentStep-1)/3*100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          {/* Submission Status */}
          {submitStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 mt-4 bg-green-100 border border-green-200 rounded-2xl text-green-700"
            >
              <div className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                <span>
                  Thank you! Your quotation request has been submitted. We'll contact
                  you shortly. Redirecting to home in {redirectTimer} seconds...
                </span>
              </div>
            </motion.div>
          )}

          {submitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 mt-4 bg-red-100 border border-red-200 rounded-2xl text-red-700"
            >
              Sorry, there was an error submitting your request. Please try
              again.
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default Quotation;

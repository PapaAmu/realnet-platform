"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAnalytics } from "@/hooks/useAnalytics";

import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaRocket,
  FaDesktop,
  FaTools,
  FaPaperclip,
  FaTimes,
  FaCloudUploadAlt,
  FaCode,
  FaMobile,
  FaShoppingCart,
  FaCloud
} from "react-icons/fa";

const StarterWebsiteQuote = () => {
  const { trackFormSubmission, trackServiceQuote, trackEvent } = useAnalytics();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    projectType: "",
    businessName: "",
    description: "",
    attachments: [],
    contact: {
      email: "",
      fullName: "",
      phone: "",
    },
  });

  const steps = [
    { id: 1, title: "Project Type", icon: FaRocket },
    { id: 2, title: "Business Info", icon: FaDesktop },
    { id: 3, title: "Contact Details", icon: FaTools },
    { id: 4, title: "Review", icon: FaCheck },
  ];

  const updateFormData = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Validate file sizes (10MB max)
    const oversizedFiles = files.filter(file => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast.error("Some files exceed the 10MB size limit. Please choose smaller files.");
      return;
    }

    const newAttachments = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
      type: file.type
    }));

    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments]
    }));

    if (files.length > 0) {
      toast.success(`${files.length} file(s) added successfully!`);
      
      // Track file upload event
      trackEvent({
        action: 'file_upload',
        category: 'Quote Form',
        label: 'starter_website',
        value: files.length
      });
    }
  };

  const removeAttachment = (id) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter(att => att.id !== id)
    }));
    toast.info("File removed");
  };

  const nextStep = () => {
    // Validate current step before proceeding
    if (currentStep === 1 && !formData.projectType) {
      toast.error("Please select a project type");
      return;
    }
    if (currentStep === 2 && !formData.description) {
      toast.error("Please provide a project description");
      return;
    }
    if (currentStep === 3 && (!formData.contact.fullName || !formData.contact.email || !formData.contact.phone)) {
      toast.error("Please fill in all contact details");
      return;
    }
    
    // Track step progression
    trackEvent({
      action: 'form_step_completed',
      category: 'Quote Form',
      label: `step_${currentStep}`,
      value: currentStep
    });
    
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    trackEvent({
      action: 'form_step_back',
      category: 'Quote Form',
      label: `step_${currentStep}`,
      value: currentStep
    });
    
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Track form submission attempt
      trackFormSubmission('starter_website_quote');
      trackServiceQuote('starter_website');

      // Create FormData for file upload
      const submitData = new FormData();
      
      // Add form data as flat structure that matches Laravel validation
      submitData.append('projectType', formData.projectType);
      submitData.append('businessName', formData.businessName || '');
      submitData.append('description', formData.description);
      submitData.append('contact_full_name', formData.contact.fullName);
      submitData.append('contact_email', formData.contact.email);
      submitData.append('contact_phone', formData.contact.phone);
      
      // Add attachments
      formData.attachments.forEach(attachment => {
        submitData.append('attachments[]', attachment.file);
      });

      console.log('Submitting form data:', {
        projectType: formData.projectType,
        businessName: formData.businessName,
        description: formData.description,
        contact_full_name: formData.contact.fullName,
        contact_email: formData.contact.email,
        contact_phone: formData.contact.phone,
        attachments_count: formData.attachments.length
      });

      // Submit to Laravel API - Update the URL as needed for your Next.js app
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/starter-website-quote`, {
        method: 'POST',
        body: submitData,
        headers: {
          'Accept': 'application/json',
          // Let browser set Content-Type with boundary for FormData
        },
      });

      const result = await response.json();

      console.log('API Response:', response.status, result);

      if (response.ok) {
        // Track successful form submission
        trackEvent({
          action: 'form_submission_success',
          category: 'Quote Form',
          label: 'starter_website',
          value: 1
        });
        
        toast.success(result.message || "Thank you! We'll contact you within 24 hours to discuss your starter website.");
        
        // Reset form
        setFormData({
          projectType: "",
          businessName: "",
          description: "",
          attachments: [],
          contact: {
            email: "",
            fullName: "",
            phone: "",
          },
        });
        setCurrentStep(1);
        
        // Redirect to success page after a short delay
        setTimeout(() => {
          window.location.href = '/form-success?type=starter-quote';
        }, 1500);
      } else {
        // Track form submission failure
        trackEvent({
          action: 'form_submission_failed',
          category: 'Quote Form',
          label: 'starter_website',
          value: 0
        });
        
        // Handle validation errors or other errors
        console.error('API Error:', result);
        if (result.errors) {
          // Show all validation errors
          Object.values(result.errors).forEach(errorArray => {
            errorArray.forEach(error => {
              toast.error(error);
            });
          });
        } else {
          toast.error(result.message || "Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      // Track network error
      trackEvent({
        action: 'form_submission_error',
        category: 'Quote Form',
        label: 'starter_website',
        value: 0
      });
      
      console.error('Submission error:', error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-gray-900 text-white">
      {/* Header - Mobile Responsive */}
      <header 
        className="relative bg-gradient-to-r from-orange-500 via-pink-500 to-orange-600 py-6 md:py-8 overflow-hidden"
        data-section="quote-header"
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] md:bg-[size:60px_60px]"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-3 md:mb-4">
              <div className="p-2 md:p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                <FaRocket className="text-2xl md:text-3xl text-orange-300" />
              </div>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-200 px-2">
              Starter Website Quote
            </h1>
            <p className="text-base md:text-lg text-orange-100 max-w-2xl mx-auto px-2">
              Perfect for small businesses – R3,499 to R5,999
            </p>
          </motion.div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 md:py-8">
        {/* Progress Steps - Mobile Responsive */}
        <motion.div 
          className="flex justify-center mb-6 md:mb-8 px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 border border-gray-700 w-full max-w-2xl">
            <div className="flex items-center justify-between md:justify-center md:space-x-4 lg:space-x-6">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center flex-1 md:flex-none">
                      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${
                        currentStep > step.id
                          ? 'bg-green-500 border-green-500 shadow-lg shadow-green-500/25'
                          : currentStep === step.id
                          ? 'bg-gradient-to-r from-orange-500 to-pink-500 border-transparent shadow-lg shadow-orange-500/25'
                          : 'border-gray-600 bg-gray-700'
                      }`}>
                        <IconComponent className={
                          `text-sm md:text-base ${currentStep >= step.id ? 'text-white' : 'text-gray-400'}`
                        } />
                      </div>
                      <span className={`text-xs mt-1 md:mt-2 font-medium text-center hidden xs:block ${
                        currentStep >= step.id ? 'text-white' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-1 mx-1 md:mx-2 lg:w-6 rounded-full transition-all duration-300 ${
                        currentStep > step.id ? 'bg-green-500' : 'bg-gray-600'
                      }`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Form Container - Mobile Responsive */}
        <motion.div 
          className="bg-gray-800/40 backdrop-blur-sm rounded-xl md:rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          data-section="quote-form"
        >
          <div className="p-1 md:p-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20">
            <div className="bg-gray-800 rounded-xl p-4 md:p-6 lg:p-8">
              <form onSubmit={handleSubmit} itemScope itemType="https://schema.org/ContactPage">
                <AnimatePresence mode="wait">
                  {/* Step 1: Project Type */}
                  {currentStep === 1 && (
                    <ProjectTypeStep
                      formData={formData}
                      updateFormData={updateFormData}
                      trackEvent={trackEvent}
                    />
                  )}

                  {/* Step 2: Business Info */}
                  {currentStep === 2 && (
                    <BusinessInfoStep
                      formData={formData}
                      updateFormData={updateFormData}
                      handleFileUpload={handleFileUpload}
                      removeAttachment={removeAttachment}
                    />
                  )}

                  {/* Step 3: Contact Details */}
                  {currentStep === 3 && (
                    <ContactDetailsStep
                      formData={formData}
                      updateFormData={updateFormData}
                    />
                  )}

                  {/* Step 4: Review & Submit */}
                  {currentStep === 4 && (
                    <ReviewStep
                      formData={formData}
                      removeAttachment={removeAttachment}
                      isSubmitting={isSubmitting}
                    />
                  )}
                </AnimatePresence>

                {/* Navigation Buttons - Mobile Responsive */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 md:gap-4 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-700/50">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1 || isSubmitting}
                    className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 border border-gray-600 text-gray-300 rounded-lg md:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-sm text-sm md:text-base"
                    aria-label="Go back to previous step"
                  >
                    <FaArrowLeft className="text-sm" />
                    <span>Back</span>
                  </button>

                  <div className="text-xs md:text-sm text-gray-400 text-center py-2 md:py-0">
                    Step {currentStep} of {steps.length}
                  </div>

                  {currentStep < steps.length ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg md:rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-orange-500/25 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                      aria-label="Continue to next step"
                    >
                      <span>Continue</span>
                      <FaArrowRight className="text-sm" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg md:rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-green-500/25 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Submit your starter website quote request"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <FaCheck className="text-sm" />
                          <span>Submit Request</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Package Info - Mobile Responsive */}
        <motion.div 
          className="text-center mt-6 md:mt-8 px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          data-section="package-features"
        >
          <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm">
            <h2 className="text-base md:text-lg font-semibold text-orange-300 mb-2 md:mb-3">Starter Website Package Includes:</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 text-xs md:text-sm text-gray-300">
              <div className="flex items-center justify-center space-x-1 md:space-x-2">
                <FaDesktop className="text-orange-400 text-sm md:text-base" />
                <span>Up to 8 pages</span>
              </div>
              <div className="flex items-center justify-center space-x-1 md:space-x-2">
                <FaRocket className="text-pink-400 text-sm md:text-base" />
                <span>Responsive design</span>
              </div>
              <div className="flex items-center justify-center space-x-1 md:space-x-2">
                <FaTools className="text-green-400 text-sm md:text-base" />
                <span>Basic SEO</span>
              </div>
              <div className="flex items-center justify-center space-x-1 md:space-x-2">
                <FaCode className="text-blue-400 text-sm md:text-base" />
                <span>Mobile-friendly</span>
              </div>
              <div className="flex items-center justify-center space-x-1 md:space-x-2">
                <FaCloud className="text-purple-400 text-sm md:text-base" />
                <span>1 year hosting</span>
              </div>
              <div className="flex items-center justify-center space-x-1 md:space-x-2">
                <FaShoppingCart className="text-yellow-400 text-sm md:text-base" />
                <span>Contact forms</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Signals Section */}
        <motion.div 
          className="mt-8 md:mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-700/50">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-4">Why Choose Our Starter Websites?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-sm md:text-base">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FaRocket className="text-orange-400 text-xl" />
                </div>
                <h4 className="font-semibold text-orange-300 mb-1">Fast Delivery</h4>
                <p className="text-gray-300 text-xs md:text-sm">2-3 week turnaround for your business website</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FaMobile className="text-green-400 text-xl" />
                </div>
                <h4 className="font-semibold text-green-300 mb-1">Mobile Optimized</h4>
                <p className="text-gray-300 text-xs md:text-sm">Works perfectly on all devices and screen sizes</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FaCheck className="text-blue-400 text-xl" />
                </div>
                <h4 className="font-semibold text-blue-300 mb-1">SEO Ready</h4>
                <p className="text-gray-300 text-xs md:text-sm">Built with search engine optimization in mind</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Step 1: Project Type
const ProjectTypeStep = ({ formData, updateFormData, trackEvent }) => {
  const handleProjectTypeSelect = (value) => {
    updateFormData("projectType", value);
    
    // Track project type selection
    trackEvent({
      action: 'project_type_selected',
      category: 'Quote Form',
      label: value,
      value: 1
    });
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 }
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">
          What do you need?
        </h2>
        <p className="text-gray-400 text-sm md:text-base">Choose your project type</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {[
          {
            value: "new",
            label: "New Website",
            description: "Build a brand new website",
            icon: FaRocket,
          },
          {
            value: "redesign",
            label: "Redesign Website",
            description: "Improve my current one",
            icon: FaDesktop,
          },
          {
            value: "fix",
            label: "Fix / Improve",
            description: "Fix issues on existing site",
            icon: FaTools,
          },
        ].map((option) => {
          const Icon = option.icon;
          return (
            <label
              key={option.value}
              className={`flex flex-col items-center text-center border-2 rounded-lg md:rounded-xl p-3 md:p-4 cursor-pointer transition-all duration-300 group ${
                formData.projectType === option.value
                  ? "border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/20"
                  : "border-gray-600 hover:border-orange-400 hover:bg-orange-500/5"
              }`}
            >
              <input
                type="radio"
                name="projectType"
                value={option.value}
                checked={formData.projectType === option.value}
                onChange={(e) => handleProjectTypeSelect(e.target.value)}
                className="hidden"
              />
              <div className={`p-2 md:p-3 rounded-lg mb-2 md:mb-3 transition-all duration-300 ${
                formData.projectType === option.value
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                  : "bg-gray-700 group-hover:bg-orange-500/20 text-gray-400 group-hover:text-orange-300"
              }`}>
                <Icon className="text-lg md:text-xl" />
              </div>
              <div className="font-semibold text-white text-sm md:text-base">{option.label}</div>
              <div className="text-gray-400 text-xs md:text-sm mt-1">
                {option.description}
              </div>
            </label>
          );
        })}
      </div>
    </motion.div>
  );
};

// Step 2: Business Info
const BusinessInfoStep = ({ formData, updateFormData, handleFileUpload, removeAttachment }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 }
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">
          Tell us about your project
        </h2>
        <p className="text-gray-400 text-sm md:text-base">Share your business details and requirements</p>
      </div>
      
      <div className="space-y-4 md:space-y-6">
        <div>
          <label className="block text-gray-300 mb-1 md:mb-2 text-sm md:text-base">
            Business / Company Name
          </label>
          <input
            type="text"
            value={formData.businessName}
            onChange={(e) =>
              updateFormData("businessName", e.target.value)
            }
            placeholder="Your business name"
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none backdrop-blur-sm text-sm md:text-base"
            aria-required="false"
          />
        </div>
        
        <div>
          <label className="block text-gray-300 mb-1 md:mb-2 text-sm md:text-base">
            Project Description *
          </label>
          <textarea
            required
            value={formData.description}
            onChange={(e) =>
              updateFormData("description", e.target.value)
            }
            rows={3}
            placeholder="Describe your goals and website needs..."
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none resize-none backdrop-blur-sm text-sm md:text-base"
            aria-required="true"
          />
        </div>

        {/* File Upload Section */}
        <div>
          <label className="block text-gray-300 mb-2 md:mb-3 text-sm md:text-base">Attach Files (Optional)</label>
          <div className="border-2 border-dashed border-gray-600 rounded-lg md:rounded-xl p-3 md:p-4 text-center hover:border-orange-500 transition-all duration-300">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip,.psd,.ai,.fig,.xd"
              aria-describedby="file-upload-help"
            />
            <label htmlFor="file-upload" className="cursor-pointer block">
              <FaCloudUploadAlt className="text-xl md:text-2xl text-orange-400 mx-auto mb-1 md:mb-2" />
              <div className="text-gray-300 text-sm md:text-base mb-1">
                Click to upload files
              </div>
              <div id="file-upload-help" className="text-gray-400 text-xs md:text-sm">
                Logos, images, design references (Max: 10MB per file)
              </div>
            </label>
          </div>

          {/* Attached Files List */}
          {formData.attachments.length > 0 && (
            <div className="mt-3 md:mt-4">
              <h4 className="text-gray-300 text-sm md:text-base mb-2">Attached Files:</h4>
              <div className="space-y-2">
                {formData.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between bg-gray-700/50 rounded-lg md:rounded-xl p-2 md:p-3 border border-gray-600"
                  >
                    <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
                      <FaPaperclip className="text-orange-400 flex-shrink-0 text-sm md:text-base" />
                      <div className="min-w-0 flex-1">
                        <div className="text-white text-xs md:text-sm truncate">{attachment.name}</div>
                        <div className="text-gray-400 text-xs">
                          {(attachment.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachment(attachment.id)}
                      className="text-red-400 hover:text-red-300 transition-colors flex-shrink-0 ml-2"
                      aria-label={`Remove ${attachment.name}`}
                    >
                      <FaTimes className="text-sm md:text-base" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Step 3: Contact Details
const ContactDetailsStep = ({ formData, updateFormData }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 }
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">
          Your Contact Info
        </h2>
        <p className="text-gray-400 text-sm md:text-base">How can we reach you?</p>
      </div>
      
      <div className="space-y-4 md:space-y-6">
        <div>
          <label className="block text-gray-300 mb-1 md:mb-2 text-sm md:text-base">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.contact.fullName}
            onChange={(e) =>
              updateFormData("contact.fullName", e.target.value)
            }
            placeholder="Your full name"
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none backdrop-blur-sm text-sm md:text-base"
            aria-required="true"
          />
        </div>
        
        <div>
          <label className="block text-gray-300 mb-1 md:mb-2 text-sm md:text-base">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={formData.contact.email}
            onChange={(e) =>
              updateFormData("contact.email", e.target.value)
            }
            placeholder="your@email.com"
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none backdrop-blur-sm text-sm md:text-base"
            aria-required="true"
          />
        </div>
        
        <div>
          <label className="block text-gray-300 mb-1 md:mb-2 text-sm md:text-base">
            Phone / WhatsApp *
          </label>
          <input
            type="tel"
            required
            value={formData.contact.phone}
            onChange={(e) =>
              updateFormData("contact.phone", e.target.value)
            }
            placeholder="+27 XXX XXX XXXX"
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none backdrop-blur-sm text-sm md:text-base"
            aria-required="true"
          />
        </div>
      </div>
    </motion.div>
  );
};

// Step 4: Review & Submit
const ReviewStep = ({ formData, removeAttachment, isSubmitting }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 }
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">
          Review & Submit
        </h2>
        <p className="text-gray-400 text-sm md:text-base">Review your starter website details</p>
      </div>
      
      <div className="space-y-4 md:space-y-6">
        <div className="bg-gray-700/30 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-600/50">
          <h3 className="text-lg md:text-xl font-semibold text-orange-400 mb-3 md:mb-4 flex items-center">
            <FaRocket className="mr-2 text-sm md:text-base" />
            Project Details
          </h3>
          <div className="space-y-3 text-xs md:text-sm">
            <div>
              <span className="text-gray-400">Type:</span>
              <div className="text-white font-medium">
                {formData.projectType === "new" && "New Website"}
                {formData.projectType === "redesign" && "Redesign Website"}
                {formData.projectType === "fix" && "Fix/Improve Website"}
              </div>
            </div>
            {formData.businessName && (
              <div>
                <span className="text-gray-400">Business:</span>
                <div className="text-white font-medium">{formData.businessName}</div>
              </div>
            )}
            <div>
              <span className="text-gray-400">Description:</span>
              <div className="text-white font-medium mt-1 text-xs md:text-sm">{formData.description}</div>
            </div>
          </div>
        </div>

        {/* Attachments */}
        {formData.attachments.length > 0 && (
          <div className="bg-gray-700/30 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-600/50">
            <h3 className="text-lg md:text-xl font-semibold text-pink-400 mb-3 md:mb-4 flex items-center">
              <FaPaperclip className="mr-2 text-sm md:text-base" />
              Attached Files
            </h3>
            <div className="space-y-2">
              {formData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center justify-between bg-gray-600/30 rounded-lg p-2 md:p-3 border border-gray-500/30"
                >
                  <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
                    <FaPaperclip className="text-pink-400 flex-shrink-0 text-sm md:text-base" />
                    <div className="min-w-0 flex-1">
                      <div className="text-white text-xs md:text-sm truncate">{attachment.name}</div>
                      <div className="text-gray-400 text-xs">
                        {(attachment.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAttachment(attachment.id)}
                    className="text-red-400 hover:text-red-300 transition-colors flex-shrink-0 ml-2"
                    disabled={isSubmitting}
                    aria-label={`Remove ${attachment.name}`}
                  >
                    <FaTimes className="text-sm md:text-base" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-700/30 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-600/50">
          <h3 className="text-lg md:text-xl font-semibold text-green-400 mb-3 md:mb-4 flex items-center">
            <FaDesktop className="mr-2 text-sm md:text-base" />
            Contact Info
          </h3>
          <div className="space-y-3 text-xs md:text-sm">
            <div>
              <span className="text-gray-400">Name:</span>
              <div className="text-white font-medium">{formData.contact.fullName}</div>
            </div>
            <div>
              <span className="text-gray-400">Email:</span>
              <div className="text-white font-medium">{formData.contact.email}</div>
            </div>
            <div>
              <span className="text-gray-400">Phone:</span>
              <div className="text-white font-medium">{formData.contact.phone}</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl md:rounded-2xl p-4 md:p-6 text-center backdrop-blur-sm">
          <FaCheck className="text-green-400 text-xl md:text-2xl mx-auto mb-2 md:mb-3" />
          <h4 className="font-semibold text-green-300 text-base md:text-lg mb-1 md:mb-2">Ready to Submit!</h4>
          <p className="text-green-200 text-xs md:text-sm">
            We'll contact you within 24 hours to discuss your starter website.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default StarterWebsiteQuote;
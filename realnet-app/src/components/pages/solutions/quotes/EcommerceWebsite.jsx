"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import { 
  FaArrowLeft, 
  FaArrowRight, 
  FaCheck, 
  FaShoppingCart, 
  FaBox, 
  FaStore,
  FaPaperclip,
  FaTimes,
  FaCloudUploadAlt
} from 'react-icons/fa';
import { useAnalytics } from '@/hooks/useAnalytics';

const EcommerceWebsiteQuote = () => {
  const router = useRouter();
  const { trackFormSubmission, trackServiceQuote, trackEvent } = useAnalytics();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    projectType: '', // 'new', 'redesign', 'improve'
    businessName: '',
    productsCount: '',
    description: '',
    attachments: [],
    contact: {
      email: '',
      fullName: '',
      phone: '',
    }
  });

  const steps = [
    { id: 1, title: 'Project Type', icon: FaStore },
    { id: 2, title: 'Store Details', icon: FaBox },
    { id: 3, title: 'Contact Info', icon: FaShoppingCart },
    { id: 4, title: 'Review', icon: FaCheck }
  ];

  const updateFormData = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }

    // Track field interactions for analytics
    if (field === 'projectType' && value) {
      trackEvent({
        action: 'project_type_selected',
        category: 'Ecommerce Quote',
        label: value,
      });
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
        action: 'files_uploaded',
        category: 'Ecommerce Quote',
        label: `Count: ${files.length}`,
        value: files.length,
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
    if (currentStep === 2 && (!formData.productsCount || !formData.description)) {
      toast.error("Please provide products count and project description");
      return;
    }
    if (currentStep === 3 && (!formData.contact.fullName || !formData.contact.email || !formData.contact.phone)) {
      toast.error("Please fill in all contact details");
      return;
    }
    
    // Track step progression
    trackEvent({
      action: 'step_completed',
      category: 'Ecommerce Quote',
      label: `Step ${currentStep}`,
      value: currentStep,
    });
    
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    
    // Track step navigation
    trackEvent({
      action: 'step_back',
      category: 'Ecommerce Quote',
      label: `From Step ${currentStep} to ${currentStep - 1}`,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Track form submission attempt
      trackFormSubmission('ecommerce_quote');
      trackServiceQuote(formData.projectType || 'unknown');

      // Create FormData for file upload
      const submitData = new FormData();
      
      // Add form data as flat structure that matches Laravel validation
      submitData.append('projectType', formData.projectType);
      submitData.append('businessName', formData.businessName || '');
      submitData.append('productsCount', formData.productsCount);
      submitData.append('description', formData.description);
      submitData.append('contact_full_name', formData.contact.fullName);
      submitData.append('contact_email', formData.contact.email);
      submitData.append('contact_phone', formData.contact.phone);
      
      // Add attachments
      formData.attachments.forEach(attachment => {
        submitData.append('attachments[]', attachment.file);
      });

      console.log('Submitting ecommerce form data:', {
        projectType: formData.projectType,
        businessName: formData.businessName,
        productsCount: formData.productsCount,
        description: formData.description,
        contact_full_name: formData.contact.fullName,
        contact_email: formData.contact.email,
        contact_phone: formData.contact.phone,
        attachments_count: formData.attachments.length
      });

      // Submit to Laravel API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/ecommerce-website-quote`, {
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
        // Track successful submission
        trackEvent({
          action: 'quote_submission_success',
          category: 'Ecommerce Quote',
          label: formData.projectType,
          value: 1,
        });
        
        toast.success(result.message || "Thank you! We'll contact you within 24 hours to discuss your ecommerce store.");
        
        // Reset form
        setFormData({
          projectType: '',
          businessName: '',
          productsCount: '',
          description: '',
          attachments: [],
          contact: {
            email: '',
            fullName: '',
            phone: '',
          }
        });
        setCurrentStep(1);
        
        // Redirect to success page after a short delay
        setTimeout(() => {
          router.push('/form-success?type=ecommerce-quote');
        }, 1500);
      } else {
        // Track submission failure
        trackEvent({
          action: 'quote_submission_failed',
          category: 'Ecommerce Quote',
          label: result.message || 'API Error',
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
        action: 'quote_submission_error',
        category: 'Ecommerce Quote',
        label: 'Network Error',
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
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">

        {/* Header - Mobile Responsive */}
        <header 
          className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 py-6 md:py-8 overflow-hidden"
          data-section="hero"
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
                  <FaShoppingCart className="text-2xl md:text-3xl text-blue-300" />
                </div>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 px-2">
                Ecommerce Store Development
              </h1>
              <p className="text-base md:text-lg text-blue-100 max-w-2xl mx-auto px-2">
                Complete online store - R6,000 to R19,999
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
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-transparent shadow-lg shadow-blue-500/25'
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
            <div className="p-1 md:p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20">
              <div className="bg-gray-800 rounded-xl p-4 md:p-6 lg:p-8">
                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">
                    {/* Step 1: Project Type */}
                    {currentStep === 1 && (
                      <ProjectTypeStep
                        formData={formData}
                        updateFormData={updateFormData}
                      />
                    )}

                    {/* Step 2: Store Details */}
                    {currentStep === 2 && (
                      <StoreDetailsStep
                        formData={formData}
                        updateFormData={updateFormData}
                        handleFileUpload={handleFileUpload}
                        removeAttachment={removeAttachment}
                      />
                    )}

                    {/* Step 3: Contact Information */}
                    {currentStep === 3 && (
                      <ContactInfoStep
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
                      aria-label="Go to previous step"
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
                        className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg md:rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
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
                        aria-label="Submit e-commerce quote request"
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
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm">
              <h3 className="text-base md:text-lg font-semibold text-blue-300 mb-2 md:mb-3">Ecommerce Store Includes:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 text-xs md:text-sm text-gray-300">
                <div className="flex items-center justify-center space-x-1 md:space-x-2">
                  <FaBox className="text-blue-400 text-sm md:text-base" />
                  <span>Product Management</span>
                </div>
                <div className="flex items-center justify-center space-x-1 md:space-x-2">
                  <FaShoppingCart className="text-green-400 text-sm md:text-base" />
                  <span>Secure Payments</span>
                </div>
                <div className="flex items-center justify-center space-x-1 md:space-x-2">
                  <FaStore className="text-purple-400 text-sm md:text-base" />
                  <span>Inventory System</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional SEO Content */}
          <motion.div 
            className="mt-8 md:mt-12 bg-gray-800/30 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 text-center">
              Professional E-commerce Development in South Africa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-sm md:text-base text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Why Choose Our E-commerce Solutions?</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <FaCheck className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Mobile-responsive design for all devices</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Secure payment gateway integration</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                    <span>SEO-optimized for better visibility</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-2">Our Process</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <FaCheck className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Free consultation and requirements analysis</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Custom design and development</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Training and ongoing support</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

// Step 1: Project Type
const ProjectTypeStep = ({ formData, updateFormData }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          What do you need?
        </h2>
        <p className="text-gray-400 text-sm md:text-base">Choose your ecommerce project type</p>
      </div>
      
      <div className="space-y-3 md:space-y-4">
        {[
          {
            value: 'new',
            label: 'New Ecommerce Store',
            description: 'Build a complete online store from scratch',
            icon: FaStore
          },
          {
            value: 'redesign',
            label: 'Redesign Store',
            description: 'Improve my current online store',
            icon: FaShoppingCart
          },
          {
            value: 'improve',
            label: 'Add Ecommerce',
            description: 'Add shopping to my existing website',
            icon: FaBox
          }
        ].map((option) => {
          const IconComponent = option.icon;
          return (
            <label
              key={option.value}
              className={`block p-3 md:p-4 border-2 rounded-lg md:rounded-xl cursor-pointer transition-all duration-300 group ${
                formData.projectType === option.value
                  ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20'
                  : 'border-gray-600 hover:border-blue-400 hover:bg-blue-500/5'
              }`}
              htmlFor={`project-type-${option.value}`}
            >
              <input
                type="radio"
                name="projectType"
                id={`project-type-${option.value}`}
                value={option.value}
                checked={formData.projectType === option.value}
                onChange={(e) => updateFormData('projectType', e.target.value)}
                className="sr-only"
              />
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className={`p-2 md:p-3 rounded-lg transition-all duration-300 flex-shrink-0 ${
                  formData.projectType === option.value
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-gray-700 group-hover:bg-blue-500/20 text-gray-400 group-hover:text-blue-300'
                }`}>
                  <IconComponent className="text-base md:text-lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-sm md:text-base">{option.label}</div>
                  <div className="text-gray-400 text-xs md:text-sm mt-1">{option.description}</div>
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </motion.div>
  );
};

// Step 2: Store Details
const StoreDetailsStep = ({ formData, updateFormData, handleFileUpload, removeAttachment }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Tell us about your store
        </h2>
        <p className="text-gray-400 text-sm md:text-base">Share your store details and requirements</p>
      </div>
      
      <div className="space-y-4 md:space-y-6">
        <div>
          <label className="block text-gray-300 mb-1 md:mb-2 text-sm md:text-base">Business/Store Name</label>
          <input
            type="text"
            value={formData.businessName}
            onChange={(e) => updateFormData('businessName', e.target.value)}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none backdrop-blur-sm text-sm md:text-base"
            placeholder="What's your store called?"
            aria-describedby="business-name-help"
          />
          <div id="business-name-help" className="text-xs text-gray-400 mt-1">
            Optional - helps us personalize your quote
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-2 md:mb-3 text-sm md:text-base">How many products? *</label>
          <div className="grid grid-cols-2 gap-2 md:gap-4">
            {[
              { value: '1-50', label: '1-50 products' },
              { value: '51-100', label: '51-100 products' },
              { value: '101-200', label: '101-200 products' },
              { value: '200+', label: '200+ products' }
            ].map((option) => (
              <label
                key={option.value}
                className={`block p-3 md:p-4 border-2 rounded-lg md:rounded-xl cursor-pointer text-center transition-all duration-300 ${
                  formData.productsCount === option.value
                    ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20'
                    : 'border-gray-600 hover:border-blue-400 hover:bg-blue-500/5'
                }`}
                htmlFor={`products-${option.value}`}
              >
                <input
                  type="radio"
                  name="productsCount"
                  id={`products-${option.value}`}
                  value={option.value}
                  checked={formData.productsCount === option.value}
                  onChange={(e) => updateFormData('productsCount', e.target.value)}
                  className="sr-only"
                />
                <div className="font-semibold text-white text-xs md:text-sm">{option.label}</div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-1 md:mb-2 text-sm md:text-base">Project Description *</label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
            rows={3}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none backdrop-blur-sm text-sm md:text-base"
            placeholder="Tell us about your products, target audience, and any special requirements..."
            aria-describedby="description-help"
          />
          <div id="description-help" className="text-xs text-gray-400 mt-1">
            The more details you provide, the more accurate our quote will be
          </div>
        </div>

        {/* File Upload Section */}
        <div>
          <label className="block text-gray-300 mb-2 md:mb-3 text-sm md:text-base">Attach Files (Optional)</label>
          <div className="border-2 border-dashed border-gray-600 rounded-lg md:rounded-xl p-3 md:p-4 text-center hover:border-blue-500 transition-all duration-300">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip,.psd,.ai,.fig,.xd,.csv"
              aria-describedby="file-upload-help"
            />
            <label htmlFor="file-upload" className="cursor-pointer block">
              <FaCloudUploadAlt className="text-xl md:text-2xl text-blue-400 mx-auto mb-1 md:mb-2" />
              <div className="text-gray-300 text-sm md:text-base mb-1">
                Click to upload files
              </div>
              <div className="text-gray-400 text-xs md:text-sm">
                Product images, catalogs, design files (Max: 10MB per file)
              </div>
            </label>
          </div>
          <div id="file-upload-help" className="text-xs text-gray-400 mt-1">
            Supported formats: PDF, DOC, Images, ZIP, Design files
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
                      <FaPaperclip className="text-blue-400 flex-shrink-0 text-sm md:text-base" />
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

// Step 3: Contact Information
const ContactInfoStep = ({ formData, updateFormData }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Your Contact Info
        </h2>
        <p className="text-gray-400 text-sm md:text-base">How can we reach you?</p>
      </div>
      
      <div className="space-y-4 md:space-y-6">
        <div>
          <label className="block text-gray-300 mb-1 md:mb-2 text-sm md:text-base">Full Name *</label>
          <input
            type="text"
            required
            value={formData.contact.fullName}
            onChange={(e) => updateFormData('contact.fullName', e.target.value)}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none backdrop-blur-sm text-sm md:text-base"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1 md:mb-2 text-sm md:text-base">Email Address *</label>
          <input
            type="email"
            required
            value={formData.contact.email}
            onChange={(e) => updateFormData('contact.email', e.target.value)}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none backdrop-blur-sm text-sm md:text-base"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1 md:mb-2 text-sm md:text-base">Phone/WhatsApp *</label>
          <input
            type="tel"
            required
            value={formData.contact.phone}
            onChange={(e) => updateFormData('contact.phone', e.target.value)}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none backdrop-blur-sm text-sm md:text-base"
            placeholder="+27 XXX XXX XXXX"
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
    >
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Review & Submit
        </h2>
        <p className="text-gray-400 text-sm md:text-base">Review your ecommerce store details</p>
      </div>
      
      <div className="space-y-4 md:space-y-6">
        <div className="bg-gray-700/30 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-600/50">
          <h3 className="text-lg md:text-xl font-semibold text-blue-400 mb-3 md:mb-4 flex items-center">
            <FaStore className="mr-2 text-sm md:text-base" />
            Store Details
          </h3>
          <div className="space-y-3 md:space-y-4 text-xs md:text-sm">
            <div>
              <span className="text-gray-400">Project Type:</span>
              <div className="text-white font-medium">
                {formData.projectType === 'new' && 'New Ecommerce Store'}
                {formData.projectType === 'redesign' && 'Redesign Store'}
                {formData.projectType === 'improve' && 'Add Ecommerce'}
              </div>
            </div>
            {formData.businessName && (
              <div>
                <span className="text-gray-400">Store Name:</span>
                <div className="text-white font-medium">{formData.businessName}</div>
              </div>
            )}
            {formData.productsCount && (
              <div>
                <span className="text-gray-400">Products:</span>
                <div className="text-white font-medium">
                  {formData.productsCount === '1-50' && '1-50 products'}
                  {formData.productsCount === '51-100' && '51-100 products'}
                  {formData.productsCount === '101-200' && '101-200 products'}
                  {formData.productsCount === '200+' && '200+ products'}
                </div>
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
            <h3 className="text-lg md:text-xl font-semibold text-purple-400 mb-3 md:mb-4 flex items-center">
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
                    <FaPaperclip className="text-purple-400 flex-shrink-0 text-sm md:text-base" />
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
            <FaShoppingCart className="mr-2 text-sm md:text-base" />
            Contact Information
          </h3>
          <div className="space-y-3 md:space-y-4 text-xs md:text-sm">
            <div>
              <span className="text-gray-400">Full Name:</span>
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
            We'll contact you within 24 hours to discuss your ecommerce store.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default EcommerceWebsiteQuote;
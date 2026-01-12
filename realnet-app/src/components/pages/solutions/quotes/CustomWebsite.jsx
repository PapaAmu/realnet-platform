"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaDesktop,
  FaCogs,
  FaDatabase,
  FaShoppingCart,
  FaUsers,
  FaMobile,
  FaShieldAlt,
  FaChartLine,
  FaCalendarAlt,
  FaLayerGroup,
  FaPaperclip,
  FaTimes,
  FaCloudUploadAlt
} from 'react-icons/fa';
import { useAnalytics } from '@/hooks/useAnalytics';

const CustomWebsiteQuote = () => {
  const router = useRouter();
  const { trackServiceQuote, trackEvent } = useAnalytics();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: '',
    businessName: '',
    industry: '',
    timeline: '',
    budgetRange: '',
    features: [],
    technicalRequirements: '',
    description: '',
    attachments: [],
    contact: {
      email: '',
      fullName: '',
      phone: '',
      companyRole: ''
    }
  });

  const steps = [
    { id: 1, title: 'Project Type', icon: FaDesktop },
    { id: 2, title: 'Features', icon: FaCogs },
    { id: 3, title: 'Details', icon: FaChartLine },
    { id: 4, title: 'Contact', icon: FaUsers },
    { id: 5, title: 'Review', icon: FaCheck }
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
  };

  const toggleArrayField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
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

    // Track file upload event
    trackEvent({
      action: 'file_upload',
      category: 'Quote Form',
      label: 'Custom Website',
      value: files.length
    });
  };

  const removeAttachment = (id) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter(att => att.id !== id)
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
    
    // Track step progression
    trackEvent({
      action: 'form_step_completed',
      category: 'Quote Form',
      label: `Step ${currentStep} - ${steps[currentStep - 1]?.title}`,
      value: currentStep
    });
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Custom website quote submitted:', formData);

    // Track form submission with detailed data
    trackServiceQuote('custom_website');
    
    // Track detailed form submission event
    trackEvent({
      action: 'custom_website_quote_submitted',
      category: 'Lead Generation',
      label: formData.projectType,
      value: formData.features.length
    });

    // Track budget range for analytics
    trackEvent({
      action: 'budget_selected',
      category: 'Quote Form',
      label: formData.budgetRange,
      value: getBudgetValue(formData.budgetRange)
    });

    // Show success message
    toast.success('Thank you for your submission! We will contact you within 24 hours to discuss your project.');
    
    // Reset form (optional)
    setFormData({
      projectType: '',
      businessName: '',
      industry: '',
      timeline: '',
      budgetRange: '',
      features: [],
      technicalRequirements: '',
      description: '',
      attachments: [],
      contact: {
        email: '',
        fullName: '',
        phone: '',
        companyRole: ''
      }
    });
    setCurrentStep(1);
    
    // Redirect to success page after a short delay
    setTimeout(() => {
      router.push('/form-success?type=custom-website-quote');
    }, 1500);
  };

  const getBudgetValue = (budgetRange) => {
    const budgetValues = {
      'R5k-R10k': 7500,
      'R10k-R25k': 17500,
      'R25k-R50k': 37500,
      'R50k-R100k': 75000,
      'R100k+': 100000
    };
    return budgetValues[budgetRange] || 0;
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Track when user selects project type
  const handleProjectTypeSelect = (value) => {
    updateFormData('projectType', value);
    
    // Track project type selection
    trackEvent({
      action: 'project_type_selected',
      category: 'Quote Form',
      label: value
    });
  };

  // Track when user selects features
  const handleFeatureToggle = (featureId) => {
    toggleArrayField('features', featureId);
    
    // Track feature selection
    trackEvent({
      action: 'feature_selected',
      category: 'Quote Form',
      label: featureId
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-gray-900 text-white" itemScope itemType="https://schema.org/WebPage">
        {/* Header - Mobile Responsive */}
        <header className="relative bg-gradient-to-r from-orange-500 via-pink-500 to-orange-600 py-8 md:py-12 overflow-hidden" data-section="hero">
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
                  <FaDesktop className="text-2xl md:text-3xl text-orange-300" />
                </div>
              </div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-200 px-2" itemProp="headline">
                Custom Website Development
              </h1>
              <p className="text-base md:text-xl text-orange-100 max-w-2xl mx-auto px-2" itemProp="description">
                Tailored web solutions for your business. Starting from R5,000+
              </p>

              {/* Local Business Microdata */}
              <div itemScope itemType="https://schema.org/LocalBusiness" className="hidden">
                <span itemProp="name">REALNET WEB SOLUTIONS</span>
                <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <span itemProp="streetAddress">Matsau Street, Ivory Park</span>
                  <span itemProp="addressLocality">Midrand</span>
                  <span itemProp="addressRegion">Gauteng</span>
                  <span itemProp="postalCode">1689</span>
                  <span itemProp="addressCountry">ZA</span>
                </div>
                <span itemProp="telephone">+27-64-038-8883</span>
                <span itemProp="email">lukhele@realnet-web.co.za</span>
                <span itemProp="priceRange">R5,000+</span>
                <span itemProp="areaServed">South Africa</span>
              </div>
            </motion.div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-8 md:py-12">
          {/* Progress Steps - Mobile Responsive */}
          <motion.div
            className="flex justify-center mb-8 md:mb-12 px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-3 md:p-4 border border-gray-700 w-full max-w-2xl">
              <div className="flex items-center justify-between md:justify-center md:space-x-2 lg:space-x-6">
                {steps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <React.Fragment key={step.id}>
                      <div className="flex flex-col items-center flex-1 md:flex-none">
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${currentStep > step.id
                            ? 'bg-green-500 border-green-500 shadow-lg shadow-green-500/25'
                            : currentStep === step.id
                              ? 'bg-gradient-to-r from-orange-500 to-pink-500 border-transparent shadow-lg shadow-orange-500/25'
                              : 'border-gray-600 bg-gray-700'
                          }`}>
                          <IconComponent className={
                            `text-sm md:text-base ${currentStep >= step.id ? 'text-white' : 'text-gray-400'}`
                          } />
                        </div>
                        <span className={`text-xs mt-1 md:mt-2 font-medium text-center hidden xs:block ${currentStep >= step.id ? 'text-white' : 'text-gray-400'
                          }`}>
                          {step.title}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`flex-1 h-1 mx-1 md:mx-2 md:w-4 lg:w-8 rounded-full transition-all duration-300 ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-600'
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
            className="bg-gray-800/40 backdrop-blur-sm rounded-2xl md:rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            data-section="quote-form"
          >
            <div className="p-1 md:p-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20">
              <div className="bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
                <form onSubmit={handleSubmit} itemScope itemType="https://schema.org/ContactPage">
                  <AnimatePresence mode="wait">
                    {/* Step 1: Project Type */}
                    {currentStep === 1 && (
                      <ProjectTypeStep
                        formData={formData}
                        updateFormData={handleProjectTypeSelect}
                      />
                    )}

                    {/* Step 2: Features */}
                    {currentStep === 2 && (
                      <FeaturesStep
                        formData={formData}
                        toggleArrayField={handleFeatureToggle}
                      />
                    )}

                    {/* Step 3: Project Details */}
                    {currentStep === 3 && (
                      <ProjectDetailsStep
                        formData={formData}
                        updateFormData={updateFormData}
                        handleFileUpload={handleFileUpload}
                        removeAttachment={removeAttachment}
                        trackEvent={trackEvent}
                      />
                    )}

                    {/* Step 4: Contact Information */}
                    {currentStep === 4 && (
                      <ContactInfoStep
                        formData={formData}
                        updateFormData={updateFormData}
                        trackEvent={trackEvent}
                      />
                    )}

                    {/* Step 5: Review & Submit */}
                    {currentStep === 5 && (
                      <ReviewStep
                        formData={formData}
                        removeAttachment={removeAttachment}
                      />
                    )}
                  </AnimatePresence>

                  {/* Navigation - Mobile Responsive */}
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-3 md:gap-4 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-700/50">
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 border border-gray-600 text-gray-300 rounded-lg md:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-sm text-sm md:text-base"
                      aria-label="Go to previous step"
                    >
                      <FaArrowLeft className="text-sm" />
                      <span>Previous</span>
                    </button>

                    <div className="text-xs md:text-sm text-gray-400 text-center py-2 md:py-0">
                      Step {currentStep} of {steps.length}
                    </div>

                    {currentStep < steps.length ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg md:rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-orange-500/25 text-sm md:text-base"
                        aria-label="Continue to next step"
                      >
                        <span>Continue</span>
                        <FaArrowRight className="text-sm" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg md:rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-green-500/25 text-sm md:text-base disabled:opacity-75 disabled:cursor-not-allowed"
                        aria-label="Submit custom website quote request"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <FaCheck className="text-sm" />
                            <span>Get Quote</span>
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
            data-section="package-info"
          >
            <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm">
              <h3 className="text-base md:text-lg font-semibold text-orange-300 mb-2 md:mb-3">What's Included:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 text-xs md:text-sm text-gray-300">
                <div className="flex items-center justify-center space-x-1 md:space-x-2">
                  <FaDesktop className="text-orange-400 text-sm md:text-base" />
                  <span>Responsive Design</span>
                </div>
                <div className="flex items-center justify-center space-x-1 md:space-x-2">
                  <FaShieldAlt className="text-green-400 text-sm md:text-base" />
                  <span>Security</span>
                </div>
                <div className="flex items-center justify-center space-x-1 md:space-x-2">
                  <FaMobile className="text-blue-400 text-sm md:text-base" />
                  <span>Mobile Friendly</span>
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
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Why Choose Our Custom Website Development?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
                <div className="flex flex-col items-center">
                  <FaUsers className="text-orange-400 text-xl mb-2" />
                  <span>Expert Development Team</span>
                </div>
                <div className="flex flex-col items-center">
                  <FaShieldAlt className="text-green-400 text-xl mb-2" />
                  <span>Secure & Scalable Solutions</span>
                </div>
                <div className="flex flex-col items-center">
                  <FaChartLine className="text-blue-400 text-xl mb-2" />
                  <span>Performance Optimized</span>
                </div>
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
  const projectTypes = [
    {
      value: 'business-website',
      label: 'Business Website',
      description: 'Professional website for your business',
      icon: FaDesktop
    },
    {
      value: 'ecommerce',
      label: 'E-commerce Store',
      description: 'Online store with shopping cart and payments',
      icon: FaShoppingCart
    },
    {
      value: 'web-app',
      label: 'Web Application',
      description: 'Interactive application with user accounts',
      icon: FaDatabase
    },
    {
      value: 'custom-cms',
      label: 'Custom CMS',
      description: 'Tailored content management system',
      icon: FaCogs
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">
          Project Type
        </h2>
        <p className="text-gray-400 text-sm md:text-base">What kind of website do you need?</p>
      </div>

      <div className="space-y-4 md:space-y-6">
        <div>
          <label className="block text-gray-300 mb-3 md:mb-4 text-lg font-semibold">Select Project Type *</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {projectTypes.map((option) => {
              const IconComponent = option.icon;
              return (
                <label
                  key={option.value}
                  className={`block p-3 md:p-4 border-2 rounded-lg md:rounded-xl cursor-pointer transition-all duration-300 group ${formData.projectType === option.value
                      ? 'border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/20'
                      : 'border-gray-600 hover:border-orange-400 hover:bg-orange-500/5'
                    }`}
                >
                  <input
                    type="radio"
                    name="projectType"
                    value={option.value}
                    checked={formData.projectType === option.value}
                    onChange={(e) => updateFormData(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-start space-x-2 md:space-x-3">
                    <div className={`p-1 md:p-2 rounded-lg transition-all duration-300 flex-shrink-0 ${formData.projectType === option.value
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                        : 'bg-gray-700 group-hover:bg-orange-500/20 text-gray-400 group-hover:text-orange-300'
                      }`}>
                      <IconComponent className="text-base md:text-lg" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white text-sm md:text-base truncate">{option.label}</div>
                      <div className="text-gray-400 text-xs md:text-sm mt-1 line-clamp-2">{option.description}</div>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block text-gray-300 mb-1 md:mb-2 text-sm md:text-base">Business/Project Name *</label>
            <input
              type="text"
              required
              value={formData.businessName}
              onChange={(e) => updateFormData('businessName', e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none backdrop-blur-sm text-sm md:text-base"
              placeholder="Your business or project name"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1 md:mb-2 text-sm md:text-base">Industry</label>
            <select
              value={formData.industry}
              onChange={(e) => updateFormData('industry', e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-white focus:border-orange-500 focus:outline-none backdrop-blur-sm text-sm md:text-base"
            >
              <option value="">Select industry</option>
              <option value="business">Business Services</option>
              <option value="ecommerce">E-commerce</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="restaurant">Restaurant/Food</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-1 md:mb-2 text-sm md:text-base">Project Description *</label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
            rows={3}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none resize-none backdrop-blur-sm text-sm md:text-base"
            placeholder="Tell us about your project goals and requirements..."
          />
        </div>
      </div>
    </motion.div>
  );
};

// Step 2: Features
const FeaturesStep = ({ formData, toggleArrayField }) => {
  const features = [
    { id: 'responsive', label: 'Mobile Responsive Design', category: 'Design' },
    { id: 'contact-form', label: 'Contact Form', category: 'Functionality' },
    { id: 'cms', label: 'Content Management System', category: 'Management' },
    { id: 'ecommerce', label: 'E-commerce Functionality', category: 'E-commerce' },
    { id: 'user-accounts', label: 'User Accounts/Login', category: 'Functionality' },
    { id: 'seo', label: 'SEO Optimization', category: 'Marketing' },
    { id: 'analytics', label: 'Analytics Integration', category: 'Analytics' },
    { id: 'blog', label: 'Blog/News Section', category: 'Content' }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">
          Required Features
        </h2>
        <p className="text-gray-400 text-sm md:text-base">Select the features you need for your website</p>
      </div>

      <div className="space-y-4 md:space-y-6">
        <div>
          <label className="block text-gray-300 mb-3 md:mb-4 text-lg font-semibold">Website Features</label>
          <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4">Choose all that apply to your project</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
            {features.map((feature) => (
              <label
                key={feature.id}
                className={`flex items-center p-2 md:p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 ${formData.features.includes(feature.id)
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-gray-600 hover:border-gray-500'
                  }`}
              >
                <input
                  type="checkbox"
                  checked={formData.features.includes(feature.id)}
                  onChange={() => toggleArrayField(feature.id)}
                  className="text-orange-500 focus:ring-orange-500 mr-2 md:mr-3 rounded"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white text-xs md:text-sm truncate">{feature.label}</div>
                  <div className="text-gray-400 text-xs">{feature.category}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-1 md:mb-2 text-sm md:text-base">Additional Requirements</label>
          <textarea
            value={formData.technicalRequirements}
            onChange={(e) => updateFormData('technicalRequirements', e.target.value)}
            rows={2}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none resize-none backdrop-blur-sm text-sm md:text-base"
            placeholder="Any specific technical requirements or special features?..."
          />
        </div>
      </div>
    </motion.div>
  );
};

// Step 3: Project Details
const ProjectDetailsStep = ({ formData, updateFormData, handleFileUpload, removeAttachment, trackEvent }) => {
  
  const handleTimelineChange = (value) => {
    updateFormData('timeline', value);
    
    // Track timeline selection
    trackEvent({
      action: 'timeline_selected',
      category: 'Quote Form',
      label: value
    });
  };

  const handleBudgetChange = (value) => {
    updateFormData('budgetRange', value);
    
    // Track budget selection
    trackEvent({
      action: 'budget_selected',
      category: 'Quote Form',
      label: value
    });
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">
          Project Details
        </h2>
        <p className="text-gray-400 text-sm md:text-base">Tell us about your timeline, budget, and attach files</p>
      </div>

      <div className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block text-gray-300 mb-1 md:mb-2 text-sm md:text-base">Timeline *</label>
            <select
              required
              value={formData.timeline}
              onChange={(e) => handleTimelineChange(e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-white focus:border-orange-500 focus:outline-none backdrop-blur-sm text-sm md:text-base"
            >
              <option value="">Select timeline</option>
              <option value="2-4 weeks">2-4 weeks</option>
              <option value="1-2 months">1-2 months</option>
              <option value="2-3 months">2-3 months</option>
              <option value="3-6 months">3-6 months</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-1 md:mb-2 text-sm md:text-base">Budget Range *</label>
            <select
              required
              value={formData.budgetRange}
              onChange={(e) => handleBudgetChange(e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-white focus:border-orange-500 focus:outline-none backdrop-blur-sm text-sm md:text-base"
            >
              <option value="">Select budget</option>
              <option value="R5k-R10k">R5,000 - R10,000</option>
              <option value="R10k-R25k">R10,000 - R25,000</option>
              <option value="R25k-R50k">R25,000 - R50,000</option>
              <option value="R50k-R100k">R50,000 - R100,000</option>
              <option value="R100k+">R100,000+</option>
            </select>
          </div>
        </div>

        {/* File Upload Section */}
        <div>
          <label className="block text-gray-300 mb-2 md:mb-3 text-sm md:text-base">Attach Files (Optional)</label>
          <div className="border-2 border-dashed border-gray-600 rounded-lg md:rounded-xl p-4 md:p-6 text-center hover:border-orange-500 transition-all duration-300">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip,.psd,.ai,.fig,.xd"
            />
            <label htmlFor="file-upload" className="cursor-pointer block">
              <FaCloudUploadAlt className="text-2xl md:text-3xl text-orange-400 mx-auto mb-2" />
              <div className="text-gray-300 text-sm md:text-base mb-1">
                Click to upload files
              </div>
              <div className="text-gray-400 text-xs md:text-sm">
                PDF, DOC, Images, Design files (Max: 10MB per file)
              </div>
            </label>
          </div>

          {/* Attached Files List */}
          {formData.attachments.length > 0 && (
            <div className="mt-4">
              <h4 className="text-gray-300 text-sm md:text-base mb-2">Attached Files:</h4>
              <div className="space-y-2">
                {formData.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between bg-gray-700/50 rounded-lg md:rounded-xl p-2 md:p-3 border border-gray-600"
                  >
                    <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
                      <FaPaperclip className="text-orange-400 flex-shrink-0" />
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

// Step 4: Contact Information
const ContactInfoStep = ({ formData, updateFormData, trackEvent }) => {
  
  const handleContactFieldChange = (field, value) => {
    updateFormData(`contact.${field}`, value);
    
    // Track when user starts filling contact info
    if (value.length === 1) {
      trackEvent({
        action: 'contact_info_started',
        category: 'Quote Form',
        label: field
      });
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">
          Contact Information
        </h2>
        <p className="text-gray-400 text-sm md:text-base">How can we reach you?</p>
      </div>

      <div className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block text-gray-300 mb-1 md:mb-2 text-sm md:text-base">Full Name *</label>
            <input
              type="text"
              required
              value={formData.contact.fullName}
              onChange={(e) => handleContactFieldChange('fullName', e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none backdrop-blur-sm text-sm md:text-base"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1 md:mb-2 text-sm md:text-base">Email Address *</label>
            <input
              type="email"
              required
              value={formData.contact.email}
              onChange={(e) => handleContactFieldChange('email', e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none backdrop-blur-sm text-sm md:text-base"
              placeholder="your.email@company.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block text-gray-300 mb-1 md:mb-2 text-sm md:text-base">Phone *</label>
            <input
              type="tel"
              required
              value={formData.contact.phone}
              onChange={(e) => handleContactFieldChange('phone', e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none backdrop-blur-sm text-sm md:text-base"
              placeholder="+27 XXX XXX XXXX"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1 md:mb-2 text-sm md:text-base">Your Role</label>
            <select
              value={formData.contact.companyRole}
              onChange={(e) => handleContactFieldChange('companyRole', e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-white focus:border-orange-500 focus:outline-none backdrop-blur-sm text-sm md:text-base"
            >
              <option value="">Select your role</option>
              <option value="owner">Business Owner</option>
              <option value="manager">Manager</option>
              <option value="marketing">Marketing</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Step 5: Review & Submit
const ReviewStep = ({ formData, removeAttachment }) => {
  const getProjectTypeLabel = (value) => {
    const types = {
      'business-website': 'Business Website',
      'ecommerce': 'E-commerce Store',
      'web-app': 'Web Application',
      'custom-cms': 'Custom CMS'
    };
    return types[value] || value;
  };

  const featureLabels = {
    'responsive': 'Mobile Responsive Design',
    'contact-form': 'Contact Form',
    'cms': 'Content Management System',
    'ecommerce': 'E-commerce Functionality',
    'user-accounts': 'User Accounts/Login',
    'seo': 'SEO Optimization',
    'analytics': 'Analytics Integration',
    'blog': 'Blog/News Section'
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">
          Project Summary
        </h2>
        <p className="text-gray-400 text-sm md:text-base">Review your project details</p>
      </div>

      <div className="space-y-4 md:space-y-6">
        {/* Project Summary */}
        <div className="bg-gray-700/30 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-600/50">
          <h3 className="text-lg md:text-xl font-semibold text-orange-400 mb-3 md:mb-4 flex items-center">
            <FaDesktop className="mr-2 text-sm md:text-base" />
            Project Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
            <div>
              <span className="text-gray-400">Project Type:</span>
              <div className="text-white font-medium">{getProjectTypeLabel(formData.projectType)}</div>
            </div>
            <div>
              <span className="text-gray-400">Business:</span>
              <div className="text-white font-medium">{formData.businessName}</div>
            </div>
            <div>
              <span className="text-gray-400">Timeline:</span>
              <div className="text-white font-medium">{formData.timeline}</div>
            </div>
            <div>
              <span className="text-gray-400">Budget:</span>
              <div className="text-white font-medium">{formData.budgetRange}</div>
            </div>
          </div>
        </div>

        {/* Features */}
        {formData.features.length > 0 && (
          <div className="bg-gray-700/30 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-600/50">
            <h3 className="text-lg md:text-xl font-semibold text-pink-400 mb-3 md:mb-4 flex items-center">
              <FaCogs className="mr-2 text-sm md:text-base" />
              Selected Features
            </h3>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {formData.features.map(featureId => (
                <span
                  key={featureId}
                  className="px-2 md:px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs md:text-sm border border-orange-500/30"
                >
                  {featureLabels[featureId]}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Attachments */}
        {formData.attachments.length > 0 && (
          <div className="bg-gray-700/30 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-600/50">
            <h3 className="text-lg md:text-xl font-semibold text-blue-400 mb-3 md:mb-4 flex items-center">
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
                  >
                    <FaTimes className="text-sm md:text-base" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="bg-gray-700/30 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-600/50">
          <h3 className="text-lg md:text-xl font-semibold text-yellow-400 mb-3 md:mb-4 flex items-center">
            <FaUsers className="mr-2 text-sm md:text-base" />
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
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
            {formData.contact.companyRole && (
              <div>
                <span className="text-gray-400">Role:</span>
                <div className="text-white font-medium">{formData.contact.companyRole}</div>
              </div>
            )}
          </div>
        </div>

        {/* Final Confirmation */}
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl md:rounded-2xl p-4 md:p-6 text-center backdrop-blur-sm">
          <FaCheck className="text-green-400 text-2xl md:text-3xl mx-auto mb-2 md:mb-3" />
          <h4 className="font-semibold text-green-300 text-base md:text-lg mb-1 md:mb-2">Ready to Get Started!</h4>
          <p className="text-green-200 text-xs md:text-sm">
            We'll review your project and contact you within 24 hours with a detailed quote and next steps.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomWebsiteQuote;
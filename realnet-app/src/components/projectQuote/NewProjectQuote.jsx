'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FaPhone,
  FaEnvelope,
  FaFileAlt,
  FaCheckCircle,
  FaExclamationCircle,
  FaArrowRight,
  FaArrowLeft,
  FaTimes,
  FaPaperPlane,
  FaUser,
  FaBriefcase,
  FaTag,
  FaCommentAlt,
  FaClock,
  FaInfoCircle,
  FaDollarSign
} from "react-icons/fa";

// Mocking the analytics hook if it doesn't exist in your file structure
const useAnalytics = () => ({
  trackFormSubmission: (label) => console.log("Track Form:", label),
  trackServiceQuote: (service) => console.log("Track Service:", service),
  trackEvent: (event) => console.log("Track Event:", event),
});

const InputField = ({ label, name, value, onChange, error, type = "text", required, icon: Icon, isTextarea, options, placeholder }) => (
  <div className="flex flex-col gap-1.5 group relative z-10"> {/* Added relative z-10 */}
    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
      {Icon && <Icon className="w-3 h-3 text-indigo-400" />}
      {label}
      {required && <span className="text-rose-500">*</span>}
    </label>
    
    {isTextarea ? (
      <textarea
        key={name} // Explicit key for stability
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
        className={`w-full bg-slate-800/50 border ${error ? 'border-rose-500/50 ring-1 ring-rose-500/20' : 'border-slate-700 hover:border-slate-600'} rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200 resize-none relative z-10`}
      />
    ) : options ? (
      <div className="relative">
        <select
          key={name} // Explicit key for stability
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full bg-slate-800/50 border ${error ? 'border-rose-500/50 ring-1 ring-rose-500/20' : 'border-slate-700 hover:border-slate-600'} rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200 appearance-none cursor-pointer relative z-10`}
        >
          <option value="" disabled className="bg-slate-800 text-slate-400">{placeholder || `Select ${label}`}</option>
          {options.map((opt, i) => (
            <option key={i} value={opt} className="bg-slate-800 text-slate-200">{opt}</option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 z-20">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
    ) : (
      <input
        key={name} // Explicit key for stability
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={name === "email" ? "email" : name === "name" ? "name" : "off"} // Help browser autofill
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        className={`w-full bg-slate-800/50 border ${error ? 'border-rose-500/50 ring-1 ring-rose-500/20' : 'border-slate-700 hover:border-slate-600'} rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200 relative z-10`}
      />
    )}
    
    {error && (
      <motion.p 
        initial={{ opacity: 0, y: -5 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-xs text-rose-400 flex items-center gap-1 mt-1"
      >
        <FaExclamationCircle className="w-3 h-3" /> {error}
      </motion.p>
    )}
  </div>
);

const StepIndicator = ({ currentStep }) => {
  const steps = [
    { id: 1, label: "Contact", icon: FaUser },
    { id: 2, label: "Project", icon: FaBriefcase },
    { id: 3, label: "Review", icon: FaCheckCircle },
  ];

  return (
    <div className="flex justify-between mb-8 relative">
      {/* Connecting Line Background */}
      <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-800 -z-10"></div>
      {/* Progress Line */}
      <motion.div 
        className="absolute top-5 left-0 h-0.5 bg-indigo-500 -z-10"
        initial={{ width: "0%" }}
        animate={{ width: `${((currentStep - 1) / 2) * 100}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {steps.map((step) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        
        return (
          <div key={step.id} className="flex flex-col items-center gap-2 bg-slate-950 px-2">
            <motion.div 
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 z-10 ${
                isActive ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 
                isCompleted ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 
                'bg-slate-900 border-slate-800 text-slate-500'
              }`}
              initial={false}
              animate={isActive ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {isCompleted ? <FaCheckCircle className="w-5 h-5" /> : <step.icon className="w-4 h-4" />}
            </motion.div>
            <span className={`text-xs font-medium ${isActive ? 'text-indigo-400' : isCompleted ? 'text-slate-400' : 'text-slate-600'}`}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const Quotation = ({ onClose }) => {
  const router = useRouter();
  const { trackFormSubmission, trackServiceQuote, trackEvent } = useAnalytics();

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

  // --- Effects ---
  useEffect(() => {
    let interval;
    if (submitStatus === "success" && redirectTimer > 0) {
      interval = setInterval(() => setRedirectTimer((prev) => prev - 1), 1000);
    } else if (submitStatus === "success" && redirectTimer === 0) {
      router.push('/form-success?type=quotation');
      if (onClose) onClose();
    }
    return () => clearInterval(interval);
  }, [submitStatus, redirectTimer, router, onClose]);

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Debugging log to see if handler fires
    console.log(`Changing ${name} to:`, type === "checkbox" ? checked : value);
    
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
    
    if (name === "service" && value) {
      trackEvent({ action: 'service_selected', category: 'Quotation Form', label: value });
    }
  };

  const validateStep = (step) => {
    const errors = {};
    if (step === 1) {
      if (!formData.name.trim()) errors.name = "Name is required";
      if (!formData.email.trim()) errors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid email format";
      if (!formData.phone.trim()) errors.phone = "Phone number is required";
    }
    if (step === 2) {
      if (!formData.service) errors.service = "Service is required";
      if (!formData.projectDescription.trim()) errors.projectDescription = "Description is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(2) || !formData.agreeToTerms) {
      if (!formData.agreeToTerms) setFormErrors({ agreeToTerms: "You must agree to the terms" });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:8009/api/quotations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quotation');
      }

      const data = await response.json();
      
      trackFormSubmission('quotation_request');
      trackServiceQuote(formData.service);
      setSubmitStatus("success");
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      trackEvent({ action: 'form_step_completed', category: 'User Engagement', label: `Step ${currentStep}` });
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleClose = () => {
    trackEvent({ action: 'quotation_modal_closed', category: 'User Engagement', label: `Step ${currentStep}` });
    if (onClose) onClose();
    else router.push('/');
  };

  // --- Data ---
  const services = [
    "Website Development", "Mobile App Development", "Software Development", 
    "Hosting & Business Email", "E-Commerce Solution", "UI/UX Design", 
    "Digital Marketing", "Not Sure / Consultation"
  ];
  const budgetRanges = [
    "Less than R5,000", "R5,000 - R15,000", "R15,000 - R30,000", 
    "R30,000 - R50,000", "R50,000 - R100,000", "R100,000+"
  ];
  const timelineOptions = [
    "ASAP (Within 1 week)", "Within 2 weeks", "Within 1 month", 
    "Within 3 months", "Within 6 months", "Flexible"
  ];
  const projectTypes = [
    "New Project", "Redesign/Rebuild", "Ongoing Maintenance", "Add New Features"
  ];
  const urgencyLevels = [
    "Low - Just exploring", "Medium - Planning phase", 
    "High - Ready to start", "Critical - Need immediate help"
  ];
  const contactMethods = ["Email", "Phone", "WhatsApp"];

  // --- Render Components ---
  // Components moved outside to prevent focus loss issues


  // --- Main Layout ---
  return (
    <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl w-full max-w-5xl min-h-[600px] overflow-hidden grid grid-cols-1 lg:grid-cols-3 relative"
      >
        
        {/* Close Button (Top Right) */}
        <button 
          onClick={handleClose} 
          className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-slate-800/50 hover:bg-rose-500/20 hover:text-rose-400 border border-slate-700 hover:border-rose-500/30 flex items-center justify-center text-slate-400 transition-all duration-300 group"
        >
          <FaTimes className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Left Sidebar (Info Panel) */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-slate-900 to-indigo-950/30 p-10 border-r border-slate-800 relative overflow-hidden">
          {/* Decorative Blobs - Added pointer-events-none to ensure they don't block clicks */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

          <div className="z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Free Quote
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 leading-tight">
              Let's Build Something <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Extraordinary.
              </span>
            </h2>
            <p className="text-slate-400 text-sm mt-4 leading-relaxed">
              Tell us about your project. We'll get back to you with a detailed proposal within 24 hours.
            </p>
          </div>

          {/* Live Summary Card */}
          <div className="z-10 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm mt-auto">
            <h3 className="text-slate-200 font-semibold mb-4 text-sm uppercase tracking-wider">Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Service</span>
                <span className="text-slate-300 font-medium truncate max-w-[150px]">{formData.service || '-'}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Budget</span>
                <span className="text-slate-300 font-medium">{formData.budget || '-'}</span>
              </div>
              <div className="w-full h-px bg-slate-700/50 my-2"></div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs">
                <FaCheckCircle />
                <span>No commitment required</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content (Form) */}
        <div className="lg:col-span-2 p-6 lg:p-12 flex flex-col relative bg-slate-900">
          
          {/* Mobile Header (Visible only on small screens) */}
          <div className="lg:hidden mb-8">
            <h2 className="text-2xl font-bold text-white">Request a Quote</h2>
            <p className="text-slate-400 text-sm">Step {currentStep} of 3</p>
          </div>

          {/* Step Indicator */}
          <div className="mb-8">
            <StepIndicator currentStep={currentStep} />
          </div>

          {/* Form Container */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            
            <AnimatePresence mode="wait">
              
              {/* STEP 1 */}
              {currentStep === 1 && (
                <motion.div 
                  key="step1" 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }} 
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} error={formErrors.name} required icon={FaUser} />
                    <InputField label="Email Address" name="email" value={formData.email} onChange={handleChange} error={formErrors.email} type="email" required icon={FaEnvelope} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} error={formErrors.phone} required icon={FaPhone} />
                    <InputField label="Company Name" name="company" value={formData.company} onChange={handleChange} error={formErrors.company} icon={FaBriefcase} placeholder="Optional" />
                  </div>
                  
                  <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl flex gap-3 items-start mt-4">
                    <FaInfoCircle className="text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-blue-200/70 leading-relaxed">
                      We protect your privacy. Your contact details will only be used to send your quote and follow-up communication regarding this specific request.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* STEP 2 */}
              {currentStep === 2 && (
                <motion.div 
                  key="step2" 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }} 
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField label="Service Needed" name="service" value={formData.service} onChange={handleChange} error={formErrors.service} required options={services} icon={FaTag} />
                    <InputField label="Project Type" name="projectType" value={formData.projectType} onChange={handleChange} error={formErrors.projectType} options={projectTypes} icon={FaFileAlt} />
                  </div>
                  
                  <InputField label="Project Description" name="projectDescription" value={formData.projectDescription} onChange={handleChange} error={formErrors.projectDescription} isTextarea required icon={FaCommentAlt} placeholder="Describe your goals, requirements, and any specific features..." />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField label="Budget Range" name="budget" value={formData.budget} onChange={handleChange} error={formErrors.budget} options={budgetRanges} icon={FaDollarSign} />
                    <InputField label="Timeline" name="timeline" value={formData.timeline} onChange={handleChange} error={formErrors.timeline} options={timelineOptions} icon={FaClock} />
                  </div>
                  
                  <InputField label="Urgency Level" name="urgency" value={formData.urgency} onChange={handleChange} error={formErrors.urgency} options={urgencyLevels} icon={FaClock} />
                </motion.div>
              )}

              {/* STEP 3 */}
              {currentStep === 3 && (
                <motion.div 
                  key="step3" 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }} 
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <InputField label="Preferred Contact Method" name="preferredContactMethod" value={formData.preferredContactMethod} onChange={handleChange} error={formErrors.preferredContactMethod} options={contactMethods} />
                  <InputField label="Reference / Inspiration URL" name="reference" value={formData.reference} onChange={handleChange} error={formErrors.reference} icon={FaFileAlt} placeholder="https://..." />
                  <InputField label="Additional Details" name="additionalDetails" value={formData.additionalDetails} onChange={handleChange} error={formErrors.additionalDetails} isTextarea placeholder="Any other information you'd like us to know..." />

                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mt-4">
                    <h4 className="font-semibold text-emerald-400 mb-2 flex items-center gap-2 text-sm">
                      <FaCheckCircle /> What happens next?
                    </h4>
                    <ul className="text-xs text-emerald-200/70 space-y-1.5 list-disc list-inside">
                      <li>Our team reviews your requirements.</li>
                      <li>We contact you to clarify details if needed.</li>
                      <li>You receive a detailed PDF proposal within 24 hours.</li>
                    </ul>
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <input 
                      type="checkbox" 
                      id="agreeToTerms"
                      name="agreeToTerms" 
                      checked={formData.agreeToTerms} 
                      onChange={handleChange} 
                      className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500/20 focus:ring-offset-0 cursor-pointer"
                    />
                    <label htmlFor="agreeToTerms" className="text-sm text-slate-400 leading-relaxed cursor-pointer select-none">
                      I agree to the processing of my personal data for the purpose of receiving a quotation and communication regarding this request. <span className="text-rose-500">*</span>
                    </label>
                  </div>
                  {formErrors.agreeToTerms && <p className="text-xs text-rose-400 -mt-4">{formErrors.agreeToTerms}</p>}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Footer */}
            <div className="mt-auto pt-8 flex items-center justify-between border-t border-slate-800 ">
              
              {currentStep > 1 ? (
                <button 
                  type="button" 
                  onClick={prevStep} 
                  className="group flex items-center gap-2 px-6 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm font-medium"
                >
                  <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
                </button>
              ) : (
                <div></div> // Spacer
              )}

              {currentStep < 3 ? (
                <button 
                  type="button" 
                  onClick={nextStep} 
                  className="group flex items-center gap-2 px-8 py-2.5 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-200 hover:shadow-lg hover:shadow-white/10 transition-all text-sm"
                >
                  Next Step <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button 
                  type="submit" 
                  disabled={isSubmitting || !formData.agreeToTerms} 
                  className={`flex items-center gap-2 px-8 py-2.5 rounded-xl font-semibold transition-all text-sm ${
                    isSubmitting || !formData.agreeToTerms 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div 
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }} 
                      /> 
                      Processing...
                    </>
                  ) : (
                    <>Submit Request <FaPaperPlane className="w-4 h-4" /></>
                  )}
                </button>
              )}
            </div>

            {/* Status Messages */}
            <AnimatePresence>
              {submitStatus && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }}
                  className={`mt-4 p-4 rounded-xl text-sm flex items-center gap-3 ${
                    submitStatus === "success" 
                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                    : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
                  }`}
                >
                  {submitStatus === "success" ? <FaCheckCircle className="w-5 h-5" /> : <FaExclamationCircle className="w-5 h-5" />}
                  <div>
                    {submitStatus === "success" 
                      ? <span>Success! Redirecting you in {redirectTimer}s...</span>
                      : "Something went wrong. Please try again later."}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Quotation;
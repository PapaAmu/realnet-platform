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
  FaHome,
  FaRocket
} from 'react-icons/fa';

// Create a motion-enhanced Link component
const MotionLink = motion(Link);

const FormSuccessPage = () => {
  const searchParams = useSearchParams();
  const formType = searchParams.get('type') || 'form';
  const [countdown, setCountdown] = useState(7);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
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
          title: 'Message Transmitted',
          subtitle: 'We have received your transmission.',
          description: 'Our team is analyzing your inquiry. You will receive a response at the provided coordinates shortly.',
          icon: FaEnvelope,
          color: 'text-cyan-400',
          bg: 'bg-cyan-400/10',
          border: 'border-cyan-400/20'
        };
      case 'quotation':
        return {
          title: 'Quote Request Received',
          subtitle: 'Initiating project analysis sequence.',
          description: 'Our algorithms are processing your requirements. A detailed quotation will be compiled and sent to you shortly.',
          icon: FaCheckCircle,
          color: 'text-emerald-400',
          bg: 'bg-emerald-400/10',
          border: 'border-emerald-400/20'
        };
      default:
        return {
          title: 'Submission Confirmed',
          subtitle: 'Data packet received successfully.',
          description: 'Your information has been logged securely. We will process this and contact you within the next cycle.',
          icon: FaCheckCircle,
          color: 'text-emerald-400',
          bg: 'bg-emerald-400/10',
          border: 'border-emerald-400/20'
        };
    }
  };

  const details = getFormDetails();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-center p-4 pt-32 relative overflow-hidden selection:bg-indigo-500/30">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-primary-600/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <motion.div
        className="w-full max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Card */}
        <motion.div 
          className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 mb-6 text-center relative overflow-hidden"
          variants={itemVariants}
        >
          {/* Animated Border Gradient (Subtle) */}
          <div className="absolute inset-0 rounded-3xl border border-primary/20 [mask-image:linear-gradient(to_bottom,black,transparent)] pointer-events-none" />
          
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`w-20 h-20 mx-auto rounded-2xl ${details.bg} ${details.border} border flex items-center justify-center mb-6 shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)]`}
          >
            <details.icon className={`w-10 h-10 ${details.color}`} />
          </motion.div>

          <div className="space-y-2 mb-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-green-700 text-xs font-mono text-slate-400 uppercase tracking-widest"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Status: Success
            </motion.div>
            
            <motion.h1 
              className="text-3xl md:text-5xl font-bold text-white tracking-tight"
              variants={itemVariants}
            >
              {details.title}
            </motion.h1>
            <motion.p 
              className="text-lg text-slate-400 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              {details.subtitle}
            </motion.p>
          </div>

          <motion.div 
            className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 max-w-xl mx-auto"
            variants={itemVariants}
          >
            <p className="text-sm text-slate-300 leading-relaxed">
              {details.description}
            </p>
          </motion.div>
        </motion.div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Next Steps */}
          <motion.div 
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 md:p-8"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                <FaRocket className="text-indigo-400 w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Next Steps</h3>
            </div>

            <ul className="space-y-4">
              {[
                'Analyzing your requirements',
                'Assigning specialist consultant',
                'Preparing detailed proposal',
                'Contacting you via email/phone'
              ].map((step, i) => (
                <motion.li 
                  key={i} 
                  className="flex items-center gap-4 group"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-500 group-hover:border-indigo-500/50 group-hover:text-indigo-400 transition-colors">
                    {i + 1}
                  </div>
                  <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">{step}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-slate-800">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Expected Response</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-2">
                  <FaClock className="w-3 h-3" /> 2-24 Hours
                </span>
              </div>
            </div>
          </motion.div>

          {/* Contact / Support */}
          <motion.div 
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary-500/10 rounded-lg border border-primary-500/20">
                <FaPhone className="text-primary-400 w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Immediate Support</h3>
            </div>

            <div className="space-y-3 flex-1">
              <a href="mailto:lukhele@realnet-web.co.za" className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-indigo-500/30 transition-all group">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                  <FaEnvelope className="text-slate-300 group-hover:text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Email</div>
                  <div className="text-sm font-medium text-slate-200">lukhele@realnet-web.co.za</div>
                </div>
                <FaArrowRight className="text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </a>

              <a href="tel:+27640388883" className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-emerald-500/30 transition-all group">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                  <FaPhone className="text-slate-300 group-hover:text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Phone</div>
                  <div className="text-sm font-medium text-slate-200">+27 64 038-8883</div>
                </div>
                <FaArrowRight className="text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </a>

              <a href="https://wa.me/27640388883" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-green-500/30 transition-all group">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center group-hover:bg-green-600 transition-colors">
                  <FaWhatsapp className="text-slate-300 group-hover:text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-500 uppercase tracking-wider">WhatsApp</div>
                  <div className="text-sm font-medium text-slate-200">Instant Message</div>
                </div>
                <FaArrowRight className="text-slate-600 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Footer Actions - CORRECTED STYLING */}
        <motion.div 
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          {/* HOME BUTTON: White bg, rounded-full, icon only */}
          <MotionLink
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-950 font-semibold rounded-full shadow-lg shadow-white/10 hover:shadow-white/20 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
            whileTap={{ scale: 0.98 }}
          >
            <FaHome className="w-4 h-4" />
            Return Home
          </MotionLink>

          {/* VIEW WORK BUTTON: No bg, primary border, rounded-full */}
          <MotionLink
            href="/projects"
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-indigo-400 font-semibold rounded-full border border-indigo-500/50 hover:bg-indigo-500/10 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
            whileTap={{ scale: 0.98 }}
          >
            <FaStar className="w-4 h-4" />
            View Our Work
          </MotionLink>
        </motion.div>

        {/* Countdown Footer */}
        <motion.div 
          className="mt-12 text-center pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-xs text-slate-500 font-mono">
            AUTO-REDIRECT IN <span className="text-indigo-400">{countdown}</span>S
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default FormSuccessPage;
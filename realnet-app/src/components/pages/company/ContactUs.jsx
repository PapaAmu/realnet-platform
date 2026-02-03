"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaArrowRight,
  FaClock,
  FaCheckCircle,
  FaPaperPlane
} from "react-icons/fa";
import { toast } from "react-toastify";

const Contact = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => router.push('/form-success?type=contact'), 1500);
      } else {
        toast.error(data.message || "Failed to send message.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      label: "Visit Us",
      value: "Matsau Street, Ivory Park\nMidrand, Gauteng, 1689",
      href: "#"
    },
    {
      icon: FaPhone,
      label: "Call Us",
      value: "(+27) 63 038-8883",
      href: "tel:+27630388883"
    },
    {
      icon: FaEnvelope,
      label: "Email Us",
      value: "lukhele@realnet-web.co.za",
      href: "mailto:lukhele@realnet-web.co.za"
    }
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "https://web.facebook.com/profile.php?id=61565067420433", label: "Facebook" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/company/realnet-web-solutions-pty", label: "LinkedIn" },
    { icon: FaInstagram, href: "https://instagram.com/realnet_web", label: "Instagram" },
    { icon: FaGithub, href: "https://github.com/PapaAmu", label: "GitHub" }
  ];

  const businessHours = [
    { day: "Monday - Friday", hours: "09:00 - 18:00" },
    { day: "Saturday", hours: "10:00 - 16:00" },
    { day: "Sunday", hours: "Closed" }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-16">
      
      {/* Hero Section */}
      <section className="relative px-6 mb-16">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-900/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 mb-6">
              <FaPaperPlane className="w-4 h-4 text-violet-400" />
              Get In Touch
            </span>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Let's Start a
              <br />
              <span className="text-violet-400">Conversation</span>
            </h1>
            <p className="text-lg text-white/50 leading-relaxed">
              Have a project in mind or want to discuss how we can help your business grow? 
              We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            
            {/* Contact Form - 3 columns */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 lg:p-10">
                <h2 className="text-2xl font-semibold mb-8">Send us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-sm font-medium text-white/60 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-white/30 focus:outline-none transition-all ${
                          focusedField === 'name' 
                            ? 'border-violet-500/50 ring-2 ring-violet-500/10' 
                            : 'border-white/10 hover:border-white/20'
                        }`}
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-white/60 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-white/30 focus:outline-none transition-all ${
                          focusedField === 'email' 
                            ? 'border-violet-500/50 ring-2 ring-violet-500/10' 
                            : 'border-white/10 hover:border-white/20'
                        }`}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-white/30 focus:outline-none transition-all ${
                        focusedField === 'subject' 
                          ? 'border-violet-500/50 ring-2 ring-violet-500/10' 
                          : 'border-white/10 hover:border-white/20'
                      }`}
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-white/30 focus:outline-none transition-all resize-none ${
                        focusedField === 'message' 
                          ? 'border-violet-500/50 ring-2 ring-violet-500/10' 
                          : 'border-white/10 hover:border-white/20'
                      }`}
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: isLoading ? 1 : 1.01 }}
                    whileTap={{ scale: isLoading ? 1 : 0.99 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full relative py-4 bg-white text-black rounded-xl font-medium overflow-hidden disabled:opacity-70"
                  >
                    <AnimatePresence mode="wait">
                      {isLoading ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-3"
                        >
                          <motion.div
                            className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Sending...
                        </motion.div>
                      ) : (
                        <motion.span
                          key="send"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          Send Message <FaArrowRight className="w-4 h-4" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Sidebar - 2 columns */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Contact Info Cards */}
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/30 hover:bg-white/[0.04] transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white/40 mb-1">{item.label}</p>
                      <p className="text-white font-medium whitespace-pre-line">
                        {item.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="p-6 rounded-xl bg-violet-600/10 border border-violet-500/20">
                <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <a
                    href="/new-project/request-quotation"
                    className="flex items-center justify-between p-4 rounded-lg bg-white text-black font-medium hover:bg-white/90 transition-colors"
                  >
                    Get Free Quote <FaArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="/solutions/web-development"
                    className="flex items-center justify-between p-4 rounded-lg bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    View Services <FaArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-3 mb-4">
                  <FaClock className="w-5 h-5 text-violet-400" />
                  <h3 className="font-semibold text-white">Business Hours</h3>
                </div>
                <div className="space-y-3">
                  {businessHours.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-white/60">{item.day}</span>
                      <span className="text-white font-medium">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="font-semibold text-white mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3 }}
                      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-violet-500/30 hover:bg-violet-500/10 transition-all"
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Trust Badge */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-violet-600/20 to-cyan-600/20 border border-violet-500/20">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white mb-1">B-BBEE Level 1</p>
                    <p className="text-sm text-white/60">
                      100% black-owned. Maximum procurement recognition for your business.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
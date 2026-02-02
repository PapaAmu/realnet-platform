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
  FaSignInAlt,
  FaPhone,
  FaMapMarkerAlt
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      console.log("Subscribed email:", email);
    }
  };

  const handleAdminLogin = () => {
    window.open("https://admin.realnet-web.co.za", "_blank");
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const footerLinks = {
    resources: [
      { label: "Support", href: "/contact-us" },
      { label: "POPIA", href: "/popia-act" },
      { label: "Admin Login", href: "#", onClick: handleAdminLogin, icon: FaSignInAlt },
    ],
    quotes: [
      { label: "Starter Website", href: "/solutions/web-development/starter-website-quote-request" },
      { label: "Ecommerce", href: "/solutions/web-development/e-commerce-quote-request" },
      { label: "Custom Dev", href: "/solutions/web-development/custom-website-quote-request" },
    ],
    explore: [
      { label: "Web Development", href: "/solutions/web-development" },
      { label: "Mobile Apps", href: "/solutions/mobile-app-development" },
      { label: "Software", href: "/solutions/software-development" },
      { label: "Hosting", href: "/solutions/email-and-hosting" },
    ],
    company: [
      { label: "About", href: "/about-us" },
      { label: "Projects", href: "/projects" },
      { label: "Contact", href: "/contact-us" },
      { label: "Resources", href: "/resources" },
    ]
  };

  const socialLinks = [
    { icon: FaInstagram, href: "https://www.instagram.com/realnet_web/", label: "Instagram" },
    { icon: FaFacebook, href: "https://web.facebook.com/profile.php?id=61565067420433", label: "Facebook" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/company/realnet-web-solutions-pty", label: "LinkedIn" },
    { icon: FaGithub, href: "https://github.com/PapaAmu", label: "GitHub" },
  ];

  return (
    <footer className="relative bg-[#050505] dark:bg-[#050505] overflow-hidden">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
      
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        
        {/* Top Section - Newsletter & Info */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Newsletter */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Stay <span className="text-violet-400">Updated</span>
            </h3>
            <p className="text-white/50 mb-8 max-w-md">
              Get exclusive web development tips, industry insights, and special offers delivered to your inbox.
            </p>
            
            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 px-6 py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-medium">Thanks for subscribing! Check your inbox.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-sm">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="lg:text-right"
          >
            <div className="inline-flex flex-col items-start lg:items-end gap-6">
              <div className="flex items-center gap-3 text-white/60">
                <FaMapMarkerAlt className="w-5 h-5 text-violet-400" />
                <span>Matsau Str, Midrand, South Africa</span>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <FaPhone className="w-5 h-5 text-violet-400" />
                <span>+27 (0) 64 038 8883 | +27 (0) 71 002 0008</span>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <FaEnvelope className="w-5 h-5 text-violet-400" />
                <span>lukhele@realnet-web.co.za</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Links Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-20"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div key={category} variants={fadeIn}>
              <h4 className="text-white font-semibold mb-6 uppercase text-sm tracking-wider">
                {category}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.onClick ? (
                      <button
                        onClick={link.onClick}
                        className="group flex items-center gap-2 text-white/50 hover:text-violet-400 transition-colors text-sm"
                      >
                        {link.icon && <link.icon className="w-4 h-4" />}
                        <span className="group-hover:translate-x-1 transition-transform">
                          {link.label}
                        </span>
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="group inline-flex items-center gap-2 text-white/50 hover:text-violet-400 transition-colors text-sm"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">
                          {link.label}
                        </span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          {/* Logo & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <img src="/logo.png" alt="" />            </div>
            <div>
              <p className="text-white/80 font-medium">RealNet Web Solutions (PTY)LTD</p>
              <p className="text-white/40 text-sm">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-white/30 text-sm italic text-center">
            "Empowering Businesses with Dignity & Digital Excellence"
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-violet-400 hover:border-violet-500/30 transition-all"
                whileHover={{ y: -2 }}
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
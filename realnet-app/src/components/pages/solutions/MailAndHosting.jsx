"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { 
  FaEnvelope, 
  FaServer, 
  FaShieldAlt, 
  FaCheck,
  FaArrowRight,
  FaHeadset,
  FaSync,
  FaLock,
  FaGlobe,
  FaRocket
} from "react-icons/fa";

const HostingAndEmail = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const emailFeatures = [
    {
      icon: FaEnvelope,
      title: "Professional Email",
      description: "you@yourcompany.co.za addresses that build trust with customers and partners."
    },
    {
      icon: FaSync,
      title: "Anywhere Access",
      description: "Webmail, mobile, and desktop sync. Access your email from any device, anywhere."
    },
    {
      icon: FaShieldAlt,
      title: "Advanced Security",
      description: "Spam filtering, virus protection, and encrypted connections keep your communications safe."
    },
    {
      icon: FaHeadset,
      title: "Local Support",
      description: "South African support team that understands your business needs."
    }
  ];

  const vpsFeatures = [
    {
      icon: FaServer,
      title: "Managed VPS Hosting",
      description: "We handle server setup, security patches, monitoring, and maintenance so you don't have to."
    },
    {
      icon: FaRocket,
      title: "Fast Performance",
      description: "SSD storage and optimized configurations for quick loading times."
    },
    {
      icon: FaLock,
      title: "Secure & Reliable",
      description: "Firewall protection, automated backups, and 99.9% uptime guarantee."
    },
    {
      icon: FaGlobe,
      title: "South African Servers",
      description: "Low latency for local visitors with data centers in Johannesburg."
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 lg:pt-0">
        <motion.div className="absolute inset-0 z-0" style={{ opacity: heroOpacity }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(139,92,246,0.15),transparent_50%)]" />
          <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div style={{ y: heroY, opacity: heroOpacity }} className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-primary-400">
                  <FaServer className="w-4 h-4" />
                  Managed Services
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 lg:mb-8 leading-tight"
              >
                Email & VPS
                <br />
                <span className="text-primary-400">Hosting</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg lg:text-xl text-white/50 leading-relaxed mb-8 lg:mb-10 max-w-lg"
              >
                Professional business email and managed VPS hosting for South African businesses. 
                We handle the technical details so you can focus on your business.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/new-project/request-quotation"
                  className="inline-flex items-center justify-center gap-2 px-6 lg:px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors text-sm lg:text-base"
                >
                  Get Started <FaArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 px-6 lg:px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-medium hover:bg-white/10 transition-colors text-sm lg:text-base"
                >
                  Contact Sales
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative aspect-square max-w-lg mx-auto rounded-2xl bg-white/5 border border-white/10 p-6 lg:p-8">
                <div className="h-full flex flex-col justify-center gap-6">
                  {/* Email Card */}
                  <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center">
                        <FaEnvelope className="w-6 h-6 text-primary-400" />
                      </div>
                      <div>
                        <div className="text-sm text-white/40">Business Email</div>
                        <div className="text-lg font-semibold">From R100/month</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/50">
                      <FaCheck className="w-4 h-4 text-emerald-400" />
                      <span>Up to 7 email accounts</span>
                    </div>
                  </div>

                  {/* VPS Card */}
                  <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                        <FaServer className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <div className="text-sm text-white/40">Managed VPS</div>
                        <div className="text-lg font-semibold">From R150/month</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/50">
                      <FaCheck className="w-4 h-4 text-emerald-400" />
                      <span>Perfect for basic apps</span>
                    </div>
                  </div>
                </div>
                
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-xs"
                >
                  <span className="text-emerald-400">●</span> Available Now
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Email Hosting Section */}
      <section ref={containerRef} className="py-16 sm:py-20 lg:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-primary-400 mb-6">
                <FaEnvelope className="w-4 h-4" />
                Professional Email
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Business Email
                <br />
                <span className="text-primary-400">That Builds Trust</span>
              </h2>
              <p className="text-white/50 text-base sm:text-lg mb-8 leading-relaxed">
                Stop using free email addresses for business. Professional email 
                at your own domain shows customers you mean business.
              </p>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid sm:grid-cols-2 gap-4 mb-8"
              >
                {emailFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center shrink-0">
                      <feature.icon className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-sm">{feature.title}</h4>
                      <p className="text-white/40 text-xs leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-white/40 mb-1">Starting at</div>
                    <div className="text-3xl font-bold text-white">R100<span className="text-lg text-white/40">/month</span></div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/40 mb-1">Includes</div>
                    <div className="text-primary-400 font-medium">Up to 7 accounts</div>
                  </div>
                </div>
                <Link
                  href="/new-project/request-quotation"
                  className="block w-full py-3 rounded-xl bg-white text-black text-center font-medium hover:bg-white/90 transition-colors text-sm"
                >
                  Order Email Hosting
                </Link>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 sm:p-8 overflow-hidden">
                {/* Email Interface Mockup */}
                <div className="h-full flex flex-col bg-white/[0.03] rounded-xl overflow-hidden">
                  <div className="h-12 bg-white/5 flex items-center px-4 gap-4 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex-1 p-4 space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                      <div className="w-8 h-8 rounded-full bg-primary-500/20" />
                      <div className="flex-1">
                        <div className="h-2 w-32 bg-white/20 rounded mb-1" />
                        <div className="h-1.5 w-48 bg-white/10 rounded" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                      <div className="w-8 h-8 rounded-full bg-cyan-500/20" />
                      <div className="flex-1">
                        <div className="h-2 w-28 bg-white/20 rounded mb-1" />
                        <div className="h-1.5 w-40 bg-white/10 rounded" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-primary-500/10 border border-primary-500/20">
                      <div className="w-8 h-8 rounded-full bg-primary-500/30" />
                      <div className="flex-1">
                        <div className="h-2 w-36 bg-primary-200/30 rounded mb-1" />
                        <div className="h-1.5 w-44 bg-primary-200/20 rounded" />
                      </div>
                      <div className="w-2 h-2 rounded-full bg-primary-400" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VPS Hosting Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-2 lg:order-1 relative"
            >
              <div className="aspect-[4/3] rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 sm:p-8 overflow-hidden">
                {/* Server Visualization */}
                <div className="h-full flex flex-col justify-center gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                        <FaServer className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-24 bg-white/10 rounded mb-2" />
                        <div className="flex gap-2">
                          <div className="w-12 h-1 bg-emerald-500/30 rounded-full" />
                          <div className="w-8 h-1 bg-emerald-500/50 rounded-full" />
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <div className="w-2 h-2 rounded-full bg-emerald-400/50" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-cyan-400 mb-6">
                <FaServer className="w-4 h-4" />
                Managed VPS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Managed VPS
                <br />
                <span className="text-cyan-400">For Your Apps</span>
              </h2>
              <p className="text-white/50 text-base sm:text-lg mb-8 leading-relaxed">
                Virtual private servers with full management included. We handle setup, 
                security, updates, and monitoring—you just deploy your application.
              </p>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid sm:grid-cols-2 gap-4 mb-8"
              >
                {vpsFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                      <feature.icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-sm">{feature.title}</h4>
                      <p className="text-white/40 text-xs leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-white/40 mb-1">Starting at</div>
                    <div className="text-3xl font-bold text-white">R150<span className="text-lg text-white/40">/month</span></div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/40 mb-1">Best for</div>
                    <div className="text-cyan-400 font-medium">Basic applications</div>
                  </div>
                </div>
                <Link
                  href="/new-project/request-quotation"
                  className="block w-full py-3 rounded-xl bg-white text-black text-center font-medium hover:bg-white/90 transition-colors text-sm"
                >
                  Order VPS Hosting
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Need Both?</h2>
            <p className="text-white/50 mb-8">
              Combine email and VPS hosting for a complete business infrastructure solution.
            </p>
            <Link
              href="/new-project/request-quotation"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors"
            >
              Get Custom Quote <FaArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Simple Footer Info */}
      <section className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/40">
            <div className="flex items-center gap-2">
              <FaShieldAlt className="w-4 h-4 text-primary-400" />
              <span>99.9% Uptime SLA</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <FaHeadset className="w-4 h-4 text-primary-400" />
              <span>Local South African Support</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <FaLock className="w-4 h-4 text-primary-400" />
              <span>Secure & Reliable</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HostingAndEmail;
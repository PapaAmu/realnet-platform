"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { 
  FaArrowRight,
  FaCheck,
  FaApple,
  FaAndroid,
  FaMobileAlt,
  FaSync,
  FaRocket,
  FaClock
} from "react-icons/fa";
import { SiReact, SiSwift, SiKotlin, SiFlutter } from "react-icons/si";

const MobileAppDevelopment = () => {
  const heroRef = useRef(null);
  const containerRef = useRef(null);
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

  const approaches = [
    {
      type: "Cross-Platform",
      tagline: "Build Once. Run Everywhere.",
      description: "Single codebase for iOS and Android. Faster development, lower costs, consistent experience.",
      technologies: ["React Native", "Flutter"],
      bestFor: "Startups, MVPs, content-driven apps",
      icon: FaSync,
      color: "primary"
    },
    {
      type: "Native Development",
      tagline: "Maximum Performance. Platform Perfect.",
      description: "Platform-specific code for ultimate performance, deep OS integration, and premium user experience.",
      technologies: ["Swift (iOS)", "Kotlin (Android)"],
      bestFor: "High-performance apps, games, complex features",
      icon: FaMobileAlt,
      color: "blue"
    }
  ];

  const services = [
    {
      title: "Strategy & Discovery",
      description: "We validate your concept, define features, and create a technical roadmap aligned with your business goals.",
      features: ["Market research", "Competitor analysis", "Feature prioritization", "Technical architecture"]
    },
    {
      title: "UI/UX Design",
      description: "Intuitive interfaces designed for mobile contexts, following platform guidelines while expressing your brand.",
      features: ["User flows", "Wireframing", "Visual design", "Prototyping"]
    },
    {
      title: "Development & Testing",
      description: "Clean, scalable code with rigorous QA across devices, screen sizes, and real-world conditions.",
      features: ["Agile sprints", "Automated testing", "Performance optimization", "Security audits"]
    },
    {
      title: "Launch & Growth",
      description: "App store submission, analytics setup, and ongoing iteration based on user feedback and metrics.",
      features: ["Store optimization", "Analytics integration", "User feedback loops", "Feature updates"]
    }
  ];

  const process = [
    { step: "01", title: "Discovery", desc: "Define scope, audience, and success metrics." },
    { step: "02", title: "Design", desc: "Create intuitive interfaces and user flows." },
    { step: "03", title: "Develop", desc: "Build with clean, scalable architecture." },
    { step: "04", title: "Test", desc: "Rigorous QA across devices and scenarios." },
    { step: "05", title: "Launch", desc: "Deploy to App Store and Google Play." },
    { step: "06", title: "Scale", desc: "Iterate based on data and user feedback." }
  ];

  const packages = [
    {
      name: "MVP",
      price: "R45,000",
      description: "Validate your idea quickly",
      features: ["Cross-platform", "Core features", "Basic UI/UX", "App store submission"],
      timeline: "4-6 weeks",
      bestFor: "Startups, proof of concept"
    },
    {
      name: "Professional",
      price: "R85,000",
      description: "Feature-rich production app",
      features: ["Cross-platform or native", "Custom UI/UX", "Backend integration", "Analytics & push notifications", "6 months support"],
      timeline: "8-12 weeks",
      bestFor: "Growing businesses",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Complex, scalable solutions",
      features: ["Native iOS + Android", "Advanced security", "Custom backend", "Third-party integrations", "Dedicated support"],
      timeline: "12+ weeks",
      bestFor: "Large organizations"
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
                  <FaRocket className="w-4 h-4" />
                  Mobile App Development
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 lg:mb-8 leading-tight"
              >
                Native & Cross-Platform
                <br />
                <span className="text-primary-400">Apps That Scale</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg lg:text-xl text-white/50 leading-relaxed mb-8 lg:mb-10 max-w-lg"
              >
                From concept to App Store. We build high-performance mobile applications 
                for iOS and Android—whether you need rapid cross-platform delivery 
                or native-grade performance.
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
                  Discuss Your App <FaArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/features/web-development/live-projects"
                  className="inline-flex items-center justify-center gap-2 px-6 lg:px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-medium hover:bg-white/10 transition-colors text-sm lg:text-base"
                >
                  View Case Studies
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
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10 p-6 lg:p-8">
                <div className="flex items-center justify-center h-full gap-3 sm:gap-4">
                  {/* iPhone Mockup */}
                  <div className="w-32 sm:w-40 lg:w-48 h-64 sm:h-80 lg:h-96 bg-gray-900 rounded-[2rem] sm:rounded-[2.5rem] border-4 border-gray-800 p-2 shadow-2xl">
                    <div className="w-full h-full bg-[#0a0a0a] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-4 sm:h-5 bg-gray-800 rounded-b-xl" />
                      <div className="p-3 sm:p-4 pt-6 sm:pt-8">
                        <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-primary-500/20 mb-3 sm:mb-4" />
                        <div className="h-2 w-16 sm:w-24 bg-white/10 rounded mb-2" />
                        <div className="h-2 w-10 sm:w-16 bg-white/10 rounded" />
                      </div>
                    </div>
                  </div>
                  {/* Android Mockup */}
                  <div className="w-32 sm:w-40 lg:w-48 h-64 sm:h-80 lg:h-96 bg-gray-800 rounded-[1.5rem] sm:rounded-[2rem] border-4 border-gray-700 p-2 shadow-2xl mt-4 sm:mt-6 lg:mt-8">
                    <div className="w-full h-full bg-[#0a0a0a] rounded-[1.25rem] sm:rounded-[1.5rem] overflow-hidden relative">
                      <div className="p-3 sm:p-4">
                        <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-blue-500/20 mb-3 sm:mb-4" />
                        <div className="h-2 w-16 sm:w-24 bg-white/10 rounded mb-2" />
                        <div className="h-2 w-10 sm:w-16 bg-white/10 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-4 sm:top-8 left-4 sm:left-8 px-3 sm:px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20"
                >
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <FaApple className="w-4 h-4" />
                    <span>iOS Native</span>
                  </div>
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                  className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 px-3 sm:px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20"
                >
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <FaAndroid className="w-4 h-4" />
                    <span>Android Native</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Development Approaches */}
      <section ref={containerRef} className="py-16 sm:py-20 lg:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Choose Your Approach</h2>
            <p className="text-white/50 text-sm sm:text-base">Two proven paths to mobile success. We help you select the right strategy for your goals.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 gap-6 lg:gap-8"
          >
            {approaches.map((approach, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <approach.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-400" />
                </div>
                
                <div className="text-xs sm:text-sm text-primary-400 font-medium mb-2">{approach.type}</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{approach.tagline}</h3>
                <p className="text-white/50 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">{approach.description}</p>
                
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Technologies</div>
                    <div className="flex flex-wrap gap-2">
                      {approach.technologies.map((tech, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-white/5 text-xs sm:text-sm text-white/70">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Best For</div>
                    <p className="text-xs sm:text-sm text-white/60">{approach.bestFor}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Full-Cycle Development</h2>
            <p className="text-white/50 text-sm sm:text-base">Everything you need to transform your idea into a successful mobile product.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-5 sm:p-6 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-primary-500/30 transition-all duration-300"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0">
                    <span className="text-primary-400 font-bold text-sm sm:text-base">0{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-white/50 mb-3 sm:mb-4 text-sm leading-relaxed">{service.description}</p>
                    <div className="flex flex-wrap gap-2 sm:gap-x-4 sm:gap-y-2">
                      {service.features.map((feature, i) => (
                        <span key={i} className="flex items-center gap-1 text-xs text-white/40">
                          <FaCheck className="w-3 h-3 text-primary-400 shrink-0" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">How We Work</h2>
            <p className="text-white/50 text-sm sm:text-base">A proven process from first conversation to App Store launch.</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10" />
            
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-start gap-4 sm:gap-8 mb-8 sm:mb-12 last:mb-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary-500 ring-2 sm:ring-4 ring-[#050505]" />
                
                <div className={`ml-10 sm:ml-12 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-8 md:text-right lg:pr-12' : 'md:pl-8 lg:pl-12'
                }`}>
                  <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-primary-500/10 text-primary-400 text-xs font-medium mb-2">
                    Step {item.step}
                  </span>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-white/50 text-xs sm:text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Investment</h2>
            <p className="text-white/50 text-sm sm:text-base">Transparent pricing based on scope and complexity. No hidden fees.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`relative p-5 sm:p-6 lg:p-8 rounded-2xl border transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-white text-black border-white'
                    : 'bg-white/[0.02] border-white/[0.06] hover:border-white/20'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-4 sm:mb-6">
                  <h3 className={`text-sm sm:text-base font-medium mb-1 sm:mb-2 ${pkg.popular ? 'text-black/60' : 'text-white/60'}`}>
                    {pkg.name}
                  </h3>
                  <div className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 ${pkg.popular ? 'text-black' : 'text-white'}`}>
                    {pkg.price}
                  </div>
                  <p className={`text-xs sm:text-sm ${pkg.popular ? 'text-black/60' : 'text-white/40'}`}>
                    {pkg.description}
                  </p>
                </div>

                <div className={`inline-flex items-center gap-2 px-2 sm:px-3 py-1 rounded-full text-xs mb-4 sm:mb-6 ${
                  pkg.popular ? 'bg-black/5' : 'bg-white/5'
                }`}>
                  <FaClock className="w-3 h-3" />
                  {pkg.timeline}
                </div>

                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
                      <FaCheck className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 mt-0.5 ${pkg.popular ? 'text-primary-600' : 'text-primary-400'}`} />
                      <span className={pkg.popular ? 'text-black/70' : 'text-white/70'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className={`text-xs mb-4 sm:mb-6 ${pkg.popular ? 'text-black/50' : 'text-white/40'}`}>
                  Best for: {pkg.bestFor}
                </div>

                <Link
                  href={pkg.price === "Custom" ? "/contact-us" : "/new-project/request-quotation"}
                  className={`block w-full py-3 rounded-xl text-center font-medium text-sm transition-colors ${
                    pkg.popular
                      ? 'bg-black text-white hover:bg-black/80'
                      : 'bg-white text-black hover:bg-white/90'
                  }`}
                >
                  {pkg.price === "Custom" ? "Contact Us" : "Get Started"}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Technologies We Use</h2>
            <p className="text-white/50 text-sm sm:text-base">Modern, proven tools for reliable, scalable apps.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6"
          >
            {[
              { icon: SiReact, name: "React Native", color: "text-cyan-400" },
              { icon: SiFlutter, name: "Flutter", color: "text-blue-400" },
              { icon: SiSwift, name: "Swift", color: "text-orange-400" },
              { icon: SiKotlin, name: "Kotlin", color: "text-purple-400" },
              { icon: FaApple, name: "iOS SDK", color: "text-white" },
              { icon: FaAndroid, name: "Android SDK", color: "text-green-400" }
            ].map((tech, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] w-24 sm:w-28 lg:w-32"
              >
                <tech.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${tech.color}`} />
                <span className="text-xs sm:text-sm text-white/70 text-center">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 lg:py-24 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
            Ready to launch your <span className="text-primary-400">mobile app</span>?
          </h2>
          <p className="text-base sm:text-lg text-white/50 mb-6 sm:mb-8 px-4 sm:px-0">
            Let's discuss whether cross-platform or native development is right for your product.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/new-project/request-quotation"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors text-sm sm:text-base"
            >
              Book Free Consultation <FaArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/5 text-white border border-white/10 rounded-full font-medium hover:bg-white/10 transition-colors text-sm sm:text-base"
            >
              View Our Process
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MobileAppDevelopment;
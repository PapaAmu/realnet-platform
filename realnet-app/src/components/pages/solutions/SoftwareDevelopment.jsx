"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { 
  FaCode, 
  FaCloud, 
  FaServer, 
  FaDatabase, 
  FaUsers, 
  FaLock, 
  FaRocket,
  FaCogs,
  FaLayerGroup,
  FaNetworkWired,
  FaShieldAlt,
  FaSync,
  FaArrowRight,
  FaCheck,
  FaBuilding,
  FaGlobe,
  FaChartLine
} from "react-icons/fa";

const WebSoftware = () => {
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

  const capabilities = [
    {
      icon: FaCloud,
      title: "SaaS Architecture",
      description: "Multi-tenant cloud applications with scalable infrastructure, automated provisioning, and tenant isolation.",
      features: ["Tenant isolation", "Auto-scaling", "Zero-downtime deployments"]
    },
    {
      icon: FaLayerGroup,
      title: "Enterprise Systems",
      description: "Sophisticated business platforms handling complex workflows, integrations, and high-volume transactions.",
      features: ["Microservices", "Event-driven", "API-first design"]
    },
    {
      icon: FaNetworkWired,
      title: "Multi-Tenancy",
      description: "Secure, isolated environments for multiple organizations with shared infrastructure and custom configurations.",
      features: ["Data isolation", "Custom branding", "Role-based access"]
    },
    {
      icon: FaServer,
      title: "Cloud Infrastructure",
      description: "AWS, Azure, and Google Cloud solutions with containerization, orchestration, and serverless architectures.",
      features: ["Kubernetes", "Docker", "CI/CD pipelines"]
    },
    {
      icon: FaDatabase,
      title: "Data Architecture",
      description: "High-performance database design, data warehousing, and real-time analytics for business intelligence.",
      features: ["PostgreSQL", "MongoDB", "Redis caching"]
    },
    {
      icon: FaLock,
      title: "Security & Compliance",
      description: "Enterprise-grade security, encryption, and compliance frameworks for sensitive business data.",
      features: ["SOC 2", "GDPR/POPIA", "End-to-end encryption"]
    }
  ];

  const solutions = [
    {
      category: "Business Management",
      title: "ERP & Operations Platforms",
      description: "Integrated systems for inventory, finance, HR, and operations. Custom workflows that match your business processes.",
      icon: FaBuilding
    },
    {
      category: "Customer Solutions",
      title: "CRM & Service Platforms",
      description: "Customer relationship management, support ticketing, and service delivery systems with automation.",
      icon: FaUsers
    },
    {
      category: "Industry Specific",
      title: "Vertical SaaS Solutions",
      description: "Specialized platforms for logistics, healthcare, finance, retail, and manufacturing sectors.",
      icon: FaCogs
    },
    {
      category: "Integration Hubs",
      title: "API & Integration Layers",
      description: "Connect disparate systems, third-party services, and legacy infrastructure into unified platforms.",
      icon: FaNetworkWired
    }
  ];

  const architectureFeatures = [
    {
      title: "Scalable by Design",
      description: "Horizontal scaling, load balancing, and auto-scaling groups handle traffic spikes without degradation."
    },
    {
      title: "High Availability",
      description: "Multi-region deployments, redundant systems, and automated failover ensure 99.9% uptime."
    },
    {
      title: "Security First",
      description: "Zero-trust architecture, encrypted communications, and comprehensive audit logging."
    },
    {
      title: "API Ecosystem",
      description: "RESTful and GraphQL APIs with comprehensive documentation for third-party integrations."
    }
  ];

  const processSteps = [
    { step: "01", title: "Discovery", desc: "Deep-dive into your business requirements, existing systems, and growth objectives." },
    { step: "02", title: "Architecture", desc: "Design scalable, secure system architecture with technology stack recommendations." },
    { step: "03", title: "Development", desc: "Agile sprints with continuous integration, automated testing, and regular demos." },
    { step: "04", title: "Deployment", desc: "Production deployment with monitoring, logging, and performance optimization." },
    { step: "05", title: "Evolution", desc: "Continuous improvement, feature expansion, and infrastructure scaling." }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 lg:pt-0">
        <motion.div className="absolute inset-0 z-0" style={{ opacity: heroOpacity }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(139,92,246,0.15),transparent_50%)]" />
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
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-violet-400">
                  <FaRocket className="w-4 h-4" />
                  Enterprise Software Development
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 lg:mb-8 leading-tight"
              >
                Sophisticated
                <br />
                <span className="text-violet-400">Business Systems</span>
                <br />
                That Scale
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg lg:text-xl text-white/50 leading-relaxed mb-8 lg:mb-10 max-w-lg"
              >
                We architect and build enterprise-grade SaaS platforms, multi-tenant cloud solutions, 
                and complex business systems for organizations that demand reliability, security, and scale.
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
                  Discuss Your Project <FaArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/solutions/software-development/architecture-consultation"
                  className="inline-flex items-center justify-center gap-2 px-6 lg:px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-medium hover:bg-white/10 transition-colors text-sm lg:text-base"
                >
                  Architecture Review
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero Visual - System Architecture */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative aspect-square max-w-lg mx-auto rounded-2xl overflow-hidden bg-white/5 border border-white/10 p-6 lg:p-8">
                {/* Architecture Diagram Visualization */}
                <div className="relative h-full flex flex-col justify-center gap-4">
                  {/* Client Layer */}
                  <div className="flex justify-center gap-4">
                    <div className="px-4 py-2 rounded-lg bg-violet-500/20 border border-violet-500/30 text-sm text-violet-300">
                      Web App
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-violet-500/20 border border-violet-500/30 text-sm text-violet-300">
                      Mobile
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-violet-500/20 border border-violet-500/30 text-sm text-violet-300">
                      API Clients
                    </div>
                  </div>
                  
                  {/* Connection */}
                  <div className="h-8 w-px bg-gradient-to-b from-violet-500/50 to-cyan-500/50 mx-auto" />
                  
                  {/* Gateway Layer */}
                  <div className="px-6 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-center">
                    <div className="text-sm text-cyan-300 font-medium">API Gateway & Load Balancer</div>
                  </div>
                  
                  {/* Connection */}
                  <div className="h-8 w-px bg-gradient-to-b from-cyan-500/50 to-emerald-500/50 mx-auto" />
                  
                  {/* Service Layer */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-center">
                      <div className="text-xs text-emerald-300">Auth Service</div>
                    </div>
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-center">
                      <div className="text-xs text-emerald-300">Core API</div>
                    </div>
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-center">
                      <div className="text-xs text-emerald-300">Workers</div>
                    </div>
                  </div>
                  
                  {/* Connection */}
                  <div className="h-8 w-px bg-gradient-to-b from-emerald-500/50 to-orange-500/50 mx-auto" />
                  
                  {/* Data Layer */}
                  <div className="flex justify-center gap-4">
                    <div className="px-4 py-2 rounded-lg bg-orange-500/10 border border-orange-500/30 text-sm text-orange-300">
                      PostgreSQL
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-orange-500/10 border border-orange-500/30 text-sm text-orange-300">
                      Redis
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-orange-500/10 border border-orange-500/30 text-sm text-orange-300">
                      S3 Storage
                    </div>
                  </div>
                </div>
                
                {/* Floating Labels */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs"
                >
                  <span className="text-emerald-400">●</span> Multi-Tenant
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                  className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs"
                >
                  <span className="text-violet-400">●</span> Auto-Scaling
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section ref={containerRef} className="py-16 sm:py-20 lg:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-violet-400 mb-6">
              <FaCogs className="w-4 h-4" />
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
              Enterprise-Grade
              <br />
              <span className="text-violet-400">System Architecture</span>
            </h2>
            <p className="text-white/50 text-base sm:text-lg">
              We design and build sophisticated platforms that handle complex business logic, 
              high concurrency, and sensitive data at scale.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {capabilities.map((cap, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/30 transition-all duration-500"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <cap.icon className="w-6 h-6 sm:w-7 sm:h-7 text-violet-400" />
                </div>
                
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{cap.title}</h3>
                <p className="text-white/50 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">{cap.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {cap.features.map((feature, i) => (
                    <span key={i} className="flex items-center gap-1.5 text-xs text-white/40">
                      <FaCheck className="w-3 h-3 text-violet-400" />
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solution Types */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Systems We Build</h2>
            <p className="text-white/50 text-sm sm:text-base">
              Tailored solutions for complex operational challenges across industries.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {solutions.map((sol, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/30 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="text-xs text-violet-400 font-medium uppercase tracking-wider mb-3">
                  {sol.category}
                </div>
                <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mb-4">
                  <sol.icon className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{sol.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {sol.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Architecture Features */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-violet-400 mb-6">
                <FaServer className="w-4 h-4" />
                Technical Excellence
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Built for
                <br />
                <span className="text-violet-400">Reliability & Scale</span>
              </h2>
              <p className="text-white/50 text-base sm:text-lg mb-8 leading-relaxed">
                Every system we architect is designed with growth in mind. From day one, 
                your platform can handle expansion without rebuilding.
              </p>
              
              <div className="space-y-4 sm:space-y-6">
                {architectureFeatures.map((feat, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
                      <FaCheck className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm sm:text-base">{feat.title}</h4>
                      <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{feat.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 sm:p-8 overflow-hidden">
                {/* Abstract Infrastructure Visualization */}
                <div className="h-full flex flex-col justify-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-12 rounded-lg bg-violet-500/10 border border-violet-500/30 flex items-center px-4">
                      <div className="w-3 h-3 rounded-full bg-violet-400 mr-3 animate-pulse" />
                      <span className="text-sm text-violet-300">Load Balancer</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-20 sm:h-24 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex flex-col items-center justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                        <span className="text-xs text-cyan-300">Node {i}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center px-4">
                      <div className="w-3 h-3 rounded-full bg-emerald-400 mr-3" />
                      <span className="text-sm text-emerald-300">Primary DB</span>
                    </div>
                    <div className="flex-1 h-12 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center px-4">
                      <div className="w-3 h-3 rounded-full bg-orange-400 mr-3" />
                      <span className="text-sm text-orange-300">Replica</span>
                    </div>
                  </div>
                </div>
                
                {/* Glow Effect */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How We Work</h2>
            <p className="text-white/50 text-sm sm:text-base">
              A proven methodology for delivering complex systems on time and within budget.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10" />
            
            {processSteps.map((item, index) => (
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
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-violet-500 ring-2 sm:ring-4 ring-[#050505]" />
                
                <div className={`ml-10 sm:ml-12 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-8 md:text-right lg:pr-12' : 'md:pl-8 lg:pl-12'
                }`}>
                  <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-medium mb-2">
                    {item.step}
                  </span>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Ready to Build Your
              <br />
              <span className="text-violet-400">Business Platform?</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/50 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how we can architect a scalable, secure system that transforms 
              your operations and drives growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/new-project/request-quotation"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors text-sm sm:text-base"
              >
                Schedule Architecture Call <FaArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/5 text-white border border-white/10 rounded-full font-medium hover:bg-white/10 transition-colors text-sm sm:text-base"
              >
                View System Designs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom Info */}
      <section className="py-12 sm:py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FaGlobe className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
              </div>
              <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Cloud-Native</h4>
              <p className="text-white/40 text-xs sm:text-sm">AWS, Azure, Google Cloud</p>
            </div>
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FaShieldAlt className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
              </div>
              <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Enterprise Security</h4>
              <p className="text-white/40 text-xs sm:text-sm">SOC 2, ISO 27001 Ready</p>
            </div>
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FaChartLine className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
              </div>
              <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Performance Optimized</h4>
              <p className="text-white/40 text-xs sm:text-sm">Sub-100ms Response Times</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebSoftware;
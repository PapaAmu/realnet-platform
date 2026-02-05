"use client";

import React, { useRef } from "react";
import { useRouter } from 'next/navigation';
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "../../ui/PrimaryButton";
import SecondaryButton from "../../ui/SecondaryButton";
import { 
  FaUsers, 
  FaLightbulb, 
  FaHandshake, 
  FaRocket, 
  FaCode, 
  FaMobile, 
  FaGlobe, 
  FaAward,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaCheckCircle,
  FaArrowRight,
  FaLinkedin,
  FaTwitter
} from "react-icons/fa";

const AboutUs = () => {
  const router = useRouter();
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const values = [
    {
      icon: FaLightbulb,
      title: "Innovation First",
      description: "We embrace emerging technologies to deliver solutions that keep our clients ahead of the curve."
    },
    {
      icon: FaHandshake,
      title: "True Partnership",
      description: "We don't just deliver projects; we build lasting relationships that drive continuous success."
    },
    {
      icon: FaRocket,
      title: "Scalable Growth",
      description: "Every solution is architected for scale, ensuring your technology grows with your business."
    },
    {
      icon: FaAward,
      title: "Excellence Always",
      description: "B-BBEE Level 1 certified, we maintain the highest standards in every aspect of our work."
    }
  ];

  const stats = [
    { number: "150+", label: "Projects Delivered", suffix: "" },
    { number: "50", label: "Active Clients", suffix: "+" },
    { number: "5", label: "Years Experience", suffix: "+" },
    { number: "98", label: "Client Retention", suffix: "%" }
  ];

  const team = [
    {
      name: "Leadership Team",
      role: "Strategic Direction",
      description: "Seasoned technology executives with 15+ years combined experience in enterprise software and digital transformation."
    },
    {
      name: "Development Team",
      role: "Engineering Excellence",
      description: "Full-stack engineers, mobile specialists, and cloud architects certified in modern frameworks and platforms."
    },
    {
      name: "Design Team",
      role: "User Experience",
      description: "UI/UX designers and brand strategists creating intuitive, accessible, and beautiful digital experiences."
    },
    {
      name: "Support Team",
      role: "Client Success",
      description: "Dedicated account managers and technical support ensuring seamless project delivery and ongoing maintenance."
    }
  ];

  const timeline = [
    { year: "2019", title: "Founded", description: "RealNet established in Pretoria with a vision to democratize enterprise technology." },
    { year: "2020", title: "First Major Client", description: "Partnered with leading South African enterprise, proving our enterprise capabilities." },
    { year: "2021", title: "Mobile Division", description: "Launched dedicated iOS and Android development division." },
    { year: "2022", title: "B-BBEE Level 1", description: "Achieved Level 1 B-BBEE certification, cementing our commitment to transformation." },
    { year: "2023", title: "National Expansion", description: "Expanded operations to serve clients across all nine provinces." },
    { year: "2024", title: "Innovation Hub", description: "Opened dedicated R&D facility focusing on AI and cloud-native solutions." }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-300">
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gray-900 dark:bg-black"
      >
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{ opacity: heroOpacity }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-900/40 via-transparent to-transparent" />
        </motion.div>

        <motion.div 
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/70 text-sm font-medium">
              <FaAward className="w-4 h-4 text-primary-400" />
              B-BBEE Level 1 Certified
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6"
          >
            Building Digital
            <br />
            <span className="text-primary-400">Excellence</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            A Pretoria-based technology partner helping South African businesses 
            transform, scale, and succeed in the digital economy.
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          </div>
        </motion.div>
      </section>

      {/* B-BBEE Banner */}
      <section className="py-8 bg-primary-600 dark:bg-primary-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <FaAward className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">B-BBEE Level 1 Contributor</h3>
                <p className="text-white/70 text-sm">135% procurement recognition • 100% black-owned</p>
              </div>
            </div>
            <PrimaryButton 
              onClick={() => router.push('/contact-us')}
              className="px-6 py-3 bg-white text-primary-600 font-medium hover:bg-white/90"
            >
              Partner With Us <FaArrowRight className="w-4 h-4" />
            </PrimaryButton>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={containerRef} className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-white/60 text-lg leading-relaxed">
                <p>
                  Founded in 2019 in Pretoria, <strong className="text-gray-900 dark:text-white">RealNet Web Solutions</strong> emerged from a simple belief: that South African businesses deserve world-class technology solutions delivered with local understanding and global standards.
                </p>
                <p>
                  What started as a small team of three passionate developers has grown into a full-service digital agency serving enterprises, SMEs, and government entities across all nine provinces. Our journey has been defined by continuous learning, unwavering quality, and deep commitment to our clients' success.
                </p>
                <p>
                  As a <strong className="text-gray-900 dark:text-white">100% black-owned, B-BBEE Level 1 certified</strong> company, we're proud contributors to South Africa's economic transformation while delivering technology that competes on the global stage.
                </p>
              </div>
              
              <div className="mt-8 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/10 border-2 border-white dark:border-[#050505] flex items-center justify-center text-sm font-medium text-gray-600 dark:text-white/60">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 dark:text-white/40">
                  Join our growing team of 12+ professionals
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-white/5 aspect-[4/3]">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-white/20">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-2xl bg-gray-200 dark:bg-white/10 mx-auto mb-4 flex items-center justify-center">
                      <FaGlobe className="w-12 h-12" />
                    </div>
                    <p className="text-sm">Team Photo Placeholder</p>
                  </div>
                </div>
                
                {/* Floating stats */}
                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-3">
                  <div className="bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">100%</div>
                    <div className="text-xs text-gray-600 dark:text-white/60">Black Owned</div>
                  </div>
                  <div className="bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">Level 1</div>
                    <div className="text-xs text-gray-600 dark:text-white/60">B-BBEE Status</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-gray-50 dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 dark:text-white/50 text-lg">
              Principles that guide every decision, every line of code, and every client interaction.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] hover:border-primary-500/30 dark:hover:border-primary-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-white/50 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06]"
              >
                <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}<span className="text-primary-600 dark:text-primary-400">{stat.suffix}</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-white/40 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Structure */}
      <section className="py-24 bg-gray-50 dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Team
            </h2>
            <p className="text-gray-600 dark:text-white/50 text-lg">
              A diverse group of experts united by a passion for technology and client success.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex gap-6 p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] hover:border-primary-500/30 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-500/10 flex items-center justify-center shrink-0">
                  <FaUsers className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-white/50 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-gray-600 dark:text-white/50 text-lg">
              Milestones that mark our growth and evolution.
            </p>
          </motion.div>

          <div className="relative">
            {/* Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-white/10" />

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-start gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary-600 dark:bg-primary-400 ring-4 ring-white dark:ring-[#050505]" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                }`}>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-medium mb-2">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-white/50 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-gray-50 dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What We Do
            </h2>
            <p className="text-gray-600 dark:text-white/50 text-lg">
              End-to-end digital solutions tailored to your business objectives.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { icon: FaGlobe, title: "Web Development", desc: "Custom websites, web applications, and e-commerce platforms built with modern technologies." },
              { icon: FaMobile, title: "Mobile Apps", desc: "Native iOS and Android applications with seamless user experiences and robust functionality." },
              { icon: FaCode, title: "Software Solutions", desc: "Enterprise-grade custom software, cloud solutions, and system integrations." }
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group p-8 rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-center hover:border-primary-500/30 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-500/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-white/50 leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Get In Touch
              </h2>
              <p className="text-gray-600 dark:text-white/50 mb-8">
                Ready to start your project? We'd love to hear from you. Reach out and let's discuss how we can help transform your business.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06]">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-500/10 flex items-center justify-center">
                    <FaMapMarkerAlt className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-white/40">Address</p>
                    <p className="text-gray-900 dark:text-white">Mashau Street, Ivory Park, Midrand, 1689</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06]">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-500/10 flex items-center justify-center">
                    <FaPhone className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-white/40">Phone</p>
                    <p className="text-gray-900 dark:text-white">+27 (0) 64 038 8883</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06]">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-500/10 flex items-center justify-center">
                    <FaEnvelope className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-white/40">Email</p>
                    <p className="text-gray-900 dark:text-white">lukhele@realnet-web.co.za</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06]">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-500/10 flex items-center justify-center">
                    <FaClock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-white/40">Hours</p>
                    <p className="text-gray-900 dark:text-white">Mon-Fri: 08:00 - 17:00</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <div className="p-8 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06]">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Why Choose RealNet?
                </h3>
                <ul className="space-y-3">
                  {[
                    "B-BBEE Level 1 certified for maximum procurement recognition",
                    "100% black-owned, contributing to economic transformation",
                    "Local presence with understanding of South African market",
                    "Enterprise-grade solutions at competitive rates",
                    "Dedicated support and long-term partnership approach"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-600 dark:text-white/60">
                      <FaCheckCircle className="w-5 h-5 text-primary-600 dark:text-primary-400 shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 flex gap-4">
                  <PrimaryButton
                    onClick={() => router.push('/contact-us')}
                    className="flex-1 py-3 font-medium text-center"
                  >
                    Contact Us
                  </PrimaryButton>
                  <SecondaryButton
                    onClick={() => router.push('/new-project/request-quotation')}
                    className="flex-1 py-3 font-medium text-center"
                  >
                    Get Quote
                  </SecondaryButton>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
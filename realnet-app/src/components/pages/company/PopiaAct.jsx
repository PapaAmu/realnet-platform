"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaShieldAlt, 
  FaLock, 
  FaUserCheck, 
  FaClipboardList,
  FaEye,
  FaDatabase,
  FaGlobe,
  FaChild,
  FaExclamationTriangle,
  FaFileContract,
  FaClock,
  FaEnvelope,
  FaPhone,
  FaChevronDown,
  FaCheckCircle
} from "react-icons/fa";
import Link from "next/link";

const POPIA = () => {
  const [activeSection, setActiveSection] = useState(null);

  const principles = [
    {
      icon: FaShieldAlt,
      title: "Accountability",
      description: "We take full responsibility for protecting your personal information and have appointed an Information Officer to ensure POPIA compliance.",
      details: "Our Information Officer oversees all data protection matters, conducts regular audits, and ensures staff training on privacy practices."
    },
    {
      icon: FaLock,
      title: "Processing Limitation",
      description: "We only process personal information for lawful purposes and in a manner that is adequate, relevant, and not excessive.",
      details: "Data minimization is practiced—we collect only what is necessary and retain it only for as long as legally required."
    },
    {
      icon: FaUserCheck,
      title: "Purpose Specification",
      description: "We collect personal information for specific, explicitly defined, and legitimate purposes related to our services.",
      details: "Before any data collection, we clearly state the purpose and obtain consent where required by law."
    },
    {
      icon: FaClipboardList,
      title: "Further Processing Limitation",
      description: "We do not use your personal information for purposes other than those originally specified without your consent.",
      details: "If new purposes arise, we notify affected individuals and obtain fresh consent before proceeding."
    },
    {
      icon: FaDatabase,
      title: "Information Quality",
      description: "We take reasonable steps to ensure personal information is complete, accurate, and not misleading.",
      details: "Regular data validation processes and easy correction mechanisms for data subjects."
    },
    {
      icon: FaEye,
      title: "Openness",
      description: "We maintain documentation of all processing operations and make privacy practices transparent.",
      details: "Our PAIA manual and privacy policy are publicly available, and we notify regulators of processing activities."
    },
    {
      icon: FaShieldAlt,
      title: "Security Safeguards",
      description: "We implement appropriate technical and organizational measures to protect personal information.",
      details: "Encryption, access controls, regular security assessments, and incident response protocols."
    },
    {
      icon: FaUserCheck,
      title: "Data Subject Participation",
      description: "We respect your rights to access, correct, and delete your personal information.",
      details: "Streamlined processes for handling data subject requests within statutory timeframes."
    }
  ];

  const policySections = [
    {
      id: "collection",
      title: "Information We Collect",
      icon: FaDatabase,
      content: [
        {
          subtitle: "Personal Information",
          text: "Name, email address, phone number, physical address, company details, job title, and identification numbers where legally required for contracts."
        },
        {
          subtitle: "Technical Information",
          text: "IP addresses, browser type and version, device identifiers, operating system, referral sources, and website interaction data."
        },
        {
          subtitle: "Project-Related Data",
          text: "Requirements documentation, design preferences, content materials, login credentials for development environments, and communication records."
        },
        {
          subtitle: "Financial Information",
          text: "Banking details for payments, VAT numbers for invoicing, and payment history. Note: We do not store complete credit card details."
        }
      ]
    },
    {
      id: "usage",
      title: "How We Use Your Information",
      icon: FaClipboardList,
      content: [
        {
          subtitle: "Service Delivery",
          text: "To provide web development, mobile application development, software solutions, and hosting services as contracted."
        },
        {
          subtitle: "Communication",
          text: "Project updates, technical support, appointment scheduling, and service-related notifications."
        },
        {
          subtitle: "Legal Compliance",
          text: "Tax obligations, regulatory reporting, dispute resolution, and compliance with South African law including POPIA and ECT Act."
        },
        {
          subtitle: "Business Improvement",
          text: "Analytics to improve our services, security monitoring, and aggregated statistical analysis."
        }
      ]
    },
    {
      id: "sharing",
      title: "Information Sharing & Disclosure",
      icon: FaGlobe,
      content: [
        {
          subtitle: "Third-Party Service Providers",
          text: "Hosting infrastructure (AWS, Azure), payment processors (PayFast, Stripe), email service providers, and analytics tools—all under strict data processing agreements."
        },
        {
          subtitle: "Legal Obligations",
          text: "Regulatory bodies (Information Regulator, SARS, CIPC), law enforcement when legally compelled, and courts of law."
        },
        {
          subtitle: "Business Transfers",
          text: "In case of merger, acquisition, or asset sale, with notification to affected data subjects and continued protection guarantees."
        },
        {
          subtitle: "International Transfers",
          text: "Limited transfers to EU (GDPR-compliant), USA (Privacy Shield or SCCs), and other jurisdictions with adequate protection levels as approved by the Information Regulator."
        }
      ]
    },
    {
      id: "rights",
      title: "Your Rights Under POPIA",
      icon: FaUserCheck,
      content: [
        {
          subtitle: "Right to Access (Section 23)",
          text: "Request confirmation of whether we hold your personal information and obtain a copy within a reasonable time."
        },
        {
          subtitle: "Right to Correction (Section 24)",
          text: "Request correction of inaccurate, misleading, or incomplete personal information."
        },
        {
          subtitle: "Right to Deletion (Section 24)",
          text: "Request destruction or deletion of personal information that is no longer necessary or unlawfully processed."
        },
        {
          subtitle: "Right to Object (Section 11)",
          text: "Object to processing for direct marketing purposes and automated decision-making."
        },
        {
          subtitle: "Right to Lodge Complaints",
          text: "File complaints with our Information Officer or directly with the Information Regulator of South Africa."
        }
      ]
    },
    {
      id: "security",
      title: "Security Measures",
      icon: FaLock,
      content: [
        {
          subtitle: "Technical Safeguards",
          text: "TLS 1.3 encryption for data in transit, AES-256 encryption for data at rest, multi-factor authentication, and regular penetration testing."
        },
        {
          subtitle: "Organizational Measures",
          text: "Role-based access control, confidentiality agreements, POPIA training for all staff, and clean desk policies."
        },
        {
          subtitle: "Physical Security",
          text: "Secure office premises, access control systems, and secure disposal of physical records."
        }
      ]
    },
    {
      id: "retention",
      title: "Data Retention & Deletion",
      icon: FaClock,
      content: [
        {
          subtitle: "Retention Periods",
          text: "Active client data: Duration of contract plus 5 years (tax compliance). Prospect data: 2 years of inactivity. Website analytics: 26 months."
        },
        {
          subtitle: "Secure Deletion",
          text: "Cryptographic erasure for encrypted data, physical destruction of storage media, and certified deletion certificates upon request."
        },
        {
          subtitle: "Archival Procedures",
          text: "Long-term archival for legal holds with restricted access and clear audit trails."
        }
      ]
    }
  ];

  const breachProcedure = [
    "Immediate containment and assessment of the breach scope",
    "Documentation of all facts surrounding the breach",
    "Notification to the Information Regulator within 72 hours if required",
    "Notification to affected data subjects without undue delay when high risk",
    "Implementation of remediation measures and system improvements",
    "Post-incident review and policy updates"
  ];

  const faqs = [
    {
      question: "What is POPIA?",
      answer: "The Protection of Personal Information Act (POPIA) is South Africa's data protection law that gives effect to the constitutional right to privacy. It regulates how organizations collect, process, store, and share personal information."
    },
    {
      question: "How do I request my data?",
      answer: "Submit a data subject access request to our Information Officer via email at info@realnet-web.co.za. We will respond within 30 days as required by law."
    },
    {
      question: "Do you use cookies?",
      answer: "Yes, we use essential cookies for website functionality and analytical cookies to improve our services. You can manage preferences through our cookie banner."
    },
    {
      question: "Is my data transferred outside South Africa?",
      answer: "Limited transfers occur to service providers in the EU and USA, all under adequacy decisions or standard contractual clauses approved by the Information Regulator."
    },
    {
      question: "What happens if there's a data breach?",
      answer: "We have a comprehensive breach response plan including 72-hour regulator notification and direct communication with affected individuals for high-risk breaches."
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-900/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 mb-6">
              <FaShieldAlt className="w-4 h-4 text-primary-400" />
              Data Protection
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              POPIA
              <br />
              <span className="text-primary-400">Compliance</span>
            </h1>
            <p className="text-xl text-white/50 leading-relaxed mb-8">
              Your privacy is fundamental. Learn how REALNET Web Solutions protects 
              your personal information in full compliance with South Africa's 
              Protection of Personal Information Act (Act 4 of 2013).
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-white/40">
              <span className="flex items-center gap-2">
                <FaCheckCircle className="w-4 h-4 text-emerald-400" />
                Information Regulator Registered
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle className="w-4 h-4 text-emerald-400" />
                PAIA Manual Available
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle className="w-4 h-4 text-emerald-400" />
                ISO 27001 Aligned
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "8", label: "POPIA Conditions" },
              { value: "72h", label: "Breach Notification" },
              { value: "30", label: "Day Response Time" },
              { value: "100%", label: "Compliance Commitment" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/40">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* POPIA Principles */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Eight Conditions for Lawful Processing</h2>
            <p className="text-white/50">
              We adhere to all eight conditions for lawful processing as mandated by Chapter 3 of POPIA.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-primary-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <principle.icon className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{principle.title}</h3>
                <p className="text-sm text-white/50 mb-3">{principle.description}</p>
                <p className="text-xs text-white/30 leading-relaxed">{principle.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Policy Sections */}
      <section className="py-24 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Detailed Privacy Policy</h2>
            <p className="text-white/50">
              Expand each section to learn more about our specific privacy practices.
            </p>
          </motion.div>

          <div className="space-y-4">
            {policySections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden"
              >
                <button
                  onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-primary-400" />
                    </div>
                    <span className="font-semibold text-white">{section.title}</span>
                  </div>
                  <FaChevronDown className={`w-5 h-5 text-white/40 transition-transform ${
                    activeSection === section.id ? 'rotate-180' : ''
                  }`} />
                </button>

                <AnimatePresence>
                  {activeSection === section.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 border-t border-white/[0.06]">
                        <div className="space-y-6 pt-6">
                          {section.content.map((item, idx) => (
                            <div key={idx}>
                              <h4 className="font-medium text-white mb-2">{item.subtitle}</h4>
                              <p className="text-sm text-white/50 leading-relaxed">{item.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Breach Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-6">
                <FaExclamationTriangle className="w-4 h-4" />
                Incident Response
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Data Breach Response Protocol</h2>
              <p className="text-white/50 mb-8 leading-relaxed">
                In the unlikely event of a personal data breach, we follow strict procedures 
                to contain, assess, and notify affected parties in compliance with Section 22 of POPIA.
              </p>
              <div className="space-y-4">
                {breachProcedure.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-sm font-medium text-white/60">
                      {index + 1}
                    </div>
                    <p className="text-white/70 text-sm pt-1.5">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-gradient-to-br from-primary-600/20 to-cyan-600/20 border border-primary-500/20"
            >
              <h3 className="text-xl font-semibold mb-6">Children's Privacy</h3>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <FaChild className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    We do not knowingly collect personal information from children under 18 without parental consent. 
                    If we become aware that we have collected personal data from a child without verification of 
                    parental consent, we take steps to remove that information from our servers.
                  </p>
                  <p className="text-white/50 text-xs">
                    Parents or guardians who believe their child has provided us with personal information 
                    may contact us to request deletion.
                  </p>
                </div>
              </div>
              
              <div className="pt-6 border-t border-white/10">
                <h4 className="font-medium text-white mb-3">Cross-Border Data Flows</h4>
                <p className="text-sm text-white/50 leading-relaxed">
                  Transfers outside South Africa only occur to countries with adequate data protection 
                  laws (EU, EEA, UK) or under Standard Contractual Clauses approved by the 
                  Information Regulator.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-white/50">Common questions about our privacy practices.</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.06]"
              >
                <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Our Information Officer</h2>
              <p className="text-white/50 mb-8 leading-relaxed">
                For privacy-related inquiries, data subject access requests, or to exercise your 
                POPIA rights, please contact our appointed Information Officer.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center">
                    <FaEnvelope className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white/40 mb-1">Email</p>
                    <a href="mailto:info@realnet-web.co.za" className="text-white hover:text-primary-400 transition-colors">
                      info@realnet-web.co.za
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center">
                    <FaPhone className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white/40 mb-1">Phone</p>
                    <a href="tel:+27640388883" className="text-white hover:text-primary-400 transition-colors">
                      +27 64 038 8883
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center">
                    <FaFileContract className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white/40 mb-1">Physical Address</p>
                    <p className="text-white">Matsau Street, Ivory Park, Midrand, 1689</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-sm text-emerald-400 font-medium mb-2">Response Commitment</p>
                <p className="text-sm text-white/50">
                  We respond to all privacy requests within 30 days as required by POPIA. 
                  Complex requests may require additional time, with notification provided.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-primary-600/10 to-cyan-600/10 border border-white/[0.06]"
            >
              <h3 className="text-xl font-semibold mb-6">Information Regulator</h3>
              <p className="text-white/50 text-sm mb-6 leading-relaxed">
                If you are unsatisfied with our response, you have the right to lodge a complaint 
                with the Information Regulator of South Africa.
              </p>
              
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-white/40 mb-1">Website</p>
                  <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-400 transition-colors">
                    inforegulator.org.za
                  </a>
                </div>
                <div>
                  <p className="text-white/40 mb-1">Email</p>
                  <a href="mailto:inforeg@justice.gov.za" className="text-white hover:text-primary-400 transition-colors">
                    inforeg@justice.gov.za
                  </a>
                </div>
                <div>
                  <p className="text-white/40 mb-1">Phone</p>
                  <p className="text-white">+27 10 023 5207</p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-xs text-white/30">
                  <strong>Last Updated:</strong> January 2024<br />
                  <strong>Version:</strong> 2.1<br />
                  <strong>Next Review:</strong> July 2024
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default POPIA;
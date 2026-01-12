import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";

const faqs = [
  {
    question: "What web development services does REALNET offer in South Africa?",
    answer:
      "REALNET Web Solutions provides comprehensive web development services across South Africa, including custom website design, e-commerce development, mobile app development, software solutions, web hosting, and digital marketing. We serve businesses in Pretoria, Johannesburg, Cape Town, and nationwide, focusing on modern, responsive, and SEO-optimized websites.",
  },
  {
    question: "How much does website development cost in South Africa?",
    answer:
      "Our website development costs vary based on your needs: Starter websites range from R3,499-R5,999, E-commerce stores from R6,000-R19,999, and advanced custom solutions from R20,000+. We offer free consultations to provide accurate quotes based on your specific requirements and budget.",
  },
  {
    question: "Do you provide website hosting and maintenance services?",
    answer:
      "Yes! We offer reliable South African web hosting with 99.9% uptime guarantee, business email solutions, domain registration, and comprehensive website maintenance packages. Our hosting includes regular backups, security updates, performance monitoring, and 24/7 technical support.",
  },
  {
    question: "Can you develop mobile apps for iOS and Android?",
    answer:
      "Absolutely! We develop native and cross-platform mobile applications for iOS and Android using React Native, Flutter, and Swift. Our mobile apps are optimized for performance, user experience, and can integrate with your existing business systems and APIs.",
  },
  {
    question: "How long does it take to develop a website or mobile app?",
    answer:
      "Development timelines depend on project complexity: Simple business websites take 1-3 weeks, e-commerce sites 3-6 weeks, and complex web applications or mobile apps 2-6 months. We provide detailed project timelines and milestones during our initial consultation.",
  },
  {
    question: "Do you offer SEO services to improve Google rankings?",
    answer:
      "Yes, we provide comprehensive SEO services including on-page optimization, technical SEO, content strategy, local SEO for South African businesses, and ongoing SEO maintenance. All our websites are built with SEO best practices to help you rank higher on Google and attract more customers.",
  },
  {
    question: "Can you integrate payment gateways and third-party systems?",
    answer:
      "Definitely! We integrate various payment gateways (PayFast, PayGate, Stripe, PayPal), booking systems, CRM software, accounting systems, and other business tools. Our custom API development ensures seamless integration with your existing business processes.",
  },
  {
    question: "Do you work with small businesses and startups in South Africa?",
    answer:
      "Yes, we specialize in helping small businesses and startups establish their online presence. We offer affordable starter packages, flexible payment terms, and scalable solutions that grow with your business. Our goal is to make professional web development accessible to all South African businesses.",
  },
  {
    question: "How do I get started with REALNET Web Solutions?",
    answer:
      "Getting started is easy! Contact us through our website, WhatsApp (+27 64 038-8883), or email (lukhele@realnet-web.co.za) for a free consultation. We'll discuss your goals, provide recommendations, and create a customized proposal for your digital solution needs.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQ Schema.org structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      
      <div className="bg-[linear-gradient(to_top_right,_rgba(255,255,255,1)_0%,_rgba(222,222,222,1)_50%)] pt-8 pb-24">
        <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center my-16 text-gray-900">
          Frequently Asked Questions About Our Services
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Get answers to common questions about our web development, mobile app development, and digital services in South Africa.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-100 rounded-md bg-gray-50 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center justify-between w-full p-4 text-gray-900 text-left"
              >
                <h2 className="text-lg font-medium">{faq.question}</h2>
                <motion.svg
                  className="size-5 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ rotate: openIndex === index ? -180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4 text-gray-900"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default FAQ;

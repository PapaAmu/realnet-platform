"use client";

import React, { useRef } from "react";
import { useRouter } from 'next/navigation';
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "../../ui/PrimaryButton";
import SecondaryButton from "../../ui/SecondaryButton";
import { 
  FaArrowRight,
  FaCheck,
  FaQuoteRight,
  FaClock,
  FaShieldAlt,
  FaHeadset
} from "react-icons/fa";

const WebsiteDevelopment = () => {
  const router = useRouter();
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

  const services = [
    {
      title: "Custom Design",
      description: "Unique, brand-aligned interfaces that differentiate you from competitors and convert visitors.",
      features: ["UI/UX Design", "Brand Integration", "Responsive Layouts"]
    },
    {
      title: "E-Commerce",
      description: "Full-featured online stores with secure payments, inventory management, and customer dashboards.",
      features: ["Payment Integration", "Stock Management", "Order Tracking"]
    },
    {
      title: "Web Applications",
      description: "Complex platforms with user accounts, dashboards, and business logic tailored to your workflows.",
      features: ["User Management", "Data Visualization", "API Integration"]
    }
  ];

  const process = [
    { step: "01", title: "Discovery", desc: "We understand your business, goals, and target audience to define project scope." },
    { step: "02", title: "Design", desc: "Wireframes and visual designs refined through collaborative feedback sessions." },
    { step: "03", title: "Development", desc: "Clean, scalable code with regular updates and milestone demonstrations." },
    { step: "04", title: "Launch", desc: "Deployment, performance optimization, and handover with training." }
  ];

  const packages = [
    {
      name: "Starter",
      price: "R3,499",
      description: "Professional presence for small businesses",
      features: ["Up to 5 pages", "Mobile responsive", "Basic SEO", "1 year hosting", "Email setup"],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Business",
      price: "R8,999",
      description: "Growth-focused with advanced features",
      features: ["Up to 15 pages", "CMS integration", "Advanced SEO", "Analytics setup", "Priority support"],
      cta: "Most Popular",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Complex solutions for larger organizations",
      features: ["Unlimited pages", "Custom functionality", "Dedicated server", "SLA guarantee", "24/7 support"],
      cta: "Contact Us",
      popular: false
    }
  ];

  const testimonials = [
    {
      quote: "Our website traffic increased 340% within three months of launch. The investment paid for itself in weeks.",
      author: "Operations Director",
      company: "Industrial Services Firm"
    },
    {
      quote: "Professional process from start to finish. They understood our technical requirements and delivered flawlessly.",
      author: "CTO",
      company: "Technology Startup"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20">
        <motion.div className="absolute inset-0 z-0" style={{ opacity: heroOpacity }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(139,92,246,0.15),transparent_50%)]" />
          <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div style={{ y: heroY, opacity: heroOpacity }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-primary-400">
                  Web Development Services
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8"
              >
                Websites That
                <br />
                <span className="text-primary-400">Drive Revenue</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-white/50 leading-relaxed mb-10 max-w-lg"
              >
                Strategic design and robust development for South African businesses 
                ready to compete in the digital economy.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <PrimaryButton 
                  onClick={() => router.push('/new-project/request-quotation')}
                  className="px-8 py-4 font-medium"
                >
                  Start Your Project <FaArrowRight className="w-4 h-4" />
                </PrimaryButton>
                <SecondaryButton
                  onClick={() => router.push('/features/web-development/live-projects')}
                  className="px-8 py-4 font-medium"
                >
                  View Portfolio
                </SecondaryButton>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-8 mt-12 pt-12 border-t border-white/10"
              >
                <div>
                  <div className="text-3xl font-bold text-white">150+</div>
                  <div className="text-sm text-white/40">Sites Launched</div>
                </div>
                <div className="h-12 w-px bg-white/10" />
                <div>
                  <div className="text-3xl font-bold text-white">98%</div>
                  <div className="text-sm text-white/40">Client Retention</div>
                </div>
                <div className="h-12 w-px bg-white/10" />
                <div>
                  <div className="text-3xl font-bold text-white">B-BBEE 1</div>
                  <div className="text-sm text-white/40">Certified</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 aspect-[4/3]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center text-white/20">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-2xl bg-white/5 mx-auto mb-4 flex items-center justify-center">
                      <FaQuoteRight className="w-12 h-12" />
                    </div>
                    <p className="text-sm">Project Preview</p>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-8 right-8 px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live Site
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={containerRef} className="py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Build</h2>
            <p className="text-white/50">End-to-end solutions tailored to your business objectives and growth stage.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-primary-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-primary-400 font-bold text-xl">0{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-white/50 mb-6 text-sm leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white/40">
                      <FaCheck className="w-3 h-3 text-primary-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How We Work</h2>
              <p className="text-white/50 mb-12">A proven process that delivers results on time and within budget.</p>
              
              <div className="space-y-8">
                {process.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0">
                      <span className="text-primary-400 font-bold">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-500/10 to-transparent border border-white/10 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-6">
                    <FaClock className="w-10 h-10 text-primary-400" />
                  </div>
                  <div className="text-5xl font-bold text-white mb-2">2-4 Weeks</div>
                  <p className="text-white/50">Average project delivery time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Investment</h2>
            <p className="text-white/50">Transparent pricing with no hidden costs. Choose what fits your stage.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-white text-black border-white'
                    : 'bg-white/[0.02] border-white/[0.06] hover:border-white/20'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
                    Recommended
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className={`text-lg font-medium mb-2 ${pkg.popular ? 'text-black/60' : 'text-white/60'}`}>
                    {pkg.name}
                  </h3>
                  <div className={`text-4xl font-bold mb-2 ${pkg.popular ? 'text-black' : 'text-white'}`}>
                    {pkg.price}
                  </div>
                  <p className={`text-sm ${pkg.popular ? 'text-black/60' : 'text-white/40'}`}>
                    {pkg.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <FaCheck className={`w-4 h-4 ${pkg.popular ? 'text-primary-600' : 'text-primary-400'}`} />
                      <span className={pkg.popular ? 'text-black/70' : 'text-white/70'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={pkg.price === "Custom" ? "/contact-us" : "/new-project/request-quotation"}
                  className={`block w-full py-3 rounded-xl text-center font-medium transition-colors ${
                    pkg.popular
                      ? 'bg-black text-white hover:bg-black/80'
                      : 'bg-white text-black hover:bg-white/90'
                  }`}
                >
                  {pkg.cta}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
              >
                <FaQuoteRight className="w-8 h-8 text-primary-400/30 mb-6" />
                <p className="text-lg text-white/80 leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="font-medium text-white">{testimonial.author}</div>
                  <div className="text-sm text-white/40">{testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-sm text-white/50">30-day free fixes for any issues post-launch</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
                <FaClock className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="font-semibold mb-2">On-Time Delivery</h3>
              <p className="text-sm text-white/50">Milestone-based payments, deliverables on schedule</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
                <FaHeadset className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="font-semibold mb-2">Ongoing Support</h3>
              <p className="text-sm text-white/50">Dedicated account manager and technical support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to <span className="text-primary-400">transform</span> your digital presence?
          </h2>
          <p className="text-lg text-white/50 mb-8">
            Join 150+ South African businesses that trust RealNet with their digital success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButton 
              onClick={() => router.push('/new-project/request-quotation')}
              className="px-8 py-4 font-medium"
            >
              Get Your Free Quote <FaArrowRight className="w-4 h-4" />
            </PrimaryButton>
            <SecondaryButton
              onClick={() => router.push('/contact-us')}
              className="px-8 py-4 font-medium"
            >
              Schedule a Call
            </SecondaryButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebsiteDevelopment;
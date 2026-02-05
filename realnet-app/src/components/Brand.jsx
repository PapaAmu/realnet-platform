"use client";

import React, { useRef } from "react";
import { useRouter } from 'next/navigation';
import { motion, useInView } from "framer-motion";
import PrimaryButton from "./ui/PrimaryButton";
import { FaStar, FaArrowRight } from "react-icons/fa";

// Import your brand images
import chaukeImg from "../assets/images/brands/chauke.jpeg";
import eaglenestImg from "../assets/images/brands/eaglenest.png";
import enkwaliImg from "../assets/images/brands/enkwali.png";
import etshadiImg from "../assets/images/brands/etshadi.png";
import hrholdingsImg from "../assets/images/brands/hrholdings.png";
import nnwImg from "../assets/images/brands/nnw.png";
import ritsImg from "../assets/images/brands/rits.webp";
import nosweleImg from "../assets/images/brands/noswele.png";
import northwestSundayImg from "../assets/images/brands/northwestsunday.png";
import inabellaImg from "../assets/images/brands/inabella.jpg";
import ukrebeImg from "../assets/images/brands/ukrebe.png";
import inawuImg from "../assets/images/brands/inawu.png";

const brands = [
  { id: 1, img: chaukeImg, alt: "Chauke", category: "Enterprise" },
  { id: 2, img: eaglenestImg, alt: "Eagle Nest", category: "Hospitality" },
  { id: 3, img: enkwaliImg, alt: "Enkwali", category: "Technology" },
  { id: 4, img: etshadiImg, alt: "Etshadi", category: "Finance" },
  { id: 5, img: hrholdingsImg, alt: "HR Holdings", category: "Enterprise" },
  { id: 6, img: nnwImg, alt: "NNW", category: "Media" },
  { id: 7, img: ritsImg, alt: "RITS", category: "Technology" },
  { id: 8, img: nosweleImg, alt: "Noswele", category: "Lifestyle" },
  { id: 9, img: northwestSundayImg, alt: "Northwest Sunday", category: "Media" },
  { id: 10, img: inabellaImg, alt: "Inabella", category: "Fashion" },
  { id: 11, img: ukrebeImg, alt: "Ukrebe", category: "Education" },
  { id: 12, img: inawuImg, alt: "Inawu", category: "Health" },
];

// Duplicate for seamless loop
const duplicatedBrands = [...brands, ...brands];

const Brand = () => {
  const router = useRouter();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={containerRef}
      className="relative py-24 lg:py-32 bg-white dark:bg-[#050505] overflow-hidden transition-colors duration-300"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gray-200 dark:bg-white/10" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gray-200 dark:bg-white/10" />
        
        {/* Subtle gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary-50 dark:bg-primary-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 mb-6">
                <FaStar className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                <span className="text-sm text-gray-600 dark:text-white/60 font-medium">Trusted Partnerships</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
                Brands That Trust
                <br />
                <span className="text-primary-600 dark:text-primary-400">Our Expertise</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-gray-600 dark:text-white/50 max-w-md text-lg leading-relaxed lg:text-right"
            >
              We've collaborated with industry leaders across South Africa, 
              delivering solutions that drive measurable growth.
            </motion.p>
          </div>
        </div>

        {/* Marquee Container */}
        <div className="relative group">
          {/* Fade Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-[#050505] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex overflow-hidden"
          >
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
              className="flex gap-8 py-8"
            >
              {duplicatedBrands.map((brand, index) => (
                <div
                  key={`${brand.id}-${index}`}
                  className="group/logo relative flex-shrink-0 w-64 h-32 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] hover:border-primary-500/30 dark:hover:border-primary-500/30 transition-all duration-500 overflow-hidden"
                >
                  {/* Hover Background */}
                  <div className="absolute inset-0 bg-primary-50 dark:bg-primary-500/5 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
                    <img
                      src={brand.img.src || brand.img}
                      alt={brand.alt}
                      className="max-w-full max-h-12 object-contain grayscale opacity-60 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 transition-all duration-500"
                    />
                    
                    {/* Category Tag - Shows on Hover */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover/logo:opacity-100 translate-y-2 group-hover/logo:translate-y-0 transition-all duration-300">
                      <span className="px-3 py-1 rounded-full bg-gray-200 dark:bg-white/10 text-xs text-gray-600 dark:text-white/60">
                        {brand.category}
                      </span>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary-100 dark:from-primary-500/10 to-transparent opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Second Row - Reverse Direction */}
        <div className="relative mt-4 group">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-[#050505] to-transparent z-10 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex overflow-hidden"
          >
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 35,
                  ease: "linear",
                },
              }}
              className="flex gap-8 py-8"
            >
              {[...duplicatedBrands].reverse().map((brand, index) => (
                <div
                  key={`reverse-${brand.id}-${index}`}
                  className="group/logo relative flex-shrink-0 w-64 h-32 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] hover:border-primary-500/30 dark:hover:border-primary-500/30 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-primary-50 dark:bg-primary-500/5 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
                    <img
                      src={brand.img.src || brand.img}
                      alt={brand.alt}
                      className="max-w-full max-h-12 object-contain grayscale opacity-60 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 transition-all duration-500"
                    />
                    
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover/logo:opacity-100 translate-y-2 group-hover/logo:translate-y-0 transition-all duration-300">
                      <span className="px-3 py-1 rounded-full bg-gray-200 dark:bg-white/10 text-xs text-gray-600 dark:text-white/60">
                        {brand.category}
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary-100 dark:from-primary-500/10 to-transparent opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="max-w-7xl mx-auto px-6 mt-16"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06]">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                Ready to join these industry leaders?
              </h3>
              <p className="text-gray-600 dark:text-white/50 text-sm">
                Let's discuss how we can help transform your digital presence.
              </p>
            </div>
            
            <PrimaryButton 
              onClick={() => router.push('/contact-us')}
              className="px-6 py-3 font-medium"
            >
              Start a Project
              <FaArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </PrimaryButton>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-7xl mx-auto px-6 mt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-gray-200 dark:border-white/10">
            {[
              { value: "50+", label: "Brands Served" },
              { value: "12+", label: "Industries" },
              { value: "98%", label: "Retention Rate" },
              { value: "5+", label: "Years Partnership" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 dark:text-white/40 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Brand;
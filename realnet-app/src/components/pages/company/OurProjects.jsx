"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  FaExternalLinkAlt, 
  FaTimes, 
  FaArrowRight,
  FaMapMarkerAlt,
  FaIndustry
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

// Project data
const projects = [
  {
    id: 1,
    title: "RITS-SA",
    description: "IT services platform with service portfolio and client management for South African enterprises.",
    url: "https://rits-sa.co.za/",
    image: "/images/projects/rits.webp",
    category: "Technology",
    year: "2023",
    location: "Johannesburg"
  },
  {
    id: 2,
    title: "Noswele Express",
    description: "Full-featured e-commerce with inventory management and secure payment processing.",
    url: "https://nosweleexpress.co.za/",
    image: "/images/projects/noswele.webp",
    category: "E-commerce",
    year: "2023",
    location: "Pretoria"
  },
  {
    id: 3,
    title: "Shongwe Optometrists",
    description: "Healthcare platform with appointment booking and patient management system.",
    url: "https://shongweoptometrists.co.za/",
    image: "/images/projects/shongwe.webp",
    category: "Healthcare",
    year: "2022",
    location: "Midrand"
  },
  {
    id: 4,
    title: "NNW Engineering",
    description: "Industrial engineering showcase with project portfolio and technical specifications.",
    url: "https://nnwengineering.co.za/",
    image: "/images/projects/nnw.webp",
    category: "Engineering",
    year: "2023",
    location: "South Africa"
  },
  {
    id: 5,
    title: "Precious Eagle Nest",
    description: "Luxury hospitality website with booking integration and immersive gallery experience.",
    url: "https://preciouseaglenest.co.za/",
    image: "/images/projects/precious.webp",
    category: "Hospitality",
    year: "2022",
    location: "Pretoria"
  },
  {
    id: 6,
    title: "Siyahlasela Organisation",
    description: "Non-profit platform promoting community development and social impact programs.",
    url: "https://siyahlasela.org.za/",
    image: "/images/projects/siyahlasela.webp",
    category: "Non-Profit",
    year: "2023",
    location: "Gauteng"
  }
];

const categories = ["All", "Technology", "E-commerce", "Healthcare", "Engineering", "Hospitality", "Non-Profit"];

const WebProjects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const stats = [
    { value: projects.length, label: "Projects" },
    { value: new Set(projects.map(p => p.category)).size, label: "Industries" },
    { value: "100%", label: "Delivery" }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary-900/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 mb-6">
              Selected Work
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Projects That
              <br />
              <span className="text-primary-400">Drive Results</span>
            </h1>
            <p className="text-xl text-white/50 leading-relaxed max-w-2xl">
              A curated selection of websites and applications we've built for 
              ambitious South African businesses across diverse industries.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-12 mt-12 pt-12 border-t border-white/10"
          >
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/40 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-30 bg-[#050505]/80 backdrop-blur-md border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <span className="text-sm text-white/40 mr-4 shrink-0">Filter by:</span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shrink-0 ${
                  selectedCategory === category
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={containerRef} className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`group relative ${index === 0 || index === 3 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div 
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Image */}
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
                      hoveredProject === project.id ? 'opacity-100' : 'opacity-60'
                    }`} />

                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium text-white/80">
                          {project.category}
                        </span>
                        <span className="text-xs text-white/50">{project.year}</span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className={`text-sm text-white/70 line-clamp-2 transition-all duration-300 ${
                        hoveredProject === project.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}>
                        {project.description}
                      </p>

                      {/* View Indicator */}
                      <div className={`flex items-center gap-2 mt-4 text-primary-400 text-sm font-medium transition-all duration-300 ${
                        hoveredProject === project.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}>
                        View Project <FaArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/40">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{selectedProject.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-white/50">
                    <span className="flex items-center gap-1">
                      <FaIndustry className="w-3 h-3" /> {selectedProject.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt className="w-3 h-3" /> {selectedProject.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-white/90 transition-colors"
                  >
                    Visit Site <FaExternalLinkAlt className="w-3 h-3" />
                  </a>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Preview */}
              <div className="relative aspect-video bg-black">
                <iframe
                  src={selectedProject.url}
                  className="w-full h-full"
                  title={selectedProject.title}
                />
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/10">
                <p className="text-white/60 text-sm leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-24 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to build something <span className="text-primary-400">extraordinary</span>?
          </h2>
          <p className="text-lg text-white/50 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can create a digital experience that drives growth 
            for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/new-project/request-quotation"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors"
            >
              Start Your Project <FaArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebProjects;
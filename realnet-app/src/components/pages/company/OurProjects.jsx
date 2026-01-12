"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaTimes, FaCode, FaMobile, FaShoppingCart, FaStar } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

// Import your images - you'll need to update these paths or move images to public folder
// For now, I'll use placeholder images. Update these with your actual image imports
const nnwImg = "/images/projects/nnw.webp";
const ritsImg = "/images/projects/rits.webp";
const nosweleImg = "/images/projects/noswele.webp";
const shongweImg = "/images/projects/shongwe.webp";
const preciousImg = "/images/projects/precious.webp";
const siyahlaselaImg = "/images/projects/siyahlasela.webp";

// Mock analytics functions - replace with your actual implementation
const trackFormSubmission = (formName, data) => {
  console.log('Form submission tracked:', formName, data);
};

const trackEvent = (category, action, label) => {
  console.log('Event tracked:', category, action, label);
};

const trackConversion = (conversionName, value) => {
  console.log('Conversion tracked:', conversionName, value);
};

const trackContentInteraction = (type, item, action) => {
  console.log('Content interaction:', type, item, action);
};

const trackCTAClick = (action, location) => {
  console.log('CTA clicked:', action, location);
};

// Mock components - replace with your actual implementations
const SEO = ({ title, description, keywords, ogImage, structuredData }) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords?.join(', ')} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
};

const RelatedContent = ({ currentPage }) => {
  return (
    <section className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white mb-8">Related Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-700 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Web Development Services</h3>
            <p className="text-gray-300 mb-4">Learn about our comprehensive web development solutions.</p>
            <Link href="/services/web-development" className="text-orange-400 hover:text-orange-300">
              Learn More →
            </Link>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Our Process</h3>
            <p className="text-gray-300 mb-4">Discover how we bring your digital vision to life.</p>
            <Link href="/about/our-process" className="text-orange-400 hover:text-orange-300">
              Learn More →
            </Link>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Client Testimonials</h3>
            <p className="text-gray-300 mb-4">See what our clients say about working with us.</p>
            <Link href="/testimonials" className="text-orange-400 hover:text-orange-300">
              Learn More →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const WebProjects = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Project data with your actual websites - Enhanced with SEO data
  const projectsData = [
    {
      id: 1,
      title: "RITS-SA",
      description: "Professional IT services website with responsive design, service portfolio, and client solutions for South African businesses.",
      url: "https://rits-sa.co.za/",
      image: ritsImg,
      category: "IT Services",
      featured: true,
      technologies: ["React", "Tailwind CSS", "Responsive Design"],
      location: "South Africa",
      industry: "Technology Services"
    },
    {
      id: 2,
      title: "Noswele Express PTY",
      description: "E-commerce platform with product catalog, shopping cart, and secure payment processing for online retail in South Africa.",
      url: "https://nosweleexpress.co.za/",
      image: nosweleImg,
      category: "E-commerce",
      featured: true,
      technologies: ["E-commerce", "Payment Integration", "Inventory Management"],
      location: "South Africa",
      industry: "Retail"
    },
    {
      id: 3,
      title: "Shongwe Optometrists",
      description: "Healthcare website for optometry services with appointment information, eye care tips, and professional services in Gauteng.",
      url: "https://shongweoptometrists.co.za/",
      image: shongweImg,
      category: "Healthcare",
      featured: false,
      technologies: ["Healthcare CMS", "Appointment System", "Responsive Design"],
      location: "Gauteng, South Africa",
      industry: "Healthcare"
    },
    {
      id: 4,
      title: "NNW Engineering",
      description: "Engineering services website showcasing industrial projects, technical capabilities, and engineering solutions across South Africa.",
      url: "https://nnwengineering.co.za/",
      image: nnwImg,
      category: "Engineering",
      featured: true,
      technologies: ["Industrial Design", "Project Portfolio", "Technical Specifications"],
      location: "South Africa",
      industry: "Engineering"
    },
    {
      id: 5,
      title: "Precious Eagle Nest",
      description: "Luxury accommodation website with booking information, gallery, and premium hospitality services in South Africa.",
      url: "https://preciouseaglenest.co.za/",
      image: preciousImg,
      category: "Hospitality",
      featured: false,
      technologies: ["Booking System", "Gallery", "Responsive Design"],
      location: "South Africa",
      industry: "Hospitality"
    },
    {
      id: 6,
      title: "Siyahlasela Organisation",
      description: "Non-profit organization website promoting community development initiatives and social programs in South African communities.",
      url: "https://siyahlasela.org.za/",
      image: siyahlaselaImg,
      category: "Non-Profit",
      featured: true,
      technologies: ["Community Platform", "Donation System", "Social Impact"],
      location: "South Africa",
      industry: "Non-Profit"
    },
  ];

  const [selectedProject, setSelectedProject] = useState(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  // Get unique categories for filtering
  const categories = ["all", ...new Set(projectsData.map(project => project.category))];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === "all" 
    ? projectsData 
    : projectsData.filter(project => project.category === activeFilter);

  // Open project in modal with iframe
  const openProject = (project) => {
    setSelectedProject(project);
    setIframeLoaded(false);
    trackContentInteraction("project_preview", project.title, "view");
  };

  // Close project modal
  const closeProject = () => {
    setSelectedProject(null);
  };

  // Handle filter change
  const handleFilterChange = (category) => {
    setActiveFilter(category);
    trackContentInteraction("project_filter", category, "click");
  };

  // Handle CTA clicks
  const handleCTAClick = (action) => {
    trackCTAClick(action, "projects-page");
  };

  return (
    <>
      <SEO
        title="Web Development Portfolio | Our Website Projects South Africa"
        description="View our portfolio of professionally developed websites for South African businesses. E-commerce sites, business websites, and custom web applications built with modern technologies."
        keywords={[
          "web development portfolio",
          "website projects South Africa",
          "e-commerce development",
          "business websites",
          "web design projects",
          "South African web developers",
          "responsive website portfolio",
          "custom web applications"
        ]}
        ogImage="/projects-og-image.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Web Development Projects Portfolio",
          "description": "Collection of professionally developed websites for South African businesses and organizations",
          "url": "https://realnet-web.co.za/features/web-development/live-projects",
          "numberOfItems": projectsData.length,
          "itemListElement": projectsData.map((project, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "WebSite",
              "name": project.title,
              "description": project.description,
              "url": project.url,
              "author": {
                "@type": "Organization",
                "name": "REALNET WEB SOLUTIONS"
              }
            }
          }))
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden pt-20">
        {/* Header Section */}
        <section 
          className="relative py-12 lg:py-20 overflow-hidden"
          data-section="portfolio-hero"
          itemScope
          itemType="https://schema.org/WebPage"
        >
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10"></div>
            <div className="absolute inset-0 bg-[url(https://i.pinimg.com/1200x/b8/05/35/b80535a7d8dabb5eb080ba7ab8d619f0.jpg)] bg-cover bg-center mix-blend-overlay"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="mb-6">
                <span className="px-4 py-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full text-sm font-semibold">
                  Our Portfolio
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" itemProp="headline">
                Websites We've{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">
                  Developed
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto" itemProp="description">
                Explore our collection of professionally developed websites for South African businesses across various industries including e-commerce, healthcare, engineering, and non-profit organizations.
              </p>
              
              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mt-12">
                {[
                  { number: projectsData.length, label: "Projects Completed" },
                  { number: projectsData.filter(p => p.featured).length, label: "Featured Projects" },
                  { number: new Set(projectsData.map(p => p.category)).size, label: "Industries Served" },
                  { number: "100%", label: "Client Satisfaction" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Filter */}
        <section className="py-8 bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilterChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === category
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section 
          className="py-10"
          data-section="portfolio-grid"
          aria-labelledby="projects-grid-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="projects-grid-heading" className="sr-only">
              Our Web Development Projects
            </h2>
            
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {filteredProjects.map((project) => (
                <motion.article
                  key={project.id}
                  variants={fadeIn}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:shadow-xl group cursor-pointer"
                  onClick={() => openProject(project)}
                  itemScope
                  itemType="https://schema.org/CreativeWork"
                >
                  <div className="relative overflow-hidden">
                    {/* Website preview with your actual image */}
                    <div className="w-full h-48 relative">
                      <Image 
                        src={project.image} 
                        alt={`${project.title} website preview - ${project.description}`}
                        className="w-full h-full object-cover"
                        itemProp="image"
                        width={400}
                        height={192}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-70"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-semibold text-white truncate" itemProp="name">
                          {project.title}
                        </h3>
                        <p className="text-orange-300 text-sm" itemProp="genre">
                          {project.category}
                        </p>
                      </div>
                      {project.featured && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Featured
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-400 mb-4 line-clamp-2" itemProp="description">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-xs font-medium">
                        {project.industry}
                      </span>
                      
                      <button 
                        className="text-orange-400 hover:text-orange-300 transition-colors flex items-center text-sm"
                        aria-label={`Preview ${project.title} website`}
                      >
                        Preview <FaExternalLinkAlt className="ml-2 text-xs" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            {/* No Results Message */}
            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-gray-400 text-lg">
                  No projects found in this category. Please try another filter.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Project Modal with Iframe */}
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeProject}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-900 rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-labelledby="modal-title"
              aria-modal="true"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-4"></div>
                  <h3 id="modal-title" className="text-lg font-semibold">
                    {selectedProject.title} - Live Preview
                  </h3>
                </div>
                <div className="flex items-center">
                  <a 
                    href={selectedProject.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mr-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg flex items-center transition-colors"
                    onClick={() => trackCTAClick(`Visit ${selectedProject.title}`, "project-modal")}
                    aria-label={`Visit ${selectedProject.title} live website`}
                  >
                    <FaExternalLinkAlt className="mr-2" />
                    Open Live Site
                  </a>
                  <button 
                    onClick={closeProject}
                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                    aria-label="Close project preview"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              {/* Iframe Container */}
              <div className="flex-1 relative">
                {!iframeLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-400">Loading website preview...</p>
                    </div>
                  </div>
                )}
                
                <iframe
                  src={selectedProject.url}
                  className="w-full h-full"
                  frameBorder="0"
                  title={`Live preview of ${selectedProject.title} website`}
                  onLoad={() => setIframeLoaded(true)}
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* CTA Section */}
        <section 
          className="py-20 lg:py-28 bg-gradient-to-r from-orange-600 to-purple-600 text-white relative overflow-hidden mt-16"
          data-section="portfolio-cta"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1015&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start <span className="text-white">Your Project</span>?
              </h2>
              <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
                Let's work together to create a stunning website that represents your brand and drives growth for your South African business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/new-project/request-quotation"
                  className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => handleCTAClick("Get Free Consultation - Projects")}
                >
                  Get Your Free Consultation
                </Link>
                <Link
                  href="/contact-us"
                  className="px-8 py-4 border border-white text-white font-semibold rounded-lg shadow-sm hover:bg-white/10 transition-all duration-300"
                  onClick={() => handleCTAClick("Contact Us - Projects")}
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Content Section */}
        <RelatedContent currentPage="web-projects" />
      </div>
    </>
  );
};

export default WebProjects;
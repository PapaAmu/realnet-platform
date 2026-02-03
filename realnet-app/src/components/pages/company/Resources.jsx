"use client";

import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { 
  FaCode, 
  FaMobile, 
  FaSearch, 
  FaRocket,
  FaShieldAlt, 
  FaCalendarAlt,
  FaArrowRight,
  FaClock,
  FaTag,
  FaBookmark,
  FaEnvelope
} from "react-icons/fa";

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const resources = [
    {
      id: 1,
      title: "Complete Guide to Website Development Costs in South Africa 2024",
      excerpt: "Understand the factors that influence website development costs, from simple business websites to complex e-commerce solutions. Includes pricing breakdown and tips for budget planning.",
      category: "Web Development",
      readTime: "8 min",
      date: "Dec 2024",
      featured: true
    },
    {
      id: 2,
      title: "Why Your Business Needs a Mobile App in 2024",
      excerpt: "Discover the benefits of having a mobile app for your South African business, including increased customer engagement, brand loyalty, and revenue growth.",
      category: "Mobile Development",
      readTime: "6 min",
      date: "Dec 2024",
      featured: true
    },
    {
      id: 3,
      title: "SEO Best Practices for South African Businesses",
      excerpt: "Learn how to optimize your website for local South African searches, improve Google rankings, and attract more customers online.",
      category: "Digital Marketing",
      readTime: "10 min",
      date: "Nov 2024",
      featured: false
    },
    {
      id: 4,
      title: "E-commerce Website Features That Increase Sales",
      excerpt: "Essential features every South African e-commerce website needs to convert visitors into customers and boost online sales.",
      category: "E-commerce",
      readTime: "7 min",
      date: "Nov 2024",
      featured: false
    },
    {
      id: 5,
      title: "Website Security: Protecting Your Business Online",
      excerpt: "Essential security measures every South African business website needs to protect against cyber threats and maintain customer trust.",
      category: "Security",
      readTime: "5 min",
      date: "Oct 2024",
      featured: false
    },
    {
      id: 6,
      title: "Choosing the Right Web Hosting for Your Business",
      excerpt: "Compare different web hosting options available in South Africa and choose the best solution for your website's needs and budget.",
      category: "Hosting",
      readTime: "6 min",
      date: "Oct 2024",
      featured: false
    }
  ];

  const categories = [
    { name: "All", icon: FaTag },
    { name: "Web Development", icon: FaCode },
    { name: "Mobile Development", icon: FaMobile },
    { name: "Digital Marketing", icon: FaSearch },
    { name: "E-commerce", icon: FaRocket },
    { name: "Security", icon: FaShieldAlt },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === "All" || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         resource.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredResources = filteredResources.filter(r => r.featured);
  const regularResources = filteredResources.filter(r => !r.featured);

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(139,92,246,0.15),transparent_50%)]" />
          <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-violet-400 mb-6">
              <FaBookmark className="w-4 h-4" />
              Knowledge Base
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Resources &
              <br />
              <span className="text-violet-400">Insights</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-white/50 leading-relaxed max-w-2xl mb-10">
              Expert guides, best practices, and industry insights for web development, 
              mobile apps, and digital strategy in South Africa.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-0 z-30 bg-[#050505]/80 backdrop-blur-md border-y border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 sm:pb-0">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category.name
                    ? "bg-white text-black"
                    : "bg-white/5 text-white/70 border border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredResources.length > 0 && (
        <section ref={containerRef} className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-bold">Featured</h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid lg:grid-cols-2 gap-6 lg:gap-8"
            >
              {featuredResources.map((resource, index) => (
                <motion.article
                  key={resource.id}
                  variants={fadeInUp}
                  className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8 hover:border-violet-500/30 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-medium">
                        {resource.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-white/40">
                        <FaClock className="w-3 h-3" />
                        {resource.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-violet-400 transition-colors duration-300 line-clamp-2">
                      {resource.title}
                    </h3>
                    
                    <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                      {resource.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/40">{resource.date}</span>
                      <button className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 group-hover:text-violet-300 transition-colors">
                        Read Article <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold">
              {activeCategory === "All" ? "All Articles" : activeCategory}
            </h2>
            <span className="text-sm text-white/40">
              {filteredResources.length} articles
            </span>
          </motion.div>

          {filteredResources.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {(activeCategory === "All" ? regularResources : filteredResources.filter(r => !r.featured)).map((resource) => (
                <motion.article
                  key={resource.id}
                  variants={fadeInUp}
                  className="group relative bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 sm:p-6 hover:border-violet-500/30 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-white/60 text-xs">
                      {resource.category}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold mb-2 group-hover:text-violet-400 transition-colors duration-300 line-clamp-2 text-sm sm:text-base">
                    {resource.title}
                  </h3>
                  
                  <p className="text-white/40 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                    {resource.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <div className="flex items-center gap-3 text-xs text-white/30">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="w-3 h-3" />
                        {resource.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="w-3 h-3" />
                        {resource.readTime}
                      </span>
                    </div>
                    <FaArrowRight className="w-4 h-4 text-white/20 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-white/40">No articles found matching your criteria.</p>
              <button 
                onClick={() => {setActiveCategory("All"); setSearchQuery("");}}
                className="mt-4 text-violet-400 hover:text-violet-300 text-sm"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative p-8 sm:p-12 rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 text-center">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mx-auto mb-6">
                <FaEnvelope className="w-6 h-6 text-violet-400" />
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Stay in the loop
              </h2>
              <p className="text-white/50 mb-8 max-w-lg mx-auto text-sm sm:text-base">
                Get the latest articles, industry insights, and exclusive resources 
                delivered directly to your inbox.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 text-sm"
                />
                <button 
                  type="submit"
                  className="px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-colors text-sm whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              
              <p className="mt-4 text-xs text-white/30">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-white/40 mb-4">Need help with your project?</p>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-medium transition-colors"
            >
              Get in touch <FaArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  FaCode, 
  FaMobile, 
  FaSearch, 
  FaCloud, 
  FaShieldAlt, 
  FaRocket,
  FaCalendarAlt,
  FaUser,
  FaArrowRight,
  FaTags
} from "react-icons/fa";

const Resources = () => {
  // Blog posts/resources data
  const resources = [
    {
      id: 1,
      title: "Complete Guide to Website Development Costs in South Africa 2024",
      excerpt: "Understand the factors that influence website development costs, from simple business websites to complex e-commerce solutions. Includes pricing breakdown and tips for budget planning.",
      category: "Web Development",
      readTime: "8 min read",
      date: "December 2024",
      author: "REALNET Team",
      featured: true,
      keywords: ["website costs", "web development pricing", "south africa"]
    },
    {
      id: 2,
      title: "Why Your Business Needs a Mobile App in 2024",
      excerpt: "Discover the benefits of having a mobile app for your South African business, including increased customer engagement, brand loyalty, and revenue growth.",
      category: "Mobile Development",
      readTime: "6 min read",
      date: "December 2024",
      author: "REALNET Team",
      featured: true,
      keywords: ["mobile apps", "business apps", "app development"]
    },
    {
      id: 3,
      title: "SEO Best Practices for South African Businesses",
      excerpt: "Learn how to optimize your website for local South African searches, improve Google rankings, and attract more customers online.",
      category: "Digital Marketing",
      readTime: "10 min read",
      date: "November 2024",
      author: "REALNET Team",
      featured: false,
      keywords: ["SEO", "local SEO", "google rankings"]
    },
    {
      id: 4,
      title: "E-commerce Website Features That Increase Sales",
      excerpt: "Essential features every South African e-commerce website needs to convert visitors into customers and boost online sales.",
      category: "E-commerce",
      readTime: "7 min read",
      date: "November 2024",
      author: "REALNET Team",
      featured: false,
      keywords: ["ecommerce", "online sales", "conversion"]
    },
    {
      id: 5,
      title: "Website Security: Protecting Your Business Online",
      excerpt: "Essential security measures every South African business website needs to protect against cyber threats and maintain customer trust.",
      category: "Security",
      readTime: "5 min read",
      date: "October 2024",
      author: "REALNET Team",
      featured: false,
      keywords: ["website security", "cybersecurity", "SSL certificates"]
    },
    {
      id: 6,
      title: "Choosing the Right Web Hosting for Your Business",
      excerpt: "Compare different web hosting options available in South Africa and choose the best solution for your website's needs and budget.",
      category: "Hosting",
      readTime: "6 min read",
      date: "October 2024",
      author: "REALNET Team",
      featured: false,
      keywords: ["web hosting", "hosting comparison", "website performance"]
    }
  ];

  const categories = [
    { name: "All", icon: <FaTags />, count: resources.length },
    { name: "Web Development", icon: <FaCode />, count: resources.filter(r => r.category === "Web Development").length },
    { name: "Mobile Development", icon: <FaMobile />, count: resources.filter(r => r.category === "Mobile Development").length },
    { name: "Digital Marketing", icon: <FaSearch />, count: resources.filter(r => r.category === "Digital Marketing").length },
    { name: "E-commerce", icon: <FaRocket />, count: resources.filter(r => r.category === "E-commerce").length },
    { name: "Security", icon: <FaShieldAlt />, count: resources.filter(r => r.category === "Security").length },
    { name: "Hosting", icon: <FaCloud />, count: resources.filter(r => r.category === "Hosting").length },
  ];

  const featuredResources = resources.filter(resource => resource.featured);
  const regularResources = resources.filter(resource => !resource.featured);

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden pt-8">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="mb-6">
              <span className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-sm font-semibold">
                Resources & Insights
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Web Development <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">Resources</span> & Guides
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Expert insights, guides, and best practices for web development, mobile apps, SEO, and digital marketing in South Africa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg hover:border-orange-500 transition-colors duration-200 text-sm"
              >
                <span className="text-orange-400">{category.icon}</span>
                <span>{category.name}</span>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">{category.count}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">Resources</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredResources.map((resource, index) => (
                <motion.article
                  key={resource.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ delay: index * 0.2 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:shadow-xl group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium">
                        {resource.category}
                      </span>
                      <div className="flex items-center text-gray-400 text-sm">
                        <FaCalendarAlt className="mr-2" />
                        {resource.date}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-300 transition-colors duration-200">
                      {resource.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-6 line-clamp-3">
                      {resource.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-400 text-sm">
                        <FaUser className="mr-2" />
                        {resource.author} • {resource.readTime}
                      </div>
                      
                      <button className="flex items-center text-orange-400 hover:text-orange-300 transition-colors duration-200">
                        Read More <FaArrowRight className="ml-2" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Resources Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              All <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">Resources</span>
            </h2>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {resources.map((resource, index) => (
              <motion.article
                key={resource.id}
                variants={fadeIn}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-600 hover:border-orange-500/40 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                    {resource.category}
                  </span>
                  <span className="text-gray-400 text-xs">{resource.date}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-orange-300 transition-colors duration-200 line-clamp-2">
                  {resource.title}
                </h3>
                
                <p className="text-gray-400 mb-4 text-sm line-clamp-3">
                  {resource.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <span className="text-gray-400 text-xs">{resource.readTime}</span>
                  <button className="text-orange-400 hover:text-orange-300 transition-colors duration-200 text-sm">
                    Read More →
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Updated with <span className="text-white">Latest Insights</span>
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Get the latest web development tips, industry insights, and exclusive resources delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg flex-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
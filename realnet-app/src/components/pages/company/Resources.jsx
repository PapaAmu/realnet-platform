"use client";

import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { getApiBaseUrl } from "@/lib/api-config";
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
  FaEnvelope,
  FaSpinner,
  FaImage
} from "react-icons/fa";

const createPlaceholderImage = (width = 800, height = 400) => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1a1a1a"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="20" fill="#4b5563" text-anchor="middle" dy=".3em">Resource Image</text>
    </svg>
  `)}`;
};

const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return createPlaceholderImage();
  }
  
  if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
    return imagePath;
  }
  
  const baseUrl = getApiBaseUrl();

  if (imagePath.startsWith('/storage/')) {
    return `${baseUrl}${imagePath}`;
  }
  
  if (imagePath.startsWith('/')) {
    return `${baseUrl}/storage${imagePath}`;
  }
  
  return `${baseUrl}/storage/${imagePath}`;
};

const ResourceCardImage = ({ src, alt, className, ...props }) => {
  const [imageSrc, setImageSrc] = useState(getImageUrl(src));
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImageSrc(getImageUrl(src));
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setImageSrc(createPlaceholderImage());
      setHasError(true);
    }
  };

  return (
    <div className={`relative ${className} overflow-hidden bg-white/5`}>
      <img
        src={imageSrc}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={handleError}
        {...props}
      />
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5">
          <FaImage className="text-white/20 text-3xl" />
        </div>
      )}
    </div>
  );
};

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${getApiBaseUrl()}/api/resources/posts`);
      if (!response.ok) {
        throw new Error('Failed to fetch resources');
      }
      const data = await response.json();
      if (data.success && data.posts) {
        setResources(data.posts);
      } else {
        setResources([]);
      }
    } catch (err) {
      console.error('Error fetching resources:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const categories = [
    { name: "All", icon: FaTag },
    { name: "Web Development", icon: FaCode },
    { name: "Mobile Apps", icon: FaMobile },
    { name: "Digital Marketing", icon: FaSearch },
    { name: "UI/UX Design", icon: FaRocket },
    { name: "Business Strategy", icon: FaShieldAlt },
    { name: "Technology", icon: FaCode },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === "All" || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         resource.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredResources = filteredResources.filter(r => r.is_featured);
  const regularResources = filteredResources.filter(r => !r.is_featured);

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
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-primary-400 mb-6">
              <FaBookmark className="w-4 h-4" />
              Knowledge Base
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Resources &
              <br />
              <span className="text-primary-400">Insights</span>
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
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/50 transition-colors"
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

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-white/60 mb-4">Failed to load resources</p>
          <button 
            onClick={fetchResources}
            className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
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
                  {featuredResources.map((resource) => (
                    <motion.article
                      key={resource.id}
                      variants={fadeInUp}
                      className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl hover:border-primary-500/30 transition-all duration-500 overflow-hidden flex flex-col"
                    >
                      <Link href={`/resources/${resource.slug}`} className="block relative h-48 sm:h-64 overflow-hidden">
                        <ResourceCardImage 
                          src={resource.image} 
                          alt={resource.title} 
                          className="w-full h-full" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                      </Link>

                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      <div className="relative z-10 p-6 sm:p-8 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-xs font-medium">
                            {resource.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-white/40">
                            <FaClock className="w-3 h-3" />
                            {resource.read_time} min read
                          </span>
                        </div>
                        
                        <Link href={`/resources/${resource.slug}`} className="block">
                          <h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-primary-400 transition-colors duration-300 line-clamp-2">
                            {resource.title}
                          </h3>
                        </Link>
                        
                        <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3 flex-grow">
                          {resource.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-xs text-white/40">
                            {new Date(resource.created_at || resource.published_at).toLocaleDateString()}
                          </span>
                          <Link 
                            href={`/resources/${resource.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary-400 group-hover:text-primary-300 transition-colors"
                          >
                            Read Article <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </Link>
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
                  {(activeCategory === "All" ? regularResources : filteredResources.filter(r => !r.is_featured)).map((resource) => (
                    <motion.article
                      key={resource.id}
                      variants={fadeInUp}
                      className="group relative bg-white/[0.02] border border-white/[0.06] rounded-xl hover:border-primary-500/30 hover:bg-white/[0.04] transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      <Link href={`/resources/${resource.slug}`} className="block relative h-48 overflow-hidden">
                        <ResourceCardImage 
                          src={resource.image} 
                          alt={resource.title} 
                          className="w-full h-full" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                      </Link>

                      <div className="p-5 sm:p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-white/60 text-xs">
                            {resource.category}
                          </span>
                        </div>
                        
                        <Link href={`/resources/${resource.slug}`} className="block">
                          <h3 className="font-semibold mb-2 group-hover:text-primary-400 transition-colors duration-300 line-clamp-2 text-sm sm:text-base">
                            {resource.title}
                          </h3>
                        </Link>
                        
                        <p className="text-white/40 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                          {resource.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] mt-auto">
                          <div className="flex items-center gap-3 text-xs text-white/30">
                            <span className="flex items-center gap-1">
                              <FaCalendarAlt className="w-3 h-3" />
                              {new Date(resource.created_at || resource.published_at).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaClock className="w-3 h-3" />
                              {resource.read_time} min
                            </span>
                          </div>
                          <Link href={`/resources/${resource.slug}`}>
                            <FaArrowRight className="w-4 h-4 text-white/20 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-20 text-white/40">
                  No resources found matching your criteria.
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Resources;

// app/updates/blogs/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaClock, 
  FaTags, 
  FaSearch, 
  FaArrowRight,
  FaBookmark,
  FaFilter,
  FaTimesCircle,
  FaImage
} from 'react-icons/fa';

// Helper functions with improved error handling
const parseTags = (tags) => {
  if (Array.isArray(tags)) {
    return tags;
  }
  
  if (typeof tags === 'string') {
    try {
      const parsed = JSON.parse(tags);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      if (tags.includes(',')) {
        return tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      }
      return tags.trim() ? [tags.trim()] : [];
    }
  }
  
  return [];
};

// Create a simple placeholder image using data URI to avoid 404 errors
const createPlaceholderImage = (width = 400, height = 300) => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#9ca3af" text-anchor="middle" dy=".3em">Blog Image</text>
    </svg>
  `)}`;
};

const getImageUrl = (imagePath) => {
  // If no image path, return placeholder
  if (!imagePath) {
    return createPlaceholderImage();
  }
  
  // If it's already a full URL or data URI, return as is
  if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
    return imagePath;
  }
  
  // Handle different path formats
  if (imagePath.startsWith('/storage/')) {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}${imagePath}`;
  }
  
  if (imagePath.startsWith('/')) {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage${imagePath}`;
  }
  
  return `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/${imagePath}`;
};

// Image component with proper error handling
const BlogImage = ({ src, alt, className, ...props }) => {
  const [imageSrc, setImageSrc] = useState(getImageUrl(src));
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImageSrc(createPlaceholderImage());
      setHasError(true);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <img
        src={imageSrc}
        alt={alt}
        className="w-full h-full object-cover"
        onError={handleError}
        {...props}
      />
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <FaImage className="text-gray-400 text-2xl" />
        </div>
      )}
    </div>
  );
};

// Blog Card Component
const BlogCard = ({ post }) => {
  const safeTags = parseTags(post.tags);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100"
    >
      <Link href={`/updates/blogs/${post.slug}`} className="block">
        <div className="relative overflow-hidden">
          <BlogImage
            src={post.image}
            alt={post.title}
            className="w-full h-52 group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          {post.is_featured && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full shadow-lg">
                Featured
              </span>
            </div>
          )}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full capitalize shadow-lg">
              {post.category}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="text-orange-500" />
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaClock className="text-orange-500" />
            <span>{post.read_time}</span>
          </div>
        </div>
        
        <Link href={`/updates/blogs/${post.slug}`} className="block">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors line-clamp-2 leading-tight">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        {safeTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {safeTags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full border border-gray-200"
              >
                #{tag}
              </span>
            ))}
            {safeTags.length > 2 && (
              <span className="px-2.5 py-1 bg-gray-100 text-gray-500 text-xs rounded-full border border-gray-200">
                +{safeTags.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaUser className="text-orange-500 text-xs" />
            <span className="font-medium">{post.author || 'Unknown Author'}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-orange-500 transition-colors p-1.5 hover:bg-orange-50 rounded-lg">
              <FaBookmark className="text-sm" />
            </button>
            <Link
              href={`/updates/blogs/${post.slug}`}
              className="flex items-center gap-2 text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors group/btn"
            >
              Read More
              <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

// Featured Blog Card Component
const FeaturedBlogCard = ({ post }) => {
  const safeTags = parseTags(post.tags);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100"
    >
      <Link href={`/updates/blogs/${post.slug}`} className="block">
        <div className="lg:flex">
          <div className="lg:w-2/5">
            <div className="h-80 lg:h-full relative overflow-hidden">
              <BlogImage
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className="px-4 py-2 bg-orange-500 text-white text-sm font-bold rounded-full shadow-lg capitalize">
                  {post.category}
                </span>
                <span className="px-4 py-2 bg-purple-500 text-white text-sm font-bold rounded-full shadow-lg">
                  Featured
                </span>
              </div>
            </div>
          </div>
          <div className="lg:w-3/5 p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                  <FaUser className="text-orange-500 text-xs" />
                  <span className="font-medium">{post.author || 'Unknown Author'}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                  <FaCalendarAlt className="text-orange-500 text-xs" />
                  <span className="font-medium">{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                  <FaClock className="text-orange-500 text-xs" />
                  <span className="font-medium">{post.read_time}</span>
                </div>
              </div>
              
              <Link href={`/updates/blogs/${post.slug}`} className="block">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-orange-500 transition-colors leading-tight">
                  {post.title}
                </h3>
              </Link>
              
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                {post.excerpt}
              </p>
            </div>
            
            <div>
              {safeTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {safeTags.slice(0, 4).map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gradient-to-r from-orange-50 to-pink-50 text-orange-700 border border-orange-200 text-sm font-medium rounded-full hover:shadow-md transition-shadow cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <Link
                  href={`/updates/blogs/${post.slug}`}
                  className="flex items-center gap-3 text-orange-500 font-bold hover:text-orange-600 transition-colors group/read text-lg"
                >
                  Read Full Article
                  <motion.span
                    animate={{ x: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <FaArrowRight />
                  </motion.span>
                </Link>
                
                <div className="flex items-center gap-3 text-gray-400">
                  <button className="hover:text-orange-500 transition-colors p-2 hover:bg-orange-50 rounded-lg">
                    <FaBookmark />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

// Mobile Filter Component
const MobileFilters = ({ 
  isOpen, 
  onClose, 
  categories, 
  selectedCategory, 
  onCategoryChange,
  searchQuery,
  onSearchChange 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaTimesCircle className="text-lg" />
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Search Articles
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  {searchQuery && (
                    <button
                      onClick={() => onSearchChange('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <FaTimesCircle />
                    </button>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Categories
                </label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        onCategoryChange(category);
                        onClose();
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-orange-500 text-white shadow-md'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="capitalize font-medium">
                        {category.replace('-', ' ')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = [
    'all',
    'web-development',
    'mobile-apps',
    'digital-marketing',
    'ui-ux-design',
    'business-strategy',
    'technology'
  ];

  // Fetch posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/posts`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch blog posts: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          const processedPosts = (data.posts || []).map(post => ({
            ...post,
            tags: parseTags(post.tags)
          }));
          setPosts(processedPosts);
        } else {
          throw new Error(data.message || 'Failed to fetch blog posts');
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const featuredPosts = posts.filter(post => post.is_featured);
  const regularPosts = posts.filter(post => !post.is_featured);

  const filteredPosts = posts.filter(post => {
    const safeTags = parseTags(post.tags);
    const matchesSearch = post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         safeTags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-6"
          />
          <p className="text-gray-600 text-lg font-medium">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">😞</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Error Loading Blog</h2>
          <p className="text-gray-600 mb-6 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-semibold text-lg shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white pb-20 pt-8">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pt-8 pb-16">
            <motion.h1
              className="text-5xl md:text-7xl font-black mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our Blog
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed opacity-95"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover the latest insights, trends, and expert opinions on technology, 
              design, and business growth strategies.
            </motion.p>
          </div>

          {/* Search Bar */}
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles, tags, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-8 py-6 pl-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-white/30 text-lg font-medium"
              />
              <FaSearch className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white/70 text-xl" />
              {(searchQuery || selectedCategory !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2"
                >
                  <FaTimesCircle className="text-xl" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden flex justify-between items-center mb-6">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-lg border border-gray-200 text-gray-700 font-semibold hover:shadow-xl transition-all"
            >
              <FaFilter className="text-orange-500" />
              Filters
            </button>
            {(searchQuery || selectedCategory !== 'all') && (
              <div className="text-sm text-gray-600 font-medium">
                {filteredPosts.length} articles found
              </div>
            )}
          </div>

          {/* Blog Posts */}
          <div className="lg:w-2/3">
            {/* Featured Posts */}
            {searchQuery === '' && selectedCategory === 'all' && featuredPosts.length > 0 && (
              <motion.section
                className="mb-16"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-black text-gray-900 flex items-center">
                    <span className="w-3 h-12 bg-orange-500 rounded-full mr-4"></span>
                    Featured Articles
                  </h2>
                  <div className="text-sm text-gray-500 font-medium">
                    {featuredPosts.length} featured
                  </div>
                </div>
                <div className="grid gap-8">
                  {featuredPosts.map((post) => (
                    <FeaturedBlogCard
                      key={post.id}
                      post={post}
                    />
                  ))}
                </div>
              </motion.section>
            )}

            {/* All Posts */}
            <motion.section
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-gray-900 flex items-center">
                  <span className="w-3 h-12 bg-orange-500 rounded-full mr-4"></span>
                  {searchQuery || selectedCategory !== 'all' ? 'Search Results' : 'Latest Articles'}
                </h2>
                <div className="text-sm text-gray-500 font-medium">
                  {filteredPosts.length} articles
                </div>
              </div>
              
              {filteredPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-8">
                  {filteredPosts.map((post) => (
                    <BlogCard
                      key={post.id}
                      post={post}
                    />
                  ))}
                </div>
              ) : (
                <motion.div
                  className="text-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="text-8xl mb-6">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles found</h3>
                  <p className="text-gray-600 mb-8 text-lg">
                    Try adjusting your search terms or browse different categories.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-8 py-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-semibold text-lg"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-8 space-y-8">
              {/* Categories */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center">
                  <FaTags className="text-orange-500 mr-3 text-lg" />
                  Categories
                </h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-200 flex items-center justify-between ${
                        selectedCategory === category
                          ? 'bg-orange-500 text-white shadow-lg transform scale-105'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md'
                      }`}
                    >
                      <span className="capitalize font-semibold">
                        {category.replace('-', ' ')}
                      </span>
                      {selectedCategory === category && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-white rounded-full"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Newsletter */}
              <motion.div
                className="bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl shadow-xl p-6 text-white"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-black mb-4">Stay Updated</h3>
                <p className="mb-6 opacity-95 leading-relaxed">
                  Get the latest articles, insights, and industry news delivered straight to your inbox.
                </p>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-5 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 font-medium"
                  />
                  <button className="w-full bg-white text-orange-600 font-black py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-200">
                    Subscribe Now
                  </button>
                </div>
              </motion.div>

              {/* Popular Tags */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-xl font-black text-gray-900 mb-6">Popular Tags</h3>
                <div className="flex flex-wrap gap-3">
                  {['React', 'NextJS', 'SEO', 'UI/UX', 'Mobile', 'AI', 'Web3', 'Performance', 'Startup', 'Marketing'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-4 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 text-sm font-semibold rounded-xl border border-gray-200 hover:border-orange-300 hover:from-orange-50 hover:to-pink-50 hover:text-orange-700 transition-all duration-200 hover:shadow-md"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      <MobileFilters
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
    </div>
  );
};

export default BlogPage;
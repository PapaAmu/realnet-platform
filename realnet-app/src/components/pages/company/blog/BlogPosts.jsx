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

// Helper functions - UNCHANGED
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

const createPlaceholderImage = (width = 400, height = 300) => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#9ca3af" text-anchor="middle" dy=".3em">Blog Image</text>
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
  
  if (imagePath.startsWith('/storage/')) {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}${imagePath}`;
  }
  
  if (imagePath.startsWith('/')) {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage${imagePath}`;
  }
  
  return `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/${imagePath}`;
};

// Image component - UNCHANGED
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
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-white/5">
          <FaImage className="text-gray-400 dark:text-white/20 text-2xl" />
        </div>
      )}
    </div>
  );
};

// Simplified Blog Card
const BlogCard = ({ post }) => {
  const safeTags = parseTags(post.tags);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group bg-white dark:bg-white/[0.02] rounded-2xl border border-gray-200 dark:border-white/[0.06] overflow-hidden hover:border-blue-500/30 dark:hover:border-primary-500/30 transition-all duration-300"
    >
      <Link href={`/updates/blogs/${post.slug}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <BlogImage
            src={post.image}
            alt={post.title}
            className="w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-sm text-xs font-medium text-gray-900 dark:text-white rounded-full border border-gray-200 dark:border-white/10 capitalize">
              {post.category}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex items-center gap-4 mb-3 text-xs text-gray-500 dark:text-white/40">
          <span className="flex items-center gap-1">
            <FaCalendarAlt className="text-blue-600 dark:text-primary-400" />
            {new Date(post.created_at).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <FaClock className="text-blue-600 dark:text-primary-400" />
            {post.read_time}
          </span>
        </div>
        
        <Link href={`/updates/blogs/${post.slug}`} className="block mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 dark:text-white/50 text-sm leading-relaxed line-clamp-2 mb-4">
          {post.excerpt}
        </p>

        {safeTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {safeTags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-2.5 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/50 text-xs rounded-full border border-gray-200 dark:border-white/[0.06]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/[0.06]">
          <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/50">
            <FaUser className="text-blue-600 dark:text-primary-400 text-xs" />
            {post.author || 'Unknown'}
          </span>
          
          <Link
            href={`/updates/blogs/${post.slug}`}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-primary-400 hover:gap-3 transition-all"
          >
            Read
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

// Simplified Featured Card
const FeaturedBlogCard = ({ post }) => {
  const safeTags = parseTags(post.tags);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-white dark:bg-white/[0.02] rounded-2xl border border-gray-200 dark:border-white/[0.06] overflow-hidden hover:border-blue-500/30 dark:hover:border-primary-500/30 transition-all duration-300"
    >
      <Link href={`/updates/blogs/${post.slug}`} className="block">
        <div className="lg:flex">
          <div className="lg:w-1/2 h-64 lg:h-auto relative overflow-hidden">
            <BlogImage
              src={post.image}
              alt={post.title}
              className="w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 bg-blue-600 dark:bg-primary-500 text-white text-xs font-medium rounded-full">
                Featured
              </span>
              <span className="px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-sm text-xs font-medium text-gray-900 dark:text-white rounded-full capitalize">
                {post.category}
              </span>
            </div>
          </div>
          
          <div className="lg:w-1/2 p-8 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-white/40">
              <span className="flex items-center gap-1">
                <FaUser className="text-blue-600 dark:text-primary-400" />
                {post.author || 'Unknown'}
              </span>
              <span className="flex items-center gap-1">
                <FaCalendarAlt className="text-blue-600 dark:text-primary-400" />
                {new Date(post.created_at).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <FaClock className="text-blue-600 dark:text-primary-400" />
                {post.read_time}
              </span>
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-primary-400 transition-colors">
              {post.title}
            </h3>
            
            <p className="text-gray-600 dark:text-white/50 mb-6 leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>

            {safeTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {safeTags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/50 text-sm rounded-full border border-gray-200 dark:border-white/[0.06]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <div className="flex items-center gap-2 text-blue-600 dark:text-primary-400 font-medium">
              Read Article
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

// Mobile Filter - Simplified
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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-[#0a0a0a] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                >
                  <FaTimesCircle className="text-lg text-gray-500 dark:text-white/50" />
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-primary-500"
                  />
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
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
                      className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                        selectedCategory === category
                          ? 'bg-blue-600 dark:bg-primary-500 text-white'
                          : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white/70 hover:bg-gray-200 dark:hover:bg-white/10'
                      }`}
                    >
                      <span className="capitalize">{category.replace('-', ' ')}</span>
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

  // Fetch posts - UNCHANGED
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

  // Loading state - Simplified
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#050505] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-2 border-blue-600 dark:border-primary-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Error state - Simplified
  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#050505] flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Unable to Load</h2>
          <p className="text-gray-600 dark:text-white/50 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 dark:bg-primary-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-300">
      {/* Header */}
      <section className="relative pt-24 pb-16 bg-gray-50 dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-600 dark:text-white/60 mb-6">
              <FaTags className="text-blue-600 dark:text-primary-400" />
              Our Blog
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Insights &<br />
              <span className="text-blue-600 dark:text-primary-400">Perspectives</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-white/50 mb-8">
              Thoughts on technology, design, and building great digital products.
            </p>

            {/* Search */}
            <div className="relative max-w-lg">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:border-blue-500 dark:focus:border-primary-500 transition-colors"
              />
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30" />
              {(searchQuery || selectedCategory !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white/70"
                >
                  <FaTimesCircle />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Posts Column */}
          <div className="lg:w-2/3">
            {/* Mobile Filter Button */}
            <div className="lg:hidden flex justify-between items-center mb-8">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-700 dark:text-white font-medium"
              >
                <FaFilter className="text-blue-600 dark:text-primary-400" />
                Filter
              </button>
              <span className="text-sm text-gray-500 dark:text-white/40">
                {filteredPosts.length} posts
              </span>
            </div>

            {/* Featured Posts */}
            {searchQuery === '' && selectedCategory === 'all' && featuredPosts.length > 0 && (
              <section className="mb-16">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-px bg-blue-600 dark:bg-primary-400" />
                  Featured
                </h2>
                <div className="space-y-8">
                  {featuredPosts.map((post) => (
                    <FeaturedBlogCard key={post.id} post={post} />
                  ))}
                </div>
              </section>
            )}

            {/* All Posts */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                  <span className="w-8 h-px bg-gray-300 dark:bg-white/10" />
                  {searchQuery || selectedCategory !== 'all' ? 'Results' : 'Latest'}
                </h2>
                <span className="text-sm text-gray-500 dark:text-white/40">
                  {filteredPosts.length} posts
                </span>
              </div>
              
              {filteredPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-50 dark:bg-white/[0.02] rounded-2xl border border-gray-200 dark:border-white/[0.06]">
                  <p className="text-gray-500 dark:text-white/40 mb-4">No articles found</p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-blue-600 dark:bg-primary-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-8 space-y-8">
              
              {/* Categories */}
              <div className="bg-gray-50 dark:bg-white/[0.02] rounded-2xl p-6 border border-gray-200 dark:border-white/[0.06]">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between ${
                        selectedCategory === category
                          ? 'bg-blue-600 dark:bg-primary-500 text-white'
                          : 'text-gray-700 dark:text-white/70 hover:bg-white dark:hover:bg-white/5'
                      }`}
                    >
                      <span className="capitalize">{category.replace('-', ' ')}</span>
                      {selectedCategory === category && <FaArrowRight className="text-sm" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gray-900 dark:bg-white/[0.02] rounded-2xl p-6 border border-gray-200 dark:border-white/[0.06]">
                <h3 className="text-lg font-semibold text-white dark:text-white mb-2">Newsletter</h3>
                <p className="text-gray-400 dark:text-white/50 text-sm mb-6">
                  Get the latest posts delivered to your inbox.
                </p>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/30 mb-3 focus:outline-none focus:border-primary-500"
                />
                <button className="w-full py-3 bg-white dark:bg-primary-500 text-gray-900 dark:text-white rounded-xl font-medium hover:opacity-90 transition-opacity">
                  Subscribe
                </button>
              </div>

              {/* Tags */}
              <div className="bg-gray-50 dark:bg-white/[0.02] rounded-2xl p-6 border border-gray-200 dark:border-white/[0.06]">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'NextJS', 'SEO', 'UI/UX', 'Mobile', 'AI'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-3 py-1.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/[0.06] text-gray-600 dark:text-white/60 text-sm rounded-full hover:border-blue-500 dark:hover:border-primary-500 hover:text-blue-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
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
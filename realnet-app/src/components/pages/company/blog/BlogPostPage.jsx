// app/updates/blogs/[slug]/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaClock, 
  FaTags, 
  FaArrowLeft,
  FaShare,
  FaBookmark,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaLink,
  FaSpinner,
  FaImage
} from 'react-icons/fa';

// Helper functions
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

const createPlaceholderImage = (width = 800, height = 400) => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="20" fill="#9ca3af" text-anchor="middle" dy=".3em">Featured Blog Image</text>
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

// Blog Image component for individual post page
const BlogPostImage = ({ src, alt, className, ...props }) => {
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
          <FaImage className="text-gray-400 text-3xl" />
        </div>
      )}
    </div>
  );
};

// Blog Image component for related posts (to fix the undefined error)
const BlogImage = ({ src, alt, className, ...props }) => {
  const [imageSrc, setImageSrc] = useState(getImageUrl(src));
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImageSrc(createPlaceholderImage(400, 200));
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

const BlogPostPage = () => {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/posts/${params.slug}`
        );
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Blog post not found');
          }
          throw new Error(`Failed to fetch blog post: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.post) {
          setPost(data.post);
          // Fetch related posts based on category
          fetchRelatedPosts(data.post.category, data.post.id);
        } else {
          throw new Error(data.message || 'Blog post not found');
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedPosts = async (category, currentPostId) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/posts?category=${category}`
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            // Filter out current post and limit to 3 posts
            const related = (data.posts || [])
              .filter(p => p.id !== currentPostId)
              .slice(0, 3);
            setRelatedPosts(related);
          }
        }
      } catch (err) {
        console.error('Error fetching related posts:', err);
      }
    };

    if (params.slug) {
      fetchPost();
    }
  }, [params.slug]);

  const safeTags = post ? parseTags(post.tags) : [];

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out this article: ${post?.title}`;

  const handleShare = (platform) => {
    const url = encodeURIComponent(shareUrl);
    const text = encodeURIComponent(shareText);
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link:', err);
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
          <p className="text-gray-600 text-lg font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">😞</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {error?.includes('not found') ? 'Article Not Found' : 'Error Loading Article'}
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            {error || 'The article you\'re looking for doesn\'t exist.'}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-semibold shadow-lg"
            >
              Go Back
            </button>
            <Link
              href="/updates/blogs"
              className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-semibold shadow-lg"
            >
              Browse All Articles
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link
              href="/updates/blogs"
              className="flex items-center gap-3 text-gray-600 hover:text-orange-500 transition-colors font-semibold"
            >
              <FaArrowLeft className="text-lg" />
              <span className="hidden sm:inline">Back to Articles</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-orange-500 transition-colors p-2 hover:bg-orange-50 rounded-lg">
                <FaBookmark className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <section className="relative bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 lg:mb-8">
            <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/updates/blogs" className="hover:text-orange-500 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium capitalize">{post.category}</span>
          </div>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-3 lg:gap-4 mb-6">
            <div className="flex items-center gap-2 bg-orange-50 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full">
              <FaCalendarAlt className="text-orange-500 text-sm" />
              <span className="font-medium text-orange-700 text-sm lg:text-base">
                {new Date(post.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full">
              <FaUser className="text-blue-500 text-sm" />
              <span className="font-medium text-blue-700 text-sm lg:text-base">{post.author || 'Unknown Author'}</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full">
              <FaClock className="text-green-500 text-sm" />
              <span className="font-medium text-green-700 text-sm lg:text-base">{post.read_time}</span>
            </div>
            {post.is_featured && (
              <div className="flex items-center gap-2 bg-purple-50 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full">
                <span className="font-medium text-purple-700 text-sm lg:text-base">Featured</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 mb-4 lg:mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg lg:text-xl text-gray-600 mb-6 lg:mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Featured Image */}
          <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl lg:shadow-2xl mb-6 lg:mb-8">
            <BlogPostImage
              src={post.image}
              alt={post.title}
              className="w-full h-64 lg:h-96 object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="px-3 lg:px-4 py-1.5 lg:py-2 bg-orange-500 text-white text-xs lg:text-sm font-bold rounded-full shadow-lg capitalize">
                {post.category}
              </span>
              {post.is_featured && (
                <span className="px-3 lg:px-4 py-1.5 lg:py-2 bg-purple-500 text-white text-xs lg:text-sm font-bold rounded-full shadow-lg">
                  Featured
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="prose prose-sm lg:prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed text-base lg:text-lg"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>

            {/* Tags */}
            {safeTags.length > 0 && (
              <div className="mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-gray-200">
                <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 lg:mb-6">Tags</h4>
                <div className="flex flex-wrap gap-2 lg:gap-3">
                  {safeTags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 lg:px-4 py-1.5 lg:py-2 bg-gradient-to-r from-orange-50 to-pink-50 text-orange-700 border border-orange-200 text-sm font-medium rounded-full hover:shadow-md transition-shadow cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Share */}
            <div className="mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6">
                <span className="text-lg lg:text-xl font-bold text-gray-900">Share this article:</span>
                <div className="flex flex-wrap gap-3 lg:gap-4">
                  <button 
                    onClick={() => handleShare('facebook')}
                    className="flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-md text-sm lg:text-base"
                  >
                    <FaFacebook className="text-sm lg:text-lg" />
                    <span className="font-semibold">Share</span>
                  </button>
                  <button 
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 bg-blue-400 text-white rounded-xl hover:bg-blue-500 transition-all duration-200 hover:scale-105 shadow-md text-sm lg:text-base"
                  >
                    <FaTwitter className="text-sm lg:text-lg" />
                    <span className="font-semibold">Tweet</span>
                  </button>
                  <button 
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-all duration-200 hover:scale-105 shadow-md text-sm lg:text-base"
                  >
                    <FaLinkedin className="text-sm lg:text-lg" />
                    <span className="font-semibold">Share</span>
                  </button>
                  <button 
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all duration-200 hover:scale-105 shadow-md text-sm lg:text-base"
                  >
                    <FaLink className="text-sm lg:text-lg" />
                    <span className="font-semibold">Copy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Author Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h4 className="text-lg font-bold text-gray-900 mb-4">About Author</h4>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {post.author ? post.author.charAt(0).toUpperCase() : 'A'}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{post.author || 'Anonymous'}</p>
                    <p className="text-sm text-gray-500">Author</p>
                  </div>
                </div>
              </div>

              {/* Table of Contents */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h4 className="text-lg font-bold text-gray-900 mb-4">In this Article</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="text-gray-500">Table of contents would be generated based on article headings.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-12 lg:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-black text-gray-900 mb-6 lg:mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedPosts.map((relatedPost) => (
                <article 
                  key={relatedPost.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100 cursor-pointer"
                  onClick={() => router.push(`/updates/blogs/${relatedPost.slug}`)}
                >
                  <div className="relative overflow-hidden">
                    <BlogImage
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-48 group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full capitalize shadow-lg">
                        {relatedPost.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 lg:p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{new Date(relatedPost.created_at).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1 text-orange-500 font-semibold">
                        Read More
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPostPage;
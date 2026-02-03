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
  FaBookmark,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaLink,
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

// Blog Image component - UNCHANGED
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
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-white/5">
          <FaImage className="text-gray-400 dark:text-white/20 text-3xl" />
        </div>
      )}
    </div>
  );
};

// Blog Image for related posts - UNCHANGED
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
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-white/5">
          <FaImage className="text-gray-400 dark:text-white/20 text-2xl" />
        </div>
      )}
    </div>
  );
};

const BlogPostPage = ({ post: initialPost }) => {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState(initialPost);
  const [loading, setLoading] = useState(!initialPost);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (initialPost) {
      setPost(initialPost);
      setLoading(false);
      fetchRelatedPosts(initialPost.category, initialPost.id);
    } else if (params.slug) {
      fetchPost();
    }
  }, [initialPost, params.slug]);

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
      <div className="min-h-screen bg-white dark:bg-[#050505] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-2 border-blue-600 dark:border-violet-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#050505] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {error?.includes('not found') ? 'Not Found' : 'Error'}
          </h2>
          <p className="text-gray-600 dark:text-white/50 mb-6">
            {error || 'The article you\'re looking for doesn\'t exist.'}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-white/20 transition-colors"
            >
              Go Back
            </button>
            <Link
              href="/updates/blogs"
              className="px-6 py-3 bg-blue-600 dark:bg-violet-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              Browse Articles
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-300">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/updates/blogs"
              className="flex items-center gap-2 text-gray-600 dark:text-white/60 hover:text-blue-600 dark:hover:text-violet-400 transition-colors text-sm font-medium"
            >
              <FaArrowLeft />
              Back to Articles
            </Link>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleShare('twitter')}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/60 hover:bg-blue-100 dark:hover:bg-blue-500/20 hover:text-blue-600 transition-colors"
              >
                <FaTwitter className="text-sm" />
              </button>
              <button 
                onClick={() => handleShare('facebook')}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/60 hover:bg-blue-100 dark:hover:bg-blue-500/20 hover:text-blue-600 transition-colors"
              >
                <FaFacebook className="text-sm" />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                <FaBookmark className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <header className="pt-16 pb-12 border-b border-gray-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-white/40 mb-8">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-violet-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/updates/blogs" className="hover:text-blue-600 dark:hover:text-violet-400 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white capitalize">{post.category}</span>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500 dark:text-white/50">
            <span className="flex items-center gap-2">
              <FaCalendarAlt className="text-blue-600 dark:text-violet-400" />
              {new Date(post.created_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
            <span className="flex items-center gap-2">
              <FaClock className="text-blue-600 dark:text-violet-400" />
              {post.read_time}
            </span>
            <span className="flex items-center gap-2">
              <FaUser className="text-blue-600 dark:text-violet-400" />
              {post.author || 'Unknown'}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-gray-600 dark:text-white/50 leading-relaxed max-w-2xl">
            {post.excerpt}
          </p>
        </div>
      </header>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-6 -mt-8">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-900/10 dark:shadow-violet-500/10">
          <BlogPostImage
            src={post.image}
            alt={post.title}
            className="w-full aspect-[21/9] object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1.5 bg-white/90 dark:bg-black/80 backdrop-blur-sm text-xs font-medium text-gray-900 dark:text-white rounded-full border border-gray-200 dark:border-white/10 capitalize">
              {post.category}
            </span>
            {post.is_featured && (
              <span className="px-3 py-1.5 bg-blue-600 dark:bg-violet-500 text-white text-xs font-medium rounded-full">
                Featured
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <div 
            className="text-gray-700 dark:text-white/70 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Tags */}
        {safeTags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <FaTags className="text-gray-400 dark:text-white/30" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {safeTags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white/60 text-sm rounded-full border border-gray-200 dark:border-white/[0.06] hover:border-blue-500 dark:hover:border-violet-500 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10">
          <span className="text-sm font-medium text-gray-900 dark:text-white mb-4 block">Share this article</span>
          <div className="flex gap-3">
            <button 
              onClick={() => handleShare('twitter')}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white/70 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-500/10 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              <FaTwitter />
              Twitter
            </button>
            <button 
              onClick={() => handleShare('facebook')}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white/70 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-500/10 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              <FaFacebook />
              Facebook
            </button>
            <button 
              onClick={() => handleShare('linkedin')}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white/70 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-500/10 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              <FaLinkedin />
              LinkedIn
            </button>
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white/70 rounded-xl hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-sm font-medium"
            >
              <FaLink />
              Copy Link
            </button>
          </div>
        </div>
      </main>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-white/10 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article 
                  key={relatedPost.id}
                  className="group bg-white dark:bg-white/[0.02] rounded-2xl border border-gray-200 dark:border-white/[0.06] overflow-hidden hover:border-blue-500/30 dark:hover:border-violet-500/30 transition-all duration-300 cursor-pointer"
                  onClick={() => router.push(`/updates/blogs/${relatedPost.slug}`)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <BlogImage
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-sm text-xs font-medium text-gray-900 dark:text-white rounded-full capitalize">
                        {relatedPost.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-white/40 mb-3">
                      <span>{new Date(relatedPost.created_at).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{relatedPost.read_time}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-white/50 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
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
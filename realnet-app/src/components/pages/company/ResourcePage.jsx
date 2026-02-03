'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { getApiBaseUrl } from '@/lib/api-config';
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
      <rect width="100%" height="100%" fill="#1a1a1a"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="20" fill="#4b5563" text-anchor="middle" dy=".3em">Featured Resource Image</text>
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

// Resource Image component
const ResourcePostImage = ({ src, alt, className, ...props }) => {
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
        <div className="absolute inset-0 flex items-center justify-center bg-white/5">
          <FaImage className="text-white/20 text-3xl" />
        </div>
      )}
    </div>
  );
};

// Image for related posts
const RelatedResourceImage = ({ src, alt, className, ...props }) => {
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
        <div className="absolute inset-0 flex items-center justify-center bg-white/5">
          <FaImage className="text-white/20 text-2xl" />
        </div>
      )}
    </div>
  );
};

const ResourcePageComponent = ({ post: initialPost }) => {
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
        `${getApiBaseUrl()}/api/resources/posts/${params.slug}`
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Resource not found');
        }
        throw new Error(`Failed to fetch resource: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.post) {
        setPost(data.post);
        fetchRelatedPosts(data.post.category, data.post.id);
      } else {
        throw new Error(data.message || 'Resource not found');
      }
    } catch (err) {
      console.error('Error fetching resource:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPosts = async (category, currentPostId) => {
    try {
      const response = await fetch(
        `${getApiBaseUrl()}/api/resources/posts?category=${category}`
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
      console.error('Error fetching related resources:', err);
    }
  };

  const safeTags = post ? parseTags(post.tags) : [];

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out this resource: ${post?.title}`;

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
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-white mb-4">
            {error?.includes('not found') ? 'Not Found' : 'Error'}
          </h2>
          <p className="text-white/50 mb-6">
            {error || 'The resource you\'re looking for doesn\'t exist.'}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors"
            >
              Go Back
            </button>
            <Link
              href="/resources"
              className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              Browse Resources
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/30 selection:text-primary/30">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/resources"
              className="flex items-center gap-2 text-white/60 hover:text-primary/70 transition-colors text-sm font-medium"
            >
              <FaArrowLeft />
              Back to Resources
            </Link>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleShare('twitter')}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-white/60 hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
              >
                <FaTwitter className="text-sm" />
              </button>
              <button 
                onClick={() => handleShare('facebook')}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-white/60 hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
              >
                <FaFacebook className="text-sm" />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-white/60 hover:bg-white/10 transition-colors">
                <FaBookmark className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <header className="relative pt-12 pb-12 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category & Date */}
            <div className="flex items-center gap-4 text-sm mb-6">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20 font-medium">
                {post.category}
              </span>
              <span className="flex items-center gap-2 text-white/50">
                <FaCalendarAlt />
                {new Date(post.created_at || post.published_at).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-2 text-white/50">
                <FaClock />
                {post.read_time} min read
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-8">
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center justify-between py-6 border-y border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <FaUser className="text-white/40" />
                </div>
                <div>
                  <div className="font-medium">{post.author || 'Realnet Team'}</div>
                  <div className="text-sm text-white/40">Author</div>
                </div>
              </div>
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <FaLink />
                Copy Link
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl overflow-hidden border border-white/10 aspect-[21/9] bg-white/5"
        >
          <ResourcePostImage
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 mb-20">
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-white/80 prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-white prose-code:text-primary prose-code:bg-white/5 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none"
        >
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </motion.article>

        {/* Tags */}
        {safeTags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex items-center gap-2 text-white/60 mb-4">
              <FaTags />
              <span className="text-sm font-medium uppercase tracking-wider">Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {safeTags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/5 text-white/70 rounded-full text-sm hover:bg-white/10 transition-colors cursor-default"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Resources */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-white/[0.02] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-10">Related Resources</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/resources/${relatedPost.slug}`}
                  className="group block bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-colors"
                >
                  <div className="aspect-video relative overflow-hidden bg-white/5">
                    <RelatedResourceImage
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-primary mb-3">
                      <span className="uppercase tracking-wider font-medium">{relatedPost.category}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-white/60 text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ResourcePageComponent;

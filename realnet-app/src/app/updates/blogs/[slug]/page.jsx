// app/updates/blogs/[slug]/page.jsx
import { generateSEO, generateStructuredData, parseTags } from "@/lib/SEO";
import BlogPostPageComponent from "@/components/pages/company/blog/BlogPostPage";
import { getApiBaseUrl } from "@/lib/api-config";

// Mock function - replace with your actual data fetching
async function getBlogPost(slug) {
  try {
    const response = await fetch(`${getApiBaseUrl()}/api/blog/posts/${slug}`, {
      next: { revalidate: 0 }
    });
    
    if (response.status === 404) {
      return null;
    }
    
    if (!response.ok) {
      throw new Error(`Failed to fetch blog post: ${response.status}`);
    }
    
    const data = await response.json();
    return data.post || data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Generate static params for blog posts (for SSG)
export async function generateStaticParams() {
  try {
    const response = await fetch(`${getApiBaseUrl()}/api/blog/posts`);
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    
    if (data.success && data.posts) {
      return data.posts.map((post) => ({
        slug: post.slug,
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    const post = await getBlogPost(slug);
    
    if (!post) {
      return generateSEO({
        title: 'Blog Post Not Found',
        description: 'The requested blog post could not be found.',
        path: `/updates/blogs/${slug}`,
        noindex: true,
      });
    }

    const safeTags = parseTags(post.tags);
    const keywords = safeTags.length > 0 ? safeTags.join(', ') : '';

    return generateSEO({
      title: post.title || 'Blog Post',
      description: post.excerpt || post.description || 'Read our latest blog post',
      keywords: keywords,
      path: `/updates/blogs/${slug}`,
      image: post.image || '/og-image.jpg',
      type: 'article',
      publishedTime: post.created_at || post.published_at,
      modifiedTime: post.updated_at || post.modified_at,
      author: post.author || 'Themba Real Lukhele',
    });
  } catch (error) {
    console.error('Error generating metadata:', error);
    const { slug } = await params;
    return generateSEO({
      title: 'Blog Post',
      description: 'Read our latest blog post',
      path: `/updates/blogs/${slug}`,
    });
  }
}

export default async function BlogPostPage({ params }) {
  // We'll let the client component handle fetching to avoid Docker network issues
  // and ensure consistency with the list page which works.
  return (
    <BlogPostPageComponent />
  );
}
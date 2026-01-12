// app/updates/blogs/[slug]/page.jsx
import { generateSEO, generateStructuredData, parseTags } from "@/lib/SEO";
import BlogPostPageComponent from "@/components/pages/company/blog/BlogPostPage";

// Mock function - replace with your actual data fetching
async function getBlogPost(slug) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/posts/${slug}`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/posts`);
    
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
    const post = await getBlogPost(params.slug);
    
    if (!post) {
      return generateSEO({
        title: 'Blog Post Not Found',
        description: 'The requested blog post could not be found.',
        path: `/updates/blogs/${params.slug}`,
        noindex: true,
      });
    }

    const safeTags = parseTags(post.tags);
    const keywords = safeTags.length > 0 ? safeTags.join(', ') : '';

    return generateSEO({
      title: post.title || 'Blog Post',
      description: post.excerpt || post.description || 'Read our latest blog post',
      keywords: keywords,
      path: `/updates/blogs/${params.slug}`,
      image: post.image || '/og-image.jpg',
      type: 'article',
      publishedTime: post.created_at || post.published_at,
      modifiedTime: post.updated_at || post.modified_at,
      author: post.author || 'Themba Real Lukhele',
    });
  } catch (error) {
    console.error('Error generating metadata:', error);
    return generateSEO({
      title: 'Blog Post',
      description: 'Read our latest blog post',
      path: `/updates/blogs/${params.slug}`,
    });
  }
}

export default async function BlogPostPage({ params }) {
  try {
    const post = await getBlogPost(params.slug);
    
    if (!post) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="text-8xl mb-6">😞</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8 text-lg">
              The blog post you're looking for doesn't exist or may have been moved.
            </p>
            <a
              href="/updates/blogs"
              className="px-8 py-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-semibold text-lg"
            >
              Back to Blog
            </a>
          </div>
        </div>
      );
    }

    const safeTags = parseTags(post.tags);

    const structuredData = generateStructuredData({
      type: 'Article',
      title: post.title,
      description: post.excerpt || post.description,
      url: `https://realnet-web.co.za/updates/blogs/${params.slug}`,
      image: post.image || 'https://realnet-web.co.za/og-image.jpg',
      publishedDate: post.created_at || post.published_at,
      modifiedDate: post.updated_at || post.modified_at,
      author: post.author || 'Themba Real Lukhele',
      tags: safeTags,
    });

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <BlogPostPageComponent post={post} />
      </>
    );
  } catch (error) {
    console.error('Error loading blog post:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">⚠️</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Error Loading Post</h1>
          <p className="text-gray-600 mb-8 text-lg">
            There was an error loading the blog post. Please try again later.
          </p>
          <a
            href="/updates/blogs"
            className="px-8 py-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-semibold text-lg"
          >
            Back to Blog
          </a>
        </div>
      </div>
    );
  }
}
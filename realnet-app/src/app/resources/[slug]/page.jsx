
import { generateSEO, generateStructuredData, parseTags } from "@/lib/SEO";
import ResourcePageComponent from "@/components/pages/company/ResourcePage";
import { getApiBaseUrl } from "@/lib/api-config";
import Link from 'next/link';

// Mock function - replace with your actual data fetching
async function getResourcePost(slug) {
  try {
    const response = await fetch(`${getApiBaseUrl()}/api/resources/posts/${slug}`, {
      next: { revalidate: 0 }
    });
    
    if (response.status === 404) {
      return null;
    }
    
    if (!response.ok) {
      throw new Error(`Failed to fetch resource post: ${response.status}`);
    }
    
    const data = await response.json();
    return data.post || data;
  } catch (error) {
    console.error('Error fetching resource post:', error);
    return null;
  }
}

// Generate static params for resource posts (for SSG)
export async function generateStaticParams() {
  try {
    const response = await fetch(`${getApiBaseUrl()}/api/resources/posts`);
    
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
    const post = await getResourcePost(slug);
    
    if (!post) {
      return generateSEO({
        title: 'Resource Not Found',
        description: 'The requested resource could not be found.',
        path: `/resources/${slug}`,
        noindex: true,
      });
    }

    const safeTags = parseTags(post.tags);
    const keywords = safeTags.length > 0 ? safeTags.join(', ') : '';

    return generateSEO({
      title: post.title || 'Resource',
      description: post.excerpt || post.description || 'Read our latest resource',
      keywords: keywords,
      path: `/resources/${slug}`,
      image: post.image || '/og-image.jpg',
      type: 'article',
      publishedTime: post.created_at || post.published_at,
      modifiedTime: post.updated_at || post.modified_at,
      author: post.author || 'Realnet Team',
    });
  } catch (error) {
    console.error('Error generating metadata:', error);
    const { slug } = await params;
    return generateSEO({
      title: 'Resource',
      description: 'Read our latest resource',
      path: `/resources/${slug}`,
    });
  }
}

export default async function ResourcePostPage({ params }) {
  try {
    const { slug } = await params;
    const post = await getResourcePost(slug);
    
    if (!post) {
      return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-bold text-white mb-4">Resource Not Found</h1>
            <p className="text-white/60 mb-8">The resource you are looking for does not exist or has been moved.</p>
            <Link 
              href="/resources"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition-colors"
            >
              Back to Resources
            </Link>
          </div>
        </div>
      );
    }

    const structuredData = generateStructuredData({
      type: 'Article',
      title: post.title,
      description: post.excerpt,
      image: post.image,
      publishedDate: post.published_at,
      modifiedDate: post.updated_at,
      author: post.author,
      url: `https://realnet-web.co.za/resources/${slug}`,
      tags: parseTags(post.tags)
    });

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ResourcePageComponent post={post} />
      </>
    );
  } catch (error) {
    console.error('Error rendering resource page:', error);
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Something went wrong</h1>
          <p className="text-white/60 mb-6">We couldn't load this resource.</p>
          <Link 
            href="/resources"
            className="text-violet-400 hover:text-violet-300 underline"
          >
            Return to Resources
          </Link>
        </div>
      </div>
    );
  }
}

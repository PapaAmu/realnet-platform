
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
  // We'll let the client component handle fetching to avoid Docker network issues
  // and ensure consistency with the list page which works.
  return (
    <ResourcePageComponent />
  );
}

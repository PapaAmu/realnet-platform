// app/sitemap.js
import { getStaticRoutes } from '@/lib/SEO';
import { getApiBaseUrl } from '@/lib/api-config';

const baseUrl = 'https://realnet-web.co.za';

export default async function sitemap() {
  // Get all static routes from centralized config
  const staticRoutes = getStaticRoutes();

  // Fetch blog posts for dynamic sitemap entries
  let blogPosts = [];
  try {
    const response = await fetch(`${getApiBaseUrl()}/api/blog/posts`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.posts) {
        blogPosts = data.posts.map(post => ({
          url: `${baseUrl}/updates/blogs/${post.slug}`,
          lastModified: new Date(post.updated_at || post.created_at || new Date()),
          changeFrequency: 'monthly',
          priority: 0.6,
        }));
      }
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  // Fetch resource posts for dynamic sitemap entries
  let resourcePosts = [];
  try {
    const response = await fetch(`${getApiBaseUrl()}/api/resources/posts`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.posts) {
        resourcePosts = data.posts.map(post => ({
          url: `${baseUrl}/resources/${post.slug}`,
          lastModified: new Date(post.updated_at || post.created_at || new Date()),
          changeFrequency: 'monthly',
          priority: 0.6,
        }));
      }
    }
  } catch (error) {
    console.error('Error fetching resource posts for sitemap:', error);
  }

  return [
    ...staticRoutes,
    ...blogPosts,
    ...resourcePosts,
  ];
}
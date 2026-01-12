// app/updates/blogs/page.jsx
import { generateSEO } from '@/lib/SEO';
import BlogPosts from "@/components/pages/company/blog/BlogPosts";
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export const metadata = generateSEO({
  title: 'Web Development Blog - Latest Trends & Insights',
  description: 'Stay updated with the latest web development trends, mobile app insights, and digital marketing strategies from RealNet Web Solutions.',
  keywords: 'web development blog, technology insights, mobile app trends, digital marketing tips, Johannesburg tech news',
  path: '/updates/blogs',
  type: 'website',
});

// Loading component for suspense fallback
function BlogLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading blog posts...</p>
      </div>
    </div>
  );
}

export default function BlogsPage() {
  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogPosts />
    </Suspense>
  );
}
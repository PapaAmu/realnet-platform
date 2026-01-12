// app/not-found.jsx
import { generateSEO } from "@/lib/SEO";
import NotFoundComponent from "@/components/pages/NotFound";

export const dynamic = 'force-dynamic';


export const metadata = generateSEO({
  title: 'Page Not Found | Realnet Web Solutions',
  description: 'The page you are looking for could not be found. Return to Realnet Web Solutions homepage for web development, mobile apps, and software solutions in South Africa.',
  keywords: 'page not found, 404 error, Realnet Web Solutions, web development South Africa',
  path: '/404',
  noindex: true, // Add this to prevent indexing of 404 pages
});

export default function NotFoundPage() {
  return <NotFoundComponent />; // Fixed: Use NotFoundComponent instead of NotFound
}
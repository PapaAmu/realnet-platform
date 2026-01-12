import { generateSEO } from "@/lib/SEO";
import Resources from "@/components/pages/company/Resources";

export const dynamic = 'force-dynamic';

export const metadata = generateSEO({
  title: 'Resources | Guides, Tools & Insights by Realnet Web Solutions',
  description: 'Access helpful resources from Realnet Web Solutions, including web development guides, digital business tools, and industry insights. Designed to support businesses and developers across South Africa.',
  keywords: 'web development resources South Africa, business tools, digital guides, Realnet Web Solutions resources, developer guides, website tips, mobile app development resources, software development insights, online business tools, digital agency South Africa',
  path: '/resources',
});

export default function ResourcesPage() {
  return <Resources />;
}

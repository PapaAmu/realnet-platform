import { generateSEO, generateStructuredData } from "@/lib/SEO";
import ServicesOverview from "@/components/pages/company/ServicesOverview";

export const dynamic = 'force-dynamic';

export const metadata = generateSEO({
  title: 'Our Services | Web Development, Mobile Apps & Digital Solutions',
  description: 'Comprehensive digital solutions including web development, mobile apps, ecommerce, software development, and managed hosting services across South Africa.',
  keywords: 'web development services, mobile app development, ecommerce solutions, software development, managed hosting, digital agency services South Africa',
  path: '/services',
});

export default function ServicesPage() {
  const structuredData = generateStructuredData({
    type: 'Service',
    title: 'Digital Solutions Services',
    description: 'Comprehensive web and mobile development services',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ServicesOverview />
    </>
  );
}
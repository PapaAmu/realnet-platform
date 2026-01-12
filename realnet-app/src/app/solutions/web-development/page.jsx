import { generateSEO } from "@/lib/SEO";
import WebsiteDevelopment from "@/components/pages/solutions/WebsiteDevelopment";

export const dynamic = 'force-dynamic';

export const metadata = generateSEO({
  title: 'Website Development Johannesburg | Custom, Responsive & SEO-Friendly Web Design',
  description: 'Expert web development services in Johannesburg — from business websites to ecommerce solutions. Our professional developers create custom, responsive, and SEO-friendly websites that grow your brand online.',
  keywords: 'web development Johannesburg, website design Johannesburg, custom website development, business website design, ecommerce development South Africa, responsive web design, SEO-friendly websites, professional web developers, digital agency Johannesburg',
  path: '/solutions/web-development',
});

export default function WebsiteDevelopmentPage() {
  return <WebsiteDevelopment />;
}

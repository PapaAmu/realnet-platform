import { generateSEO } from "@/lib/SEO";
import CustomWebsite from "@/components/pages/solutions/quotes/CustomWebsite";

export const dynamic = 'force-dynamic';

export const metadata = generateSEO({
  title: 'Custom Web Application Quote | Advanced System Development South Africa',
  description: 'Request a quote for a custom web application or business system. We develop secure, scalable, and high-performance web apps for startups, SMEs, and enterprises across South Africa — including Johannesburg, Cape Town, Durban, and Pretoria.',
  keywords: 'custom web application South Africa, web app development, system development South Africa, custom software quote, business web applications, enterprise web app developers, SaaS development, Laravel web applications, React web apps, custom system development Johannesburg, custom system developers Cape Town, custom system developers Durban, custom system developers Pretoria',
  path: '/solutions/web-development/custom-website-quote-request',
});

export default function CustomWebAppQuoteRequestPage() {
  return <CustomWebsite />;
}

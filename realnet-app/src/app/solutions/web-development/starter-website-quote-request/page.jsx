import { generateSEO } from "@/lib/SEO";
import StarterWebsite from "@/components/pages/solutions/quotes/StarterWebsite";

export const dynamic = 'force-dynamic';

export const metadata = generateSEO({
  title: 'Starter Website Quote | Affordable Business & Personal Website Packages South Africa',
  description: 'Get an instant quote for a professional starter website. We design affordable business, personal, and portfolio websites across South Africa — including Gauteng, Cape Town, Durban, Pretoria, and Bloemfontein.',
  keywords: 'starter website South Africa, business website packages, affordable website design, personal website design, portfolio websites, small business website quotes, professional website developers, web design Gauteng, web design Cape Town, web design Durban, web design Pretoria, web design Bloemfontein',
  path: '/solutions/web-development/starter-website-quote-request',
});

export default function StarterWebsiteQuoteRequestPage() {
  return <StarterWebsite />;
}

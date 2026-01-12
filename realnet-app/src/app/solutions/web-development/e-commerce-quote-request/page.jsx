import { generateSEO } from "@/lib/SEO";
import EcommerceWebsite from "@/components/pages/solutions/quotes/EcommerceWebsite";

export const dynamic = 'force-dynamic';

export const metadata = generateSEO({
  title: 'Ecommerce Website Quote | Online Store Development South Africa',
  description: 'Request a quote for a professional ecommerce website. We build secure, mobile-friendly online stores for businesses across South Africa — including Johannesburg, Cape Town, Durban, Pretoria, and Port Elizabeth.',
  keywords: 'ecommerce website South Africa, online store development, ecommerce web design, WooCommerce development, Shopify developers South Africa, online shop design, ecommerce website quote, Website Design in Mpumalanga, custom ecommerce solutions, ecommerce developers Johannesburg, ecommerce developers Cape Town, ecommerce developers Durban, ecommerce developers Pretoria',
  path: '/solutions/web-development/e-commerce-quote-request',
});

export default function EcommerceQuoteRequestPage() {
  return <EcommerceWebsite />;
}

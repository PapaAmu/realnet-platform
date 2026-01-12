import { generateSEO } from "@/lib/SEO";
import Quotation from "@/components/projectQuote/NewProjectQuote";

export const dynamic = 'force-dynamic';

export const metadata = generateSEO({
  title: 'Quotation Request | Affordable Business & Personal Website Packages South Africa',
  description: 'Get an instant quote for a professional  platform. We design affordable business, personal, and portfolio websites across South Africa — including Gauteng, Cape Town, Durban, Pretoria, and Bloemfontein.',
  keywords: 'starter website South Africa, business website packages, affordable website design, personal website design, portfolio websites, small business website quotes, professional website developers, web design Gauteng, web design Cape Town, web design Durban, web design Pretoria, web design Bloemfontein',
  path: '/new-project/request-quotation',
});

export default function StarterWebsiteQuoteRequestPage() {
  return <Quotation />;
}

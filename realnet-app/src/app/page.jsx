import Image from "next/image";
import Hero from "../components/Hero";
import CompanyBoost from "../components/CompanyBoost";
import Brand from "../components/Brand";
import MobileAdvert from "../components/MobileAdvert";
import OurStack from "../components/OurStack";
import Industries from "../components/Industries";
import { generateSEO, generateStructuredData } from "@/lib/SEO";
import ServicesSummary from "@/components/ServicesSammery";

export const dynamic = 'force-dynamic';

export const metadata = generateSEO({
  title: 'WELCOME - Web & Mobile App Development Johannesburg',
  description: 'Professional web development, ecommerce solutions, mobile apps, and software development services in Johannesburg. Starter websites, custom development & hosting.',
  keywords: 'web development Johannesburg, website design Midrand, ecommerce South Africa, mobile app development, software development, business hosting',
  path: '/',
});

export default function Home() {
  const structuredData = generateStructuredData({
    type: 'LocalBusiness',
    title: 'REALNET WEB SOLUTIONS - Web & Mobile App Development Johannesburg',
    description: 'Professional web development, ecommerce solutions, mobile apps, and software development services in Johannesburg.',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />

      <ServicesSummary />
      <CompanyBoost />

      <MobileAdvert />
      <Brand />
      <OurStack />
      <Industries />
    </>
  );
}
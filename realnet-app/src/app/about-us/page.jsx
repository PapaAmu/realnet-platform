import { generateSEO } from "@/lib/SEO";
import AboutUs from "@/components/pages/company/AboutUs";

export const dynamic = 'force-dynamic';


export const metadata = generateSEO({
  title: 'About Realnet Web Solutions | South Africa’s Digital Transformation Partner',
  description: 'Learn more about Realnet Web Solutions — a South African digital agency specializing in web development, mobile apps, and business software. We empower brands and organizations nationwide through modern, results-driven digital solutions.',
  keywords: 'about Realnet Web Solutions, web development company South Africa, digital transformation agency, software development South Africa, mobile app developers, website design company South Africa, business software solutions, IT company South Africa, Realnet team, web developers South Africa',
  path: '/about-us',
});

export default function AboutUsPage() {
  return <AboutUs />;
}

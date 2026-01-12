import { generateSEO } from "@/lib/SEO";
import OurProjects from "@/components/pages/company/OurProjects";

export const dynamic = 'force-dynamic';

export const metadata = generateSEO({
  title: 'Our Projects | Realnet Web Solutions Portfolio & Case Studies',
  description: 'Explore Realnet Web Solutions’ portfolio of successful web development, mobile app, and software projects across South Africa. Discover how we’ve helped businesses grow through innovative digital solutions.',
  keywords: 'Realnet portfolio, web development projects South Africa, website design portfolio, mobile app projects, software development case studies, digital agency portfolio, business website examples, ecommerce website design, app development South Africa, Realnet Web Solutions projects',
  path: '/projects',
});

export default function ProjectsPage() {
  return <OurProjects />;
}

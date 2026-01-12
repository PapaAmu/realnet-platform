import { generateSEO } from "@/lib/SEO";
import SoftwareDevelopment from "@/components/pages/solutions/SoftwareDevelopment";

export const dynamic = 'force-dynamic';

export const metadata = generateSEO({
  title: 'Software Development Johannesburg | Custom Business Software & System Solutions',
  description: 'Expert software development services in Johannesburg. We design and build custom business software, management systems, and digital solutions that streamline operations and drive growth.',
  keywords: 'software development Johannesburg, custom software development, business software solutions, enterprise software South Africa, system development Johannesburg, software engineers, web and mobile systems, database development, digital transformation solutions',
  path: '/solutions/software-development',
});

export default function SoftwareDevelopmentPage() {
  return <SoftwareDevelopment />;
}

import { generateSEO } from "@/lib/SEO";
import MailAndHosting from "@/components/pages/solutions/MailAndHosting";

export const dynamic = 'force-dynamic';

export const metadata = generateSEO({
  title: 'Business Email & Hosting Solutions | Managed Hosting Services South Africa',
  description: 'Professional managed hosting services and business email solutions in South Africa. Secure, reliable hosting with 99.9% uptime, domain management, and professional business email setup.',
  keywords: 'managed hosting South Africa, business email hosting, web hosting services, domain hosting Johannesburg, email setup South Africa, cloud hosting, VPS hosting, dedicated servers, business email solutions, IT hosting services',
  path: '/solutions/email-and-hosting',
});

export default function MailAndHostingPage() {
  return <MailAndHosting />;
}
import ContactUs from "@/components/pages/company/ContactUs";
import { generateSEO } from "@/lib/SEO";

export const dynamic = 'force-dynamic';

export const metadata = generateSEO({
  title: 'Contact Realnet Web Solutions | Get in Touch With Our Team',
  description: 'Have a project in mind? Contact Realnet Web Solutions today for expert web development, mobile apps, and digital solutions. We serve clients across South Africa — including Johannesburg, Pretoria, Cape Town, Durban, and beyond.',
  keywords: 'contact Realnet Web Solutions, web development company South Africa, digital agency contact, website design support, mobile app development South Africa, get a quote web design, Realnet contact, tech support South Africa, web developers near me',
  path: '/contact-us',
});

export default function ContactUsPage() {
  return <ContactUs />;
}

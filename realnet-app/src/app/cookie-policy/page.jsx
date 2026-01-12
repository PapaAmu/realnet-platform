// app/cookie-policy/page.jsx
import { generateSEO } from "@/lib/SEO";
import CookiePolicy from "@/components/pages/company/CookiePolicy";

export const dynamic = 'force-dynamic';

export const metadata = generateSEO({
  title: 'Cookie Policy | Realnet Web Solutions - POPIA Compliant',
  description: 'Learn about Realnet Web Solutions cookie policy. We use cookies to enhance your browsing experience while complying with South African POPIA regulations.',
  keywords: 'cookie policy South Africa, POPIA compliant cookies, website cookies, data privacy South Africa, Realnet Web Solutions cookies, internet privacy',
  path: '/cookie-policy',
});

export default function CookiePolicyPage() {
  return <CookiePolicy />;
}
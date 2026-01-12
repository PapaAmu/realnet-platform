import { generateSEO } from "@/lib/SEO";
import MobileAppDevelopment from "@/components/pages/solutions/MobileAppDevelopment";

export const dynamic = 'force-dynamic';

export const metadata = generateSEO({
  title: 'Mobile App Development | Cross-Platform & Business App Solutions',
  description: 'Professional mobile app development services in Johannesburg. We build custom iOS, Android, and cross-platform business apps that help your company connect, engage, and grow.',
  keywords: 'mobile app development Johannesburg, cross-platform app development, business app development, iOS app development South Africa, Android app developers Johannesburg, Flutter app development, React Native app development, custom mobile solutions, enterprise mobile apps',
  path: '/solutions/mobile-app-development',
});

export default function MobileAppDevelopmentPage() {
  return <MobileAppDevelopment />;
}

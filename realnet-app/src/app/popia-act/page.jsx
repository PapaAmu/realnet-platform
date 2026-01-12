import { generateSEO } from "@/lib/SEO";
import PopiaAct from "@/components/pages/company/PopiaAct";

export const dynamic = 'force-dynamic';

export const metadata = generateSEO({
  title: 'POPIA Act Compliance | Data Protection Information South Africa',
  description: 'Learn about the POPIA Act and how Realnet Web Solutions ensures data protection and privacy compliance for businesses across South Africa. Understand your rights and our responsibilities under the Protection of Personal Information Act.',
  keywords: 'POPIA Act South Africa, data protection South Africa, personal information compliance, POPIA compliance guide, privacy policy South Africa, data privacy laws, Realnet Web Solutions POPIA, business data protection, GDPR South Africa, information security compliance',
  path: '/popia-act',
});

export default function PopiaActPage() {
  return <PopiaAct />;
}

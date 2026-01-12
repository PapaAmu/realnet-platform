// components/GoogleAnalytics.jsx
'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { GA_MEASUREMENT_ID, pageview } from '@/lib/gtag';

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    // Check user's cookie consent preferences
    const consentGiven = localStorage.getItem('cookieConsent');
    const preferences = consentGiven ? JSON.parse(consentGiven) : null;

    // Initialize gtag with consent settings
    if (window.gtag) {
      const analyticsStorage = preferences?.analytics ? 'granted' : 'denied';
      const adStorage = preferences?.marketing ? 'granted' : 'denied';

      window.gtag('consent', 'update', {
        analytics_storage: analyticsStorage,
        ad_storage: adStorage,
        wait_for_update: 500,
      });

      // Only track pageview if analytics cookies are accepted
      if (preferences?.analytics) {
        const url = pathname + searchParams.toString();
        pageview(url);
      }
    }
  }, [pathname, searchParams]);

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Default consent state (will be updated based on user preferences)
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              wait_for_update: 500
            });
            
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          `,
        }}
      />
    </>
  );
}
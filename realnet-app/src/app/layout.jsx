import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "REALNET WEB SOLUTIONS - Web & Mobile App Development Johannesburg",
    template: "%s | REALNET WEB SOLUTIONS"
  },
  description: "Professional web development, ecommerce solutions, mobile apps, and software development services in Johannesburg.",
  keywords: ["Web Development", "Mobile App Development", "Software Development", "Johannesburg", "Midrand", "Pretoria", "South Africa", "SEO", "E-commerce", "Realnet"],
  authors: [{ name: "Realnet Web Solutions" }],
  creator: "Realnet Web Solutions",
  publisher: "Realnet Web Solutions",
  metadataBase: new URL('https://realnet-web.co.za'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "REALNET WEB SOLUTIONS - Web & Mobile App Development",
    description: "Transform your business with professional web development, mobile apps, and software solutions in Johannesburg.",
    url: "https://realnet-web.co.za",
    siteName: "Realnet Web Solutions",
    locale: "en_ZA",
    type: "website",
    images: [
      {
        url: "https://realnet-web.co.za/logo.png",
        width: 800,
        height: 600,
        alt: "Realnet Web Solutions Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "REALNET WEB SOLUTIONS",
    description: "Professional web & software development in Johannesburg.",
    images: ["https://realnet-web.co.za/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'JNR98K5VTL',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Realnet Web Solutions",
    "image": "https://realnet-web.co.za/logo.png",
    "description": "Professional web development, ecommerce solutions, mobile apps, and software development services in Johannesburg.",
    "@id": "https://realnet-web.co.za",
    "url": "https://realnet-web.co.za",
    "telephone": "+27630388883",
    "email": "lukhele@realnet-web.co.za",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Matsau Street, Ivory Park",
      "addressLocality": "Midrand",
      "addressRegion": "GP",
      "postalCode": "1689",
      "addressCountry": "ZA"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "17:00"
    },
    "sameAs": [
      "https://web.facebook.com/profile.php?id=61565067420433",
      "https://www.linkedin.com/company/realnet-web-solutions-pty",
      "https://instagram.com/realnet_web",
      "https://github.com/PapaAmu"
    ]
  };

  return (
    <html lang="en-ZA">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        <Navbar />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}

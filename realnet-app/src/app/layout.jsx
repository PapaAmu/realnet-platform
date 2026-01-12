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
  metadataBase: new URL('https://realnet-web.co.za'),
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'google-site-verification': 'JNR98K5VTL',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-ZA">
      <head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="JNR98K5VTL" />
        
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
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
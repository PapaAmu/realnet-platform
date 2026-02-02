'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useState, useEffect } from 'react';

export default function ThemeProvider({ children, ...props }) {
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by rendering only after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render children without theme provider during SSR to avoid mismatch
    // or return null to avoid flash. Returning children is usually safer for SEO/content.
    // However, for theme provider, we often want to wait.
    // But returning <>{children}</> might cause a flash of unstyled theme if default is different.
    // next-themes handles this usually, but let's be safe.
    return <>{children}</>;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

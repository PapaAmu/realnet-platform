// lib/seo.js
export const generateSEO = (pageData = {}) => {
  const {
    title,
    description,
    keywords,
    path = '',
    image = '/og-image.jpg',
    publishedTime,
    modifiedTime,
    author = 'Themba Real Lukhele',
    type = 'website',
    noindex = false,
  } = pageData;

  const baseUrl = 'https://realnet-web.co.za';
  const url = path ? `${baseUrl}${path}` : baseUrl;

  return {
    title: title || 'REALNET WEB SOLUTIONS - Web & Mobile App Development Johannesburg',
    description: description || 'Professional web development, ecommerce solutions, mobile apps, and software development services in Johannesburg.',
    keywords: keywords || 'web development, mobile app development, software development, ecommerce, Johannesburg, South Africa',
    metadataBase: new URL(baseUrl),

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: title || 'REALNET WEB SOLUTIONS - Web & Mobile App Development Johannesburg',
      description: description || 'Professional web development, ecommerce solutions, mobile apps, and software development services in Johannesburg.',
      url: url,
      siteName: 'REALNET WEB SOLUTIONS',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || 'RealNet Web Solutions',
        },
      ],
      locale: 'en_ZA',
      type: type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },

    twitter: {
      card: 'summary_large_image',
      title: title || 'REALNET WEB SOLUTIONS - Web & Mobile App Development Johannesburg',
      description: description || 'Professional web development, ecommerce solutions, mobile apps, and software development services in Johannesburg.',
      images: [image],
      creator: '@realnetweb',
    },

    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    ...(type === 'article' && {
      authors: [author],
      publisher: 'RealNet Web Solutions',
    }),
  };
};

// Helper function to parse tags safely
export const parseTags = (tags) => {
  if (Array.isArray(tags)) {
    return tags;
  }

  if (typeof tags === 'string') {
    try {
      const parsed = JSON.parse(tags);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      if (tags.includes(',')) {
        return tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      }
      return tags.trim() ? [tags.trim()] : [];
    }
  }

  return [];
};

// Structured data for JSON-LD
export const generateStructuredData = (data = {}) => {
  const {
    type = 'WebSite',
    title = 'REALNET WEB SOLUTIONS - Web & Mobile App Development',
    description = 'Professional web development, ecommerce solutions, mobile apps, and software development services in Johannesburg.',
    url = 'https://realnet-web.co.za',
    image = 'https://realnet-web.co.za/og-image.jpg',
    publishedDate,
    modifiedDate,
    author = 'Themba Real Lukhele',
    tags = [],
    priceRange = '$$',
  } = data;

  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
    name: title,
    description: description,
    url: url,
    image: image,
  };

  // Organization / LocalBusiness Specifics
  if (type === 'Organization' || type === 'LocalBusiness' || type === 'WebSite') {
    baseSchema.telephone = '+27-63-038-8883';
    baseSchema.email = 'lukhele@realnet-web.co.za';
    baseSchema.address = {
      '@type': 'PostalAddress',
      addressLocality: 'Johannesburg',
      addressRegion: 'Gauteng',
      addressCountry: 'ZA',
    };
    baseSchema.sameAs = [
      'https://www.linkedin.com/company/realnet-web-solutions',
      'https://www.facebook.com/realnetwebsolutions',
      'https://twitter.com/realnetweb',
    ];
  }

  if (type === 'LocalBusiness') {
    baseSchema.priceRange = priceRange;
    baseSchema.openingHoursSpecification = [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday'
        ],
        opens: '08:00',
        closes: '17:00'
      }
    ];
  }

  if (type === 'WebSite') {
    baseSchema.potentialAction = {
      '@type': 'SearchAction',
      target: `${url}/updates/blogs?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    };
  }

  if (type === 'Article') {
    baseSchema.datePublished = publishedDate;
    baseSchema.dateModified = modifiedDate;
    baseSchema.author = {
      '@type': 'Person',
      name: author,
    };
    baseSchema.publisher = {
      '@type': 'Organization',
      name: 'RealNet Web Solutions',
      logo: {
        '@type': 'ImageObject',
        url: 'https://realnet-web.co.za/logo.png',
      },
    };

    // Add keywords if available
    if (tags.length > 0) {
      baseSchema.keywords = tags.join(', ');
    }
  }

  // Service Schema
  if (type === 'Service') {
    baseSchema.provider = {
      '@type': 'LocalBusiness',
      name: 'RealNet Web Solutions',
      image: 'https://realnet-web.co.za/logo.png',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Johannesburg',
        addressRegion: 'Gauteng',
        addressCountry: 'ZA',
      },
      priceRange: '$$'
    };
    baseSchema.areaServed = {
      '@type': 'Country',
      name: 'South Africa'
    };
  }

  return baseSchema;
};

// Sitemap URL generator
export const generateSitemapUrl = (path, options = {}) => {
  const baseUrl = 'https://realnet-web.co.za';
  const defaultOptions = {
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  };

  return {
    url: `${baseUrl}${path}`,
    ...defaultOptions,
    ...options,
  };
};

// Get all static routes for sitemap
export const getStaticRoutes = () => {
  return [
    generateSitemapUrl('/', { priority: 1.0, changeFrequency: 'monthly' }),
    generateSitemapUrl('/about-us', { priority: 0.8, changeFrequency: 'yearly' }),
    generateSitemapUrl('/contact-us', { priority: 0.8, changeFrequency: 'yearly' }),
    generateSitemapUrl('/popia-act', { priority: 0.6, changeFrequency: 'yearly' }),
    generateSitemapUrl('/projects', { priority: 0.7, changeFrequency: 'monthly' }),
    generateSitemapUrl('/resources', { priority: 0.7, changeFrequency: 'weekly' }),
    generateSitemapUrl('/services', { priority: 0.9, changeFrequency: 'monthly' }),
    generateSitemapUrl('/solutions/web-development', { priority: 0.9, changeFrequency: 'monthly' }),
    generateSitemapUrl('/solutions/mobile-app-development', { priority: 0.9, changeFrequency: 'monthly' }),
    generateSitemapUrl('/solutions/software-development', { priority: 0.9, changeFrequency: 'monthly' }),
    generateSitemapUrl('/solutions/email-and-hosting', { priority: 0.8, changeFrequency: 'monthly' }),
    generateSitemapUrl('/solutions/web-development/starter-website-quote-request', { priority: 0.7, changeFrequency: 'monthly' }),
    generateSitemapUrl('/solutions/web-development/e-commerce-quote-request', { priority: 0.7, changeFrequency: 'monthly' }),
    generateSitemapUrl('/solutions/web-development/custom-website-quote-request', { priority: 0.7, changeFrequency: 'monthly' }),
    generateSitemapUrl('/updates/blogs', { priority: 0.8, changeFrequency: 'weekly' }),
  ];
};
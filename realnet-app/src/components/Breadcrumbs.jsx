import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const Breadcrumbs = ({ customPath = null, hideOnHome = true }) => {
  const location = useLocation();
  
  // Don't show breadcrumbs on home page if hideOnHome is true
  if (hideOnHome && location.pathname === '/') {
    return null;
  }

  // Use custom path or current location
  const pathname = customPath || location.pathname;
  const pathSegments = pathname.split('/').filter(segment => segment !== '');
  
  // Map of path segments to human-readable names
  const pathNames = {
    'features': 'Services',
    'web-development': 'Web Development',
    'mobile-app-development': 'Mobile App Development', 
    'software-development': 'Software Development',
    'hosting-and-mails': 'Hosting & Email',
    'live-projects': 'Our Projects',
    'new-project': 'New Project',
    'request-quotation': 'Request Quote',
    'contact-us': 'Contact Us',
    'resources': 'Resources'
  };

  // Build breadcrumb items
  const breadcrumbItems = [];
  
  // Always include home
  breadcrumbItems.push({
    name: 'Home',
    path: '/',
    isLast: pathSegments.length === 0
  });

  // Add path segments
  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;
    
    breadcrumbItems.push({
      name: pathNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
      path: currentPath,
      isLast
    });
  });

  // Generate structured data for breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://realnet-web.co.za${item.path}`
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      
      <nav className="bg-gradient-to-r from-black to-orange-600  py-1 mt-16 shadow-sm" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-3 text-sm font-medium">
            {breadcrumbItems.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <FaChevronRight className="text-gray-400 text-xs mr-3" />
                )}
                
                {item.isLast ? (
                  <span className="text-gray-300 font-semibold flex items-center">
                    {index === 0 && <FaHome className="mr-2 text-orange-600" />}
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="text-orange-600 hover:text-orange-800 transition-colors duration-200 flex items-center hover:underline"
                  >
                    {index === 0 && <FaHome className="mr-2" />}
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumbs;

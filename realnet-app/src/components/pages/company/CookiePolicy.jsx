// components/pages/company/CookiePolicy.jsx
'use client';

import { useState } from 'react';
import { FaCookieBite, FaShieldAlt, FaChartBar, FaBullhorn } from 'react-icons/fa';

export default function CookiePolicy() {
  const [activeSection, setActiveSection] = useState('overview');

  const cookieTypes = [
    {
      id: 'necessary',
      name: 'Necessary Cookies',
      icon: FaShieldAlt,
      description: 'Essential for the website to function properly. These cookies enable basic functions like page navigation and access to secure areas of the website.',
      examples: ['Session management', 'Security tokens', 'Load balancing'],
      duration: 'Session'
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      icon: FaChartBar,
      description: 'Help us understand how visitors interact with our website through Google Analytics. These cookies collect information about how visitors use our website.',
      examples: ['Page visits', 'Time on site', 'Traffic sources'],
      duration: '2 years'
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      icon: FaBullhorn,
      description: 'Used to track visitors across websites for marketing purposes. The intention is to display ads that are relevant and engaging for individual users.',
      examples: ['Retargeting campaigns', 'Ad performance', 'Conversion tracking'],
      duration: '1 year'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-4">
            <FaCookieBite className="text-orange-600 text-2xl" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">
            Cookie Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn how RealNet Web Solutions uses cookies and similar technologies to enhance your browsing experience while respecting your privacy.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {[
                { id: 'overview', name: 'Overview' },
                { id: 'types', name: 'Cookie Types' },
                { id: 'management', name: 'Manage Cookies' },
                { id: 'contact', name: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex-1 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeSection === item.id
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-8">
            {activeSection === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Cookie Policy Overview</h2>
                <div className="prose prose-lg text-gray-700">
                  <p>
                    At <strong>RealNet Web Solutions</strong>, we are committed to protecting your privacy and being transparent about our use of cookies and similar technologies. This policy explains what cookies are, how we use them, and how you can manage your preferences.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mt-6">What are Cookies?</h3>
                  <p>
                    Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mt-6">Our Commitment</h3>
                  <p>
                    We comply with South Africa&apos;s{' '}
                    <a href="/popia-act" className="text-orange-600 hover:text-orange-700 font-medium">
                      Protection of Personal Information Act (POPIA)
                    </a>
                    {' '}and other applicable data protection laws. We only use cookies that are necessary for the website to function or that you have explicitly consented to.
                  </p>
                </div>
              </div>
            )}

            {activeSection === 'types' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900">Types of Cookies We Use</h2>
                {cookieTypes.map((cookie) => (
                  <div key={cookie.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-orange-100 rounded-lg">
                        <cookie.icon className="text-orange-600 text-xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {cookie.name}
                        </h3>
                        <p className="text-gray-700 mb-4">
                          {cookie.description}
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Examples:</h4>
                            <ul className="text-gray-600 space-y-1">
                              {cookie.examples.map((example, index) => (
                                <li key={index}>• {example}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Duration:</h4>
                            <p className="text-gray-600">{cookie.duration}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'management' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Manage Your Cookie Preferences</h2>
                <div className="prose prose-lg text-gray-700">
                  <p>
                    You can manage your cookie preferences at any time through our cookie consent banner or by adjusting your browser settings.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mt-6">Browser Settings</h3>
                  <p>
                    Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may affect your experience on our website.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mt-6">Withdraw Consent</h3>
                  <p>
                    To withdraw your consent for analytics or marketing cookies, you can clear your browser cookies or use our cookie consent manager to update your preferences.
                  </p>

                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-6">
                    <p className="text-orange-800 font-medium">
                      💡 <strong>Tip:</strong> You can always update your cookie preferences by clicking the cookie icon in the bottom corner of our website.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'contact' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Questions About Our Cookie Policy?</h2>
                <div className="prose prose-lg text-gray-700">
                  <p>
                    If you have any questions about our use of cookies or this cookie policy, please don&apos;t hesitate to contact us.
                  </p>
                  
                  <div className="bg-gray-50 rounded-xl p-6 mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                    <div className="space-y-3 text-gray-700">
                      <p><strong>Email:</strong> lukhele@realnet-web.co.za</p>
                      <p><strong>Phone:</strong> +27 63 038 8883</p>
                      <p><strong>Address:</strong> Johannesburg, Gauteng, South Africa</p>
                    </div>
                  </div>

                  <p className="mt-6">
                    For more information about how we protect your personal data, please read our{' '}
                    <a href="/popia-act" className="text-orange-600 hover:text-orange-700 font-medium">
                      Privacy Policy
                    </a>.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
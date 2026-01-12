// components/CookieConsent.jsx
'use client';

import { useState, useEffect } from 'react';
import { FaCookieBite, FaTimes, FaShieldAlt, FaChevronDown } from 'react-icons/fa';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    // Check if user has already made a choice
    const consentGiven = localStorage.getItem('cookieConsent');
    if (!consentGiven) {
      setIsVisible(true);
    } else {
      const savedPreferences = JSON.parse(consentGiven);
      setPreferences(savedPreferences);
      
      // Initialize analytics if consented
      if (savedPreferences.analytics) {
        window.gtag?.('consent', 'update', {
          analytics_storage: 'granted'
        });
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    
    setPreferences(allAccepted);
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setIsVisible(false);
    
    // Grant all consents for Google Analytics
    window.gtag?.('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted'
    });
    
    trackEvent({
      action: 'cookie_consent',
      category: 'Preferences',
      label: 'accepted_all'
    });
  };

  const handleAcceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    
    setPreferences(necessaryOnly);
    localStorage.setItem('cookieConsent', JSON.stringify(necessaryOnly));
    setIsVisible(false);
    
    // Deny analytics and marketing cookies
    window.gtag?.('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied'
    });
    
    trackEvent({
      action: 'cookie_consent',
      category: 'Preferences',
      label: 'necessary_only'
    });
  };

  const handleCustomAccept = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setIsVisible(false);
    
    // Update Google Analytics consent based on preferences
    window.gtag?.('consent', 'update', {
      analytics_storage: preferences.analytics ? 'granted' : 'denied',
      ad_storage: preferences.marketing ? 'granted' : 'denied'
    });
    
    trackEvent({
      action: 'cookie_consent',
      category: 'Preferences',
      label: 'custom_settings',
      value: Object.values(preferences).filter(Boolean).length
    });
  };

  const togglePreference = (type) => {
    if (type === 'necessary') return; // Necessary cookies cannot be disabled
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <FaCookieBite className="text-orange-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Cookie Preferences
              </h3>
              <p className="text-sm text-gray-600">
                We value your privacy at RealNet Web Solutions
              </p>
            </div>
          </div>
          <button
            onClick={handleAcceptNecessary}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaTimes className="text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        {/* Main Content */}
        <div className="mb-6">
          <p className="text-gray-700 mb-4">
            At <strong>RealNet Web Solutions</strong>, we use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and understand where our visitors are coming from. By accepting, you agree to our use of these technologies as described in our{' '}
            <a 
              href="/popia-act" 
              className="text-orange-600 hover:text-orange-700 font-medium underline"
            >
              Privacy Policy
            </a>
            .
          </p>

          {/* Cookie Details Toggle */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium mb-4"
          >
            <FaChevronDown 
              className={`transition-transform ${showDetails ? 'rotate-180' : ''}`} 
            />
            Customize your cookie preferences
          </button>

          {/* Detailed Cookie Preferences */}
          {showDetails && (
            <div className="bg-gray-50 rounded-xl p-4 space-y-4">
              {/* Necessary Cookies */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">Necessary Cookies</h4>
                  <p className="text-sm text-gray-600">
                    Essential for the website to function properly. Cannot be disabled.
                  </p>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={preferences.necessary}
                    disabled
                    className="opacity-0 w-0 h-0"
                  />
                  <div className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-orange-600 rounded-full transition-colors">
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></div>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">Analytics Cookies</h4>
                  <p className="text-sm text-gray-600">
                    Help us understand how visitors interact with our website through Google Analytics.
                  </p>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => togglePreference('analytics')}
                    className="opacity-0 w-0 h-0"
                  />
                  <div className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors ${
                    preferences.analytics ? 'bg-orange-600' : 'bg-gray-300'
                  }`}>
                    <div className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                      preferences.analytics ? 'transform translate-x-6' : 'transform translate-x-1'
                    }`}></div>
                  </div>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">Marketing Cookies</h4>
                  <p className="text-sm text-gray-600">
                    Used to track visitors across websites for marketing purposes.
                  </p>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={() => togglePreference('marketing')}
                    className="opacity-0 w-0 h-0"
                  />
                  <div className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors ${
                    preferences.marketing ? 'bg-orange-600' : 'bg-gray-300'
                  }`}>
                    <div className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                      preferences.marketing ? 'transform translate-x-6' : 'transform translate-x-1'
                    }`}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAcceptNecessary}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            Necessary Only
          </button>
          
          {showDetails ? (
            <button
              onClick={handleCustomAccept}
              className="flex-1 px-6 py-3 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition-colors shadow-lg"
            >
              Save Preferences
            </button>
          ) : (
            <button
              onClick={handleAcceptAll}
              className="flex-1 px-6 py-3 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition-colors shadow-lg"
            >
              Accept All Cookies
            </button>
          )}
        </div>

        {/* Compliance Notice */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaShieldAlt className="text-green-500" />
            <span>
              Compliant with South Africa&apos;s{' '}
              <a 
                href="/popia-act" 
                className="text-orange-600 hover:text-orange-700 underline font-medium"
              >
                POPIA Act
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
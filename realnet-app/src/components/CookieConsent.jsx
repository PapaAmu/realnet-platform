// components/CookieConsent.jsx
'use client';

import { useState, useEffect } from 'react';
import { 
  FaCookieBite, 
  FaTimes, 
  FaShieldAlt, 
  FaChevronRight,
  FaCheck
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const consentGiven = localStorage.getItem('cookieConsent');
    if (!consentGiven) {
      // Delay showing to not immediately bombard user
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      const savedPreferences = JSON.parse(consentGiven);
      setPreferences(savedPreferences);
      
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

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setIsVisible(false);
    
    window.gtag?.('consent', 'update', {
      analytics_storage: preferences.analytics ? 'granted' : 'denied',
      ad_storage: preferences.marketing ? 'granted' : 'denied'
    });
    
    trackEvent({
      action: 'cookie_consent',
      category: 'Preferences',
      label: 'custom_settings'
    });
  };

  const togglePreference = (type) => {
    if (type === 'necessary') return;
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-6 right-6 z-50 md:left-auto md:right-6 md:w-[420px]"
        >
          <div className="relative bg-white dark:bg-[#0a0a0a] rounded-2xl shadow-2xl shadow-black/20 dark:shadow-primary-500/10 border border-gray-200 dark:border-white/10 overflow-hidden">
            
            {/* Header Bar */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-500/10 flex items-center justify-center">
                  <FaCookieBite className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                </div>
                <span className="font-semibold text-gray-900 dark:text-white text-sm">
                  Cookie Settings
                </span>
              </div>
              <button
                onClick={handleAcceptNecessary}
                className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
              >
                <FaTimes className="w-3 h-3" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5">
              {!isExpanded ? (
                // Compact View
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-white/60 leading-relaxed">
                    We use cookies to enhance your experience and analyze site traffic. 
                    View our{' '}
                    <a 
                      href="/popia-act" 
                      className="text-primary-600 dark:text-primary-400 underline hover:no-underline"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsExpanded(true)}
                      className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-white/80 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      Customize
                      <FaChevronRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gray-900 dark:bg-primary-600 hover:bg-gray-800 dark:hover:bg-primary-500 rounded-lg transition-colors shadow-lg shadow-gray-900/20 dark:shadow-primary-600/20"
                    >
                      Accept All
                    </button>
                  </div>
                </div>
              ) : (
                // Expanded View
                <div className="space-y-4">
                  <p className="text-xs text-gray-500 dark:text-white/40 leading-relaxed">
                    Manage your cookie preferences below. Necessary cookies are always enabled.
                  </p>

                  {/* Cookie Types */}
                  <div className="space-y-3">
                    {[
                      { key: 'necessary', label: 'Necessary', desc: 'Essential for site functionality', locked: true },
                      { key: 'analytics', label: 'Analytics', desc: 'Helps us improve our website' },
                      { key: 'marketing', label: 'Marketing', desc: 'Used for targeted advertising' }
                    ].map((cookie) => (
                      <div 
                        key={cookie.key}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-white/[0.03] border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {cookie.label}
                            </span>
                            {cookie.locked && (
                              <FaShieldAlt className="w-3 h-3 text-emerald-500" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-white/40 mt-0.5">
                            {cookie.desc}
                          </p>
                        </div>
                        
                        <button
                          onClick={() => !cookie.locked && togglePreference(cookie.key)}
                          disabled={cookie.locked}
                          className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                            preferences[cookie.key] 
                              ? 'bg-primary-600' 
                              : 'bg-gray-300 dark:bg-white/10'
                          } ${cookie.locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                            preferences[cookie.key] ? 'translate-x-5' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="px-4 py-2 text-sm text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      Back
                    </button>
                    <div className="flex-1 flex gap-3 justify-end">
                      <button
                        onClick={handleAcceptNecessary}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        Necessary Only
                      </button>
                      <button
                        onClick={handleSavePreferences}
                        className="px-5 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-500 rounded-lg transition-colors shadow-lg shadow-primary-600/20"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer - Compliance */}
            <div className="px-5 py-3 bg-gray-50 dark:bg-white/[0.02] border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/40">
                <FaShieldAlt className="w-3 h-3 text-emerald-500" />
                <span>POPIA Compliant</span>
              </div>
              <a 
                href="/popia-act" 
                className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
              >
                Learn more
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
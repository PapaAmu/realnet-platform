// hooks/useAnalytics.js
'use client';

import { useCallback } from 'react';
import { 
  event, 
  trackContactForm, 
  trackQuoteRequest, 
  trackServiceClick,
  trackPhoneCall,
  trackEmailClick,
  GA_EVENTS 
} from '@/lib/gtag';

export const useAnalytics = () => {
  const trackEvent = useCallback(({ action, category, label, value }) => {
    event({ action, category, label, value });
  }, []);

  const trackFormSubmission = useCallback((formType = 'contact') => {
    trackContactForm(formType);
  }, []);

  const trackServiceQuote = useCallback((serviceType) => {
    trackQuoteRequest(serviceType);
  }, []);

  const trackServiceNavigation = useCallback((serviceName) => {
    trackServiceClick(serviceName);
  }, []);

  const trackPhoneInteraction = useCallback((phoneNumber = '+27-63-038-8883') => {
    trackPhoneCall(phoneNumber);
  }, []);

  const trackEmailInteraction = useCallback((email = 'lukhele@realnet-web.co.za') => {
    trackEmailClick(email);
  }, []);

  const trackBlogView = useCallback((postTitle) => {
    event({
      action: GA_EVENTS.BLOG_VIEW,
      category: 'Engagement',
      label: postTitle,
    });
  }, []);

  const trackProjectView = useCallback((projectName) => {
    event({
      action: GA_EVENTS.PROJECT_VIEW,
      category: 'Engagement',
      label: projectName,
    });
  }, []); // Added missing dependency array

  return {
    trackEvent,
    trackFormSubmission,
    trackServiceQuote,
    trackServiceNavigation,
    trackPhoneInteraction,
    trackEmailInteraction,
    trackBlogView,
    trackProjectView,
    GA_EVENTS,
  };
};
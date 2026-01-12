// lib/gtag.js
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-JNR98K5VTL';

// Log page views
export const pageview = (url) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Log specific events
export const event = ({ action, category, label, value }) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Common event types for your business
export const GA_EVENTS = {
  // Lead generation events
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  QUOTE_REQUEST: 'quote_request',
  SERVICE_INQUIRY: 'service_inquiry',
  
  // Engagement events
  BLOG_VIEW: 'blog_view',
  PROJECT_VIEW: 'project_view',
  RESOURCE_DOWNLOAD: 'resource_download',
  
  // Navigation events
  SERVICE_CLICK: 'service_click',
  PRICING_VIEW: 'pricing_view',
  PORTFOLIO_VIEW: 'portfolio_view',
  
  // Conversion events
  PHONE_CLICK: 'phone_click',
  EMAIL_CLICK: 'email_click',
  WHATSAPP_CLICK: 'whatsapp_click',
};

// Helper functions for common events
export const trackContactForm = (formType = 'general') => {
  event({
    action: GA_EVENTS.CONTACT_FORM_SUBMIT,
    category: 'Lead Generation',
    label: formType,
  });
};

export const trackQuoteRequest = (serviceType) => {
  event({
    action: GA_EVENTS.QUOTE_REQUEST,
    category: 'Lead Generation',
    label: serviceType,
  });
};

export const trackServiceClick = (serviceName) => {
  event({
    action: GA_EVENTS.SERVICE_CLICK,
    category: 'Navigation',
    label: serviceName,
  });
};

export const trackPhoneCall = (phoneNumber) => {
  event({
    action: GA_EVENTS.PHONE_CLICK,
    category: 'Conversion',
    label: phoneNumber,
  });
};

export const trackEmailClick = (email) => {
  event({
    action: GA_EVENTS.EMAIL_CLICK,
    category: 'Conversion',
    label: email,
  });
};
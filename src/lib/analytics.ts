// Google Analytics 4 tracking utilities

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}

// Track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Track contact form submissions
export const trackContactFormSubmission = (formData: {
  company?: string;
  companySize?: string;
  source?: string;
}) => {
  trackEvent('contact_form_submit', {
    event_category: 'engagement',
    event_label: 'contact_sales_form',
    company_size: formData.companySize,
    company: formData.company,
    source: formData.source || 'website'
  });
};

// Track button clicks
export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('button_click', {
    event_category: 'engagement',
    event_label: buttonName,
    button_location: location
  });
};

// Track page views (for SPA navigation)
export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-XWT5762FH8', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

// Track demo interactions
export const trackDemoInteraction = (action: string, details?: Record<string, unknown>) => {
  trackEvent('demo_interaction', {
    event_category: 'demo',
    event_label: action,
    ...details
  });
};

// Track pricing plan views
export const trackPricingPlanView = (planName: string) => {
  trackEvent('pricing_plan_view', {
    event_category: 'pricing',
    event_label: planName
  });
};

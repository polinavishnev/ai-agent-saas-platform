// Google Analytics 4 tracking utilities

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void;
    dataLayer: unknown[];
  }
}

// GA4 Configuration
export const GA4_MEASUREMENT_ID = 'G-XWT5762FH8';
export const GA4_API_SECRET = 'MRrJasMWR1qA97Qtd6toJw';

// Debug mode - set to false in production
const DEBUG_MODE = true;

// Track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    // Debug logging
    if (DEBUG_MODE) {
      console.log('📊 GA4 Event:', eventName, parameters);
    }

    // Check if gtag is available
    if (window.gtag) {
      window.gtag('event', eventName, {
        debug_mode: DEBUG_MODE,
        ...parameters
      });

      if (DEBUG_MODE) {
        console.log('✅ GA4 Event sent successfully');
      }
    } else {
      console.warn('⚠️ GA4 gtag not available yet');
    }
  }
};

// Track CTA button clicks - following the specific tracking plan
export const trackCTAClick = (ctaId: string, ctaText: string, ctaLocation?: string, callback?: () => void) => {
  const eventData = {
    cta_id: ctaId,
    cta_text: ctaText,
    cta_location: ctaLocation || (typeof window !== 'undefined' ? window.location.pathname : ''),
    engagement_time_msec: 1,
    event_callback: callback
  };

  trackEvent('cta_click', eventData);

  if (DEBUG_MODE) {
    console.log('🎯 CTA Click tracked:', ctaId, ctaText, 'at', eventData.cta_location);
  }

  // If no callback provided, execute it after a small delay to ensure tracking
  if (!callback) {
    return;
  }

  // Fallback timeout in case event_callback doesn't fire
  setTimeout(() => {
    if (callback) callback();
  }, 300);
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
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
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

// Track specific button actions for conversion tracking
export const trackStartFreeTrialClick = (location: string, planType?: string) => {
  trackEvent('start_free_trial_click', {
    event_category: 'conversion',
    event_label: 'start_free_trial',
    button_location: location,
    plan_type: planType || 'unknown',
    value: 1 // For conversion value tracking
  });
};

export const trackRequestDemoClick = (location: string, planType?: string) => {
  trackEvent('request_demo_click', {
    event_category: 'conversion',
    event_label: 'request_demo',
    button_location: location,
    plan_type: planType || 'unknown',
    value: 1 // For conversion value tracking
  });
};

// Enhanced button click tracking with more specific events
export const trackCTAButtonClick = (buttonType: 'start_trial' | 'request_demo' | 'contact_sales' | 'other', location: string, planType?: string) => {
  // Track the specific button type
  switch (buttonType) {
    case 'start_trial':
      trackStartFreeTrialClick(location, planType);
      break;
    case 'request_demo':
      trackRequestDemoClick(location, planType);
      break;
    case 'contact_sales':
      trackEvent('contact_sales_click', {
        event_category: 'conversion',
        event_label: 'contact_sales',
        button_location: location,
        plan_type: planType || 'unknown',
        value: 1
      });
      break;
    default:
      trackButtonClick(buttonType, location);
  }

  // Also track the generic button click for broader analysis
  trackButtonClick(buttonType, location);
};

// Test function to verify GA4 connection
export const testGA4Connection = () => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    trackEvent('test_connection', {
      event_category: 'debug',
      event_label: 'ga4_connection_test',
      timestamp: new Date().toISOString()
    });
    console.log('🧪 GA4 Connection test sent');
    return true;
  } else {
    console.error('❌ GA4 not available');
    return false;
  }
};

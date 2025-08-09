// Google Analytics 4 tracking utilities - FIXED VERSION

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void;
    dataLayer: unknown[];
  }
}

// GA4 Configuration
export const GA4_MEASUREMENT_ID = 'G-XWT5762FH8';
// Note: API Secret should only be used server-side, not in client code

// Debug mode - enabled for troubleshooting GA4 issues
const DEBUG_MODE = true;

// Check if GA4 is properly loaded
const isGA4Ready = (): boolean => {
  return typeof window !== 'undefined' &&
         typeof window.gtag === 'function' &&
         Array.isArray(window.dataLayer);
};

// Wait for GA4 to be fully loaded
const waitForGA4 = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (isGA4Ready()) {
      console.log('✅ GA4 already loaded and ready');
      resolve(true);
      return;
    }

    let attempts = 0;
    const maxAttempts = 100; // 10 seconds max wait

    const checkGA4 = () => {
      attempts++;

      if (isGA4Ready()) {
        console.log('✅ GA4 is now ready after', attempts, 'attempts');
        resolve(true);
      } else if (attempts >= maxAttempts) {
        console.error('❌ GA4 failed to load after 10 seconds');
        console.log('Debug info:', {
          hasWindow: typeof window !== 'undefined',
          hasGtag: typeof window?.gtag,
          hasDataLayer: Array.isArray(window?.dataLayer),
          gtagType: typeof window?.gtag
        });
        resolve(false);
      } else {
        if (attempts % 10 === 0) {
          console.log('⏳ Still waiting for GA4... attempt', attempts);
        }
        setTimeout(checkGA4, 100);
      }
    };

    checkGA4();
  });
};

// Enhanced track event function
export const trackEvent = async (eventName: string, parameters?: Record<string, unknown>) => {
  if (typeof window === 'undefined') {
    console.warn('⚠️ Server-side rendering - skipping GA4 event');
    return false;
  }

  // Debug logging
  if (DEBUG_MODE) {
    console.log('📊 GA4 Event Request:', eventName, parameters);
  }

  // Wait for GA4 to be ready
  const ga4Ready = await waitForGA4();

  if (!ga4Ready) {
    console.error('❌ GA4 not available - event not sent:', eventName);
    return false;
  }

  try {
    // Send the event with proper configuration
    window.gtag('event', eventName, {
      // Always include these for proper tracking
      send_to: GA4_MEASUREMENT_ID,
      debug_mode: DEBUG_MODE,

      // Include user parameters
      ...parameters
    });

    if (DEBUG_MODE) {
      console.log('✅ GA4 Event sent:', eventName);
      console.log('📋 Full event data:', {
        event: eventName,
        send_to: GA4_MEASUREMENT_ID,
        debug_mode: DEBUG_MODE,
        ...parameters
      });

      // Also send to dataLayer directly for debugging
      if (window.dataLayer) {
        console.log('📊 DataLayer length:', window.dataLayer.length);
      }
    }

    return true;
  } catch (error) {
    console.error('❌ GA4 Event failed to send:', error);
    return false;
  }
};

// Track CTA button clicks - PRIMARY TRACKING FUNCTION
export const trackCTAClick = async (ctaId: string, ctaText: string, ctaLocation?: string, callback?: () => void) => {
  const location = ctaLocation || (typeof window !== 'undefined' ? window.location.pathname : '/unknown');

  const eventData = {
    cta_id: ctaId,
    cta_text: ctaText,
    cta_location: location,
    engagement_time_msec: 1,

    // Standard GA4 parameters
    event_category: 'engagement',
    event_label: ctaId,
    value: 1
  };

  const success = await trackEvent('cta_click', eventData);

  if (DEBUG_MODE) {
    console.log('🎯 CTA Click tracking result:', success ? 'SUCCESS' : 'FAILED');
    console.log('🎯 CTA Details:', { ctaId, ctaText, location });
  }

  // Execute callback after tracking attempt
  if (callback) {
    setTimeout(() => {
      callback();
    }, 100);
  }

  return success;
};

// Track contact form submissions
export const trackContactFormSubmission = async (formData: {
  company?: string;
  companySize?: string;
  source?: string;
}) => {
  return await trackEvent('contact_form_submit', {
    event_category: 'lead_generation',
    event_label: 'contact_sales_form',
    company_size: formData.companySize,
    company: formData.company,
    source: formData.source || 'website',
    value: 10 // Higher value for form submissions
  });
};

// Track button clicks (generic)
export const trackButtonClick = async (buttonName: string, location: string) => {
  return await trackEvent('button_click', {
    event_category: 'engagement',
    event_label: buttonName,
    button_location: location
  });
};

// Track demo interactions
export const trackDemoInteraction = async (action: string, details?: Record<string, unknown>) => {
  return await trackEvent('demo_interaction', {
    event_category: 'demo',
    event_label: action,
    ...details
  });
};

// Track pricing plan views
export const trackPricingPlanView = async (planName: string) => {
  return await trackEvent('pricing_plan_view', {
    event_category: 'pricing',
    event_label: planName,
    plan_name: planName
  });
};

// Enhanced test function with detailed diagnostics
export const testGA4Connection = async () => {
  console.log('🧪 Testing GA4 Connection...');

  // Check basic availability
  const basicCheck = isGA4Ready();
  console.log('📋 Basic GA4 Check:', basicCheck ? 'PASS' : 'FAIL');

  if (!basicCheck) {
    console.log('❌ GA4 Basic Check Failed:', {
      hasWindow: typeof window !== 'undefined',
      hasGtag: typeof window?.gtag,
      hasDataLayer: Array.isArray(window?.dataLayer)
    });
    return false;
  }

  // Send test event
  const testSuccess = await trackEvent('ga4_connection_test', {
    event_category: 'debug',
    event_label: 'connection_test',
    test_timestamp: new Date().toISOString(),
    test_id: Math.random().toString(36).substr(2, 9)
  });

  console.log('🧪 GA4 Test Event Result:', testSuccess ? 'SUCCESS' : 'FAILED');

  if (testSuccess) {
    console.log('✅ GA4 is working! Check DebugView in GA4 console.');
    console.log('🔗 GA4 DebugView: https://analytics.google.com/analytics/web/#/debugview');
  }

  return testSuccess;
};

// Page view tracking (for SPA navigation)
export const trackPageView = async (pagePath: string, pageTitle: string) => {
  const ga4Ready = await waitForGA4();

  if (ga4Ready) {
    window.gtag('config', GA4_MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: pageTitle,
      debug_mode: DEBUG_MODE
    });

    if (DEBUG_MODE) {
      console.log('📄 Page view tracked:', { pagePath, pageTitle });
    }
  }
};

// Auto-test GA4 when this module loads
if (typeof window !== 'undefined') {
  // Wait a bit for the page to load, then test
  setTimeout(async () => {
    await testGA4Connection();
  }, 2000);
}

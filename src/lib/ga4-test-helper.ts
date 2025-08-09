// GA4 Testing Helper - Safe for client-side use
// This file demonstrates how to test GA4 tracking without exposing API secrets

import { trackCTAClick } from './analytics'

export const testGA4Tracking = () => {
  console.log('🧪 Testing GA4 Tracking Implementation')

  // Test different button scenarios
  const testScenarios = [
    {
      ctaId: 'start_free_trial',
      ctaText: 'Start Free Trial',
      location: '/test-hero'
    },
    {
      ctaId: 'request_demo',
      ctaText: 'Request Demo',
      location: '/test-form'
    }
  ]

  testScenarios.forEach((scenario, index) => {
    setTimeout(() => {
      console.log(`🎯 Test ${index + 1}: Tracking ${scenario.ctaId}`)
      trackCTAClick(scenario.ctaId, scenario.ctaText, scenario.location)
    }, index * 1000)
  })

  console.log('✅ Test events sent! Check GA4 DebugView to see results.')
}

// Instructions for testing
export const getTestingInstructions = () => {
  return {
    steps: [
      '1. Open GA4 → Admin → DebugView',
      '2. Visit your website',
      '3. Click tracked buttons or run testGA4Tracking()',
      '4. Watch for "cta_click" events in DebugView',
      '5. Verify event parameters are correct'
    ],
    expectedEvents: [
      'cta_click with cta_id: "start_free_trial"',
      'cta_click with cta_id: "request_demo"',
      'contact_form_submit when form is submitted'
    ],
    debugMode: true,
    measurementId: 'G-XWT5762FH8'
  }
}

// Security Note:
// The Measurement ID (G-XWT5762FH8) is safe to expose - it's meant for client-side use
// The API Secret should ONLY be used server-side for Measurement Protocol API calls

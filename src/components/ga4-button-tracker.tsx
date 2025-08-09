"use client"

import { useEffect } from 'react'
import { trackCTAClick } from '@/lib/analytics'

export const GA4ButtonTracker = () => {
  useEffect(() => {
    const handleButtonClick = (event: Event, ctaId: string, ctaText: string) => {
      const target = event.target as HTMLElement
      const href = target.getAttribute('href')
      const ctaLocation = window.location.pathname

      console.log('🎯 GA4 Button Tracker - CTA Click:', {
        ctaId,
        ctaText,
        ctaLocation,
        hasHref: !!href
      })

      // Track the click
      trackCTAClick(ctaId, ctaText, ctaLocation)

      // Handle navigation if it's a link
      if (href && !event.defaultPrevented) {
        event.preventDefault()

        // Add small delay for tracking to complete
        setTimeout(() => {
          window.location.href = href
        }, 150)
      }
    }

    const attachEventListeners = () => {
      // Find all buttons with data-ga-id attributes
      const trackedButtons = document.querySelectorAll('[data-ga-id]')

      trackedButtons.forEach((button) => {
        const element = button as HTMLElement
        const ctaId = element.getAttribute('data-ga-id')
        const ctaText = element.textContent?.trim() || 'Unknown Button'

        // Skip if no ctaId or already tracked
        const elementWithTracker = element as HTMLElement & { __ga4Tracked?: boolean }
        if (!ctaId || elementWithTracker.__ga4Tracked) return

        // Create specific handler for this button
        const buttonHandler = (event: Event) => {
          handleButtonClick(event, ctaId, ctaText)
        }

        // Mark as tracked and add listener
        elementWithTracker.__ga4Tracked = true
        element.addEventListener('click', buttonHandler)

        console.log('📊 GA4 Button Tracker attached to:', ctaId, ctaText)
      })
    }

    // Initial attachment after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', attachEventListeners)
    } else {
      attachEventListeners()
    }

    // Re-attach on route changes (for SPAs)
    const handleRouteChange = () => {
      setTimeout(attachEventListeners, 100)
    }

    // Listen for navigation events
    window.addEventListener('popstate', handleRouteChange)

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
      document.removeEventListener('DOMContentLoaded', attachEventListeners)
    }
  }, [])

  return null // This component doesn't render anything
}

export default GA4ButtonTracker

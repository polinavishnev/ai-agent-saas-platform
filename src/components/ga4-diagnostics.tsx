"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const GA4Diagnostics = () => {
  const [diagnostics, setDiagnostics] = useState<string[]>([])
  const [isVisible, setIsVisible] = useState(false)

  const addLog = (message: string) => {
    setDiagnostics(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const clearLogs = () => {
    setDiagnostics([])
  }

  const runFullDiagnostic = async () => {
    clearLogs()
    addLog("🔍 Starting comprehensive GA4 diagnostic...")

    // Check 1: Basic window/script availability
    addLog(`Window available: ${typeof window !== 'undefined'}`)
    addLog(`gtag function type: ${typeof window?.gtag}`)
    addLog(`dataLayer exists: ${Array.isArray(window?.dataLayer)}`)
    addLog(`dataLayer length: ${window?.dataLayer?.length || 0}`)

    // Check 2: Network connectivity to Google
    try {
      const response = await fetch('https://www.google-analytics.com/analytics.js', {
        method: 'HEAD',
        mode: 'no-cors'
      })
      addLog(`✅ Network to Google Analytics: OK`)
    } catch (error) {
      addLog(`❌ Network to Google Analytics: FAILED - ${error}`)
    }

    // Check 3: gtag script loading
    const gtagScript = document.querySelector('script[src*="gtag/js"]')
    addLog(`gtag script element found: ${!!gtagScript}`)

    if (gtagScript) {
      addLog(`gtag script src: ${gtagScript.getAttribute('src')}`)
    }

    // Check 4: DataLayer inspection
    if (window?.dataLayer) {
      addLog(`📊 DataLayer contents:`)
      window.dataLayer.forEach((item, index) => {
        if (index < 10) { // Show first 10 items
          addLog(`  [${index}]: ${JSON.stringify(item)}`)
        }
      })
    }

    // Check 5: Send test event with detailed monitoring
    if (typeof window?.gtag === 'function') {
      addLog("🧪 Sending test event...")

      const testEventData = {
        event_category: 'diagnostic',
        event_label: 'full_diagnostic_test',
        debug_mode: true,
        send_to: 'G-XWT5762FH8',
        test_timestamp: new Date().toISOString(),
        test_id: Math.random().toString(36).substring(7)
      }

      try {
        window.gtag('event', 'diagnostic_test', testEventData)
        addLog(`✅ Test event sent with data: ${JSON.stringify(testEventData)}`)

        // Check dataLayer after sending
        setTimeout(() => {
          addLog(`📊 DataLayer length after event: ${window?.dataLayer?.length || 0}`)

          // Look for our event in dataLayer
          const recentEntries = window?.dataLayer?.slice(-5) || []
          const foundTestEvent = recentEntries.find(entry =>
            typeof entry === 'object' &&
            entry !== null &&
            'event' in entry &&
            entry.event === 'diagnostic_test'
          )

          if (foundTestEvent) {
            addLog(`✅ Test event found in dataLayer: ${JSON.stringify(foundTestEvent)}`)
          } else {
            addLog(`❌ Test event NOT found in recent dataLayer entries`)
            addLog(`Recent dataLayer entries: ${JSON.stringify(recentEntries)}`)
          }
        }, 1000)

      } catch (error) {
        addLog(`❌ Test event failed: ${error}`)
      }
    } else {
      addLog("❌ gtag function not available")
    }

    // Check 6: Browser/extension interference
    addLog("🔍 Checking for potential blockers...")

    // Check for common ad blockers
    const adBlockIndicators = [
      'adBlock',
      'adBlockEnabled',
      'blockAdBlock',
      'fuckAdBlock'
    ]

    let blockersFound = 0
    adBlockIndicators.forEach(indicator => {
      if (window[indicator as keyof Window]) {
        addLog(`⚠️ Potential ad blocker detected: ${indicator}`)
        blockersFound++
      }
    })

    if (blockersFound === 0) {
      addLog("✅ No obvious ad blockers detected")
    }

    // Check 7: Console errors
    const originalError = console.error
    const errorsCaught: string[] = []

    console.error = (...args) => {
      errorsCaught.push(args.join(' '))
      originalError(...args)
    }

    setTimeout(() => {
      console.error = originalError
      if (errorsCaught.length > 0) {
        addLog(`❌ Console errors detected: ${errorsCaught.join(', ')}`)
      } else {
        addLog("✅ No console errors during test")
      }
    }, 2000)

    addLog("🏁 Diagnostic complete! Check results above.")
  }

  const sendManualTestEvent = () => {
    if (typeof window?.gtag === 'function') {
      const eventData = {
        send_to: 'G-XWT5762FH8',
        debug_mode: true,
        manual_test: true,
        timestamp: Date.now()
      }

      window.gtag('event', 'manual_test_event', eventData)
      addLog(`🧪 Manual test event sent: ${JSON.stringify(eventData)}`)

      setTimeout(() => {
        addLog(`📊 Current dataLayer length: ${window?.dataLayer?.length || 0}`)
      }, 500)
    } else {
      addLog("❌ Cannot send manual test - gtag not available")
    }
  }

  const checkGA4Property = () => {
    addLog("🔍 GA4 Property Check:")
    addLog("Measurement ID: G-XWT5762FH8")
    addLog("Expected in GA4 DebugView: https://analytics.google.com/analytics/web/#/debugview")
    addLog("⚠️ Make sure you're looking at the CORRECT GA4 property!")
    addLog("⚠️ DebugView only shows events from the last 30 minutes")
    addLog("⚠️ Some browsers/extensions block GA4 - try incognito mode")
  }

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          variant="outline"
          size="sm"
          className="bg-red-500 text-white hover:bg-red-600"
        >
          🔍 GA4 Debug
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-96 overflow-hidden">
      <Card className="bg-white shadow-lg border-2 border-red-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex justify-between items-center">
            🔍 GA4 Diagnostics
            <Button
              onClick={() => setIsVisible(false)}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          <div className="flex gap-2 flex-wrap">
            <Button onClick={runFullDiagnostic} size="sm" className="text-xs">
              Full Diagnostic
            </Button>
            <Button onClick={sendManualTestEvent} size="sm" variant="outline" className="text-xs">
              Test Event
            </Button>
            <Button onClick={checkGA4Property} size="sm" variant="outline" className="text-xs">
              GA4 Info
            </Button>
            <Button onClick={clearLogs} size="sm" variant="outline" className="text-xs">
              Clear
            </Button>
          </div>

          <div className="bg-gray-100 p-2 rounded max-h-48 overflow-y-auto text-xs font-mono">
            {diagnostics.length === 0 ? (
              <div className="text-gray-500">Click "Full Diagnostic" to start...</div>
            ) : (
              diagnostics.map((log, index) => (
                <div key={index} className="mb-1 break-words">
                  {log}
                </div>
              ))
            )}
          </div>

          <div className="text-xs text-gray-600 border-t pt-2">
            <strong>Quick Checks:</strong><br />
            • Open GA4 DebugView<br />
            • Try incognito mode<br />
            • Disable ad blockers<br />
            • Check correct GA4 property
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default GA4Diagnostics

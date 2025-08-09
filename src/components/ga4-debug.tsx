"use client"

import { useState, useEffect } from "react"
import { testGA4Connection, trackStartFreeTrialClick, trackRequestDemoClick } from "@/lib/analytics"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function GA4Debug() {
  const [isGA4Ready, setIsGA4Ready] = useState(false)
  const [testResults, setTestResults] = useState<string[]>([])

  useEffect(() => {
    // Check GA4 readiness every 2 seconds for the first 10 seconds
    const checkGA4 = () => {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        setIsGA4Ready(true)
        addTestResult("✅ GA4 is ready and available")
        return true
      } else {
        addTestResult("⏳ Waiting for GA4 to load...")
        return false
      }
    }

    const interval = setInterval(() => {
      if (checkGA4()) {
        clearInterval(interval)
      }
    }, 2000)

    // Stop checking after 10 seconds
    setTimeout(() => {
      clearInterval(interval)
      if (!isGA4Ready) {
        addTestResult("❌ GA4 failed to load after 10 seconds")
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const addTestResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testStartFreeTrial = () => {
    trackStartFreeTrialClick('debug_panel', 'test')
    addTestResult("🧪 Sent 'Start Free Trial' test event")
  }

  const testRequestDemo = () => {
    trackRequestDemoClick('debug_panel', 'test')
    addTestResult("🧪 Sent 'Request Demo' test event")
  }

  const testConnection = () => {
    const result = testGA4Connection()
    if (result) {
      addTestResult("🧪 Sent connection test event")
    } else {
      addTestResult("❌ Connection test failed")
    }
  }

  // Only show in development mode
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 max-h-96 overflow-hidden shadow-lg z-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          📊 GA4 Debug Panel
          <div className={`w-2 h-2 rounded-full ${isGA4Ready ? 'bg-green-500' : 'bg-yellow-500'}`} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-xs">
          <strong>Measurement ID:</strong> G-XWT5762FH8
        </div>

        <div className="flex gap-1 flex-wrap">
          <Button size="sm" onClick={testConnection} variant="outline" className="text-xs">
            Test Connection
          </Button>
          <Button size="sm" onClick={testStartFreeTrial} variant="outline" className="text-xs">
            Test Start Trial
          </Button>
          <Button size="sm" onClick={testRequestDemo} variant="outline" className="text-xs">
            Test Request Demo
          </Button>
        </div>

        <div className="max-h-32 overflow-y-auto text-xs space-y-1 bg-slate-50 p-2 rounded">
          {testResults.length === 0 ? (
            <div className="text-slate-500">No events yet...</div>
          ) : (
            testResults.slice(-5).map((result, index) => (
              <div key={index} className="text-slate-700">
                {result}
              </div>
            ))
          )}
        </div>

        <div className="text-xs text-slate-500">
          Check browser console for detailed GA4 logs
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { trackCTAClick } from '@/lib/analytics'

export const GA4ManualTest = () => {
  const [testCount, setTestCount] = useState(0)
  const [lastResult, setLastResult] = useState<string>('')

  const runTest = async () => {
    const testNum = testCount + 1
    setTestCount(testNum)

    console.log(`🧪 Manual GA4 Test #${testNum} starting...`)

    try {
      const success = await trackCTAClick(
        'manual_test',
        `Manual Test #${testNum}`,
        `/manual-test-${testNum}`
      )

      const result = success ? 'SUCCESS ✅' : 'FAILED ❌'
      setLastResult(result)

      console.log(`🧪 Manual GA4 Test #${testNum} result: ${result}`)

      // Additional direct gtag test
      if (typeof window?.gtag === 'function') {
        window.gtag('event', 'manual_direct_test', {
          send_to: 'G-XWT5762FH8',
          debug_mode: true,
          test_number: testNum,
          timestamp: Date.now()
        })
        console.log(`🎯 Direct gtag test #${testNum} sent`)
      }

    } catch (error) {
      setLastResult('ERROR ❌')
      console.error('Manual test error:', error)
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-3 shadow-lg">
        <div className="text-sm font-semibold mb-2">🧪 GA4 Manual Test</div>
        <Button
          onClick={runTest}
          size="sm"
          className="w-full mb-2 bg-yellow-500 hover:bg-yellow-600"
        >
          Test GA4 Event #{testCount + 1}
        </Button>
        {lastResult && (
          <div className="text-xs">
            Last: {lastResult}
          </div>
        )}
        <div className="text-xs text-gray-600 mt-1">
          Check console & GA4 DebugView
        </div>
      </div>
    </div>
  )
}

export default GA4ManualTest

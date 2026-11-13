import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, useReducedMotion } from 'motion/react'
import { PortfolioPreferencesProvider, usePortfolioPreferences } from './providers/PortfolioPreferences'
import { TemplateRouter } from './router/TemplateRouter'
import { LaunchLoader } from './LaunchLoader'

export default function App() {
  return <PortfolioPreferencesProvider><PortfolioApplication /></PortfolioPreferencesProvider>
}

function PortfolioApplication() {
  const [loading, setLoading] = useState(true)
  const reduced = useReducedMotion()
  const { selectedTemplate, theme } = usePortfolioPreferences()

  useEffect(() => {
    if (!loading) return
    const timer = window.setTimeout(() => setLoading(false), reduced ? 420 : 540)
    return () => window.clearTimeout(timer)
  }, [loading])

  return <MotionConfig reducedMotion="user">
    <AnimatePresence>
      {loading && <LaunchLoader template={selectedTemplate} theme={theme} />}
    </AnimatePresence>
    <TemplateRouter />
  </MotionConfig>
}

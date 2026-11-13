import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Code2 } from 'lucide-react'
import { Header } from '../components/SiteChrome'
import { PortfolioSections } from '../pages/Pages'

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => localStorage.getItem('siva-theme') === 'dark' ? 'dark' : 'light')
  const [loading, setLoading] = useState(true)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('siva-theme', theme)
  }, [theme])

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 720)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [loading])

  return (
    <>
      <AnimatePresence>
        {loading && <motion.div className="launch-screen" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.3 }} aria-label="Loading portfolio">
          <div className="loader-brand"><span>SC</span><Code2 size={17} /></div>
          <div className="loader-track"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.62, ease: 'easeInOut' }} /></div>
          <p>Building something thoughtful</p>
        </motion.div>}
      </AnimatePresence>
      <div className="app-shell">
        <Header theme={theme} onToggleTheme={() => setTheme((current) => current === 'light' ? 'dark' : 'light')} />
        <main>
          <PortfolioSections />
        </main>
      </div>
    </>
  )
}

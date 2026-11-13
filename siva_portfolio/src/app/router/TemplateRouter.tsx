import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { navigation } from '../../data/portfolio'
import { registeredTemplates, templateRegistry } from '../../templates/registry'
import type { PageId } from '../../templates/types'
import { usePortfolioPreferences } from '../providers/PortfolioPreferences'

export function TemplateRouter() {
  const location = useLocation()
  const navigate = useNavigate()
  const handledInitialReload = useRef(false)
  const { theme, selectedTemplate, onTemplateSelect, onThemeToggle } = usePortfolioPreferences()
  useEffect(() => {
    if (handledInitialReload.current) return
    handledInitialReload.current = true
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
    if (navigationEntry?.type === 'reload' && window.location.pathname !== '/') navigate('/', { replace: true })
  }, [navigate])
  const page = navigation.find((item) => item.path === location.pathname)?.page as PageId | undefined

  if (!page) return <Routes><Route path="*" element={<Navigate to="/" replace />} /></Routes>

  const Layout = templateRegistry[selectedTemplate].Layout
  return <Layout activePage={page} theme={theme} selectedTemplate={selectedTemplate} templates={registeredTemplates} onTemplateSelect={onTemplateSelect} onThemeToggle={onThemeToggle} />
}

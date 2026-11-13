import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { defaultTemplate, isTemplateId } from '../../templates/registry'
import type { ThemeMode, TemplateId } from '../../templates/types'

type PortfolioPreferences = {
  theme: ThemeMode
  selectedTemplate: TemplateId
  onTemplateSelect: (template: TemplateId) => void
  onThemeToggle: () => void
}

const PreferencesContext = createContext<PortfolioPreferences | null>(null)

function readTheme(): ThemeMode {
  return localStorage.getItem('siva-theme') === 'dark' ? 'dark' : 'light'
}

function readTemplate(): TemplateId {
  const saved = localStorage.getItem('siva-template')
  return isTemplateId(saved) ? saved : defaultTemplate
}

export function PortfolioPreferencesProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(readTheme)
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(readTemplate)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('siva-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.dataset.template = selectedTemplate
    localStorage.setItem('siva-template', selectedTemplate)
  }, [selectedTemplate])

  const value = useMemo<PortfolioPreferences>(() => ({
    theme,
    selectedTemplate,
    onTemplateSelect: setSelectedTemplate,
    onThemeToggle: () => setTheme((current) => current === 'light' ? 'dark' : 'light'),
  }), [theme, selectedTemplate])

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}

export function usePortfolioPreferences() {
  const value = useContext(PreferencesContext)
  if (!value) throw new Error('usePortfolioPreferences must be used within PortfolioPreferencesProvider')
  return value
}

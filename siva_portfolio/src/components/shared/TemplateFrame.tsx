import { Link } from 'react-router-dom'
import { useEffect, useState, type ReactNode } from 'react'
import { SectionNavigation } from '../navigation/SectionNavigation'
import { TemplateSelector } from '../template-switcher/TemplateSelector'
import { ThemeToggle } from '../theme-switcher/ThemeToggle'
import { profile } from '../../data/profile'
import type { LayoutProps } from '../../templates/types'
import type { PageId } from '../../templates/types'
import { PortfolioFooter } from './PortfolioFooter'

export function TemplateFrame({ children, className, ...props }: LayoutProps & { children: ReactNode; className: string }) {
  const [scrollPage, setScrollPage] = useState<PageId>(props.activePage)
  useEffect(() => {
    setScrollPage(props.activePage)
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'resume', 'contact']
      .map((id) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section))
    const syncFromScroll = () => {
      const marker = window.innerHeight * .36
      const current = sections.find((section) => {
        const bounds = section.getBoundingClientRect()
        return bounds.top <= marker && bounds.bottom > marker
      })
      if (current) setScrollPage(current.id as PageId)
    }
    window.addEventListener('scroll', syncFromScroll, { passive: true })
    document.addEventListener('scroll', syncFromScroll, { passive: true, capture: true })
    window.addEventListener('resize', syncFromScroll)
    const firstSync = window.requestAnimationFrame(syncFromScroll)
    return () => {
      window.cancelAnimationFrame(firstSync)
      window.removeEventListener('scroll', syncFromScroll)
      document.removeEventListener('scroll', syncFromScroll, true)
      window.removeEventListener('resize', syncFromScroll)
    }
  }, [props.activePage, props.selectedTemplate])
  return <div className={`template-frame ${className}`} data-template={props.selectedTemplate} data-theme-mode={props.theme}>
    <header className="template-header">
      <Link to="/" className="template-mark" aria-label={`${profile.fullName} home`}>SC<span>.</span></Link>
      <SectionNavigation activePage={scrollPage} />
      <div className="template-controls">
        <TemplateSelector templates={props.templates} selected={props.selectedTemplate} onSelect={props.onTemplateSelect} />
        <ThemeToggle theme={props.theme} onToggle={props.onThemeToggle} />
      </div>
    </header>
    {children}
    <PortfolioFooter />
  </div>
}

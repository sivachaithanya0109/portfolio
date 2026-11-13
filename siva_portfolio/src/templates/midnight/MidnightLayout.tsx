import { useEffect, useState } from 'react'
import type { LayoutProps } from '../types'
import { Header } from '../../components/SiteChrome'
import { PortfolioSections } from '../../pages/Pages'
import { useRouteSection } from '../../hooks/useRouteSection'
import { PortfolioFooter } from '../../components/shared/PortfolioFooter'

export function MidnightLayout(props: LayoutProps) {
  const [activePage, setActivePage] = useState(props.activePage)
  useRouteSection(props.activePage)
  useEffect(() => {
    setActivePage(props.activePage)
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'resume', 'contact']
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))

    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'))
      return
    }

    const pageObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActivePage(entry.target.id as LayoutProps['activePage'])
      }
    }, { rootMargin: '-28% 0px -58% 0px' })
    const revealObserver = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    }, { threshold: .12 })

    sections.forEach((section) => pageObserver.observe(section))
    revealItems.forEach((item) => revealObserver.observe(item))
    return () => { pageObserver.disconnect(); revealObserver.disconnect() }
  }, [props.activePage])

  const headerProps = { ...props, activePage }
  return <div className="app-shell" data-template="midnight-professional">
    <Header {...headerProps} />
    <main><PortfolioSections /></main>
    <PortfolioFooter />
  </div>
}

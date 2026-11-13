import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react'
import { navigation, profile } from '../data/portfolio'
import { TemplateSelector } from './template-switcher/TemplateSelector'
import { ThemeToggle } from './theme-switcher/ThemeToggle'
import type { LayoutProps } from '../templates/types'

export function Header({ theme, onThemeToggle, activePage, selectedTemplate, onTemplateSelect, templates }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])
  return <header className="site-header">
    <div className="header-inner">
      <Link className="wordmark" to="/" aria-label={`${profile.fullName} home`}>SC<span>.</span></Link>
      <nav id="mobile-navigation" className={`desktop-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        {navigation.map((item) => <Link key={item.page} to={item.path} className={activePage === item.page ? 'active' : ''} aria-current={activePage === item.page ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
      </nav>
      <div className="header-actions">
        <TemplateSelector templates={templates} selected={selectedTemplate} onSelect={onTemplateSelect} />
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </div>
    {menuOpen && <button className="mobile-backdrop" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} />}
  </header>
}

export function SocialLinks({ className = '' }: { className?: string }) {
  return <div className={`social-links ${className}`} aria-label="Social links">
    <a href={profile.githubSearch} target="_blank" rel="noreferrer" aria-label="Find Siva on GitHub"><Github size={18} /></a>
    <a href={profile.linkedIn} target="_blank" rel="noreferrer" aria-label="Siva on LinkedIn"><Linkedin size={18} /></a>
    <a href={`mailto:${profile.email}`} aria-label="Email Siva"><Mail size={18} /></a>
  </div>
}

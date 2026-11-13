import { useEffect, useState } from 'react'
import { Github, Linkedin, Mail, Menu, Moon, Sun, X } from 'lucide-react'

const navigation = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Resume', id: 'resume' },
  { label: 'Contact', id: 'contact' },
]

const githubSearch = 'https://github.com/search?q=Gurram+Siva+Chaithanya&type=users'
const linkedIn = 'https://www.linkedin.com/in/gurram-siva-chaithanya-7781942a3/'

type HeaderProps = { theme: 'light' | 'dark'; onToggleTheme: () => void }

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const sections = navigation.map(({ id }) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section))
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id) })
    }, { rootMargin: '-28% 0px -58% 0px' })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="wordmark" href="#home" aria-label="Siva Chaithanya Gurram home">SC<span>.</span></a>
        <nav id="mobile-navigation" className={`desktop-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {navigation.map((item) => <a key={item.id} className={active === item.id ? 'active' : ''} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          <button className="theme-toggle" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {menuOpen && <button className="mobile-backdrop" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} />}
    </header>
  )
}

export function SocialLinks() {
  return <div className="social-links" aria-label="Social links">
    <a href={githubSearch} target="_blank" rel="noreferrer" aria-label="Find Siva on GitHub"><Github size={18} /></a>
    <a href={linkedIn} target="_blank" rel="noreferrer" aria-label="Siva on LinkedIn"><Linkedin size={18} /></a>
    <a href="mailto:g.sivachaithanya01@gmail.com" aria-label="Email Siva"><Mail size={18} /></a>
  </div>
}

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navigation } from '../../data/portfolio'
import type { PageId } from '../../templates/types'

export function SectionNavigation({ activePage, className = '' }: { activePage: PageId; className?: string }) {
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    const closeOnOutside = (event: PointerEvent) => { if (!navRef.current?.contains(event.target as Node)) setOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    document.addEventListener('pointerdown', closeOnOutside)
    return () => { window.removeEventListener('keydown', closeOnEscape); document.removeEventListener('pointerdown', closeOnOutside) }
  }, [])
  return <nav ref={navRef} className={`section-navigation ${className} ${open ? 'is-open' : ''}`} aria-label="Main navigation">
    <button className="section-menu-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <X size={19} /> : <Menu size={19} />}</button>
    <div className="section-navigation-links">{navigation.map((item) => <Link key={item.page} to={item.path} className={activePage === item.page ? 'active' : ''} aria-current={activePage === item.page ? 'page' : undefined} onClick={() => setOpen(false)}>{item.label}</Link>)}</div>
  </nav>
}

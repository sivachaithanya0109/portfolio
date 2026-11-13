import { Moon, Sun } from 'lucide-react'
import type { ThemeMode } from '../../templates/types'

export function ThemeToggle({ theme, onToggle, className = '' }: { theme: ThemeMode; onToggle: () => void; className?: string }) {
  return <button className={`theme-toggle ${className}`} onClick={onToggle} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
    {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
  </button>
}

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import App from './App'
import { navigation } from '../data/portfolio'

function LocationProbe() {
  const location = useLocation()
  return <output aria-label="Current URL">{location.pathname}</output>
}

function renderAt(path = '/') {
  return render(<MemoryRouter initialEntries={[path]}><App /><LocationProbe /></MemoryRouter>)
}

afterEach(() => {
  cleanup()
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
  document.documentElement.removeAttribute('data-template')
})

describe('template and route integration', () => {
  it('registers all six selectable templates', () => {
    renderAt()
    fireEvent.click(screen.getByLabelText(/choose portfolio template/i))
    const picker = screen.getByRole('group', { name: /portfolio templates/i })
    expect(within(picker).getAllByRole('button')).toHaveLength(6)
    expect(within(picker).getByRole('button', { name: /midnight professional/i })).toHaveAttribute('aria-pressed', 'true')
  })

  it('switches immediately without changing the active URL or saved theme', () => {
    localStorage.setItem('siva-theme', 'dark')
    renderAt('/skills')
    expect(screen.getByLabelText('Current URL')).toHaveTextContent('/skills')
    fireEvent.click(screen.getByLabelText(/choose portfolio template/i))
    fireEvent.click(screen.getByRole('button', { name: /pastel developer/i }))
    expect(document.querySelector('.template-frame')).toHaveAttribute('data-template', 'pastel-developer')
    expect(screen.getByLabelText('Current URL')).toHaveTextContent('/skills')
    expect(within(screen.getByRole('navigation', { name: 'Main navigation' })).getByRole('link', { name: 'Skills' })).toHaveAttribute('aria-current', 'page')
    expect(localStorage.getItem('siva-template')).toBe('pastel-developer')
    expect(localStorage.getItem('siva-theme')).toBe('dark')
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
  })

  it('keeps every navigation route available in the current template', () => {
    for (const route of navigation) {
      const { unmount } = renderAt(route.path)
      expect(within(screen.getByRole('navigation', { name: 'Main navigation' })).getByRole('link', { name: route.label })).toHaveAttribute('aria-current', 'page')
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      unmount()
    }
  })

  it('falls back to the existing template for an invalid saved ID', () => {
    localStorage.setItem('siva-template', 'made-up-template')
    localStorage.setItem('siva-theme', 'dark')
    renderAt('/contact')
    expect(document.querySelector('.app-shell')).toHaveAttribute('data-template', 'midnight-professional')
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(localStorage.getItem('siva-template')).toBe('midnight-professional')
  })

  it('toggles and persists theme independently from the selected template', () => {
    localStorage.setItem('siva-template', 'mountain-explorer')
    renderAt('/about')
    expect(document.querySelector('.template-frame')).toHaveAttribute('data-template', 'mountain-explorer')
    fireEvent.click(screen.getByRole('button', { name: /switch to dark theme/i }))
    expect(localStorage.getItem('siva-template')).toBe('mountain-explorer')
    expect(localStorage.getItem('siva-theme')).toBe('dark')
    expect(document.querySelector('.template-frame')).toHaveAttribute('data-theme-mode', 'dark')
  })
})

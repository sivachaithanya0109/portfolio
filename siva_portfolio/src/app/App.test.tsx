import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

afterEach(() => {
  cleanup()
  localStorage.clear()
})

describe('portfolio routes', () => {
  it('renders the home introduction and primary navigation', () => {
    render(<MemoryRouter><App /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: /siva chaithanya gurram/i })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument()
  })

  it('renders the skills page at a direct route', () => {
    window.history.pushState({}, '', '/skills')
    render(<MemoryRouter initialEntries={['/skills']}><App /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: /technical skills/i })).toBeInTheDocument()
    expect(screen.getByText('Playwright')).toBeInTheDocument()
  })

  it('shows a custom page for unknown routes', () => {
    render(<MemoryRouter initialEntries={['/unknown-route']}><App /></MemoryRouter>)
    expect(screen.getByText(/page not found/i)).toBeInTheDocument()
  })
})

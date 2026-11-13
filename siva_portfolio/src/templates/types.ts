import type { ComponentType } from 'react'

export const templateIds = [
  'midnight-professional',
  'pastel-developer',
  'motion-cinematic',
  'automotive-journey',
  'mountain-explorer',
  'animated-professional',
] as const

export type TemplateId = typeof templateIds[number]
export type ThemeMode = 'light' | 'dark'
export type PageId = 'home' | 'about' | 'skills' | 'projects' | 'experience' | 'resume' | 'contact'

export type LayoutProps = {
  activePage: PageId
  theme: ThemeMode
  selectedTemplate: TemplateId
  templates: readonly TemplateDefinition[]
  onTemplateSelect: (template: TemplateId) => void
  onThemeToggle: () => void
}

export type TemplateDefinition = {
  id: TemplateId
  name: string
  description: string
  previewImage: string
  Layout: ComponentType<LayoutProps>
  supportedThemeModes: readonly ThemeMode[]
  designTokens: Readonly<Record<string, string>>
  availability: 'available' | 'coming-soon'
}

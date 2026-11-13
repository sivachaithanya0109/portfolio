export { profile } from './profile'
export { skillGroups, skillCards } from './skills'
export { projects } from './projects'
export { experience } from './experience'

export const navigation = [
  { label: 'Home', path: '/' as const, page: 'home' as const },
  { label: 'About', path: '/about' as const, page: 'about' as const },
  { label: 'Skills', path: '/skills' as const, page: 'skills' as const },
  { label: 'Projects', path: '/projects' as const, page: 'projects' as const },
  { label: 'Experience', path: '/experience' as const, page: 'experience' as const },
  { label: 'Resume', path: '/resume' as const, page: 'resume' as const },
  { label: 'Contact', path: '/contact' as const, page: 'contact' as const },
] as const

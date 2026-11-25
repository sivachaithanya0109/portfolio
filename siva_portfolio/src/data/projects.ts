import { profile } from './profile'

export const projects = [
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio',
    category: 'Frontend development',
    summary: 'A responsive portfolio to bring technical skills, selected projects and professional experience together in one clear web experience.',
    technologies: ['React', 'JavaScript', 'HTML', 'CSS', 'Node.js'],
    visual: 'portfolio',
    githubUrl: 'https://github.com/sivachaithanya0109/portfolio-chaithanya',
  },
  {
    id: 'analytics-dashboards',
    title: 'Analytics Dashboards',
    category: 'Data & analytics',
    summary: 'Analytics and dashboard work exploring banking and healthcare use cases, with a focus on making information easier to read.',
    technologies: ['Power BI', 'Dashboards'],
    visual: 'analytics',
    githubUrl: profile.githubSearch,
  },
  {
    id: 'casino-game-interfaces',
    title: 'Casino Game Interfaces',
    category: 'Interactive UI',
    summary: 'Hands-on experience building and refining interactive casino game interfaces and investigating related behaviour and UI issues.',
    technologies: ['PixiJS', 'JavaScript', 'TypeScript'],
    visual: 'games',
    githubUrl: profile.githubSearch,
  },
] as const

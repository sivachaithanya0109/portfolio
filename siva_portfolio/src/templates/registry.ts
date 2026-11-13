import type { TemplateDefinition, TemplateId } from './types'
import { MidnightLayout } from './midnight/MidnightLayout'
import { PastelLayout } from './pastel/PastelLayout'
import { MotionLayout } from './motion/MotionLayout'
import { AutomotiveLayout } from './automotive/AutomotiveLayout'
import { MountainLayout } from './mountain/MountainLayout'
import { AnimatedLayout } from './animated/AnimatedLayout'

export const templateRegistry: Readonly<Record<TemplateId, TemplateDefinition>> = {
  'midnight-professional': {
    id: 'midnight-professional',
    name: 'Midnight Professional',
    description: 'The existing portfolio layout and its saved light/dark theme.',
    previewImage: '/templates/midnight.svg',
    Layout: MidnightLayout,
    supportedThemeModes: ['light', 'dark'],
    designTokens: { '--ink': '#102337', '--surface': '#f8fafc', '--accent': '#147ccb' },
    availability: 'available',
  },
  'pastel-developer': {
    id: 'pastel-developer',
    name: 'Pastel Developer',
    description: 'Bright editorial panels, pastel skills and project cards.',
    previewImage: '/templates/pastel.svg',
    Layout: PastelLayout,
    supportedThemeModes: ['light', 'dark'],
    designTokens: { '--pastel-ink': '#12283d', '--pastel-blue': '#dceeff', '--pastel-mint': '#d8f4e7' },
    availability: 'available',
  },
  'motion-cinematic': {
    id: 'motion-cinematic',
    name: 'Motion Cinematic',
    description: 'A deep indigo and violet storytelling experience with restrained motion.',
    previewImage: '/templates/motion.svg',
    Layout: MotionLayout,
    supportedThemeModes: ['light', 'dark'],
    designTokens: { '--mc-night': '#090d18', '--mc-violet': '#a693ff', '--mc-paper': '#f5f4fa' },
    availability: 'available',
  },
  'automotive-journey': {
    id: 'automotive-journey',
    name: 'Automotive Journey',
    description: 'A route-inspired portfolio with a saffron accent and a compact static loader.',
    previewImage: '/templates/automotive.svg',
    Layout: AutomotiveLayout,
    supportedThemeModes: ['light', 'dark'],
    designTokens: { '--auto-saffron': '#e98b28', '--auto-ink': '#1a1d20', '--auto-paper': '#f5f2ec' },
    availability: 'available',
  },
  'mountain-explorer': {
    id: 'mountain-explorer',
    name: 'Mountain Explorer',
    description: 'A scenic exploration map with layered landscapes and a trail timeline.',
    previewImage: '/templates/mountain.svg',
    Layout: MountainLayout,
    supportedThemeModes: ['light', 'dark'],
    designTokens: { '--mountain-forest': '#204d42', '--mountain-sky': '#cce9f3', '--mountain-stone': '#68746f' },
    availability: 'available',
  },
  'animated-professional': {
    id: 'animated-professional',
    name: 'Animated Professional',
    description: 'A warm illustrated portfolio with an expressive character portrait.',
    previewImage: '/templates/animated.svg',
    Layout: AnimatedLayout,
    supportedThemeModes: ['light', 'dark'],
    designTokens: { '--anime-teal': '#159f91', '--anime-ink': '#07191c', '--anime-mint': '#e9fbf4' },
    availability: 'available',
  },
}

export const registeredTemplates = Object.values(templateRegistry)
export const defaultTemplate: TemplateId = 'midnight-professional'

export function isTemplateId(value: string | null): value is TemplateId {
  return value !== null && Object.hasOwn(templateRegistry, value)
}

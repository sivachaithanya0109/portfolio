export const skillGroups = [
  { id: 'frontend', category: 'Frontend development', items: ['React.js', 'JavaScript', 'TypeScript', 'PixiJS', 'Tailwind CSS', 'Vite'] },
  { id: 'quality', category: 'Quality engineering', items: ['Functional testing', 'API testing', 'Postman'] },
  { id: 'delivery', category: 'Cloud & delivery', items: ['Git', 'GitHub', 'AWS fundamentals', 'CI/CD fundamentals'] },
  { id: 'product', category: 'Product & analytics', items: ['User experience', 'Product discovery', 'Power BI'] },
] as const

export const skillCards = [
  { name: 'React.js', detail: 'UI Development', accent: 'blue', mark: '⚛' },
  { name: 'JavaScript & TypeScript', detail: 'Programming', accent: 'lilac', mark: 'JS' },
  { name: 'PixiJS', detail: 'Interactive UI', accent: 'mint', mark: '✳' },
  { name: 'Tailwind CSS & Vite', detail: 'Frontend tooling', accent: 'peach', mark: '⌘' },
  { name: 'Functional Testing', detail: 'Software quality', accent: 'peach', mark: '✓' },
  { name: 'API Testing & Postman', detail: 'API validation', accent: 'mint', mark: '⇄' },
  { name: 'Git & GitHub', detail: 'Version control', accent: 'blue', mark: '⌘' },
  { name: 'AWS, CI/CD & Power BI', detail: 'Cloud, delivery & analytics', accent: 'lilac', mark: '↗' },
] as const

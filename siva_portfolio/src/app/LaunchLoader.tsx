import { motion } from 'motion/react'
import type { TemplateId, ThemeMode } from '../templates/types'

export function LaunchLoader({ template, theme }: { template: TemplateId; theme: ThemeMode }) {
  return <motion.div className={`portfolio-launch launch-${template}`} data-theme-mode={theme} role="status" aria-label="Loading portfolio" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.015 }} transition={{ duration: .22 }}>
    <div className="launch-emblem" aria-hidden="true"><span>SC</span><i /></div>
    <div className="launch-progress" aria-hidden="true"><span /></div>
  </motion.div>
}

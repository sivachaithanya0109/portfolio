import type { ReactNode } from 'react'
import { ArrowDownToLine, ArrowLeft, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'

export function Eyebrow({ children, tone = 'blue' }: { children: ReactNode; tone?: string }) {
  return <span className={`eyebrow tone-${tone}`}><Sparkles size={13} />{children}</span>
}

export function PageIntro({ tag, title, description, tone = 'blue' }: { tag: string; title: ReactNode; description?: string; tone?: string }) {
  return <div className="page-intro"><Eyebrow tone={tone}>{tag}</Eyebrow><h1>{title}</h1>{description && <p>{description}</p>}</div>
}

export function ButtonLink({ to, children, variant = 'primary', download = false }: { to: string; children: ReactNode; variant?: 'primary' | 'secondary'; download?: boolean }) {
  const icon = download ? <ArrowDownToLine size={16} /> : variant === 'primary' ? <ArrowRight size={16} /> : <ArrowUpRight size={15} />
  return <Link className={`button button-${variant}`} to={to} download={download}>{children}{icon}</Link>
}

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion()
  return <motion.div className={className} initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.48, ease: 'easeOut' }}>{children}</motion.div>
}

export function BackHome() { return <Link className="text-link" to="/"><ArrowLeft size={16} /> Back home</Link> }

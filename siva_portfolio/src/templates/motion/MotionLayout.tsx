import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, ArrowDownToLine, ArrowRight, ArrowUpRight, Code2, Sparkles } from 'lucide-react'
import { TemplateFrame } from '../../components/shared/TemplateFrame'
import { ContactForm } from '../../components/shared/ContactForm'
import { SocialLinks } from '../../components/SiteChrome'
import { profile } from '../../data/profile'
import { skillGroups } from '../../data/skills'
import { projects } from '../../data/projects'
import { experience } from '../../data/experience'
import { useRouteSection } from '../../hooks/useRouteSection'
import type { LayoutProps } from '../types'

export function MotionLayout(props: LayoutProps) {
  useRouteSection(props.activePage)
  const heroRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 95])
  const appear = reduced ? {} : { initial: { opacity: 0, y: 26 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 }, transition: { duration: 0.7, ease: 'easeOut' as const } }
  return <TemplateFrame {...props} className="motion-template">
    <main className="motion-sections">
      <section className="mc-section mc-hero" id="home" ref={heroRef}>
        <motion.div className="mc-backdrop" style={{ y: reduced ? 0 : parallaxY }}><span className="mc-orb" /><span className="mc-grid" /><span className="mc-glow" /></motion.div>
        <motion.div className="mc-hero-copy" {...(reduced ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: .9, delay: .1 } })}>
          <span className="mc-eyebrow"><i /> SOFTWARE ENGINEER · DEVELOPMENT &amp; AUTOMATION</span>
          <h1><span>{profile.fullName}</span><em>Build with intention.</em></h1>
          <p>{profile.heroSummary}</p>
          <div className="mc-hero-actions"><Link to="/projects" className="mc-button">Explore Projects <ArrowRight size={16} /></Link><span>React · PixiJS · Quality</span></div>
          <SocialLinks className="mc-socials" />
        </motion.div>
        <div className="mc-hero-art"><span className="mc-ring ring-one" /><span className="mc-ring ring-two" /><div className="mc-portrait"><img src={profile.portraitPath} alt={`Portrait of ${profile.fullName}`} /><span>SC / 01</span></div><div className="mc-code-card"><Code2 size={15} /><span>interface</span><b>Reliable by design.</b></div></div>
        <a className="mc-scroll" href="#about">Scroll to explore <ArrowDown size={14} /></a>
      </section>
      <section className="mc-section mc-about" id="about"><motion.div className="mc-section-heading" {...appear}><span className="mc-number">01 / ABOUT</span><h2>Engineering is<br /><em>a human story.</em></h2></motion.div><div className="mc-about-copy">{profile.about.map((text, index) => <motion.p key={text} {...appear} transition={{ duration: .65, delay: index * .07 }}>{text}</motion.p>)}<blockquote>{profile.engineeringBelief}</blockquote></div></section>
      <section className="mc-section mc-skills" id="skills"><motion.div className="mc-section-heading" {...appear}><span className="mc-number">02 / CAPABILITIES</span><h2>Tools for the<br /><em>whole journey.</em></h2><p>Development, delivery and quality, connected.</p></motion.div><div className="mc-domain-grid">{skillGroups.map((group, index) => <motion.article key={group.id} className="mc-domain" {...appear} transition={{ duration: .55, delay: index * .08 }}><span>0{index + 1}</span><h3>{group.category}</h3><p>{group.items.join(' · ')}</p><div className="mc-domain-line" /></motion.article>)}</div></section>
      <section className="mc-section mc-projects" id="projects"><motion.div className="mc-section-heading" {...appear}><span className="mc-number">03 / SELECTED WORK</span><h2>Ideas made<br /><em>tangible.</em></h2></motion.div><div className="mc-project-stack">{projects.map((project, index) => <motion.article key={project.id} className={`mc-project mc-${project.visual}`} {...appear} whileHover={reduced ? undefined : { y: -7, scale: 1.012 }}><div className="mc-project-visual"><span>0{index + 1}</span><div className="mc-project-shape"><i /><i /><i /></div><ArrowUpRight size={22} /></div><div className="mc-project-copy"><small>{project.category}</small><h3>{project.title}</h3><p>{project.summary}</p><div>{project.technologies.map((item) => <span key={item}>{item}</span>)}</div><a href={project.githubUrl} target="_blank" rel="noreferrer">View on GitHub <ArrowUpRight size={14} /></a></div></motion.article>)}</div></section>
      <section className="mc-section mc-experience" id="experience"><motion.div className="mc-section-heading" {...appear}><span className="mc-number">04 / EXPERIENCE</span><h2>Momentum,<br /><em>built over time.</em></h2></motion.div><div className="mc-experience-line">{experience.map((job) => <motion.article key={job.company} {...appear}><small>{job.dates}</small><h3>{job.role}</h3><strong>{job.company}</strong><p>{job.achievements[0]}</p><div>{job.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div></motion.article>)}</div><div className="mc-education"><Sparkles size={16} />{profile.education.map((item) => <span key={item.school}>{item.school} / {item.program} / {item.years} / {item.result}</span>)}</div></section>
      <section className="mc-section mc-resume" id="resume"><motion.div className="mc-section-heading" {...appear}><span className="mc-number">05 / RESUME</span><h2>The details<br /><em>behind the work.</em></h2><p>My experience, education and technical foundation in one place.</p><div className="mc-resume-actions"><a className="mc-button" href={profile.resumePath} download>Download Resume <ArrowDownToLine size={16} /></a><a href={profile.resumePath} target="_blank" rel="noreferrer">View PDF <ArrowUpRight size={14} /></a></div></motion.div><div className="mc-document"><div className="mc-doc-head">SC<span>.</span><small>CURRICULUM VITAE / 2026</small></div><h3>{profile.fullName}</h3><p>{profile.title}</p><div className="mc-doc-rule" /><small>EXPERIENCE</small><i /><i /><i /><small>SKILLS &amp; PROJECTS</small><i /><i /><img src={profile.signaturePath} alt={`${profile.fullName} signature`} /></div></section>
      <section className="mc-section mc-contact" id="contact"><motion.div className="mc-section-heading" {...appear}><span className="mc-number">06 / CONTACT</span><h2>Have a good<br /><em>idea in mind?</em></h2><p>{profile.email}<br />{profile.location}</p><SocialLinks className="mc-socials" /></motion.div><ContactForm className="mc-form" /></section>
    </main>
  </TemplateFrame>
}

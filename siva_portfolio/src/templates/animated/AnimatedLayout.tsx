import { useRef, type PointerEvent as ReactPointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowDown, ArrowDownToLine, ArrowRight, ArrowUpRight, BriefcaseBusiness, Code2, Compass, GraduationCap, Sparkles } from 'lucide-react'
import { TemplateFrame } from '../../components/shared/TemplateFrame'
import { ContactForm } from '../../components/shared/ContactForm'
import { SocialLinks } from '../../components/SiteChrome'
import { profile } from '../../data/profile'
import { useRouteSection } from '../../hooks/useRouteSection'
import { skillGroups } from '../../data/skills'
import { projects } from '../../data/projects'
import { experience } from '../../data/experience'
import type { LayoutProps } from '../types'

export function AnimatedLayout(props: LayoutProps) {
  useRouteSection(props.activePage)
  const heroRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -68])
  const portraitRotate = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -3])
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const lookX = useSpring(pointerX, { stiffness: 150, damping: 24, mass: .35 })
  const lookY = useSpring(pointerY, { stiffness: 150, damping: 24, mass: .35 })
  const trackPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType === 'touch') return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set(((event.clientX - bounds.left) / bounds.width * 2 - 1) * 4)
    pointerY.set(((event.clientY - bounds.top) / bounds.height * 2 - 1) * -3)
  }
  const resetPointer = () => { pointerX.set(0); pointerY.set(0) }
  const entrance = reduced ? {} : { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .16 }, transition: { duration: .6 } }
  return <TemplateFrame {...props} className="animated-template">
    <main className="animated-sections">
      <section className="animated-section animated-hero" id="home" ref={heroRef}>
        <div className="animated-diagonal" aria-hidden="true" />
        <div className="animated-hero-copy"><span className="animated-eyebrow"><Sparkles size={14} /> HELLO, I'M SIVA</span><h1>Building thoughtful<br /><em>digital experiences.</em></h1><h2>{profile.title}</h2><p>{profile.heroSummary}</p><div className="animated-actions"><Link className="animated-button" to="/projects">Explore projects <ArrowRight size={16} /></Link><a className="animated-text-link" href={profile.resumePath} download>Resume <ArrowDownToLine size={15} /></a></div><SocialLinks className="animated-socials" /></div>
        <motion.div className="animated-character-wrap" onPointerEnter={() => { if (!reduced) pointerY.set(-3) }} onPointerMove={trackPointer} onPointerLeave={resetPointer} style={{ y: portraitY, rotate: portraitRotate, rotateX: lookY, rotateY: lookX }}><img className="animated-character" src={profile.animatedPortraitPath} alt={`Illustrated portrait of ${profile.fullName}`} /><span className="thought-bubble bubble-one">IDEAS</span><span className="thought-bubble bubble-two"><Code2 size={17} /></span></motion.div>
        <span className="animated-hero-caption">SOFTWARE · PRODUCT · QUALITY</span><a className="animated-scroll-cue" href="#about" aria-label="Scroll to about"><ArrowDown size={16} /></a>
      </section>
      <section className="animated-section animated-about" id="about"><motion.div className="animated-about-art" {...entrance}><div className="animated-card-glow" /><img src={profile.animatedPortraitPath} alt={`Illustrated portrait of ${profile.fullName}`} /><span>CURIOUS BY DESIGN</span></motion.div><motion.div className="animated-copy" {...entrance}><span className="animated-label"><Compass size={14} /> ABOUT ME</span><h2>A thoughtful<br /><em>engineering journey.</em></h2>{profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<blockquote>{profile.engineeringBelief}</blockquote></motion.div></section>
      <section className="animated-section animated-skills" id="skills"><motion.div className="animated-section-heading" {...entrance}><span className="animated-label"><Sparkles size={14} /> MY TOOLKIT</span><h2>Skills that bring<br /><em>ideas to life.</em></h2><p>Development, quality and delivery, connected.</p></motion.div><div className="animated-skill-grid">{skillGroups.map((group, index) => <motion.article key={group.id} className={`animated-skill-card skill-color-${index + 1}`} {...entrance} transition={{ duration: .55, delay: index * .07 }}><span>0{index + 1}</span><div className="animated-skill-icon">{index === 0 ? <Code2 /> : index === 1 ? <BriefcaseBusiness /> : index === 2 ? <Sparkles /> : <Compass />}</div><h3>{group.category}</h3><p>{group.items.join(' · ')}</p></motion.article>)}</div></section>
      <section className="animated-section animated-projects" id="projects"><motion.div className="animated-section-heading" {...entrance}><span className="animated-label"><Code2 size={14} /> SELECTED WORK</span><h2>Ideas, made<br /><em>real.</em></h2></motion.div><div className="animated-project-grid">{projects.map((project, index) => <motion.article key={project.id} className="animated-project-card" {...entrance} whileHover={reduced ? undefined : { y: -7, rotate: index % 2 ? 1 : -1 }}><div className={`animated-project-art art-${index % 3}`}><span>0{index + 1}</span><div className="animated-project-window"><i /><i /><i /><div /></div></div><div className="animated-project-copy"><small>{project.category}</small><h3>{project.title}</h3><p>{project.summary}</p><div>{project.technologies.map((item) => <span key={item}>{item}</span>)}</div><a href={project.githubUrl} target="_blank" rel="noreferrer">View project <ArrowUpRight size={14} /></a></div></motion.article>)}</div></section>
      <section className="animated-section animated-experience" id="experience"><motion.div className="animated-section-heading" {...entrance}><span className="animated-label"><BriefcaseBusiness size={14} /> EXPERIENCE</span><h2>Every step<br /><em>shapes the craft.</em></h2></motion.div><div className="animated-timeline">{experience.map((job) => <motion.article key={job.company} {...entrance}><span className="animated-timeline-dot" /><div><small>{job.dates}</small><h3>{job.role}</h3><strong>{job.company}</strong><p>{job.achievements.join(' ')}</p><div>{job.technologies.map((item) => <span key={item}>{item}</span>)}</div></div></motion.article>)}</div><div className="animated-education"><GraduationCap /><strong>Learning foundations</strong>{profile.education.map((item) => <span key={item.school}>{item.program} · {item.school} · {item.years}</span>)}</div></section>
      <section className="animated-section animated-resume" id="resume"><motion.div className="animated-section-heading" {...entrance}><span className="animated-label"><ArrowDownToLine size={14} /> RESUME</span><h2>A closer look<br /><em>at my work.</em></h2><p>Experience, education and technical skills in one place.</p><div className="animated-actions"><a className="animated-button" href={profile.resumePath} download>Download resume <ArrowDownToLine size={15} /></a><a className="animated-text-link" href={profile.resumePath} target="_blank" rel="noreferrer">View online <ArrowUpRight size={15} /></a></div></motion.div><motion.div className="animated-resume-card" {...entrance}><div>SC.<span>PROFILE / 2026</span></div><img src={profile.animatedPortraitPath} alt="" /><h3>{profile.fullName}</h3><p>{profile.title}</p><i /><i /><i /><img className="animated-signature" src={profile.signaturePath} alt={`${profile.fullName} signature`} /></motion.div></section>
      <section className="animated-section animated-contact" id="contact"><motion.div className="animated-contact-copy" {...entrance}><span className="animated-label"><Sparkles size={14} /> LET'S CONNECT</span><h2>Good things<br />start with <em>hello.</em></h2><p>{profile.email}<br />{profile.location}</p><SocialLinks className="animated-socials" /></motion.div><ContactForm className="animated-form" /></section>
    </main>
  </TemplateFrame>
}

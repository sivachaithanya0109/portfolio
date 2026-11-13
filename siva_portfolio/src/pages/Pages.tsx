import { useState, type FormEvent, type ReactNode } from 'react'
import { ArrowDownToLine, ArrowRight, ArrowUpRight, BriefcaseBusiness, Check, Code2, Compass, GraduationCap, Languages, Mail, MapPin, Phone, Send, Sparkles } from 'lucide-react'
import { SocialLinks } from '../components/SiteChrome'
import { profile } from '../data/profile'
import { experience } from '../data/experience'
import { projects } from '../data/projects'
import { skillCards, skillGroups } from '../data/skills'

const focusAreas = [
  { icon: <Code2 size={19} />, label: 'Frontend development', skills: skillGroups[0].items },
  { icon: <Check size={19} />, label: 'Quality engineering', skills: skillGroups[1].items },
  { icon: <ArrowUpRight size={19} />, label: 'Cloud & delivery', skills: skillGroups[2].items },
]

function SectionLabel({ children, tone = 'blue' }: { children: ReactNode; tone?: string }) {
  return <span className={`section-label tone-${tone}`}><Sparkles size={13} />{children}</span>
}

function SectionHeading({ label, title, description, tone = 'blue' }: { label: string; title: ReactNode; description?: string; tone?: string }) {
  const headingId = `${label.toLowerCase().replaceAll(' ', '-')}-title`
  return <div className="section-heading reveal">
    <SectionLabel tone={tone}>{label}</SectionLabel>
    <h2 id={headingId}>{title}</h2>
    {description && <p>{description}</p>}
  </div>
}

export function PortfolioSections() {
  const [sent, setSent] = useState(false)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const data = new FormData(form)
    const subject = encodeURIComponent(`Portfolio enquiry from ${String(data.get('name'))}`)
    const body = encodeURIComponent(`Email: ${String(data.get('email'))}\n\n${String(data.get('message'))}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return <div className="portfolio-sections">
    <section className="page-section hero" id="home" aria-labelledby="home-title">
      <div className="hero-copy reveal">
        <p className="hero-kicker">👋 Hello, I’m</p>
        <h1 id="home-title">Siva Chaithanya<br className="desktop-only" /> Gurram<span className="hero-period">.</span></h1>
        <p className="hero-role">{profile.title}</p>
        <p className="hero-summary">{profile.heroSummary}</p>
        <div className="hero-actions"><a className="button button-primary" href="#projects">View Projects <ArrowRight size={16} /></a><a className="button button-secondary" href={profile.resumePath} download>Download Resume <ArrowDownToLine size={16} /></a></div>
        <SocialLinks />
      </div>
      <div className="hero-art reveal" aria-label="Portrait of Siva Chaithanya Gurram">
        <div className="hero-blob" />
        <div className="portrait-frame"><img src={profile.portraitPath} alt={profile.fullName} /></div>
        <div className="float-chip chip-code"><Code2 size={19} /><span>Frontend</span></div>
        <div className="float-chip chip-spark"><Check size={18} /><span>Quality</span></div>
        <div className="art-note"><span className="note-dot" />Building with purpose</div>
      </div>
      <div className="hero-bottom"><span>Scroll to explore</span><span className="scroll-line" /><span>01 — 07</span></div>
    </section>

    <section className="page-section content-page about-section" id="about" aria-labelledby="about-me-title">
      <SectionHeading label="About Me" title={<>A bit about<br /><em>myself.</em></>} tone="mint" description="Hands-on frontend development and software quality experience across the software development lifecycle." />
      <div className="about-grid">
        <div className="about-story reveal">
          {profile.about.map((paragraph, index) => <p className={index === 0 ? 'lead' : undefined} key={paragraph}>{paragraph}</p>)}
          <p className="about-belief">“{profile.engineeringBelief}”</p>
        </div>
        <div className="about-side reveal">
          <div className="about-art"><div className="about-art-glow" /><div className="about-window"><span /><span /><span /><div className="window-landscape" /></div><div className="about-plant"><i /><i /><i /><b /></div><div className="about-desk" /></div>
          <div className="focus-list"><h3>Current technical focus</h3>{focusAreas.map((item) => <div className="focus-item" key={item.label}><span className="focus-icon">{item.icon}</span><div><strong>{item.label}</strong><p>{item.skills.join(' · ')}</p></div></div>)}</div>
          <div className="about-facts"><div><BriefcaseBusiness size={17} /><strong>1+ Years</strong><small>Experience</small></div><div><Code2 size={17} /><strong>{projects.length} Projects</strong><small>Featured Work</small></div><div><Languages size={17} /><strong>{profile.languages.length} Languages</strong><small>{profile.languages[0]} + {profile.languages.length - 1}</small></div></div>
        </div>
      </div>
      <div className="about-extras reveal">
        <div className="extra-card"><Languages size={17} /><strong>Languages</strong><span>{profile.languages.join(' · ')}</span></div>
        <div className="extra-card"><Compass size={17} /><strong>Outside of work</strong><span>{profile.interests.slice(0, 3).join(' · ')}</span></div>
      </div>
    </section>

    <section className="page-section content-page skills-section" id="skills" aria-labelledby="my-skills-title">
      <SectionHeading label="My Skills" title={<>Technical<br /><em>Expertise.</em></>} tone="lilac" description="A practical toolkit across development, automation and product." />
      <div className="skills-grid">{skillCards.map((skill) => <article className="skill-card reveal" key={skill.name}><div className={`skill-mark tone-${skill.accent}`}><span>{skill.mark}</span></div><div className="skill-card-heading"><h3>{skill.name}</h3><p>{skill.detail}</p></div></article>)}</div>
      <div className="skills-footnote reveal"><Sparkles size={15} />A growing toolkit shaped by hands-on work and continued learning.</div>
    </section>

    <section className="page-section content-page projects-section" id="projects" aria-labelledby="my-projects-title">
      <SectionHeading label="My Projects" title={<>Featured<br /><em>Projects.</em></>} tone="peach" description="Selected interfaces, dashboards and personal projects from my experience." />
      <div className="projects-grid">{projects.map((project, index) => <article className="project-card reveal" key={project.id}>
        <div className={`project-art project-${(['blue', 'mint', 'peach'] as const)[index % 3]}`}><span className="project-number">0{index + 1} / {String(projects.length).padStart(2, '0')}</span><span className="project-art-mark">{project.id === 'personal-portfolio' ? 'SC' : project.id === 'analytics-dashboards' ? '▥' : '✳'}</span><div className="project-art-card"><span className="mini-window-dots"><i /><i /><i /></span><div className="mini-bars"><i /><i /><i /><i /></div><div className="mini-chart"><span /><span /><span /><span /><span /></div></div></div>
        <div className="project-info"><span className="project-type">{project.category}</span><h3>{project.title}</h3><p>{project.summary}</p><div className="project-tags">{project.technologies.map((tool) => <span key={tool}>{tool}</span>)}</div><a className="project-source-link" href={project.githubUrl} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a></div>
      </article>)}</div>
    </section>

    <section className="page-section content-page experience-section" id="experience" aria-labelledby="work-experience-title">
      <SectionHeading label="Work Experience" title={<>Professional<br /><em>Journey.</em></>} tone="amber" description="Growing through hands-on work with interactive products and cross-functional teams." />
      <div className="experience-layout">
        <div className="timeline reveal">{experience.map((job) => <article className="timeline-item" key={job.company}><div className="timeline-marker"><BriefcaseBusiness size={16} /></div><div className="timeline-content"><span className="timeline-date">{job.dates}</span><h3>{job.role} <span>· {job.employment}</span></h3><p className="timeline-company">{job.company}</p><ul>{job.achievements.map((item) => <li key={item}>{item}</li>)}</ul><div className="project-tags">{job.technologies.map((item) => <span key={item}>{item}</span>)}</div></div></article>)}</div>
        <aside className="experience-aside reveal"><div className="aside-icon"><Sparkles size={20} /></div><p className="overline">ALONG THE WAY</p><h3>Curious, quality minded, product focused.</h3><p>Interested in the full path from understanding a problem to shipping a reliable, considered experience.</p><div className="activity-list"><strong>Activities</strong>{profile.activities.map((activity) => <span key={activity}>{activity}</span>)}</div></aside>
      </div>
      <div className="education-block reveal"><div className="education-title"><GraduationCap size={19} /><div><span className="overline">EDUCATION</span><h3>Learning foundations</h3></div></div><div className="education-grid">{profile.education.map((item) => <article className="education-card" key={item.school}><span className="education-years">{item.years}</span><h4>{item.school}</h4>{item.location && <p>{item.location}</p>}<span>{item.program}</span><strong>{item.result}</strong></article>)}</div></div>
    </section>

    <section className="page-section content-page resume-section" id="resume" aria-labelledby="resume-title">
      <SectionHeading label="Resume" title={<>My<br /><em>Resume.</em></>} tone="blue" description="A detailed overview of my experience, skills and projects." />
      <div className="resume-layout"><div className="resume-copy reveal"><p className="lead">Frontend Developer focused on interactive products, software quality and thoughtful user experiences.</p><div className="resume-highlights"><span>Frontend development</span><span>Quality engineering</span><span>Gaming technology</span><span>Product thinking</span></div><div className="resume-actions"><a className="button button-primary" href="/siva-chaithanya-resume.pdf" download>Download resume <ArrowDownToLine size={16} /></a><a className="button button-secondary" href="/siva-chaithanya-resume.pdf" target="_blank" rel="noreferrer">View online <ArrowUpRight size={15} /></a></div></div>
        <div className="resume-visual reveal"><div className="paper-shadow" /><div className="paper-sheet"><div className="paper-top"><span className="paper-brand">SC<span>.</span></span><span>RESUME</span></div><h3>{profile.fullName}</h3><p>Frontend Developer · Product-Focused Engineering</p><div className="paper-section-title">EXPERIENCE</div><div className="paper-rule strong" /><div className="paper-rule short" /><div className="paper-section-title">SKILLS &amp; PROJECTS</div><div className="paper-rule" /><div className="paper-rule medium" /><div className="paper-rule" /><img className="signature-image" src={profile.signaturePath} alt={`${profile.fullName} signature`} /></div><div className="resume-stamp">READY<br />TO VIEW</div></div>
      </div>
    </section>

    <section className="page-section content-page contact-section" id="contact" aria-labelledby="get-in-touch-title">
      <SectionHeading label="Get in Touch" title={<>Let’s Work<br /><em>Together.</em></>} tone="mint" description="Have an opportunity, a collaboration idea or a question? Feel free to reach out." />
      <div className="contact-layout"><div className="contact-details reveal"><p className="overline">FIND ME HERE</p><a href={`mailto:${profile.email}`} className="contact-detail"><span><Mail size={17} /></span><div><small>Email</small><strong>{profile.email}</strong></div><ArrowUpRight size={15} /></a><a href={`tel:${profile.phoneHref}`} className="contact-detail"><span><Phone size={17} /></span><div><small>Phone</small><strong>{profile.phone}</strong></div></a><div className="contact-detail"><span><MapPin size={17} /></span><div><small>Location</small><strong>{profile.location}</strong></div></div><SocialLinks /><p className="contact-note">Open to conversations around software, product engineering and quality engineering.</p></div>
        <div className="contact-form-wrap reveal"><form className="contact-form" onSubmit={submit}><div className="form-heading"><div><span className="overline">SEND A NOTE</span><h3>Write me a message</h3></div><Send size={18} /></div><div className="form-row"><label>Your Name<input name="name" type="text" placeholder="Your name" required minLength={2} /></label><label>Your Email<input name="email" type="email" placeholder="Your email" required /></label></div><label>Your Message<textarea name="message" placeholder="Your message" rows={4} required minLength={10} /></label>{sent && <p role="status" className="form-success"><Check size={15} /> Your email app is opening with the message details.</p>}<button type="submit" className="button button-primary">Send Message <ArrowRight size={16} /></button></form></div>
      </div>
    </section>
  </div>
}

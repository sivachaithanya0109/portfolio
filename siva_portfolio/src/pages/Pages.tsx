import { useState, type FormEvent, type ReactNode } from 'react'
import { ArrowDownToLine, ArrowRight, ArrowUpRight, BriefcaseBusiness, Check, Code2, Compass, GraduationCap, Languages, Mail, MapPin, Phone, Send, Sparkles } from 'lucide-react'
import { SocialLinks } from '../components/SiteChrome'

const focusAreas = [
  { icon: <Code2 size={19} />, label: 'Frontend development', skills: ['React.js', 'JavaScript', 'PixiJS', 'TypeScript'] },
  { icon: <Check size={19} />, label: 'Quality engineering', skills: ['Functional testing', 'API testing', 'Postman'] },
  { icon: <ArrowUpRight size={19} />, label: 'Cloud & delivery', skills: ['Git', 'AWS fundamentals', 'CI/CD fundamentals'] },
]

const skills = [
  { name: 'React.js', detail: 'UI Development', tone: 'blue', mark: '⚛' },
  { name: 'JavaScript & TypeScript', detail: 'Programming', tone: 'lilac', mark: 'JS' },
  { name: 'PixiJS', detail: 'Interactive UI', tone: 'mint', mark: '✳' },
  { name: 'Tailwind CSS & Vite', detail: 'Frontend Tooling', tone: 'peach', mark: '⌘' },
  { name: 'Functional Testing', detail: 'Software Quality', tone: 'peach', mark: '✓' },
  { name: 'API Testing & Postman', detail: 'API Validation', tone: 'mint', mark: '⇄' },
  { name: 'Git & GitHub', detail: 'Version Control', tone: 'blue', mark: '⌘' },
  { name: 'AWS, CI/CD & Power BI', detail: 'Cloud, Delivery & Analytics', tone: 'lilac', mark: '↗' },
]

const projects = [
  { title: 'Personal Portfolio', category: 'Frontend development', summary: 'A responsive portfolio to bring technical skills, selected projects and professional experience together in one clear web experience.', tools: ['React', 'JavaScript', 'HTML', 'CSS', 'Node.js'], tone: 'blue', mark: 'SC' },
  { title: 'Analytics Dashboards', category: 'Data & analytics', summary: 'Analytics and dashboard work exploring banking and healthcare use cases, with a focus on making information easier to read.', tools: ['Power BI', 'Dashboards'], tone: 'mint', mark: '▥' },
  { title: 'Casino Game Interfaces', category: 'Interactive UI', summary: 'Hands-on experience building and refining interactive casino game interfaces and investigating related behaviour and UI issues.', tools: ['PixiJS', 'JavaScript', 'TypeScript'], tone: 'peach', mark: '✳' },
]

const education = [
  { school: 'QIS College of Engineering and Technology', location: 'Ongole, India', program: 'B.Tech in Computer Science and Engineering', years: '2021 – 2025', result: 'CGPA 8.3' },
  { school: 'Sri Chaitanya Junior College', location: '', program: 'Intermediate (MPC)', years: '2019 – 2021', result: '86%' },
  { school: 'Loyola Public School', location: '', program: 'ICSE / Secondary Education', years: '2018 – 2019', result: '415 / 600' },
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
    const subject = encodeURIComponent(`Portfolio enquiry: ${String(data.get('subject'))}`)
    const body = encodeURIComponent(`From: ${String(data.get('name'))} (${String(data.get('email'))})\n\n${String(data.get('message'))}`)
    window.location.href = `mailto:g.sivachaithanya01@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return <div className="portfolio-sections">
    <section className="page-section hero" id="home" aria-labelledby="home-title">
      <div className="hero-copy reveal">
        <p className="hero-kicker">👋 Hello, I’m</p>
        <h1 id="home-title">Siva Chaithanya<br className="desktop-only" /> Gurram<span className="hero-period">.</span></h1>
        <p className="hero-role">Software Engineer <span>·</span> Frontend &amp; Quality Engineering</p>
        <p className="hero-summary">I build interactive interfaces, connect them to real application data, and care about how well they work for the people using them.</p>
        <div className="hero-actions"><a className="button button-primary" href="#projects">View projects <ArrowRight size={16} /></a><a className="button button-secondary" href="/siva-chaithanya-resume.pdf" download>Download resume <ArrowDownToLine size={16} /></a></div>
        <SocialLinks />
      </div>
      <div className="hero-art reveal" aria-label="Portrait of Siva Chaithanya Gurram">
        <div className="hero-blob" />
        <div className="portrait-frame"><img src="/images/siva-chaithanya.jpg" alt="Siva Chaithanya Gurram" /></div>
        <div className="float-chip chip-code"><Code2 size={19} /><span>Frontend</span></div>
        <div className="float-chip chip-spark"><Check size={18} /><span>Quality</span></div>
        <div className="art-note"><span className="note-dot" />Building with purpose</div>
      </div>
      <div className="hero-bottom"><span>Scroll to explore</span><span className="scroll-line" /><span>01 — 07</span></div>
    </section>

    <section className="page-section content-page about-section" id="about" aria-labelledby="about-title">
      <SectionHeading label="A bit about me" title={<>Engineering with curiosity,<br /><em>building with purpose.</em></>} tone="mint" description="A little about how I approach software, quality and the experience around them." />
      <div className="about-grid">
        <div className="about-story reveal">
          <p className="lead">I am a Software Engineer with hands-on experience in frontend development and software quality engineering, currently working in a gaming technology environment.</p>
          <p>My experience includes developing interactive user interfaces, working with application state management, integrating APIs, validating application behaviour and identifying functional and user experience issues.</p>
          <p>I enjoy working across different stages of the software development lifecycle, from understanding requirements and implementing features to validating functionality and supporting application delivery.</p>
          <p>I am particularly interested in Software Engineering, Product Engineering and Quality Engineering, where I can combine development skills, analytical thinking and product understanding to build reliable applications.</p>
          <p className="about-belief">“Good engineering is not just about writing code; it is about understanding the problem, building the right solution and ensuring a great user experience.”</p>
        </div>
        <div className="about-side reveal">
          <div className="about-art"><div className="about-art-glow" /><div className="about-window"><span /><span /><span /><div className="window-landscape" /></div><div className="about-plant"><i /><i /><i /><b /></div><div className="about-desk" /></div>
          <div className="focus-list"><h3>Current technical focus</h3>{focusAreas.map((item) => <div className="focus-item" key={item.label}><span className="focus-icon">{item.icon}</span><div><strong>{item.label}</strong><p>{item.skills.join(' · ')}</p></div></div>)}</div>
        </div>
      </div>
      <div className="about-extras reveal">
        <div className="extra-card"><Languages size={17} /><strong>Languages</strong><span>English · Telugu · Kannada · Hindi</span></div>
        <div className="extra-card"><Compass size={17} /><strong>Outside of work</strong><span>New places · Adventure · Sports &amp; fitness</span></div>
      </div>
    </section>

    <section className="page-section content-page skills-section" id="skills" aria-labelledby="skills-title">
      <SectionHeading label="My skills" title={<>Technical<br /><em>expertise.</em></>} tone="lilac" description="A practical toolkit across interfaces, interactive applications and software quality." />
      <div className="skills-grid">{skills.map((skill) => <article className="skill-card reveal" key={skill.name}><div className={`skill-mark tone-${skill.tone}`}><span>{skill.mark}</span></div><div className="skill-card-heading"><h3>{skill.name}</h3><p>{skill.detail}</p></div></article>)}</div>
      <div className="skills-footnote reveal"><Sparkles size={15} />A growing toolkit shaped by hands-on work and continued learning.</div>
    </section>

    <section className="page-section content-page projects-section" id="projects" aria-labelledby="projects-title">
      <SectionHeading label="My projects" title={<>Selected work<br /><em>&amp; explorations.</em></>} tone="peach" description="A few examples of the interfaces, dashboards and personal projects I have worked on." />
      <div className="projects-grid">{projects.map((project, index) => <article className="project-card reveal" key={project.title}>
        <div className={`project-art project-${project.tone}`}><span className="project-number">0{index + 1} / 03</span><span className="project-art-mark">{project.mark}</span><div className="project-art-card"><span className="mini-window-dots"><i /><i /><i /></span><div className="mini-bars"><i /><i /><i /><i /></div><div className="mini-chart"><span /><span /><span /><span /><span /></div></div></div>
        <div className="project-info"><span className="project-type">{project.category}</span><h3>{project.title}</h3><p>{project.summary}</p><div className="project-tags">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></div>
      </article>)}</div>
    </section>

    <section className="page-section content-page experience-section" id="experience" aria-labelledby="experience-title">
      <SectionHeading label="Work experience" title={<>Professional<br /><em>journey.</em></>} tone="amber" description="Growing through hands-on work with interactive products and cross-functional teams." />
      <div className="experience-layout">
        <div className="timeline reveal"><article className="timeline-item"><div className="timeline-marker"><BriefcaseBusiness size={16} /></div><div className="timeline-content"><span className="timeline-date">Mar 2025 — Present</span><h3>Frontend Developer <span>· Full-time</span></h3><p className="timeline-company">TZeSSt Technology Services Pvt Ltd</p><ul><li>Contribute to frontend development for casino gaming products, with a focus on interactive interfaces and game UI flows.</li><li>Build and refine user-facing features using JavaScript, TypeScript and PixiJS, and integrate frontend features with REST APIs and JSON data.</li><li>Validate UI behaviour, reproduce defects, debug issues and collaborate on fixes across development and QA workflows.</li><li>Use Git-based version control and branching to manage changes and collaborate on delivery.</li></ul><div className="project-tags"><span>JavaScript</span><span>TypeScript</span><span>PixiJS</span><span>REST API</span><span>Git</span></div></div></article></div>
        <aside className="experience-aside reveal"><div className="aside-icon"><Sparkles size={20} /></div><p className="overline">ALONG THE WAY</p><h3>Curious, quality minded, product focused.</h3><p>Interested in the full path from understanding a problem to shipping a reliable, considered experience.</p><div className="activity-list"><strong>Activities</strong><span>Smart India Hackathon (SIH) · Volunteer</span><span>UDGAMA / IEEE Guntur Zonal Congress Meet · Attended 2023</span></div></aside>
      </div>
      <div className="education-block reveal"><div className="education-title"><GraduationCap size={19} /><div><span className="overline">EDUCATION</span><h3>Learning foundations</h3></div></div><div className="education-grid">{education.map((item) => <article className="education-card" key={item.school}><span className="education-years">{item.years}</span><h4>{item.school}</h4>{item.location && <p>{item.location}</p>}<span>{item.program}</span><strong>{item.result}</strong></article>)}</div></div>
    </section>

    <section className="page-section content-page resume-section" id="resume" aria-labelledby="resume-title">
      <SectionHeading label="Resume" title={<>My resume,<br /><em>at a glance.</em></>} tone="blue" description="A detailed overview of my experience, skills, projects and education." />
      <div className="resume-layout"><div className="resume-copy reveal"><p className="lead">Frontend Developer focused on interactive products, software quality and thoughtful user experiences.</p><div className="resume-highlights"><span>Frontend development</span><span>Quality engineering</span><span>Gaming technology</span><span>Product thinking</span></div><div className="resume-actions"><a className="button button-primary" href="/siva-chaithanya-resume.pdf" download>Download resume <ArrowDownToLine size={16} /></a><a className="button button-secondary" href="/siva-chaithanya-resume.pdf" target="_blank" rel="noreferrer">View online <ArrowUpRight size={15} /></a></div></div>
        <div className="resume-visual reveal"><div className="paper-shadow" /><div className="paper-sheet"><div className="paper-top"><span className="paper-brand">SC<span>.</span></span><span>RESUME</span></div><h3>Siva Chaithanya Gurram</h3><p>Frontend Developer · Product-Focused Engineering</p><div className="paper-section-title">EXPERIENCE</div><div className="paper-rule strong" /><div className="paper-rule short" /><div className="paper-section-title">SKILLS &amp; PROJECTS</div><div className="paper-rule" /><div className="paper-rule medium" /><div className="paper-rule" /><img className="signature-image" src="/images/signature.png" alt="Siva Chaithanya Gurram signature" /></div><div className="resume-stamp">READY<br />TO VIEW</div></div>
      </div>
    </section>

    <section className="page-section content-page contact-section" id="contact" aria-labelledby="contact-title">
      <SectionHeading label="Get in touch" title={<>Let’s work<br /><em>together.</em></>} tone="mint" description="Have an opportunity, a collaboration idea or a question? Feel free to reach out." />
      <div className="contact-layout"><div className="contact-details reveal"><p className="overline">FIND ME HERE</p><a href="mailto:g.sivachaithanya01@gmail.com" className="contact-detail"><span><Mail size={17} /></span><div><small>Email</small><strong>g.sivachaithanya01@gmail.com</strong></div><ArrowUpRight size={15} /></a><a href="tel:+918074371898" className="contact-detail"><span><Phone size={17} /></span><div><small>Phone</small><strong>+91 80743 71898</strong></div></a><div className="contact-detail"><span><MapPin size={17} /></span><div><small>Location</small><strong>Ongole, India</strong></div></div><SocialLinks /><p className="contact-note">Open to conversations around software, product engineering and quality engineering.</p></div>
        <div className="contact-form-wrap reveal"><form className="contact-form" onSubmit={submit}><div className="form-heading"><div><span className="overline">SEND A NOTE</span><h3>Write me a message</h3></div><Send size={18} /></div><div className="form-row"><label>Your name<input name="name" type="text" placeholder="Your name" required minLength={2} /></label><label>Your email<input name="email" type="email" placeholder="Your email" required /></label></div><label>Subject<input name="subject" type="text" placeholder="What would you like to talk about?" required /></label><label>Your message<textarea name="message" placeholder="Tell me a little about it…" rows={4} required minLength={10} /></label>{sent && <p role="status" className="form-success"><Check size={15} /> Your email app is opening with the message details.</p>}<button type="submit" className="button button-primary">Send message <ArrowRight size={16} /></button></form></div>
      </div>
    </section>
  </div>
}

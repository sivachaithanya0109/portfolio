import { Github, Instagram, Linkedin, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { navigation, profile } from '../../data/portfolio'

export function PortfolioFooter() {
  return <footer className="portfolio-footer">
    <div className="portfolio-footer-grid">
      <div className="portfolio-footer-brand"><Link to="/" className="footer-mark" aria-label="Back to home">SC<span>.</span></Link><h2>{profile.fullName}</h2><p>{profile.title} · Frontend, product and quality engineering.</p></div>
      <nav aria-label="Quick links"><h3>Quick links</h3>{navigation.filter((item) => item.page !== 'home').map((item) => <Link key={item.page} to={item.path}>{item.label}</Link>)}</nav>
      <div className="portfolio-footer-legal"><h3>Legal</h3><a href={`mailto:${profile.email}?subject=Privacy%20policy%20enquiry`}>Privacy policy</a><a href={`mailto:${profile.email}?subject=Terms%20of%20use%20enquiry`}>Terms of use</a></div>
      <div className="portfolio-footer-connect"><h3>Connect</h3><div className="footer-socials">
        <a href={profile.githubSearch} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
        <a href={profile.linkedIn} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
        <a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={18} /></a>
      </div></div>
    </div>
    <div className="portfolio-footer-bottom"><span>© {new Date().getFullYear()} {profile.fullName}</span><Link to="/">Back to top ↑</Link></div>
  </footer>
}

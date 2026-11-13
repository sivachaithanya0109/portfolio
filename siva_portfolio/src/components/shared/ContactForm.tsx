import { useState, type FormEvent } from 'react'
import { ArrowRight, Check, Send } from 'lucide-react'
import { profile } from '../../data/profile'

export function ContactForm({ className = '' }: { className?: string }) {
  const [sent, setSent] = useState(false)
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const fields = new FormData(form)
    const name = String(fields.get('name') ?? '')
    const email = String(fields.get('email') ?? '')
    const message = String(fields.get('message') ?? '')
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`)
    const body = encodeURIComponent(`Email: ${email}\n\n${message}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
  }
  return <form className={`shared-contact-form ${className}`} onSubmit={submit}>
    <div className="shared-form-heading"><div><span>SEND A NOTE</span><h3>Write me a message</h3></div><Send size={18} /></div>
    <div className="shared-form-row"><label>Your Name<input name="name" autoComplete="name" required minLength={2} placeholder="Your name" /></label><label>Your Email<input name="email" type="email" autoComplete="email" required placeholder="Your email" /></label></div>
    <label>Your Message<textarea name="message" required minLength={10} rows={4} placeholder="Your message" /></label>
    {sent && <p role="status" className="shared-form-status"><Check size={15} /> Your email app is opening with the message details.</p>}
    <button className="shared-submit" type="submit">Send Message <ArrowRight size={16} /></button>
  </form>
}

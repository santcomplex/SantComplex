'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ContactForm() {
  const searchParams = useSearchParams();
  const spaceUnit = searchParams.get('space');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch('/api/enquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (res.ok) { setStatus('success'); form.reset(); }
      else setStatus('error');
    } catch { setStatus('error'); }
  }

  return (
    <form onSubmit={handleSubmit}>
      {status === 'success' && <div className="alert alert-success">✅ Your enquiry has been sent! We&apos;ll get back to you soon.</div>}
      {status === 'error'   && <div className="alert alert-error">❌ Something went wrong. Please try again or call us directly.</div>}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input name="name" required className="form-input" placeholder="Your name" />
        </div>
        <div className="form-group">
          <label className="form-label">Phone *</label>
          <input name="phone" required className="form-input" placeholder="+91 XXXXX XXXXX" />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Email</label>
        <input name="email" type="email" className="form-input" placeholder="you@example.com" />
      </div>
      <div className="form-group">
        <label className="form-label">Message *</label>
        <textarea name="message" required className="form-textarea" defaultValue={spaceUnit ? `I am interested in Unit ${spaceUnit}. Please contact me.` : ''} placeholder="Tell us what you're looking for…" />
      </div>
      <button type="submit" disabled={status === 'loading'} className="btn btn-primary" style={{ width: '100%' }}>
        {status === 'loading' ? 'Sending…' : 'Send Enquiry'}
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      <section style={{ background: 'var(--primary)', padding: '4rem 0 3rem' }}>
        <div className="container text-center">
          <h1 style={{ color: '#fff', fontSize: '2.75rem' }}>Contact Us</h1>
          <p style={{ color: 'rgba(255,255,255,.8)', marginTop: '.75rem' }}>
            Get in touch — we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'start' }}>
          <div className="contact-info-card">
            <h3>Get in Touch</h3>
            <div className="contact-row">
              <div className="contact-icon">📞</div>
              <div>
                <div style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.6)', marginBottom: '.25rem' }}>Phone</div>
                <a href="tel:+919XXXXXXXXX">+91 9XXXXXXXXX</a>
              </div>
            </div>
            <div className="contact-row">
              <div className="contact-icon">💬</div>
              <div>
                <div style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.6)', marginBottom: '.25rem' }}>WhatsApp</div>
                <a href="https://wa.me/919XXXXXXXXX" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
              </div>
            </div>
            <div className="contact-row">
              <div className="contact-icon">✉️</div>
              <div>
                <div style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.6)', marginBottom: '.25rem' }}>Email</div>
                <a href="mailto:info@santcomplex.com">info@santcomplex.com</a>
              </div>
            </div>
            <div className="contact-row">
              <div className="contact-icon">📍</div>
              <div>
                <div style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.6)', marginBottom: '.25rem' }}>Address</div>
                <p style={{ fontSize: '.9rem' }}>Sant Complex, Goraya Road,<br />Jandiala Manjki, Punjab</p>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Send an Enquiry</h2>
            <Suspense fallback={<p>Loading form…</p>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}

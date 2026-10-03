'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

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
      {status === 'success' && <div className="alert alert-success">Your enquiry has been successfully submitted. We will contact you shortly.</div>}
      {status === 'error'   && <div className="alert alert-error">An error occurred while submitting your enquiry. Please try again or contact us directly by phone.</div>}
      
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input name="name" required className="form-input" placeholder="Enter your full name" />
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number *</label>
          <input name="phone" required className="form-input" placeholder="+91 XXXXX XXXXX" />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Email Address</label>
        <input name="email" type="email" className="form-input" placeholder="Enter your email address" />
      </div>
      <div className="form-group">
        <label className="form-label">Message *</label>
        <textarea 
          name="message" 
          required 
          className="form-textarea" 
          defaultValue={spaceUnit ? `I am interested in leasing Unit ${spaceUnit}. Please provide more details.` : ''} 
          placeholder="Please describe your enquiry..." 
        />
      </div>
      <button type="submit" disabled={status === 'loading'} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
        {status === 'loading' ? 'Submitting Enquiry...' : 'Submit Enquiry'}
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container text-center">
          <p className="page-hero-eyebrow">Connect With Us</p>
          <h1>Contact Us</h1>
          <p style={{ margin: '12px auto 0' }}>
            We welcome your enquiries regarding commercial spaces and property management.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container grid-location">
          <div className="contact-card">
            <h3>Contact Information</h3>
            
            <div className="contact-row">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.07 1.18 2 2 0 012.06 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              </div>
              <div>
                <div className="contact-label">Phone</div>
                <div className="contact-value"><a href="tel:+919814064001">+91 98140-64001</a></div>
              </div>
            </div>
            
            <div className="contact-row">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
              </div>
              <div>
                <div className="contact-label">WhatsApp</div>
                <div className="contact-value"><a href="https://wa.me/919814064001" target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a></div>
              </div>
            </div>
            
            <div className="contact-row">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
              </div>
              <div>
                <div className="contact-label">Email</div>
                <div className="contact-value"><a href="mailto:santstore@gmail.com">santstore@gmail.com</a></div>
              </div>
            </div>
            
            <div className="contact-row" style={{ borderBottom: 'none' }}>
              <div className="contact-icon">
                <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <div className="contact-label">Address</div>
                <div className="contact-value" style={{ lineHeight: 1.5, color: 'rgba(255,255,255,.8)' }}>
                  Sant Complex, Goraya Road,<br />Jandiala Manjki, Punjab
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '40px', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ marginBottom: '24px', fontFamily: "'Playfair Display', serif" }}>Submit an Enquiry</h2>
            <Suspense fallback={<p>Loading form...</p>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}

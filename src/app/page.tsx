import Link from 'next/link';
import { db } from '@/lib/db';

async function getStats() {
  try {
    const [businesses, spaces] = await Promise.all([
      db.orm.public.Business.count({ where: { isHidden: false } }),
      db.orm.public.Space.count({ where: { status: 'AVAILABLE' } }),
    ]);
    return { businesses, availableSpaces: spaces };
  } catch {
    return { businesses: 0, availableSpaces: 0 };
  }
}

export default async function HomePage() {
  const stats = await getStats();

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-badge">📍 Goraya Road, Jandiala Manjki</div>
          <h1>
            Your Business,<br />
            <em>Our Community.</em>
          </h1>
          <p>
            Sant Complex is a thriving commercial hub with established businesses,
            modern facilities, and prime spaces for rent.
          </p>
          <div className="hero-cta">
            <Link href="/businesses" className="btn btn-primary">🏪 View Businesses</Link>
            <Link href="/spaces" className="btn btn-ghost">🔑 Spaces Available</Link>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">{stats.businesses}+</div>
              <div className="stat-label">Active Businesses</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.availableSpaces}</div>
              <div className="stat-label">Spaces Available</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">G+1</div>
              <div className="stat-label">Floors</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">Prime</div>
              <div className="stat-label">Location</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sant Complex */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Sant Complex?</h2>
            <p>We provide a professional environment where your business can grow — backed by a prime location and a thriving community.</p>
          </div>
          <div className="card-grid">
            <div className="feature-card">
              <div className="feature-icon">📍</div>
              <h3>Prime Location</h3>
              <p>Situated on the busy Goraya Road in Jandiala Manjki, ensuring excellent visibility and foot traffic for your business.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏪</div>
              <h3>Established Community</h3>
              <p>Join a network of successful businesses operating under one roof, creating a natural ecosystem for customers.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚗</div>
              <h3>Ample Parking</h3>
              <p>Dedicated parking spaces for business owners and customers — a crucial advantage in a busy commercial area.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Premises</h3>
              <p>Well-maintained, secure environment giving you and your customers peace of mind around the clock.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Modern Facilities</h3>
              <p>Reliable power supply, clean common areas, and well-maintained infrastructure for uninterrupted business operations.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Flexible Spaces</h3>
              <p>Ground and first floor units available in various sizes — from compact retail shops to spacious offices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--primary)', padding: '5rem 0' }}>
        <div className="container text-center">
          <h2 style={{ color: '#fff', fontSize: '2.25rem', marginBottom: '1rem' }}>Ready to Join Sant Complex?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
            Contact us today to enquire about available spaces or to learn more about our community.
          </p>
          <div className="hero-cta">
            <Link href="/spaces" className="btn btn-primary">View Available Spaces</Link>
            <Link href="/contact" className="btn btn-ghost">Get in Touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}

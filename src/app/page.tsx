import Link from 'next/link';
import Image from 'next/image';
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
        <div className="container hero-inner">
          <div>
            <p className="hero-eyebrow">Goraya Road, Jandiala Manjki</p>
            <h1>
              The Heart of<br />
              <span>Local Commerce</span>
            </h1>
            <p>
              Sant Complex is a well-established commercial hub hosting a
              diverse community of businesses across retail, services, and
              professional sectors.
            </p>
            <div className="hero-actions">
              <Link href="/businesses" className="btn btn-primary btn-lg">View Businesses</Link>
              <Link href="/spaces" className="btn btn-outline-white btn-lg">Spaces Available</Link>
            </div>
          </div>
          <div className="hero-logo-side">
            <Image src="/sant-complex-logo.jpg" alt="Sant Complex" width={360} height={360} priority style={{ borderRadius: '16px', boxShadow: 'var(--shadow-lg)' }} />
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="hero-strip">
        <div className="container">
          <div className="hero-strip-inner">
            <div className="strip-stat">
              <div className="strip-stat-value">{stats.businesses}+</div>
              <div className="strip-stat-label">Active Businesses</div>
            </div>
            <div className="strip-stat">
              <div className="strip-stat-value">{stats.availableSpaces}</div>
              <div className="strip-stat-label">Spaces Available</div>
            </div>
            <div className="strip-stat">
              <div className="strip-stat-value">G+1</div>
              <div className="strip-stat-label">Floors</div>
            </div>
            <div className="strip-stat">
              <div className="strip-stat-value">Prime</div>
              <div className="strip-stat-label">Main Road Location</div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Sant Complex */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="section-eyebrow">Why Sant Complex</p>
            <div className="accent-line"></div>
            <h2>Built for Business Growth</h2>
            <p>A professionally managed commercial complex providing everything your business needs to thrive.</p>
          </div>
          <div className="feature-grid">
            <div className="feature-item">
              <p className="feature-item-num">01</p>
              <div className="feature-accent-bar" style={{ background: 'var(--blue)' }}></div>
              <h3>Prime Main Road Location</h3>
              <p>Situated on the busy Goraya Road in Jandiala Manjki, ensuring excellent visibility and consistent foot traffic.</p>
            </div>
            <div className="feature-item">
              <p className="feature-item-num">02</p>
              <div className="feature-accent-bar" style={{ background: 'var(--red)' }}></div>
              <h3>Established Business Community</h3>
              <p>Join a network of successful businesses under one roof, creating a natural ecosystem that draws customers.</p>
            </div>
            <div className="feature-item">
              <p className="feature-item-num">03</p>
              <div className="feature-accent-bar" style={{ background: 'var(--gold)' }}></div>
              <h3>Dedicated Parking</h3>
              <p>Ample, dedicated parking for business owners and their customers — a critical advantage in a busy commercial area.</p>
            </div>
            <div className="feature-item">
              <p className="feature-item-num">04</p>
              <div className="feature-accent-bar" style={{ background: 'var(--orange)' }}></div>
              <h3>Secure Premises</h3>
              <p>A well-maintained, secure environment giving you and your customers peace of mind at all times.</p>
            </div>
            <div className="feature-item">
              <p className="feature-item-num">05</p>
              <div className="feature-accent-bar" style={{ background: 'var(--blue)' }}></div>
              <h3>Modern Facilities</h3>
              <p>Reliable power supply, clean common areas, and well-maintained infrastructure for uninterrupted operations.</p>
            </div>
            <div className="feature-item">
              <p className="feature-item-num">06</p>
              <div className="feature-accent-bar" style={{ background: 'var(--red)' }}></div>
              <h3>Flexible Space Options</h3>
              <p>Ground and first floor units in various sizes — from compact retail shops to spacious commercial offices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <div className="container text-center">
          <h2>Interested in a Space at Sant Complex?</h2>
          <p>Contact us today to enquire about available units or to learn more about our commercial community.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/spaces" className="btn btn-primary btn-lg">View Available Spaces</Link>
            <Link href="/contact" className="btn btn-outline-white btn-lg">Get in Touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}

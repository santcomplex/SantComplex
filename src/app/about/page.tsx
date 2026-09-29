import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Sant Complex',
  description: 'Learn about Sant Complex — a premier commercial hub on Goraya Road, Jandiala Manjki.',
};

export default function AboutPage() {
  return (
    <>
      <section style={{ background: 'var(--primary)', padding: '4rem 0 3rem' }}>
        <div className="container text-center">
          <h1 style={{ color: '#fff', fontSize: '2.75rem' }}>About Sant Complex</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '.75rem' }}>
            Our story, our mission, our community.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1.25rem' }}>A Community Built for Business</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.8 }}>
                Sant Complex is a premier commercial property located on the busy Goraya Road in Jandiala Manjki.
                Built to serve the growing commercial needs of the region, it has become a one-stop destination
                for local shoppers and a thriving home for businesses across various sectors.
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.8 }}>
                Our complex spans ground and first floors, housing a diverse range of businesses from retail
                shops and service providers to professional offices. The variety of businesses creates a
                natural ecosystem where customers can fulfil multiple needs in a single visit.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                With ample parking, secure premises, reliable power supply, and a prime main-road location,
                Sant Complex provides everything a business needs to grow and thrive.
              </p>
            </div>
            <div>
              <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', borderRadius: 'var(--radius)', padding: '3rem', color: '#fff' }}>
                <h3 style={{ color: '#fff', marginBottom: '2rem', fontSize: '1.3rem' }}>Key Facts</h3>
                {[
                  { icon: '📍', label: 'Location', value: 'Goraya Road, Jandiala Manjki' },
                  { icon: '🏢', label: 'Floors', value: 'Ground + First Floor' },
                  { icon: '🏪', label: 'Business Types', value: 'Retail, Services, Offices' },
                  { icon: '🚗', label: 'Parking', value: 'Dedicated parking available' },
                  { icon: '⚡', label: 'Power', value: 'Reliable power supply' },
                  { icon: '🔒', label: 'Security', value: 'Secure, well-maintained premises' },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.6)', marginBottom: '.2rem' }}>{item.label}</div>
                      <div style={{ fontWeight: '600' }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '5rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>Types of Businesses Hosted</h2>
            <div className="card-grid">
              {[
                { icon: '🛍️', name: 'Retail Shops' },
                { icon: '💇', name: 'Personal Services' },
                { icon: '🍽️', name: 'Food & Beverages' },
                { icon: '💊', name: 'Healthcare' },
                { icon: '📱', name: 'Electronics & Tech' },
                { icon: '🏦', name: 'Financial Services' },
                { icon: '👔', name: 'Professional Offices' },
                { icon: '📚', name: 'Education & Training' },
                { icon: '🔧', name: 'Repair & Maintenance' },
              ].map((type) => (
                <div key={type.name} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.75rem' }}>{type.icon}</span>
                  <span style={{ fontWeight: '600', color: 'var(--primary)' }}>{type.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

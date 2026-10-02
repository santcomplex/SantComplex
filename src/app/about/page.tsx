import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Sant Complex',
  description: 'Learn about Sant Complex — a premier commercial hub on Goraya Road, Jandiala Manjki.',
};

export default function AboutPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container text-center">
          <p className="page-hero-eyebrow">Our Story</p>
          <h1>About Sant Complex</h1>
          <p style={{ margin: '12px auto 0' }}>
            A premier commercial destination built to serve the growing needs of Jandiala Manjki.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-about">
            <div>
              <p className="section-eyebrow">The Complex</p>
              <div className="accent-line"></div>
              <h2 style={{ fontSize: '2rem', marginBottom: '24px', fontFamily: "'Playfair Display', serif" }}>
                A Community Built for Business Success
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '17px' }}>
                Sant Complex is a premier commercial property strategically located on the busy Goraya Road in Jandiala Manjki.
                Built with modern businesses in mind, it has quickly become a central hub for local commerce and a preferred destination for shoppers and professionals alike.
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '17px' }}>
                Spanning ground and first floors, the complex houses a meticulously curated selection of businesses — from retail stores and essential services to professional consulting offices. This diversity creates a natural ecosystem where businesses benefit from shared foot traffic and customers enjoy unparalleled convenience.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '17px' }}>
                With dedicated parking facilities, secure premises, reliable infrastructure, and a prime main-road location, Sant Complex provides the foundational requirements for businesses to establish themselves and thrive in a competitive market.
              </p>
            </div>
            <div>
              <div style={{ background: 'var(--blue)', borderRadius: 'var(--radius-lg)', padding: '40px', color: '#fff', boxShadow: 'var(--shadow-md)' }}>
                <h3 style={{ color: '#fff', marginBottom: '32px', fontSize: '20px', borderBottom: '1px solid rgba(255,255,255,.15)', paddingBottom: '16px' }}>
                  Property Overview
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {[
                    { label: 'Location', value: 'Goraya Road, Jandiala Manjki, Punjab' },
                    { label: 'Structure', value: 'Ground & First Floor Commercial Layout' },
                    { label: 'Tenant Mix', value: 'Retail, Personal Services, Professional Offices' },
                    { label: 'Facilities', value: 'Dedicated parking, secure premises, reliable power' },
                    { label: 'Access', value: 'Direct main-road frontage with high visibility' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--gold)', marginBottom: '4px' }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 500, lineHeight: 1.5 }}>
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

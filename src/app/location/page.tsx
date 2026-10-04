import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Location & Directions',
  description: 'Find Sant Complex on Goraya Road, Jandiala Manjki. Get directions and nearby landmarks.',
};

export default function LocationPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container text-center">
          <p className="page-hero-eyebrow">Directions</p>
          <h1>Our Location</h1>
          <p style={{ margin: '12px auto 0' }}>
            Find us centrally located on Goraya Road, Jandiala Manjki.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-location">
            <div>
              <h2 style={{ marginBottom: '32px', fontFamily: "'Playfair Display', serif" }}>How to Find Us</h2>

              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--blue)' }}></div>
                <h3 style={{ marginBottom: '12px', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--text-muted)' }}>Registered Address</h3>
                <p style={{ color: 'var(--text)', lineHeight: 1.8, fontSize: '17px', fontWeight: 500 }}>
                  Sant Complex<br />
                  Goraya Road<br />
                  Jandiala Manjki<br />
                  Punjab, India
                </p>
              </div>

              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--red)' }}></div>
                <h3 style={{ marginBottom: '16px', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--text-muted)' }}>Nearby Landmarks</h3>
                <ul style={{ listStyle: 'none', color: 'var(--text)', lineHeight: 2, padding: 0 }}>
                  <li style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginBottom: '8px' }}>Goraya Main Road</li>
                  <li style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginBottom: '8px' }}>Jandiala Manjki Bus Stand</li>
                  <li>Local Schools and Hospitals</li>
                </ul>
              </div>

              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--gold)' }}></div>
                <h3 style={{ marginBottom: '12px', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--text-muted)' }}>Accessibility</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '20px', fontSize: '15px' }}>
                  Sant Complex is situated directly on the main Goraya Road, providing excellent road connectivity. 
                  Ample on-site parking space is available for both tenants and visitors.
                </p>
                <a
                  href="https://maps.google.com/?q=31.163278,75.617891"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>

            <div>
              <div className="map-wrap">
                <iframe
                  src="https://maps.google.com/maps?q=31.163278,75.617891&z=17&output=embed"
                  width="100%"
                  height="600"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sant Complex Location Map"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

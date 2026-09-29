import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Location',
  description: 'Find Sant Complex on Goraya Road, Jandiala Manjki. Get directions and nearby landmarks.',
};

export default function LocationPage() {
  return (
    <>
      <section style={{ background: 'var(--primary)', padding: '4rem 0 3rem' }}>
        <div className="container text-center">
          <h1 style={{ color: '#fff', fontSize: '2.75rem' }}>Our Location</h1>
          <p style={{ color: 'rgba(255,255,255,.8)', marginTop: '.75rem' }}>
            Find us on Goraya Road, Jandiala Manjki
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'start' }}>
            <div>
              <h2 style={{ marginBottom: '1.5rem' }}>How to Find Us</h2>

              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>📍 Full Address</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                  Sant Complex<br />
                  Goraya Road<br />
                  Jandiala Manjki<br />
                  Punjab, India
                </p>
              </div>

              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>🏛️ Nearby Landmarks</h3>
                <ul style={{ listStyle: 'none', color: 'var(--text-muted)', lineHeight: 2 }}>
                  <li>• Goraya Main Road</li>
                  <li>• Jandiala Manjki Bus Stand</li>
                  <li>• Local Schools and Hospitals</li>
                </ul>
              </div>

              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>🚗 Directions</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
                  Sant Complex is located on Goraya Road in Jandiala Manjki, easily accessible by road.
                  Ample parking space is available on the premises.
                </p>
                <a
                  href="https://maps.google.com/?q=Jandiala+Manjki,+Punjab,+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>

            <div>
              <div className="map-wrapper">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13722.123456789!2d75.5!3d31.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sJandiala+Manjki%2C+Punjab!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="480"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sant Complex Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

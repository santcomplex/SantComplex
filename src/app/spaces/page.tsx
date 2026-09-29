import type { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Available Spaces',
  description: 'Browse available commercial shops and office spaces for rent at Sant Complex, Goraya Road.',
};

export default async function SpacesPage() {
  let spaces: {
    id: string; unitNumber: string; floor: string; area?: string | null;
    monthlyRent?: number | null; status: string; basicFacilities?: string | null;
    photoUrl?: string | null;
  }[] = [];

  try {
    spaces = await db.orm.public.Space.all({
      where: { status: 'AVAILABLE' },
      orderBy: [{ floor: 'asc' }, { unitNumber: 'asc' }],
    }) as typeof spaces;
  } catch {
    spaces = [];
  }

  return (
    <>
      <section style={{ background: 'linear-gradient(135deg, #0A2540, #1a3a5c)', padding: '4rem 0 3rem' }}>
        <div className="container text-center">
          <h1 style={{ color: '#fff', fontSize: '2.75rem' }}>Available Spaces</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '.75rem', maxWidth: '500px', margin: '.75rem auto 0' }}>
            Find the perfect shop or office for your business at Sant Complex.
          </p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          {spaces.length === 0 ? (
            <div className="empty-state" style={{ padding: '6rem 2rem' }}>
              <div className="icon">🔑</div>
              <h3>No spaces currently available</h3>
              <p>All spaces are occupied. Contact us to join the waitlist.</p>
              <Link href="/contact" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Contact Us</Link>
            </div>
          ) : (
            <div className="card-grid-2">
              {spaces.map((space) => (
                <div key={space.id} className="card">
                  <div
                    className="card-img"
                    style={{
                      backgroundImage: space.photoUrl ? `url(${space.photoUrl})` : undefined,
                      background: space.photoUrl ? undefined : 'linear-gradient(135deg, #F0FDF4, #DCFCE7)',
                    }}
                  >
                    <span className="badge" style={{ background: '#16A34A' }}>✅ Available</span>
                    {!space.photoUrl && (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '3rem' }}>🏢</div>
                    )}
                  </div>
                  <div className="card-body">
                    <div className="card-meta">
                      <span>🏢 {space.floor} Floor</span>
                      <span>🔢 Unit {space.unitNumber}</span>
                      {space.area && <span>📐 {space.area}</span>}
                    </div>
                    <h3 className="card-title">Unit {space.unitNumber} — {space.floor} Floor</h3>
                    {space.monthlyRent && (
                      <p style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent)', marginBottom: '.75rem' }}>
                        ₹{space.monthlyRent.toLocaleString('en-IN')}<span style={{ fontSize: '.9rem', fontWeight: '400', color: 'var(--text-muted)' }}>/month</span>
                      </p>
                    )}
                    {space.basicFacilities && (
                      <p className="card-text">{space.basicFacilities}</p>
                    )}
                  </div>
                  <div className="card-footer">
                    <span className="chip chip-green">Available Now</span>
                    <Link href={`/contact?space=${space.unitNumber}`} className="btn btn-primary btn-sm">
                      Enquire Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

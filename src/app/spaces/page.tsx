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
    spaces = await db.orm.public.Space
      .where({ status: 'AVAILABLE' })
      .orderBy([(s) => s.floor.asc(), (s) => s.unitNumber.asc()])
      .all() as typeof spaces;
  } catch {
    spaces = [];
  }

  return (
    <>
      <div className="page-hero">
        <div className="container text-center">
          <p className="page-hero-eyebrow">Leasing</p>
          <h1>Available Spaces</h1>
          <p style={{ margin: '12px auto 0' }}>
            Find the perfect shop or office for your business at Sant Complex.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {spaces.length === 0 ? (
            <div className="empty-state">
              <h3>No Spaces Currently Available</h3>
              <p>All units are presently occupied. Please contact us to join the waiting list for future vacancies.</p>
              <Link href="/contact" className="btn btn-primary" style={{ marginTop: '24px' }}>Contact Leasing Office</Link>
            </div>
          ) : (
            <div className="card-grid-2">
              {spaces.map((space) => (
                <div key={space.id} className="card">
                  <div className="card-img" style={{ backgroundImage: space.photoUrl ? `url(${space.photoUrl})` : 'none' }}>
                    {!space.photoUrl && <div className="card-img-placeholder"><span className="initials">SC</span></div>}
                    <span className="card-tag card-tag-green">Available</span>
                  </div>
                  <div className="card-body">
                    <div className="card-meta">
                      <span>Floor: {space.floor}</span>
                      <span>Unit: {space.unitNumber}</span>
                      {space.area && <span>Area: {space.area}</span>}
                    </div>
                    <h3 className="card-title">Unit {space.unitNumber} — {space.floor} Floor</h3>
                    
                    {space.monthlyRent && (
                      <div style={{ margin: '16px 0', padding: '12px 16px', background: 'var(--bg)', borderRadius: 'var(--radius)' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                          Monthly Rent
                        </span>
                        <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--blue)' }}>
                          ₹{space.monthlyRent.toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                    
                    {space.basicFacilities && (
                      <p className="card-text">{space.basicFacilities}</p>
                    )}
                  </div>
                  <div className="card-footer" style={{ background: '#FAFAFA' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                      Ready to Move In
                    </span>
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

import type { Metadata } from 'next';
import { db } from '@/lib/db';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Business Directory',
  description: 'Explore the diverse range of retail, service, and professional businesses operating at Sant Complex.',
};

export default async function BusinessesPage() {
  let businesses: {
    id: string; name: string; category: string; floor: string;
    unit?: string | null; description?: string | null; contactInfo?: string | null;
  }[] = [];
  let categories: string[] = [];

  try {
    businesses = await db.orm.public.Business.all({
      where: { isHidden: false },
      orderBy: [{ name: 'asc' }],
    }) as typeof businesses;
    categories = Array.from(new Set(businesses.map(b => b.category)));
  } catch {
    businesses = [];
  }

  return (
    <>
      <div className="page-hero">
        <div className="container text-center">
          <p className="page-hero-eyebrow">Directory</p>
          <h1>Our Businesses</h1>
          <p style={{ margin: '12px auto 0' }}>
            Discover the established businesses that make Sant Complex a thriving commercial hub.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="filter-bar">
            <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--text-muted)' }}>
              Categories:
            </span>
            <span className="badge badge-gray" style={{ cursor: 'pointer' }}>All</span>
            {categories.map((cat) => (
              <span key={cat} className="badge badge-gray" style={{ cursor: 'pointer', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                {cat}
              </span>
            ))}
          </div>

          {businesses.length === 0 ? (
            <div className="empty-state">
              <h3>Directory Updating</h3>
              <p>We are currently updating our business directory. Please check back soon.</p>
            </div>
          ) : (
            <div className="card-grid-2">
              {businesses.map((b) => (
                <div key={b.id} className="card">
                  <div className="card-body">
                    <div className="card-category">{b.category}</div>
                    <h3 className="card-title">{b.name}</h3>
                    <div className="card-meta">
                      <span>Floor: {b.floor}</span>
                      {b.unit && <span>Unit: {b.unit}</span>}
                    </div>
                    {b.description && <p className="card-text">{b.description}</p>}
                  </div>
                  {b.contactInfo && (
                    <div className="card-footer" style={{ background: '#FAFAFA' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                        Contact
                      </span>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--blue)' }}>
                        {b.contactInfo}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      <section className="cta-banner red">
        <div className="container text-center">
          <h2>Looking for Commercial Space?</h2>
          <p>Join our thriving business community. Explore our available retail and office spaces.</p>
          <Link href="/spaces" className="btn btn-outline-white btn-lg">View Available Spaces</Link>
        </div>
      </section>
    </>
  );
}

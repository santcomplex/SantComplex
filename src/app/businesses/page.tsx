import type { Metadata } from 'next';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Businesses',
  description: 'Explore all businesses operating at Sant Complex, Goraya Road, Jandiala Manjki.',
};

export default async function BusinessesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;

  let businesses: {
    id: string; name: string; category: string; floor: string;
    unit?: string | null; logoUrl?: string | null; description?: string | null;
    contactInfo?: string | null;
  }[] = [];

  try {
    const all = await db.orm.public.Business.all({
      where: { isHidden: false },
      orderBy: [{ name: 'asc' }],
    });
    businesses = all.filter((b) => {
      const matchQ = !q || b.name.toLowerCase().includes(q.toLowerCase()) || b.description?.toLowerCase().includes(q.toLowerCase());
      const matchCat = !category || b.category === category;
      return matchQ && matchCat;
    }) as typeof businesses;
  } catch {
    businesses = [];
  }

  const categories = Array.from(new Set(businesses.map((b) => b.category))).sort();

  return (
    <>
      <section style={{ background: 'var(--primary)', padding: '4rem 0 3rem' }}>
        <div className="container text-center">
          <h1 style={{ color: '#fff', fontSize: '2.75rem' }}>Our Businesses</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '.75rem' }}>
            {businesses.length} businesses operating at Sant Complex
          </p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <form className="filter-bar" method="GET">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search businesses…"
              className="form-input"
            />
            <select name="category" defaultValue={category} className="form-select" style={{ maxWidth: '200px' }}>
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button type="submit" className="btn btn-primary btn-sm">Search</button>
            {(q || category) && (
              <a href="/businesses" className="btn btn-sm" style={{ background: 'var(--border)' }}>Clear</a>
            )}
          </form>

          {businesses.length === 0 ? (
            <div className="empty-state">
              <div className="icon">🏪</div>
              <h3>No businesses found</h3>
              <p>Try adjusting your search filters.</p>
            </div>
          ) : (
            <div className="card-grid">
              {businesses.map((business) => (
                <div key={business.id} className="card">
                  <div
                    className="card-img"
                    style={{ backgroundImage: business.logoUrl ? `url(${business.logoUrl})` : undefined, background: business.logoUrl ? undefined : 'linear-gradient(135deg, var(--primary), var(--primary-light))' }}
                  >
                    <span className="badge">{business.floor}</span>
                    {!business.logoUrl && (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '3rem' }}>🏪</div>
                    )}
                  </div>
                  <div className="card-body">
                    <div className="card-meta">
                      <span><span className="chip chip-blue">{business.category}</span></span>
                      {business.unit && <span>Unit {business.unit}</span>}
                    </div>
                    <h3 className="card-title">{business.name}</h3>
                    {business.description && (
                      <p className="card-text">{business.description}</p>
                    )}
                    {business.contactInfo && (
                      <p style={{ fontSize: '.875rem', color: 'var(--text-muted)' }}>📞 {business.contactInfo}</p>
                    )}
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

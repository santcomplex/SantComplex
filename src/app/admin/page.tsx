import Link from 'next/link';
import { db } from '@/lib/db';
export const dynamic = 'force-dynamic';

async function getStats() {
  try {
    const [totalBizRes, hiddenBizRes, availRes, occupiedRes, enquiriesRes] = await Promise.all([
      db.orm.public.Business.aggregate((a) => ({ count: a.count() })),
      db.orm.public.Business.where({ isHidden: true }).aggregate((a) => ({ count: a.count() })),
      db.orm.public.Space.where((s) => s.status.eq('AVAILABLE')).aggregate((a) => ({ count: a.count() })),
      db.orm.public.Space.where((s) => s.status.eq('OCCUPIED')).aggregate((a) => ({ count: a.count() })),
      db.orm.public.Enquiry.where((e) => e.status.eq('NEW')).aggregate((a) => ({ count: a.count() })),
    ]);
    return {
      totalBiz: Number(totalBizRes.count),
      hiddenBiz: Number(hiddenBizRes.count),
      availSpaces: Number(availRes.count),
      occupiedSpaces: Number(occupiedRes.count),
      enquiries: Number(enquiriesRes.count),
    };
  } catch {
    return { totalBiz: 0, hiddenBiz: 0, availSpaces: 0, occupiedSpaces: 0, enquiries: 0 };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div>
      <div className="admin-page-header">
        <h1>Dashboard</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '.9rem' }}>Welcome to the Sant Complex Admin Panel</p>
      </div>

      <div className="stat-card-grid">
        <div className="stat-card">
          <div className="stat-card-value">{stats.totalBiz}</div>
          <div className="stat-card-label">Total Businesses</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-value" style={{ color: '#B45309' }}>{stats.hiddenBiz}</div>
          <div className="stat-card-label">Hidden Businesses</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-value" style={{ color: '#16A34A' }}>{stats.availSpaces}</div>
          <div className="stat-card-label">Available Spaces</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-value">{stats.occupiedSpaces}</div>
          <div className="stat-card-label">Occupied Spaces</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-value" style={{ color: '#DC2626' }}>{stats.enquiries}</div>
          <div className="stat-card-label">New Enquiries</div>
        </div>
      </div>

      <div className="card-grid" style={{ marginTop: '2rem' }}>
        <Link href="/admin/businesses" className="feature-card" style={{ display: 'block', textDecoration: 'none', background: 'var(--surface)', padding: '24px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <h3 style={{ marginBottom: '8px' }}>Manage Businesses</h3>
          <p style={{ color: 'var(--text-muted)' }}>Add, edit, hide or remove businesses from the public directory.</p>
        </Link>
        <Link href="/admin/spaces" className="feature-card" style={{ display: 'block', textDecoration: 'none', background: 'var(--surface)', padding: '24px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <h3 style={{ marginBottom: '8px' }}>Manage Spaces</h3>
          <p style={{ color: 'var(--text-muted)' }}>Add available spaces and mark them as occupied when rented.</p>
        </Link>
        <Link href="/admin/enquiries" className="feature-card" style={{ display: 'block', textDecoration: 'none', background: 'var(--surface)', padding: '24px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <h3 style={{ marginBottom: '8px' }}>View Enquiries</h3>
          <p style={{ color: 'var(--text-muted)' }}>Read enquiries submitted through the contact form.</p>
        </Link>
        <Link href="/admin/gallery" className="feature-card" style={{ display: 'block', textDecoration: 'none', background: 'var(--surface)', padding: '24px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <h3 style={{ marginBottom: '8px' }}>Manage Gallery</h3>
          <p style={{ color: 'var(--text-muted)' }}>Add and remove photos from the gallery page.</p>
        </Link>
      </div>
    </div>
  );
}

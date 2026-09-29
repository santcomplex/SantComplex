import Link from 'next/link';
import { db } from '@/lib/db';

async function getStats() {
  try {
    const [totalBiz, hiddenBiz, availSpaces, occupiedSpaces, enquiries] = await Promise.all([
      db.orm.public.Business.count({}),
      db.orm.public.Business.count({ where: { isHidden: true } }),
      db.orm.public.Space.count({ where: { status: 'AVAILABLE' } }),
      db.orm.public.Space.count({ where: { status: 'OCCUPIED' } }),
      db.orm.public.Enquiry.count({ where: { status: 'NEW' } }),
    ]);
    return { totalBiz, hiddenBiz, availSpaces, occupiedSpaces, enquiries };
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

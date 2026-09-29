import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">Sant<span>Complex</span></div>
        <nav className="admin-nav">
          <div className="admin-nav-section">Overview</div>
          <Link href="/admin">Dashboard</Link>

          <div className="admin-nav-section">Content</div>
          <Link href="/admin/businesses">Businesses</Link>
          <Link href="/admin/spaces">Spaces</Link>
          <Link href="/admin/gallery">Gallery</Link>

          <div className="admin-nav-section">Communication</div>
          <Link href="/admin/enquiries">Enquiries</Link>
        </nav>
        <div className="admin-back">
          <Link href="/">← Back to Website</Link>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}

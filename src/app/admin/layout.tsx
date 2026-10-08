import Link from 'next/link';
import Image from 'next/image';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-wrap">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Link href="/admin" className="admin-sidebar-logo" style={{ textDecoration: 'none' }}>
            <Image src="/sant-complex-logo.jpg" alt="Sant Complex Logo" width={32} height={32} style={{ borderRadius: '4px' }} />
            <span>Sant Complex</span>
          </Link>
        </div>
        
        <nav className="admin-nav">
          <div className="admin-nav-section">Overview</div>
          <Link href="/admin">Dashboard</Link>

          <div className="admin-nav-section">Content</div>
          <Link href="/admin/businesses">Businesses</Link>
          <Link href="/admin/spaces">Spaces</Link>

          <div className="admin-nav-section">Communication</div>
          <Link href="/admin/enquiries">Enquiries</Link>
        </nav>

        <div className="admin-footer-link">
          <Link href="/">← Back to Website</Link>
        </div>
      </aside>
      
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}

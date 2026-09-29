import { db } from '@/lib/db';

export default async function AdminEnquiries() {
  let enquiries: {
    id: string; name: string; email?: string | null; phone?: string | null;
    message: string; status: string; createdAt: unknown;
  }[] = [];

  try {
    enquiries = await db.orm.public.Enquiry.all({ orderBy: [{ createdAt: 'desc' }] }) as typeof enquiries;
  } catch {
    enquiries = [];
  }

  return (
    <div>
      <div className="admin-page-header">
        <h1>Enquiries</h1>
        <span className="chip chip-red">{enquiries.filter((e) => e.status === 'NEW').length} New</span>
      </div>

      {enquiries.length === 0 ? (
        <div className="empty-state">
          <div className="icon">✉️</div>
          <h3>No enquiries yet</h3>
          <p>Enquiries submitted via the contact form will appear here.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {enquiries.map((e) => (
            <div key={e.id} className="card" style={{ transition: 'none' }}>
              <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '.75rem' }}>
                  <div>
                    <h3 className="card-title" style={{ marginBottom: '.25rem' }}>{e.name}</h3>
                    <div className="card-meta">
                      {e.phone && <span>📞 {e.phone}</span>}
                      {e.email && <span>✉️ {e.email}</span>}
                      <span style={{ fontSize: '.8rem', color: 'var(--text-muted)' }}>
                        {new Date(e.createdAt as string).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  <span className={`chip ${e.status === 'NEW' ? 'chip-red' : 'chip-gray'}`}>{e.status}</span>
                </div>
                <p style={{ color: 'var(--text)', lineHeight: 1.7, background: 'var(--bg)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                  {e.message}
                </p>
                {e.phone && (
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '.75rem' }}>
                    <a href={`https://wa.me/${e.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-success">
                      💬 WhatsApp
                    </a>
                    <a href={`tel:${e.phone}`} className="btn btn-sm btn-outline">📞 Call</a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

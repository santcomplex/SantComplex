'use client';
import { useEffect, useState } from 'react';

type GalleryImage = { id: string; url: string; category?: string | null; description?: string | null };

const CATEGORIES = ['Exterior', 'Interior', 'Shops', 'Common Areas', 'Parking', 'Other'];

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ url: '', category: 'Exterior', description: '' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  async function load() {
    setLoading(true);
    const res = await fetch('/api/gallery');
    if (res.ok) setImages(await res.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function addImage() {
    if (!form.url) return;
    setSaving(true);
    const res = await fetch('/api/gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setSaving(false);
    if (res.ok) { setForm({ url: '', category: 'Exterior', description: '' }); setMsg('Photo added!'); load(); }
    else setMsg('Error adding photo.');
  }

  async function remove(id: string) {
    if (!confirm('Delete this photo?')) return;
    await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div>
      <div className="admin-page-header">
        <h1>Gallery</h1>
      </div>

      {/* Add photo form */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Add New Photo</h3>
        {msg && <div className="alert alert-success">{msg}</div>}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Image URL *</label>
            <input className="form-input" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://…" />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <input className="form-input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Optional caption…" />
        </div>
        <button className="btn btn-primary" onClick={addImage} disabled={saving || !form.url}>
          {saving ? 'Adding…' : '+ Add Photo'}
        </button>
      </div>

      {loading ? <p>Loading…</p> : (
        images.length === 0 ? (
          <div className="empty-state">
            <svg className="empty-state-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
            <h3>No photos yet</h3>
            <p>Add image URLs above to populate the gallery.</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {images.map((img) => (
              <div key={img.id} style={{ position: 'relative', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <img src={img.url} alt={img.description || ''} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: '.75rem', background: 'var(--surface)' }}>
                  <div style={{ fontSize: '.8rem', fontWeight: '600', color: 'var(--text-muted)' }}>{img.category}</div>
                  {img.description && <div style={{ fontSize: '.85rem', color: 'var(--text)', marginTop: '.2rem' }}>{img.description}</div>}
                </div>
                <button
                  onClick={() => remove(img.id)}
                  style={{ position: 'absolute', top: '.5rem', right: '.5rem', background: '#DC2626', color: '#fff', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

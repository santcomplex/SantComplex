'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';

type Business = {
  id: string; name: string; category: string; floor: string;
  unit?: string | null; logoUrl?: string | null; description?: string | null;
  contactInfo?: string | null; isHidden: boolean;
};

const EMPTY: Omit<Business, 'id' | 'isHidden'> = { name: '', category: '', floor: 'Ground', unit: '', logoUrl: '', description: '', contactInfo: '' };

export default function AdminBusinesses() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Business | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [inputMode, setInputMode] = useState<'upload' | 'url'>('url');
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileUpload(file: File) {
    if (!file.type.startsWith('image/')) {
      setMsg('Only image files are allowed.');
      return;
    }
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      if (res.ok) {
        const { url } = await res.json();
        setForm(f => ({ ...f, logoUrl: url }));
        setMsg('Photo uploaded successfully!');
      } else {
        const err = await res.json();
        setMsg(err.error || 'Upload failed.');
      }
    } catch (err) {
      console.log(err)
      setMsg('Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  const load = useCallback(async () => {
    const res = await fetch('/api/businesses');
    setBusinesses(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    async function fetchInitial() {
      const res = await fetch('/api/businesses');
      setBusinesses(await res.json());
      setLoading(false);
    }
    fetchInitial();
  }, []);

  function openAdd() { setEditing(null); setForm(EMPTY); setShowModal(true); setMsg(''); }
  function openEdit(b: Business) { setEditing(b); setForm({ name: b.name, category: b.category, floor: b.floor, unit: b.unit || '', logoUrl: b.logoUrl || '', description: b.description || '', contactInfo: b.contactInfo || '' }); setShowModal(true); setMsg(''); }

  async function save() {
    setSaving(true);
    const url = editing ? `/api/businesses/${editing.id}` : '/api/businesses';
    const method = editing ? 'PATCH' : 'POST';
    const body = { ...form, isHidden: editing?.isHidden ?? false };
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setSaving(false);
    if (res.ok) { setShowModal(false); setMsg(editing ? 'Business updated!' : 'Business added!'); load(); }
    else setMsg('Error saving. Please try again.');
  }

  async function toggleHide(b: Business) {
    await fetch(`/api/businesses/${b.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...b, isHidden: !b.isHidden }) });
    load();
  }

  async function remove(b: Business) {
    if (!confirm(`Delete "${b.name}"? This cannot be undone.`)) return;
    await fetch(`/api/businesses/${b.id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div>
      <div className="admin-page-header">
        <h1>Businesses</h1>
        <button className="btn btn-primary" onClick={openAdd}>+ Add Business</button>
      </div>

      {msg && <div className="alert alert-success">{msg}</div>}

      {loading ? <p>Loading…</p> : (
        <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Floor / Unit</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {businesses.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No businesses yet. Click &quot;Add Business`&quot;` to get started.</td></tr>
              )}
              {businesses.map((b) => (
                <tr key={b.id}>
                  <td><strong>{b.name}</strong></td>
                  <td><span className="chip chip-blue">{b.category}</span></td>
                  <td>{b.floor}{b.unit ? ` / Unit ${b.unit}` : ''}</td>
                  <td>
                    {b.isHidden
                      ? <span className="chip chip-gray">Hidden</span>
                      : <span className="chip chip-green">Visible</span>}
                  </td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-sm btn-outline" onClick={() => openEdit(b)}>Edit</button>
                      <button className="btn btn-sm" style={{ background: b.isHidden ? '#16A34A' : '#92400e', color: '#fff' }} onClick={() => toggleHide(b)}>
                        {b.isHidden ? 'Show' : 'Hide'}
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => remove(b)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editing ? 'Edit Business' : 'Add Business'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Business Name *</label>
                <input className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Al-Noor Pharmacy" />
              </div>
              <div className="form-group">
                <label className="form-label">Category *</label>
                <input className="form-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Healthcare" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Floor *</label>
                <select className="form-select" value={form.floor} onChange={(e) => setForm({ ...form, floor: e.target.value })}>
                  <option value="Ground">Ground Floor</option>
                  <option value="First">First Floor</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Unit Number</label>
                <input className="form-input" value={form.unit || ''} onChange={(e) => setForm({ ...form, unit: e.target.value })} placeholder="e.g. G-3" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Contact Info</label>
              <input className="form-input" value={form.contactInfo || ''} onChange={(e) => setForm({ ...form, contactInfo: e.target.value })} placeholder="+91 XXXXX XXXXX" />
            </div>
            <div className="form-group">
              <label className="form-label">Logo / Photo URL</label>
              
              <div style={{ display: 'flex', gap: '.5rem', marginBottom: '.5rem' }}>
                <button
                  type="button"
                  onClick={() => setInputMode('upload')}
                  style={{
                    padding: '.4rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
                    background: inputMode === 'upload' ? 'var(--primary)' : 'transparent',
                    color: inputMode === 'upload' ? '#fff' : 'var(--text)',
                    cursor: 'pointer', fontSize: '.875rem', fontWeight: 600, transition: 'all .2s',
                  }}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('url')}
                  style={{
                    padding: '.4rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
                    background: inputMode === 'url' ? 'var(--primary)' : 'transparent',
                    color: inputMode === 'url' ? '#fff' : 'var(--text)',
                    cursor: 'pointer', fontSize: '.875rem', fontWeight: 600, transition: 'all .2s',
                  }}
                >
                  Image URL
                </button>
              </div>

              {/* Upload section */}
              <div style={{ display: inputMode === 'upload' ? 'block' : 'none' }}>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={async (e) => {
                    e.preventDefault();
                    setDragOver(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) await handleFileUpload(file);
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: `2px dashed ${dragOver ? 'var(--primary)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius)',
                    padding: '1.5rem 1rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: dragOver ? 'color-mix(in srgb, var(--primary) 8%, transparent)' : 'var(--bg)',
                    transition: 'all .2s',
                  }}
                >
                  {form.logoUrl && inputMode === 'upload' ? (
                    <div>
                      <Image src={form.logoUrl} alt="Preview" unoptimized width={200} height={100} style={{ maxHeight: '100px', width: 'auto', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                      <div style={{ marginTop: '.5rem', fontSize: '.85rem', color: 'var(--text-muted)' }}>
                        {uploading ? 'Uploading…' : 'Uploaded — click to replace'}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ fontWeight: 600, marginBottom: '.25rem' }}>{uploading ? 'Uploading…' : 'Drop image here or click to browse'}</div>
                      <div style={{ fontSize: '.8rem', color: 'var(--text-muted)' }}>PNG, JPG, GIF, WebP — max 10 MB</div>
                    </>
                  )}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={async (e) => { const file = e.target.files?.[0]; if (file) await handleFileUpload(file); }} />
              </div>

              {/* URL section */}
              <div style={{ display: inputMode === 'url' ? 'block' : 'none' }}>
                <input className="form-input" value={form.logoUrl || ''} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} placeholder="https://…" />
                {form.logoUrl && inputMode === 'url' && (
                  <Image src={form.logoUrl} alt="Preview" onError={(e) => e.currentTarget.style.display = 'none'} onLoad={(e) => e.currentTarget.style.display = 'block'}
                    style={{ marginTop: '.5rem', maxHeight: '100px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }} />
                )}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-textarea" value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short description of the business…" style={{ minHeight: '80px' }} />
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={save} disabled={saving || !form.name || !form.category}>
              {saving ? 'Saving…' : (editing ? 'Update Business' : 'Add Business')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

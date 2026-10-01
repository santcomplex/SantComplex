'use client';
import { useEffect, useState, useRef, useCallback } from 'react';

type GalleryImage = { id: string; url: string; category?: string | null; description?: string | null };

const CATEGORIES = ['Exterior', 'Interior', 'Shops', 'Common Areas', 'Parking', 'Other'];

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ url: '', category: 'Exterior', description: '' });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState<'success' | 'error'>('success');
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState<'upload' | 'url'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/gallery');
    if (res.ok) setImages(await res.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function showMsg(text: string, type: 'success' | 'error' = 'success') {
    setMsg(text);
    setMsgType(type);
    setTimeout(() => setMsg(''), 4000);
  }

  async function handleFileUpload(file: File) {
    if (!file.type.startsWith('image/')) {
      showMsg('Only image files are allowed.', 'error');
      return;
    }
    setPreviewUrl(URL.createObjectURL(file));
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    setUploading(false);
    if (res.ok) {
      const { url } = await res.json();
      setForm(f => ({ ...f, url }));
    } else {
      const err = await res.json();
      showMsg(err.error || 'Upload failed.', 'error');
      setPreviewUrl(null);
    }
  }

  const onDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) await handleFileUpload(file);
  }, []);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await handleFileUpload(file);
  };

  async function addImage() {
    if (!form.url) return;
    setSaving(true);
    const res = await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      setForm({ url: '', category: 'Exterior', description: '' });
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      showMsg('Photo added successfully!');
      load();
    } else {
      showMsg('Error adding photo.', 'error');
    }
  }

  async function remove(id: string) {
    if (!confirm('Delete this photo?')) return;
    const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
    if (res.ok) load();
    else showMsg('Failed to delete photo.', 'error');
  }

  return (
    <div>
      <div className="admin-page-header">
        <h1>Gallery</h1>
      </div>

      {/* Add photo form */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Add New Photo</h3>
        {msg && <div className={`alert alert-${msgType === 'error' ? 'error' : 'success'}`} style={{ marginBottom: '1rem' }}>{msg}</div>}

        {/* Mode toggle */}
        <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1.25rem' }}>
          <button
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

        {/* Upload section — always mounted, hidden when in URL mode */}
        <div style={{ marginBottom: '1rem', display: inputMode === 'upload' ? 'block' : 'none' }}>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: `2px dashed ${dragOver ? 'var(--primary)' : 'var(--border)'}`,
              borderRadius: 'var(--radius)',
              padding: '2.5rem 1rem',
              textAlign: 'center',
              cursor: 'pointer',
              background: dragOver ? 'color-mix(in srgb, var(--primary) 8%, transparent)' : 'var(--bg)',
              transition: 'all .2s',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {previewUrl && inputMode === 'upload' ? (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img src={previewUrl} alt="Preview" style={{ maxHeight: '180px', maxWidth: '100%', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                <div style={{ marginTop: '.5rem', fontSize: '.85rem', color: 'var(--text-muted)' }}>
                  {uploading ? 'Uploading…' : 'Uploaded — click to replace'}
                </div>
              </div>
            ) : (
              <>
                <div style={{ fontWeight: 600, marginBottom: '.25rem' }}>
                  {uploading ? 'Uploading…' : 'Drop image here or click to browse'}
                </div>
                <div style={{ fontSize: '.8rem', color: 'var(--text-muted)' }}>
                  PNG, JPG, GIF, WebP — max 10 MB
                </div>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={onFileChange}
          />
        </div>

        {/* URL section — always mounted, hidden when in upload mode */}
        <div className="form-group" style={{ marginBottom: '1rem', display: inputMode === 'url' ? 'block' : 'none' }}>
          <label className="form-label">Image URL *</label>
          <input
            className="form-input"
            value={form.url}
            onChange={(e) => { setForm({ ...form, url: e.target.value }); setPreviewUrl(e.target.value || null); }}
            placeholder="https://example.com/image.jpg"
          />
          {previewUrl && inputMode === 'url' && (
            <img src={previewUrl} alt="Preview" onError={() => setPreviewUrl(null)}
              style={{ marginTop: '.5rem', maxHeight: '120px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }} />
          )}
        </div>


        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <input className="form-input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Optional caption…" />
          </div>
        </div>

        <button className="btn btn-primary" onClick={addImage} disabled={saving || uploading || !form.url}>
          {saving ? 'Adding…' : '+ Add Photo'}
        </button>
      </div>

      {loading ? <p>Loading…</p> : (
        images.length === 0 ? (
          <div className="empty-state">
            <svg className="empty-state-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" /></svg>
            <h3>No photos yet</h3>
            <p>Upload an image or paste a URL above to populate the gallery.</p>
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

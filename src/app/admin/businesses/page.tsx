'use client';
import { useEffect, useState } from 'react';

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

  async function load() {
    setLoading(true);
    const res = await fetch('/api/businesses');
    setBusinesses(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

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
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No businesses yet. Click "Add Business" to get started.</td></tr>
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
              <input className="form-input" value={form.logoUrl || ''} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} placeholder="https://…" />
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

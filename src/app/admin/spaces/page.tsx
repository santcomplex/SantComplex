'use client';
import { useEffect, useState } from 'react';

type Space = {
  id: string; unitNumber: string; floor: string; area?: string | null;
  monthlyRent?: number | null; status: string; basicFacilities?: string | null; photoUrl?: string | null;
};
const EMPTY = { unitNumber: '', floor: 'Ground', area: '', monthlyRent: '', basicFacilities: '', photoUrl: '' };

export default function AdminSpaces() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Space | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  async function load() {
    setLoading(true);
    const res = await fetch('/api/spaces');
    setSpaces(await res.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function openAdd() { setEditing(null); setForm(EMPTY); setShowModal(true); setMsg(''); }
  function openEdit(s: Space) {
    setEditing(s);
    setForm({ unitNumber: s.unitNumber, floor: s.floor, area: s.area || '', monthlyRent: s.monthlyRent?.toString() || '', basicFacilities: s.basicFacilities || '', photoUrl: s.photoUrl || '' });
    setShowModal(true); setMsg('');
  }

  async function save() {
    setSaving(true);
    const url = editing ? `/api/spaces/${editing.id}` : '/api/spaces';
    const method = editing ? 'PATCH' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, status: editing?.status || 'AVAILABLE' }) });
    setSaving(false);
    if (res.ok) { setShowModal(false); setMsg('Saved!'); load(); }
    else setMsg('Error saving.');
  }

  async function toggleStatus(s: Space) {
    const newStatus = s.status === 'AVAILABLE' ? 'OCCUPIED' : 'AVAILABLE';
    await fetch(`/api/spaces/${s.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...s, status: newStatus }) });
    load();
  }

  async function remove(s: Space) {
    if (!confirm(`Delete Unit ${s.unitNumber}?`)) return;
    await fetch(`/api/spaces/${s.id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div>
      <div className="admin-page-header">
        <h1>Available Spaces</h1>
        <button className="btn btn-primary" onClick={openAdd}>+ Add Space</button>
      </div>
      {msg && <div className="alert alert-success">{msg}</div>}
      {loading ? <p>Loading…</p> : (
        <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', overflow: 'hidden' }}>
          <table className="data-table">
            <thead>
              <tr><th>Unit</th><th>Floor</th><th>Area</th><th>Rent/Month</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {spaces.length === 0 && <tr><td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No spaces added yet.</td></tr>}
              {spaces.map((s) => (
                <tr key={s.id}>
                  <td><strong>Unit {s.unitNumber}</strong></td>
                  <td>{s.floor} Floor</td>
                  <td>{s.area || '—'}</td>
                  <td>{s.monthlyRent ? `₹${s.monthlyRent.toLocaleString('en-IN')}` : '—'}</td>
                  <td>
                    {s.status === 'AVAILABLE'
                      ? <span className="chip chip-green">Available</span>
                      : <span className="chip chip-red">Occupied</span>}
                  </td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-sm btn-outline" onClick={() => openEdit(s)}>Edit</button>
                      <button className="btn btn-sm" style={{ background: s.status === 'AVAILABLE' ? '#B91C1C' : '#16A34A', color: '#fff' }} onClick={() => toggleStatus(s)}>
                        {s.status === 'AVAILABLE' ? 'Mark Occupied' : 'Mark Available'}
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => remove(s)}>Delete</button>
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
              <h2>{editing ? 'Edit Space' : 'Add Space'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Unit Number *</label>
                <input className="form-input" value={form.unitNumber} onChange={(e) => setForm({ ...form, unitNumber: e.target.value })} placeholder="e.g. G-5" />
              </div>
              <div className="form-group">
                <label className="form-label">Floor *</label>
                <select className="form-select" value={form.floor} onChange={(e) => setForm({ ...form, floor: e.target.value })}>
                  <option value="Ground">Ground Floor</option>
                  <option value="First">First Floor</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Area (e.g. 250 sq ft)</label>
                <input className="form-input" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} placeholder="250 sq ft" />
              </div>
              <div className="form-group">
                <label className="form-label">Monthly Rent (₹)</label>
                <input className="form-input" type="number" value={form.monthlyRent} onChange={(e) => setForm({ ...form, monthlyRent: e.target.value })} placeholder="15000" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Photo URL</label>
              <input className="form-input" value={form.photoUrl} onChange={(e) => setForm({ ...form, photoUrl: e.target.value })} placeholder="https://…" />
            </div>
            <div className="form-group">
              <label className="form-label">Basic Facilities</label>
              <textarea className="form-textarea" value={form.basicFacilities} onChange={(e) => setForm({ ...form, basicFacilities: e.target.value })} placeholder="e.g. Electricity, water connection, attached washroom…" style={{ minHeight: '80px' }} />
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={save} disabled={saving || !form.unitNumber}>
              {saving ? 'Saving…' : (editing ? 'Update Space' : 'Add Space')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

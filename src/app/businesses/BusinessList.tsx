'use client';
import { useState } from 'react';

type Business = {
  id: string; name: string; category: string; floor: string;
  unit?: string | null; logoUrl?: string | null; description?: string | null; contactInfo?: string | null;
};

export default function BusinessList({ businesses, categories }: { businesses: Business[], categories: string[] }) {
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const filtered = selectedCat === 'All' 
    ? businesses 
    : businesses.filter(b => b.category === selectedCat);

  return (
    <>
      <div className="filter-bar">
        <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--text-muted)' }}>
          Categories:
        </span>
        <span 
          className="badge" 
          style={{ 
            cursor: 'pointer', 
            background: selectedCat === 'All' ? 'var(--blue)' : 'var(--surface)', 
            color: selectedCat === 'All' ? '#fff' : 'var(--text-muted)', 
            border: '1px solid var(--border)' 
          }}
          onClick={() => setSelectedCat('All')}
        >
          All
        </span>
        {categories.map((cat) => (
          <span 
            key={cat} 
            className="badge" 
            style={{ 
              cursor: 'pointer', 
              background: selectedCat === cat ? 'var(--blue)' : 'var(--surface)', 
              color: selectedCat === cat ? '#fff' : 'var(--text-muted)', 
              border: '1px solid var(--border)' 
            }}
            onClick={() => setSelectedCat(cat)}
          >
            {cat}
          </span>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <h3>No Businesses Found</h3>
          <p>We couldn't find any businesses in this category.</p>
        </div>
      ) : (
        <div className="card-grid-3">
          {filtered.map((b) => (
            <div key={b.id} className="card">
              {b.logoUrl ? (
                <div style={{ width: '100%', aspectRatio: '4 / 3', overflow: 'hidden', borderRadius: 'var(--radius) var(--radius) 0 0', background: 'var(--surface)' }}>
                  <img
                    src={b.logoUrl}
                    alt={`${b.name} logo`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ) : (
                <div style={{ width: '100%', aspectRatio: '4 / 3', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', borderRadius: 'var(--radius) var(--radius) 0 0', fontSize: '3rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  {b.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="card-body">
                <div className="card-category">{b.category}</div>
                <h3 className="card-title">{b.name}</h3>
                <div className="card-meta">
                  <span>Floor: {b.floor}</span>
                  {b.unit && <span>Unit: {b.unit}</span>}
                </div>
                {b.description && <p className="card-text">{b.description}</p>}
              </div>
              {b.contactInfo && (
                <div className="card-footer" style={{ background: '#FAFAFA' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                    Contact
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--blue)' }}>
                    {b.contactInfo}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

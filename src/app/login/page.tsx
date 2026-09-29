'use client';

import { useActionState } from 'react';
import { loginAdmin } from './actions';
import Image from 'next/image';

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAdmin, null);

  return (
    <div style={{ minHeight: 'calc(100vh - 64px - 100px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '40px 20px' }}>
      <div style={{ background: 'var(--surface)', padding: '40px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', width: '100%', maxWidth: '420px', border: '1px solid var(--border)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Image src="/logo.jpg" alt="Sant Complex" width={64} height={64} style={{ borderRadius: '8px', marginBottom: '16px', display: 'inline-block' }} />
          <h1 style={{ fontSize: '24px', fontWeight: 800, fontFamily: "'Playfair Display', serif" }}>Admin Portal</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '8px' }}>Sign in to manage the property</p>
        </div>

        <form action={formAction}>
          {state?.error && (
            <div className="alert alert-error" style={{ marginBottom: '24px' }}>
              {state.error}
            </div>
          )}
          
          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label">Password</label>
            <input 
              type="password" 
              name="password" 
              className="form-input" 
              required 
              placeholder="Enter your admin password"
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary btn-lg" 
            style={{ width: '100%' }}
            disabled={pending}
          >
            {pending ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

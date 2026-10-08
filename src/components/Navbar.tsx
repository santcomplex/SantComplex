'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when route changes
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="logo-wrap" onClick={handleLinkClick}>
          <Image src="/sant-complex-logo.jpg" alt="Sant Complex Logo" width={40} height={40} className="logo-img" />
          <div className="logo-text">
            <strong>Sant Complex</strong>
            <small>Goraya Road, Jandiala Manjki</small>
          </div>
        </Link>
        
        {/* Mobile menu toggle button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? (
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li><Link href="/businesses" onClick={handleLinkClick}>Businesses</Link></li>
          <li><Link href="/spaces" onClick={handleLinkClick}>Available Spaces</Link></li>
          <li><Link href="/about" onClick={handleLinkClick}>About</Link></li>
          <li><Link href="/location" onClick={handleLinkClick}>Location</Link></li>
          <li className="nav-cta">
            <Link href="/contact" className="btn btn-primary btn-sm" onClick={handleLinkClick}>Contact Us</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';
import { ConditionalPublicUI } from '@/components/ConditionalPublicUI';

export const metadata: Metadata = {
  title: { default: 'Sant Complex — Goraya Road, Jandiala Manjki', template: '%s | Sant Complex' },
  description: 'Sant Complex is a premier commercial hub on Goraya Road, Jandiala Manjki. Find established businesses and available commercial spaces for rent.',
  keywords: ['Sant Complex', 'Jandiala Manjki', 'Goraya Road', 'commercial space', 'shop for rent', 'Punjab'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ConditionalPublicUI>
          {/* Navbar */}
          <nav className="navbar">
          <div className="container navbar-inner">
            <Link href="/" className="logo-wrap">
              <Image src="/logo.jpg" alt="Sant Complex Logo" width={40} height={40} className="logo-img" />
              <div className="logo-text">
                <strong>Sant Complex</strong>
                <small>Goraya Road, Jandiala Manjki</small>
              </div>
            </Link>
            <ul className="nav-links">
              <li><Link href="/businesses">Businesses</Link></li>
              <li><Link href="/spaces">Available Spaces</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/location">Location</Link></li>
              <li className="nav-cta">
                <Link href="/contact" className="btn btn-primary btn-sm">Contact Us</Link>
              </li>
            </ul>
          </div>
        </nav>
        </ConditionalPublicUI>

        {children}

        <ConditionalPublicUI>
        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-brand">
                <div className="footer-logo-wrap">
                  <Image src="/logo.jpg" alt="Sant Complex" width={36} height={36} className="footer-logo-img" />
                  <span className="footer-logo-text">Sant Complex</span>
                </div>
                <p>A thriving commercial hub on Goraya Road, Jandiala Manjki — home to established businesses and quality commercial spaces.</p>
              </div>
              <div>
                <h4>Navigation</h4>
                <ul>
                  <li><Link href="/businesses">Businesses</Link></li>
                  <li><Link href="/spaces">Available Spaces</Link></li>
                  <li><Link href="/gallery">Gallery</Link></li>
                  <li><Link href="/about">About</Link></li>
                </ul>
              </div>
              <div>
                <h4>Information</h4>
                <ul>
                  <li><Link href="/location">Location & Directions</Link></li>
                  <li><Link href="/contact">Contact Us</Link></li>
                  <li><Link href="/admin">Admin Panel</Link></li>
                </ul>
              </div>
              <div>
                <h4>Contact</h4>
                <ul>
                  <li><a href="tel:+919XXXXXXXXX">+91 9XXXXXXXXX</a></li>
                  <li><a href="https://wa.me/919XXXXXXXXX" target="_blank">WhatsApp</a></li>
                  <li><a href="mailto:santstore@gmail.com">santstore@gmail.com</a></li>
                  <li><span style={{ color: 'rgba(255,255,255,.5)', fontSize: '14px' }}>Goraya Road, Jandiala Manjki</span></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© {new Date().getFullYear()} Sant Complex, Jandiala Manjki. All rights reserved.</p>
              <p>Built for the community.</p>
            </div>
          </div>
        </footer>

        {/* Floating Call / WhatsApp */}
        <div className="floating-cta">
          <a href="https://wa.me/919XXXXXXXXX" target="_blank" rel="noopener noreferrer" className="floating-btn floating-btn-wa">
            <svg className="floating-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12.004 2C6.485 2 2.005 6.48 2.005 12c0 1.907.5 3.694 1.373 5.24L2 22l4.886-1.353A9.94 9.94 0 0012.004 22C17.522 22 22 17.52 22 12S17.522 2 12.004 2zm0 18c-1.72 0-3.317-.494-4.666-1.342l-.335-.198-3.456.957.974-3.357-.218-.345A7.953 7.953 0 014.005 12c0-4.41 3.59-8 8-8s7.999 3.59 7.999 8-3.59 8-7.999 8z"/></svg>
            WhatsApp
          </a>
          <a href="tel:+919XXXXXXXXX" className="floating-btn floating-btn-call">
            <svg className="floating-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.07 1.18 2 2 0 012.06 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            Call Us
          </a>
        </div>
        </ConditionalPublicUI>
      </body>
    </html>
  );
}

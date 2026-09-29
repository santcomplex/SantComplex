import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: { default: 'Sant Complex — Goraya Road, Jandiala Manjki', template: '%s | Sant Complex' },
  description: 'Premium commercial spaces and established businesses at Sant Complex, Goraya Road, Jandiala Manjki. Find available shops, office spaces, and local businesses.',
  keywords: ['Sant Complex', 'Jandiala Manjki', 'Goraya Road', 'commercial space', 'shop for rent', 'office space'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Navbar */}
        <nav className="navbar">
          <div className="container navbar-inner">
            <Link href="/" className="logo">
              Sant<span>Complex</span>
            </Link>
            <ul className="nav-links">
              <li><Link href="/businesses">Businesses</Link></li>
              <li><Link href="/spaces">Available Spaces</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/location">Location</Link></li>
              <li>
                <Link href="/contact" className="btn btn-primary btn-sm">Contact Us</Link>
              </li>
            </ul>
          </div>
        </nav>

        {children}

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-brand">
                <div className="logo">Sant<span>Complex</span></div>
                <p>A thriving commercial hub on Goraya Road, Jandiala Manjki — home to established businesses and quality spaces.</p>
              </div>
              <div>
                <h4>Quick Links</h4>
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
                  <li><Link href="/location">Location</Link></li>
                  <li><Link href="/contact">Contact Us</Link></li>
                  <li><Link href="/admin">Admin Panel</Link></li>
                </ul>
              </div>
              <div>
                <h4>Contact</h4>
                <ul>
                  <li><a href="tel:+919XXXXXXXXX">📞 +91 9XXXXXXXXX</a></li>
                  <li><a href="https://wa.me/919XXXXXXXXX" target="_blank">💬 WhatsApp</a></li>
                  <li><a href="mailto:info@santcomplex.com">✉️ info@santcomplex.com</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© {new Date().getFullYear()} Sant Complex, Goraya Road, Jandiala Manjki</p>
              <p>Designed for growth.</p>
            </div>
          </div>
        </footer>

        {/* Floating WhatsApp + Call buttons */}
        <div className="floating-buttons">
          <a href="https://wa.me/919XXXXXXXXX" target="_blank" rel="noopener noreferrer" className="floating-btn floating-btn-wa">
            💬 WhatsApp
          </a>
          <a href="tel:+919XXXXXXXXX" className="floating-btn floating-btn-call">
            📞 Call Us
          </a>
        </div>
      </body>
    </html>
  );
}

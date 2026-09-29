import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sant Complex - Commercial Property',
  description: 'Premium commercial spaces and established businesses at Goraya Road, Jandiala Manjki.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <div className="container navbar-container">
            <Link href="/" className="logo">
              Sant<span className="text-accent">Complex</span>
            </Link>
            <div className="nav-links">
              <Link href="/businesses">Businesses</Link>
              <Link href="/spaces">Available Spaces</Link>
              <Link href="/gallery">Gallery</Link>
              <Link href="/about">About</Link>
              <Link href="/contact" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Contact Us</Link>
            </div>
          </div>
        </nav>
        <main>
          {children}
        </main>
        <footer>
          <div className="container footer-content">
            <div className="footer-brand">
              <h3>Sant Complex</h3>
              <p>Goraya Road, Jandiala Manjki</p>
            </div>
            <div>
              <p>Contact: +91 XXXXX XXXXX</p>
              <p>Email: info@santcomplex.com</p>
            </div>
          </div>
          <div className="container footer-bottom">
            <p>&copy; {new Date().getFullYear()} Sant Complex. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

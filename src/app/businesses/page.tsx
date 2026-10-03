import type { Metadata } from 'next';
import { db } from '@/lib/db';
export const dynamic = 'force-dynamic';
import Link from 'next/link';
import BusinessList from './BusinessList';

export const metadata: Metadata = {
  title: 'Business Directory',
  description: 'Explore the diverse range of retail, service, and professional businesses operating at Sant Complex.',
};

export default async function BusinessesPage() {
  let businesses: {
    id: string; name: string; category: string; floor: string;
    unit?: string | null; logoUrl?: string | null; description?: string | null; contactInfo?: string | null;
  }[] = [];
  let categories: string[] = [];

  try {
    const rawBusinesses = await db.orm.public.Business
      .where({ isHidden: false })
      .orderBy((b) => b.name.asc())
      .all();
    
    businesses = rawBusinesses.map((b) => ({
      id: b.id,
      name: b.name,
      category: b.category,
      floor: b.floor,
      unit: b.unit,
      logoUrl: b.logoUrl,
      description: b.description,
      contactInfo: b.contactInfo
    }));

    categories = Array.from(new Set(businesses.map(b => b.category)));
  } catch {
    businesses = [];
  }

  return (
    <>
      <div className="page-hero">
        <div className="container text-center">
          <p className="page-hero-eyebrow">Directory</p>
          <h1>Our Businesses</h1>
          <p style={{ margin: '12px auto 0' }}>
            Discover the established businesses that make Sant Complex a thriving commercial hub.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {businesses.length === 0 ? (
            <div className="empty-state">
              <h3>Directory Updating</h3>
              <p>We are currently updating our business directory. Please check back soon.</p>
            </div>
          ) : (
            <BusinessList businesses={businesses} categories={categories} />
          )}
        </div>
      </section>
      
      <section className="cta-banner red">
        <div className="container text-center">
          <h2>Looking for Commercial Space?</h2>
          <p>Join our thriving business community. Explore our available retail and office spaces.</p>
          <Link href="/spaces" className="btn btn-outline-white btn-lg">View Available Spaces</Link>
        </div>
      </section>
    </>
  );
}
